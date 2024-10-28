import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientService } from './application/ingredient.service';
import { IngredientController } from './infrastructure/controllers';
import { Ingredient, IngredientSchema } from './infrastructure/model';
import { IngredientRepository } from './infrastructure/repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientController],
  providers: [
    IngredientService,
    {
      provide: 'IngredientRepository',
      useClass: IngredientRepository,
    },
  ],
  exports: [IngredientService],
})
export class IngredientModule {}

export default IngredientModule;
