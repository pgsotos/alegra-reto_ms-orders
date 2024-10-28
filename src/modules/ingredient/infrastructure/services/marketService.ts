import { createAxiosInstance } from '../../../../common/util';
import { IngredientType } from '../../domain/entity';

const axiosInstance = createAxiosInstance('https://recruitment.alegra.com/api');

export const MarketService = {
  async buyIngredient(ingredient: IngredientType) {
    try {
      const response = await axiosInstance.get('/farmers-market/buy', {
        params: { ingredient },
      });
      return response.data;
    } catch (e) {
      console.error('error on buyIngredient service');
      return {
        quantitySold: 0,
      };
    }
  },
};

export default MarketService;
