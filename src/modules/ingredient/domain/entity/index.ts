export enum IngredientType {
  Tomato = 'tomato',
  Lemon = 'lemon',
  Potato = 'potato',
  Rice = 'rice',
  Ketchup = 'ketchup',
  Lettuce = 'lettuce',
  Onion = 'onion',
  Cheese = 'cheese',
  Meat = 'meat',
  Chicken = 'chicken',
}

export interface IIngredientEntity {
  name: IngredientType;
  quantity: number;
}

export interface IngredientDocument extends IIngredientEntity, Document {}
