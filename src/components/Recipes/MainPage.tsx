import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { Recipe, sampleRecipes } from './schema';
import Navbar from '../NavBar/navbar';

const MainPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Use sample recipes directly without React Query
  const recipes = sampleRecipes;
  
  // Filter recipes by category
  const filteredRecipes = activeCategory === 'all'
    ? recipes
    : recipes.filter(recipe => recipe.category.toLowerCase() === activeCategory.toLowerCase());

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(recipes.map(recipe => recipe.category)))];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar activePage="recipes" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Delicious Recipe Collection</h1>
          <p className="text-slate-600 mt-2">Discover your next favorite meal with our collection of tasty recipes</p>
          
          <div className="mt-4 flex flex-wrap gap-4">
            {categories.map((category) => (
              <CategoryButton 
                key={category}
                category={category}
                activeCategory={activeCategory}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>

        {filteredRecipes && filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600">No recipes found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// CategoryButton component embedded in the same file
interface CategoryButtonProps {
  category: string;
  activeCategory: string;
  onClick: (category: string) => void;
}

const CategoryButton = ({ category, activeCategory, onClick }: CategoryButtonProps) => {
  const isActive = category.toLowerCase() === activeCategory.toLowerCase();
  const displayName = category === 'all' ? 'All Recipes' : category;
  
  return (
    <button
      onClick={() => onClick(category)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        isActive 
          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
      }`}
    >
      {displayName}
    </button>
  );
};

// RecipeCard component embedded in the same file
interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Link to={`/recipes/${recipe.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer h-full flex flex-col">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-slate-800">{recipe.title}</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {recipe.category}
            </span>
          </div>
          <p className="text-slate-600 text-sm mt-2 flex-grow">{recipe.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-slate-400" />
              <span className="text-sm text-slate-500 ml-1">{totalTime} mins</span>
            </div>
            <div className="flex items-center">
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MainPage;