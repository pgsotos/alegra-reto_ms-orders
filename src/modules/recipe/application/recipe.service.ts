import { Inject, Injectable } from '@nestjs/common';
import { IRecipeRepository } from '../domain/repository';
import { recipes } from '../domain/entity';

@Injectable()
export class RecipeService {
  constructor(
    @Inject('RecipeRepository')
    private readonly recipeRepository: IRecipeRepository
  ) {}

  async onModuleInit() {
    const allRecipes = Object.values(recipes);
    const existingRecipes = (await this.recipeRepository.findAllRecipes()).map(
      (i) => i.name
    );
    const missingRecipes = allRecipes.filter(
      (r) => !existingRecipes.includes(r.name)
    );
    for (const recipe of missingRecipes) {
      await this.recipeRepository.createRecipe(recipe);
    }
  }

  async getRecipes() {
    return this.recipeRepository.findAllRecipes();
  }
}

export default RecipeService;
