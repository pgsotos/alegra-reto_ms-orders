import { Inject, Injectable } from '@nestjs/common';
import { IIngredientRepository } from '../domain/repository';
import { MarketService } from '../infrastructure/services/marketService';
import { IIngredientEntity, IngredientType } from '../domain/entity';
import { IngredientsDto } from './dto';

@Injectable()
export class IngredientService {
  constructor(
    @Inject('IngredientRepository')
    private readonly ingredientRepository: IIngredientRepository
  ) {}

  async onModuleInit() {
    const ingredients = Object.values(IngredientType);
    const existingIngredients = (
      await this.ingredientRepository.findAllIngredients()
    ).map((i) => i.name);
    const missingIngredients = ingredients.filter(
      (ingredient) => !existingIngredients.includes(ingredient)
    );
    for (const ingredient of missingIngredients) {
      await this.ingredientRepository.createIngredient(ingredient);
    }
  }

  async getAllIngredients(): Promise<IIngredientEntity[]> {
    const ingredients = await this.ingredientRepository.findAllIngredients();
    return ingredients;
  }

  async getIngredient(ingredient: IngredientType): Promise<IIngredientEntity> {
    const ingredientInfo =
      await this.ingredientRepository.findIngredient(ingredient);
    return ingredientInfo;
  }

  async getIngredientsToRecipe(
    ingredientsDto: IngredientsDto
  ): Promise<IIngredientEntity[]> {
    const ingredients: IIngredientEntity[] = ingredientsDto.ingredients.map(
      (i) => ({ ...i })
    );

    const currentIngredients = await this.ingredientRepository.findIngredients(
      ingredients.map((i) => i.name)
    );

    const insufficientIngredients = ingredients.filter((ingredient) => {
      const current = currentIngredients.find(
        (i) => i.name === ingredient.name
      );
      return !current || current.quantity < ingredient.quantity;
    });

    if (insufficientIngredients.length) {
      const toAdd = await Promise.all(
        insufficientIngredients.map(async ({ name }) => {
          const { quantitySold } = await MarketService.buyIngredient(name);
          return {
            name,
            quantity: quantitySold,
          };
        })
      );
      await this.ingredientRepository.addIngredients(toAdd);
      return this.getIngredientsToRecipe(ingredientsDto);
    }

    return this.ingredientRepository.reduceIngredients(ingredients);
  }
}

export default IngredientService;
