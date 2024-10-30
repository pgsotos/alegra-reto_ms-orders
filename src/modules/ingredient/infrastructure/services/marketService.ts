import { createAxiosInstance } from '../../../../common/util';
import { IngredientType } from '../../domain/entity';
import IMarketEntityResponse from '../../domain/entity/market';

const axiosInstance = createAxiosInstance('https://recruitment.alegra.com/api');

export const MarketService = {
  async buyIngredient(
    ingredient: IngredientType
  ): Promise<IMarketEntityResponse> {
    try {
      console.log(`comprando ${ingredient}`);
      const response = await axiosInstance.get('/farmers-market/buy', {
        params: { ingredient },
      });
      console.log(`conseguí ${response.data.quantitySold}`);
      return response.data;
    } catch (e) {
      console.error(`error on buyIngredient service ${e}`);
      return {
        quantitySold: 0,
      };
    }
  },
};

export default MarketService;
