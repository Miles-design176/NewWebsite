import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Lightbulb } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import Navbar from '../NavBar/navbar';
import { sampleRecipes } from "./schema";

// Recipe type definition


// RecipeContext with proper type definitions
interface RecipeContextType {
  toggleIngredient: (recipeId: number, ingredient: string) => void;
  isIngredientChecked: (recipeId: number, ingredient: string) => boolean;
}

// Create context with default value
const RecipeContext = React.createContext<RecipeContextType>({
  toggleIngredient: () => {},
  isIngredientChecked: () => false
});



// Provider component with proper type definitions
export function RecipeProvider({ children }: { children: ReactNode }) {
  type CheckedIngredientsMap = Record<number, Record<string, boolean>>;
  const [checkedIngredients, setCheckedIngredients] = React.useState<CheckedIngredientsMap>({});

  const toggleIngredient = (recipeId: number, ingredient: string) => {
    setCheckedIngredients(prev => {
      const recipeIngredients = prev[recipeId] || {};
      return {
        ...prev,
        [recipeId]: {
          ...recipeIngredients,
          [ingredient]: !recipeIngredients[ingredient]
        }
      };
    });
  };

  const isIngredientChecked = (recipeId: number, ingredient: string): boolean => {
    return !!checkedIngredients[recipeId]?.[ingredient];
  };

  return (
    <RecipeContext.Provider value={{ toggleIngredient, isIngredientChecked }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  return React.useContext(RecipeContext);
}

// The actual recipe detail component
const RecipeDetail = () => {
  // Get ID directly from URL
  const path = window.location.pathname;
  const idFromPath = path.split('/').pop();
  const recipeId = parseInt(idFromPath || '0', 10);
  
  console.log("Path:", path);
  console.log("ID from path:", idFromPath);
  console.log("Parsed Recipe ID:", recipeId);
  
  // Find the recipe - or default to first recipe (for debugging)
  const recipe = sampleRecipes.find(r => r.id === recipeId);
  console.log("Found Recipe:", recipe);
  
  const { toggleIngredient, isIngredientChecked } = useRecipe();
  const [multiplier, setMultiplier] = useState(1);
  const scaleRecipe = (factor: number) => {
    setMultiplier(factor);
  };  

  const handleIngredientToggle = (ingredient: string) => {
    if (recipe) {
      toggleIngredient(recipe.id, ingredient);
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar activePage="recipes" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/recipes" className="flex items-center text-blue-500 hover:text-blue-700 mb-6 transition">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to recipes
          </Link>
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Recipe not found</p>
            <p>The recipe you're looking for might have been removed or doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activePage="recipes" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/recipes" className="flex items-center text-blue-500 hover:text-blue-700 mb-6 transition">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to recipes
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full object-cover h-[400px] md:h-[400px]"
          />
          
          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-slate-800">{recipe.title}</h1>
                </div>
                <p className="text-slate-600 mt-2">{recipe.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-full">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600 ml-1">Prep: {recipe.prepTime} mins</span>
                </div>
                <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-full">
                  <Users className="h-5 w-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600 ml-1">Serves: {recipe.servings * multiplier}</span>
                </div>
                <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-full">
                  <Lightbulb className="h-5 w-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600 ml-1">Difficulty: {recipe.difficulty}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-6">
              <button 
                className={`px-4 py-2 rounded-full ${multiplier === 1 ? 'bg-blue-600 text-white' : 'bg-white border'}`} 
                onClick={() => scaleRecipe(1)}
              >
                Original
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${multiplier === 2 ? 'bg-blue-600 text-white' : 'bg-white border'}`} 
                onClick={() => scaleRecipe(2)}
              >
                Double
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${multiplier === 3 ? 'bg-blue-600 text-white' : 'bg-white border'}`} 
                onClick={() => scaleRecipe(3)}
              >
                Triple
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ingredients Column */}
              <div className="md:col-span-1">
                <div className="bg-blue-50 rounded-lg p-5">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">Ingredients</h2>
                  <div className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start">
                        <input 
                          type="checkbox" 
                          id={`ingredient-${index}`}
                          checked={isIngredientChecked(recipe.id, ingredient)}
                          onChange={() => handleIngredientToggle(ingredient)}
                          className="mt-1 h-4 w-4 text-blue-500 rounded border-slate-300 focus:ring-blue-500" 
                        />
                        <label 
                          htmlFor={`ingredient-${index}`}
                          className={`ml-2 text-slate-700 ${isIngredientChecked(recipe.id, ingredient) ? 'line-through text-slate-400' : ''}`}
                        >
                        {ingredient.replace(/(\d+(\.\d+)?)/g, (match) => {
                          let scaledValue: number;

                          // If it's a decimal or whole number
                          if (match.includes('.')) {
                            scaledValue = parseFloat((parseFloat(match) * multiplier).toFixed(2));
                          } else {
                            // For whole numbers, scale them directly
                            scaledValue = parseInt(match) * multiplier;
                          }
                          if (scaledValue >= 0.99 && scaledValue < 1.01) {
                            return '1 cup';
                          }
                          // If scaled value is 0.99 or very close to 1, return '1 cup'
                          if (Math.abs(scaledValue - 1) < 0.01) {
                            return '1 cup';
                          }
                          if (scaledValue >= 0.99 && scaledValue < 1.01) {
                            return '1 cup';
                          }
                          // If scaled value is a whole number, just return the number
                          if (scaledValue % 1 === 0) {
                            return `${scaledValue} cup`;
                          }

                          // Convert decimal to fraction if needed
                          let [integerPart, decimalPart] = scaledValue.toString().split('.');
                          let denominator = Math.pow(10, decimalPart.length);
                          let numerator = parseInt(decimalPart);

                          // Simplify the fraction using GCD
                          let gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
                          let commonDivisor = gcd(numerator, denominator);
                          numerator /= commonDivisor;
                          denominator /= commonDivisor;

                          // Handle common approximations directly
                          if (Math.abs(scaledValue - 0.33) < 0.01) {
                            return `1/3`; // Closest fraction to 0.33
                          } else if (Math.abs(scaledValue - 0.5) < 0.01) {
                            return `1/2`; // Closest fraction to 0.5
                          } else if (Math.abs(scaledValue - 0.25) < 0.01) {
                            return `1/4`; // Closest fraction to 0.25
                          } else if (Math.abs(scaledValue - 0.75) < 0.01) {
                            return `3/4`; // Closest fraction to 0.75
                          } else if (Math.abs(scaledValue - 0.66) < 0.01) {
                            return `2/3`; // Closest fraction to 0.66
                          } else {
                            // Return the fraction as a mixed fraction if needed
                            if (integerPart === '0') {
                              return `${numerator}/${denominator}`; // Fraction without integer part
                            } else {
                              return `${integerPart} ${numerator}/${denominator}`; // Mixed fraction
                            }
                          }
                        })}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 border-t border-blue-100 pt-5">
                    <h3 className="text-lg font-medium text-slate-800 mb-3">Nutritional Facts</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(recipe.nutritionFacts).map(([key, value]) => (
                        <div key={key} className="bg-white p-2 rounded">
                          <p className="text-xs text-slate-500 capitalize">{key}</p>
                          <p className="font-semibold text-slate-700">
                            {parseInt((parseFloat(value) * multiplier).toFixed(0))} 
                            {value.includes("kcal") ? " kcal" : ""}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instructions Column */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Instructions</h2>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium text-sm">
                        {index + 1}
                      </div>
                      <p className="ml-4 text-slate-700">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper with Provider
const RecipeDetailWithProvider = () => {
  return (
    <RecipeProvider>
      <RecipeDetail />
    </RecipeProvider>
  );
};

export default RecipeDetailWithProvider;