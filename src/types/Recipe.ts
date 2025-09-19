export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface SubRecipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions?: string;
  yield: {
    amount: number;
    unit: string;
  };
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface CookieRecipe {
  id: string;
  name: string;
  photo?: string;
  categoryId: string;
  batchSize: number; // number of cookies this recipe makes
  ingredients: Ingredient[];
  subRecipes: SubRecipe[];
  finalBuild: {
    elements: Array<{
      name: string;
      weight: number;
      unit: string;
      isSubRecipe?: boolean;
    }>;
  };
  instructions: string[];
}

export interface RecipeFormData {
  name: string;
  photo: string;
  categoryId: string;
  batchSize: number;
  ingredients: Ingredient[];
  subRecipes: SubRecipe[];
  finalBuildElements: Array<{
    name: string;
    weight: number;
    unit: string;
    isSubRecipe?: boolean;
  }>;
  instructions: string[];
}