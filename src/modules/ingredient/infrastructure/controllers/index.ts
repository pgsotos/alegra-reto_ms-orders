import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import IngredientService from '../../application/ingredient.service';
import { IngredientType } from '../../domain/entity';
import { IngredientsDto } from '../../application/dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async getIngredients() {
    return this.ingredientService.getAllIngredients();
  }

  @Get(':ingredient')
  async getIngredient(@Param('ingredient') ingredient: IngredientType) {
    return this.ingredientService.getIngredient(ingredient);
  }

  @Post('/recipe')
  async ingredientsToRecipe(@Body() ingredientsDto: IngredientsDto) {
    return this.ingredientService.getIngredientsToRecipe(ingredientsDto);
  }
}

export default IngredientController;
