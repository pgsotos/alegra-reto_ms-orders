import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { IIngredientRepository } from '../../domain/repository';
import { Ingredient } from '../model';
import { IIngredientEntity, IngredientType } from '../../domain/entity';

@Injectable()
export class IngredientRepository implements IIngredientRepository {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly IngredientModel: Model<IIngredientEntity>
  ) {}

  async findAllIngredients(): Promise<IIngredientEntity[]> {
    return this.IngredientModel.find();
  }

  async findIngredients(
    ingredients: IngredientType[]
  ): Promise<IIngredientEntity[]> {
    return this.IngredientModel.find({
      name: { $in: ingredients },
    });
  }

  async findIngredient(ingredient: IngredientType): Promise<IIngredientEntity> {
    return this.IngredientModel.findOne({ name: ingredient });
  }

  async createIngredient(
    ingredient: IngredientType
  ): Promise<IIngredientEntity> {
    return this.IngredientModel.create({ name: ingredient, quantity: 5 });
  }

  async addIngredients(
    ingredients: IIngredientEntity[]
  ): Promise<IIngredientEntity[]> {
    const bulkOps = ingredients.map((ingredient) => ({
      updateOne: {
        filter: { name: ingredient.name },
        update: { $inc: { quantity: ingredient.quantity } },
      },
    }));

    await this.IngredientModel.bulkWrite(bulkOps);

    const updatedIngredients = await this.IngredientModel.find({
      name: { $in: ingredients.map((i) => i.name) },
    }).exec();

    return updatedIngredients;
  }

  async reduceIngredients(
    ingredients: IIngredientEntity[]
  ): Promise<IIngredientEntity[]> {
    const bulkOps = ingredients.map((ingredient) => ({
      updateOne: {
        filter: { name: ingredient.name },
        update: { $inc: { quantity: -ingredient.quantity } },
      },
    }));

    await this.IngredientModel.bulkWrite(bulkOps);

    const updatedIngredients = await this.IngredientModel.find({
      name: { $in: ingredients.map((i) => i.name) },
    }).exec();

    return updatedIngredients;
  }
}

export default IngredientRepository;
