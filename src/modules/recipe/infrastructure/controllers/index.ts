import { Controller, Get } from '@nestjs/common';
import RecipeService from '../../application/recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipesService: RecipeService) {}

  @Get()
  async getRecipes() {
    return this.recipesService.getRecipes();
  }

  @Get('random')
  async getRandomRecipe() {
    return this.recipesService.getRandomRecipe();
  }
}

export default RecipeController;
