import { IRecipeEntity } from '../entity';

export interface IRecipeRepository {
  findAllRecipes(): Promise<IRecipeEntity[]>;
  createRecipe(recipe: IRecipeEntity): Promise<IRecipeEntity>;
}
