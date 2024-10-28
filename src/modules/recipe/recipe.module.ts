import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeService } from './application/recipe.service';
import { RecipeController } from './infrastructure/controllers';
import { RecipeRepository } from './infrastructure/repository';
import { Recipe, RecipeSchema } from './infrastructure/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipeController],
  providers: [
    RecipeService,
    {
      provide: 'RecipeRepository',
      useClass: RecipeRepository,
    },
  ],
  exports: [RecipeService],
})
export class RecipeModule {}

export default RecipeModule;
