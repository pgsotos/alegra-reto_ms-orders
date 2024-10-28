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

export interface IRecipeEntity {
  name: string;
  ingredients: IngredientType[];
}

export const recipes: IRecipeEntity[] = [
  {
    name: 'Ensalada Mixta',
    ingredients: [
      IngredientType.Tomato,
      IngredientType.Lettuce,
      IngredientType.Onion,
      IngredientType.Lemon,
      IngredientType.Cheese,
    ],
  },
  {
    name: 'Pollo con Papas y Ketchup',
    ingredients: [
      IngredientType.Chicken,
      IngredientType.Potato,
      IngredientType.Ketchup,
      IngredientType.Onion,
      IngredientType.Lemon,
    ],
  },
  {
    name: 'Sopa de Verduras con Arroz',
    ingredients: [
      IngredientType.Potato,
      IngredientType.Tomato,
      IngredientType.Onion,
      IngredientType.Rice,
      IngredientType.Lemon,
    ],
  },
  {
    name: 'Sandwich de Queso y Pollo',
    ingredients: [
      IngredientType.Chicken,
      IngredientType.Cheese,
      IngredientType.Lettuce,
      IngredientType.Tomato,
      IngredientType.Ketchup,
    ],
  },
  {
    name: 'Tacos de Carne y Queso',
    ingredients: [
      IngredientType.Meat,
      IngredientType.Cheese,
      IngredientType.Tomato,
      IngredientType.Lettuce,
      IngredientType.Onion,
    ],
  },
  {
    name: 'Arroz con Pollo',
    ingredients: [
      IngredientType.Chicken,
      IngredientType.Rice,
      IngredientType.Onion,
      IngredientType.Lemon,
      IngredientType.Tomato,
    ],
  },
];

export interface IRecipeDocument extends IRecipeEntity, Document {}
