import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { IRecipeEntity } from '../../domain/entity';
import { IRecipeRepository } from '../../domain/repository';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(
    @InjectModel('Recipe')
    private readonly recipeModel: Model<IRecipeEntity>
  ) {}

  async findAllRecipes(): Promise<IRecipeEntity[]> {
    return this.recipeModel.find();
  }

  async createRecipe(recipe: IRecipeEntity): Promise<IRecipeEntity> {
    return this.recipeModel.create(recipe);
  }
}

export default RecipeRepository;
