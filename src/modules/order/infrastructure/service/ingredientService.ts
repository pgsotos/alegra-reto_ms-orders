import { config } from 'dotenv';

import { createAxiosInstance } from '../../../../common/util';
import { IIngredientRecipe } from '../../domain/entity/recipe';
import { IIngredientEntity } from '../../domain/entity/ingredient';

config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

const axiosInstance = createAxiosInstance(process.env.ENDPOINT_MS_RECIPE);

export const IngredientService = {
  async getIngredientsToRecipe(
    ingredients: IIngredientRecipe[]
  ): Promise<IIngredientEntity[]> {
    try {
      const response = await axiosInstance.post('/ingredients/recipe', {
        ingredients,
      });
      return response.data;
    } catch (e) {
      console.error(`error on getIngredientsToRecipe ${e}`);
      return [];
    }
  },
};

export default IngredientService;
