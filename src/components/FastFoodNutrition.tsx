import React, { useState } from 'react';

type MealKey = "bigmacmeal" | "whoppermeal" | "McNuggetMeal" | "kfcChickenSandwhichCombo";

const meals: Record<MealKey, { 
  name: string;
  calories: number;
  protein: number;
  totalCarbs: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  dietaryFiber: number;
  totalSugars: number;
  calcium: number;
  potassium: number;
  sodium: number;
  description: string;
  image: string; // ✅ Added image property
}> = {
  bigmacmeal: {
    name: "Big Mac Combo Meal",
    calories: 1110,
    protein: 30,
    totalCarbs: 144,
    totalFat: 49,
    saturatedFat: 13,
    transFat: 1,
    cholesterol: 85,
    dietaryFiber: 7,
    totalSugars: 61,
    calcium: 137,
    potassium: 1030,
    sodium: 1375,
    description: "10 Minutes After Eating a Big Mac Meal – Your brain releases dopamine, similar to how it reacts to cocaine, making fast food highly addictive.",
    image: "https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202307_8936_EVM_M_BigMac_Coke_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off" // ✅ Set image path
  },
  whoppermeal: {
    name: "Whopper Combo Meal",
    calories: 1210,
    protein: 33,
    totalCarbs: 135,
    totalFat: 58,
    saturatedFat: 16,
    transFat: 1.5,
    cholesterol: 95,
    dietaryFiber: 8,
    totalSugars: 72,
    calcium: 150,
    potassium: 1050,
    sodium: 1490,
    description: "A Whopper combo can take over 6 hours to digest, clog arteries with trans fats, and spike blood sugar like drinking a can of syrup.",
    image: "https://burgerkingks.com/wp-content/uploads/2020/08/new-whopper-meal-ks-web-offer-v.png"
  },
  McNuggetMeal: {
    name: "10 Piece McNugget Meal",
    calories: 940,
    protein: 28,
    totalCarbs: 125,
    totalFat: 39,
    saturatedFat: 6,
    transFat: 0,
    cholesterol: 65,
    dietaryFiber: 4,
    totalSugars: 56,
    calcium: 32,
    potassium: 1020,
    sodium: 1165,
    description: "McNuggets are only about 50% chicken! The rest? A blend of fillers, preservations, and emulsifiers like Dimethylpolysiloxane (used in SILLY PUTTY and industrial lubricants ). TBHQ (tertiary butylhydroquinone), a chemical linked to cancer, liver damage, and vision issues if consumed in high amounts.",
    image: "https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202201_8946_EVM_M_10McNuggets_Coke_Glass_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off"
  },
  kfcChickenSandwhichCombo: {
    name: "KFC Chicken Sandwich Combo",
    calories: 522,  
    protein: 26, 
    totalCarbs: 47,  
    totalFat: 26,  
    saturatedFat: 3.6,  
    transFat: 0.3,  
    cholesterol: 58,  
    dietaryFiber: 3,  
    totalSugars: 77,  
    calcium: 6,  
    potassium: 0, 
    sodium: 996,  
    description: "The sugars from the combo (sandwich + drink) lead to a sugar crash, making you feel hungry again despite consuming over 1,200 calories! Your pancreas is overproducing insulin, raising your risk of type 2 diabetes over time.",
    image: "https://images.ctfassets.net/a2mgcrjjefyo/4xttImmwnFeXZ2K3zJM7rv/0116cf60708875ad69b8efda96c69401/Sandwich_FCCS_combo_9122_Regular_1600x1600.png"
  }
};

const FastFoodNutrition = () => {
  const [activeTab, setActiveTab] = useState('nutrition');
  const [selectedMeal, setSelectedMeal] = useState<MealKey>("bigmacmeal");

  const currentMeal = meals[selectedMeal]; // ✅ TypeScript now understands the type

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Fast Food Nutrition Facts</h1>
          <p className="text-lg mt-2">Understanding what's in your meal</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto flex">
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'nutrition' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition Data
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'health' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('health')}
          >
            Health Effects
          </button>
          <button 
            className={`px-4 py-3 font-medium ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 bg-white mt-4 shadow-md rounded-lg">
        {activeTab === 'nutrition' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Select a Fast Food Meal</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MealSelector 
                  name="Big Mac Combo" 
                  id="bigmacmeal" 
                  selected={selectedMeal === 'bigmacmeal'} 
                  onClick={() => setSelectedMeal('bigmacmeal')} 
                />
                <MealSelector 
                  name="Whopper Combo" 
                  id="whoppermeal" 
                  selected={selectedMeal === 'whoppermeal'} 
                  onClick={() => setSelectedMeal('whoppermeal')} 
                />
                <MealSelector 
                  name=" McNugget Meal" 
                  id="McNuggetMeal" 
                  selected={selectedMeal === 'McNuggetMeal'} 
                  onClick={() => setSelectedMeal('McNuggetMeal')} 
                />
                <MealSelector 
                  name="KFC Chicken Sandwich Combo" 
                  id="kfcChickenSandwhichCombo" 
                  selected={selectedMeal === 'kfcChickenSandwhichCombo'} 
                  onClick={() => setSelectedMeal('kfcChickenSandwhichCombo')} 
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">{currentMeal.name}</h2>
                <img 
                  src={currentMeal.image} 
                  alt={currentMeal.name} 
                  className="w-full rounded-lg shadow-md mb-4"
                />
                <div className="bg-blue-100 p-4 rounded-lg mb-4">
                  <p className="text-lg font-bold text-blue-800">Total Calories: {currentMeal.calories}</p>
                  <p className="text-sm text-blue-700">
                    {currentMeal.calories > 1000 ? 
                      "This meal contains over half the daily recommended calorie intake for an average adult." :
                      "This meal contains a significant portion of your daily recommended calorie intake."}
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2 p-4">
                <h3 className="text-xl font-bold mb-4">Nutritional Values</h3>
                <div className="space-y-2">
                  <NutrientBar name="Protein" value={currentMeal.protein} unit="g" max={56} color="bg-green-500" />
                  <NutrientBar name="Total Carbs" value={currentMeal.totalCarbs} unit="g" max={275} color="bg-amber-500" />
                  <NutrientBar name="Total Fat" value={currentMeal.totalFat} unit="g" max={78} color="bg-red-500" />
                  <NutrientBar name="Saturated Fat" value={currentMeal.saturatedFat} unit="g" max={20} color="bg-red-600" />
                  <NutrientBar name="Trans Fat" value={currentMeal.transFat} unit="g" max={2} color="bg-red-800" />
                  <NutrientBar name="Cholesterol" value={currentMeal.cholesterol} unit="mg" max={300} color="bg-orange-500" />
                  <NutrientBar name="Dietary Fiber" value={currentMeal.dietaryFiber} unit="g" max={28} color="bg-green-600" />
                  <NutrientBar name="Total Sugars" value={currentMeal.totalSugars} unit="g" max={50} color="bg-red-500" />
                  <NutrientBar name="Calcium" value={currentMeal.calcium} unit="mg" max={1000} color="bg-blue-500" />
                  <NutrientBar name="Potassium" value={currentMeal.potassium} unit="mg" max={3500} color="bg-green-500" />
                  <NutrientBar name="Sodium" value={currentMeal.sodium} unit="mg" max={2300} color="bg-red-500" />
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  *Based on a 2,000 calorie daily diet. Percent Daily Values may vary based on individual needs.
                </p>
              </div>
            </div>
            
            <div className="p-4 mt-4 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-800">Did You Know?</h3>
              <p className="text-yellow-800">
                {currentMeal.description}
              </p>
            </div>

            <div className="p-4 mt-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Meal Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border text-left">Meal</th>
                      <th className="p-2 border text-center">Calories</th>
                      <th className="p-2 border text-center">Protein</th>
                      <th className="p-2 border text-center">Fat</th>
                      <th className="p-2 border text-center">Carbs</th>
                      <th className="p-2 border text-center">Sodium</th>
                      <th className="p-2 border text-center">Sugar</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Object.entries(meals).map(([id, meal]) => {
                    const mealId = id as MealKey; // ✅ Tell TypeScript that id is a MealKey

                    return (
                      <tr 
                        key={mealId} 
                        className={selectedMeal === mealId ? "bg-blue-50" : ""}
                        onClick={() => setSelectedMeal(mealId)} // ✅ No more TypeScript error
                        style={{ cursor: "pointer" }}
                      >
                        <td className="p-2 border font-medium">{meal.name}</td>
                        <td className="p-2 border text-center">{meal.calories}</td>
                        <td className="p-2 border text-center">{meal.protein}g</td>
                        <td className="p-2 border text-center">{meal.totalFat}g</td>
                        <td className="p-2 border text-center">{meal.totalCarbs}g</td>
                        <td className="p-2 border text-center">{meal.sodium}mg</td>
                        <td className="p-2 border text-center">{meal.totalSugars}g</td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Health Effects of Fast Food</h2>
            
            <HealthEffect 
              title="Weight Gain"
              description="Fast food is convenient and cheap, but later on you pay the price. The burgers, fries, and shakes usually have more fats, calories, and highly processed carbs than your body needs in one meal. This can quickly lead to weight gain and obesity."
              icon="⚖️"
              color="bg-red-50"
            />
            
            <HealthEffect 
              title="Heart Damage"
              description="Sodium makes fast food taste better and keeps it from spoiling, but a bacon cheeseburger can contain your recommended daily value for sodium. That's the number of nutrient experts suggest getting every day. Too much sodium raises your blood pressure and damages your blood vessels. It also raises the risk for heart failure, heart attack, and stroke."
              icon="❤️"
              color="bg-pink-50"
            />
            
            <HealthEffect 
              title="Blood Sugar Spikes"
              description="Bagels, buns, and breaded foods are high in processed carbs your body breaks down into sugar. As blood sugar rises, your body pumps out insulin to level things out. Over time, these constant sugar spikes can wear out your pancreas. This keeps blood sugar levels high, triggering type 2 diabetes."
              icon="📈"
              color="bg-amber-50"
            />
            
            <HealthEffect 
              title="Digestive Issues"
              description="Fast food may taste good, but you may not feel well once it hits your system. High-sodium foods can temporarily trigger bloat. Couple that with low amounts of dietary fiber, and your digestive tract gets backed up. This can lead to constipation that puts you at risk for hemorrhoids."
              icon="🚽"
              color="bg-blue-50"
            />
            
            <HealthEffect 
              title="Skin Outbreaks"
              description="Fast food is full of ingredients that don't play well with your skin. Sugar can lower collagen (the most abundant protein in the body) and lead to signs of early aging, like wrinkles. Salt drains moisture from your skin but helps your body keep the water that causes bags under your eyes. High amounts of saturated fats trigger hormones that play a role in acne."
              icon="🧴"
              color="bg-purple-50"
            />
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="mb-4">
                Fast food tends to be high in salt, sugar, saturated fats, trans fats, calories, and processed preservatives and ingredients. 
                A list of well-conducted research has proven the negative health effects of consuming too much of these food components.
              </p>
              <p className="mb-4">
                In the short term, fast food impacts blood sugar and blood pressure, increases inflammation, and may mean an individual does not eat 
                enough necessary nutrients. In the long term, a diet rich in fast food could lead to issues with digestion, immunity, inflammation, 
                heart health, obesity, and more.
              </p>
              <p>
                Not all fast food is bad, however. Certain menu items might be lower in these substances than others, while some fast food outlets 
                might focus on providing more healthy options.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3">Making Healthier Choices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800">Better Options</h4>
                  <ul className="list-disc pl-5 text-green-800">
                    <li>Grilled items instead of fried</li>
                    <li>Side salad instead of fries</li>
                    <li>Water or unsweetened tea instead of soda</li>
                    <li>Items with vegetables</li>
                    <li>Smaller portion sizes</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-red-800">Options to Limit</h4>
                  <ul className="list-disc pl-5 text-red-800">
                    <li>Deep-fried foods</li>
                    <li>Sugary drinks</li>
                    <li>Large combo meals</li>
                    <li>Items with "special sauce" (usually high in fat)</li>
                    <li>Desserts and milkshakes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto p-4 text-center text-gray-600 text-sm mt-4">
        <p>This information is provided for educational purposes only. Consult a healthcare professional for personal dietary advice.</p>
      </footer>
    </div>
  );
};

interface NutrientBarProps {
  name: string;
  value: number;
  unit: string;
  max: number;
  color: string;
}

const NutrientBar: React.FC<NutrientBarProps> = ({ name, value, unit, max, color }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm">{value}{unit} / {max}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

interface HealthEffectProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const HealthEffect: React.FC<HealthEffectProps> = ({ title, description, icon, color }) => {
  return (
    <div className={`${color} p-4 rounded-lg shadow-sm border border-opacity-50`}>
      <div className="flex items-start">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

interface MealSelectorProps {
  name: string;
  id: MealKey;
  selected: boolean;
  onClick: () => void;
}

const MealSelector: React.FC<MealSelectorProps> = ({ name, id, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg text-center ${selected ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
    >
      {name}
    </button>
  );
};


export default FastFoodNutrition;