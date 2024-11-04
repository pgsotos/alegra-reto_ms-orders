import { config } from 'dotenv';

import { createAxiosInstance } from '../../../../common/util';
import { IRecipeEntity } from '../../domain/entity/recipe';

config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

const axiosInstance = createAxiosInstance(process.env.ENDPOINT_MS_RECIPES);

export const RecipeService = {
  async getRandomRecipe(): Promise<IRecipeEntity> {
    try {
      const response = await axiosInstance.get('/recipes/random');
      return response.data;
    } catch (e) {
      console.error(`error on getRandomRecipe service ${e}`);
      return {
        name: '',
        ingredients: [],
      };
    }
  },
};

export default RecipeService;
