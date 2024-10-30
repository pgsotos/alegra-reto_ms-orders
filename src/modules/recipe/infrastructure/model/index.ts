import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRecipeEntity, IngredientType } from '../../domain/entity';

class Ingredient {
  @Prop({ type: String, enum: IngredientType, required: true })
  ingredient: IngredientType;

  @Prop({ type: Number, required: true })
  quantity: number;
}

@Schema({ timestamps: true, versionKey: false })
export class Recipe extends Document implements IRecipeEntity {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [Ingredient], required: true })
  ingredients: Ingredient[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
