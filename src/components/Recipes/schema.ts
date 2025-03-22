// src/components/Recipes/schema.ts

export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    ingredients: string[];
    instructions: string[];
    nutritionFacts: {
      calories: string;
      protein: string;
      carbs: string;
      fat: string;
    };
  }
  
  export const sampleRecipes: Recipe[] = [
    {
      id: 1,
      title: "Crepes",
      description: "A light and fluffy French pancake, perfect for breakfast or dessert.",
      imageUrl: "/images/Crepes.png",
      category: "France",
      prepTime: 45,
      cookTime: 60,
      servings: 4,
      difficulty: "Easy",
      ingredients: [
        "1 cup Flour",
        "1 tsp Salt",
        "1 tbsp Oil",
        "1 tbsp Sugar",
        "2 cup Milk",
        "3 eggs"
      ],
      instructions: [
        "Heat up pan and oil slightly",
        "Add Milk, Eggs, and Oil into a blender",
        "Blend until consistent colour",
        "Mix Flour, Salt, and Sugar together in a bowl",
        "Slowly add Flour mixture to Blender",
        "Let rest for 45 minutes",
        "Done when both sides are golden brown"
      ],
      nutritionFacts: {
        calories: "1130 kcal",
        protein: "47g",
        carbs: "133g",
        fat: "46g"
      }
    },
    {
      id: 2,
      title: "Cookies",
      description: "A sweet, crunchy cookie with coconut and rice crispies, perfect for a treat.",
      imageUrl: "/images/Rice-Krispie-Cookie.png",
      category: "Family",
      prepTime: 20,
      cookTime: 12,
      servings: 24,
      difficulty: "Easy",
      ingredients: [
        "0.5 cup soft Butter",
        "0.33 cup cooking Oil",
        "0.75 cup White Sugar",
        "1 cup Brown Sugar",
        "2 Eggs",
        "2 tsp Vanialla",
        "1.5 cups Flour",
        "1 tsp Baking Powder",
        "1 tsp Baking Soda",
        "2 cups Rice Crispies",
        "1 cuo Coconut"
      ],
      instructions: [
        "Preheat your oven to 350°F (175°C).",
        "In a large mixing bowl, cream together soft Butter and cooking Oil.",
        "Add White Sugar and Brown Sugar to the mixture. Mix until smooth.",
        "Beat in Eggs and Vanilla extract until fully combined.",
        "In a separate bowl, combine Flour, Baking Powder, and Baking Soda.",
        "Gradually add the dry ingredients to the wet mixture, mixing until just combined.",
        "Stir in Rice Crispies and Coconut.",
        "*Add Choc chips/Cranberries/raisins as desired",
        "Scoop spoonfuls of the dough onto a baking sheet, spacing them apart.",
        "Bake for 10-12 minutes or until golden brown around the edges.",
        "Let cool on the baking sheet for a few minutes before transferring to a wire rack to cool completely.",
        "Enjoy!"
      ],
      nutritionFacts: {
        calories: "3156 kcal",
        protein: "38g",
        carbs: "440g",
        fat: "150g"
      }
    }
  ];