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

export interface IIngredientRecipe {
  ingredient: IngredientType;
  quantity: number;
}

export interface IRecipeEntity {
  name: string;
  ingredients: IIngredientRecipe[];
}

export const recipes: IRecipeEntity[] = [
  {
    name: 'Ensalada Mixta',
    ingredients: [
      { ingredient: IngredientType.Tomato, quantity: 2 },
      { ingredient: IngredientType.Lettuce, quantity: 1 },
      { ingredient: IngredientType.Onion, quantity: 1 },
      { ingredient: IngredientType.Lemon, quantity: 1 },
      { ingredient: IngredientType.Cheese, quantity: 1 },
    ],
  },
  {
    name: 'Pollo con Papas y Ketchup',
    ingredients: [
      { ingredient: IngredientType.Chicken, quantity: 1 },
      { ingredient: IngredientType.Potato, quantity: 3 },
      { ingredient: IngredientType.Ketchup, quantity: 1 },
      { ingredient: IngredientType.Onion, quantity: 1 },
      { ingredient: IngredientType.Lemon, quantity: 1 },
    ],
  },
  {
    name: 'Sopa de Verduras con Arroz',
    ingredients: [
      { ingredient: IngredientType.Potato, quantity: 2 },
      { ingredient: IngredientType.Tomato, quantity: 2 },
      { ingredient: IngredientType.Onion, quantity: 1 },
      { ingredient: IngredientType.Rice, quantity: 1 },
      { ingredient: IngredientType.Lemon, quantity: 1 },
    ],
  },
  {
    name: 'Sandwich de Queso y Pollo',
    ingredients: [
      { ingredient: IngredientType.Chicken, quantity: 1 },
      { ingredient: IngredientType.Cheese, quantity: 2 },
      { ingredient: IngredientType.Lettuce, quantity: 1 },
      { ingredient: IngredientType.Tomato, quantity: 1 },
      { ingredient: IngredientType.Ketchup, quantity: 1 },
    ],
  },
  {
    name: 'Tacos de Carne y Queso',
    ingredients: [
      { ingredient: IngredientType.Meat, quantity: 2 },
      { ingredient: IngredientType.Cheese, quantity: 1 },
      { ingredient: IngredientType.Tomato, quantity: 1 },
      { ingredient: IngredientType.Lettuce, quantity: 1 },
      { ingredient: IngredientType.Onion, quantity: 1 },
    ],
  },
  {
    name: 'Arroz con Pollo',
    ingredients: [
      { ingredient: IngredientType.Chicken, quantity: 2 },
      { ingredient: IngredientType.Rice, quantity: 1 },
      { ingredient: IngredientType.Onion, quantity: 1 },
      { ingredient: IngredientType.Lemon, quantity: 1 },
      { ingredient: IngredientType.Tomato, quantity: 1 },
    ],
  },
];

export interface IRecipeDocument extends IRecipeEntity, Document {}
