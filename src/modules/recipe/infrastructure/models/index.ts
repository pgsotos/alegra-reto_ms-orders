import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRecipeEntity, IngredientType } from '../../domain/entity';

@Schema({ timestamps: true, versionKey: false })
export class Recipe extends Document implements IRecipeEntity {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ type: String, enum: IngredientType }], required: true })
  ingredients: IngredientType[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
