import { IIngredientEntity, IngredientType } from '../entity';

export interface IIngredientRepository {
  findAllIngredients(): Promise<IIngredientEntity[]>;
  findIngredients(ingredients: IngredientType[]): Promise<IIngredientEntity[]>;
  findIngredient(ingredient: IngredientType): Promise<IIngredientEntity>;
  reduceIngredients(
    ingredients: IIngredientEntity[]
  ): Promise<IIngredientEntity[]>;
  addIngredients(
    ingredients: IIngredientEntity[]
  ): Promise<IIngredientEntity[]>;
  createIngredient(ingredient: IngredientType): Promise<IIngredientEntity>;
}
