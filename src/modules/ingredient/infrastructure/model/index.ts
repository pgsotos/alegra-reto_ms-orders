import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IIngredientEntity, IngredientType } from '../../domain/entity';

@Schema({ timestamps: true, versionKey: false })
export class Ingredient extends Document implements IIngredientEntity {
  @Prop({ type: String, enum: IngredientType, required: true })
  ingredient: IngredientType;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
