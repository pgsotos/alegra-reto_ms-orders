import { IsEnum, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IIngredientEntity, IngredientType } from '../../domain/entity';

export class IngredientDto implements IIngredientEntity {
  @IsEnum(IngredientType, { message: 'name must be a valid ingredient type' })
  ingredient: IngredientType;

  @IsInt({ message: 'quantity must be an integer' })
  @Min(1, { message: 'quantity must be at least 1' })
  quantity: number;
}

export class IngredientsDto {
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];
}
