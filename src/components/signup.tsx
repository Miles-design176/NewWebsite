import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Signup = () => {
  const [formStep, setFormStep] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [extraFields, setExtraFields] = useState<Record<string, string>>({});
  
  // List of progressively more ridiculous form fields to add
  const additionalRequirements = [
    { 
      field: { 
        name: "favoriteColor", 
        label: "Favorite Color", 
        type: "text",
        placeholder: "For security questions, of course",
      }
    },
    { 
      field: { 
        name: "petName", 
        label: "Name of Your First Pet", 
        type: "text",
        placeholder: "We need this for... reasons",
      }
    },
    { 
      field: { 
        name: "favoriteCereal", 
        label: "Favorite Breakfast Cereal", 
        type: "text",
        placeholder: "This is crucial information",
      }
    },
    { 
      field: { 
        name: "childhoodStreet", 
        label: "Street You Grew Up On", 
        type: "text",
        placeholder: "Definitely not for security questions",
      }
    },
    { 
      field: { 
        name: "mothersMaidenName", 
        label: "Mother's Maiden Name", 
        type: "text",
        placeholder: "For verification purposes only",
      }
    },
    { 
      field: { 
        name: "wouldYouRatherFight", 
        label: "Would You Rather Fight", 
        type: "select",
        options: [
          "100 duck-sized horses",
          "1 horse-sized duck",
          "I refuse to participate in hypothetical animal combat"
        ],
        placeholder: "Choose wisely",
      }
    },
    { 
      field: { 
        name: "firstSchoolName", 
        label: "Name of First School", 
        type: "text",
        placeholder: "Educational history is important to us",
      }
    },
    { 
      field: { 
        name: "timeTravel", 
        label: "If You Could Time Travel, When Would You Go?", 
        type: "text",
        placeholder: "YYYY-MM-DD format preferred",
      }
    },
    { 
      field: { 
        name: "pizzaTopping", 
        label: "Opinion on Pineapple on Pizza", 
        type: "radio",
        options: ["Delicious", "Abomination", "No comment"],
      }
    },
    { 
      field: { 
        name: "captcha", 
        label: "Please Solve This Math Problem", 
        type: "text",
        placeholder: "What is 9 + 10?",
      }
    }
  ];

  // Password requirements that get added with each step
  const passwordRequirements = [
    "Password must contain at least one uppercase letter, one number, and one special character",
    "Password must also include a Roman numeral",
    "Password must also include an emoji",
    "Password must also include your favorite prime number",
    "Password must also include a haiku about cybersecurity",
    "Password must also include the coordinates of your favorite star",
    "Password must also include a musical note",
    "Password must also include a palindrome",
    "Password must also include the third letter of your favorite movie",
    "Password must also include a chess notation",
    "Password must also include a chemical element symbol",
    "Password must also include a programming language name",
    "Password must also include a Shakespearean quote",
    "Password must also include a food emoji",
    "Password must also include a math formula"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < additionalRequirements.length) {
      setFormStep(formStep + 1);
    } else {
      // Reset to make them start over
      setFormStep(0);
      setPassword("");
      setExtraFields({});
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (formStep < additionalRequirements.length) {
        setFormStep(formStep + 1);
      }
    }
  };

  const handleExtraFieldChange = (fieldName: string, value: string) => {
    setExtraFields({
      ...extraFields,
      [fieldName]: value
    });
  };

  const renderExtraField = (field: any) => {
    const value = extraFields[field.name] || "";
    
    if (field.type === "select") {
      return (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1">
            {field.label}
          </label>
          <select
            id={field.name}
            value={value}
            onChange={(e) => handleExtraFieldChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onKeyDown={handleKeyDown}
          >
            <option value="">Select an option</option>
            {field.options.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    } else if (field.type === "radio") {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {field.label}
          </label>
          <div className="space-y-2">
            {field.options.map((option: string) => (
              <div key={option} className="flex items-center">
                <input
                  id={`${field.name}-${option}`}
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleExtraFieldChange(field.name, e.target.value)}
                  className="h-4 w-4 text-blue-500 border-slate-300"
                  onKeyDown={handleKeyDown}
                />
                <label htmlFor={`${field.name}-${option}`} className="ml-2 text-sm text-slate-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1">
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            value={value}
            onChange={(e) => handleExtraFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onKeyDown={handleKeyDown}
          />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold text-blue-500">bestwebsite<span className="text-orange-500">.ca</span></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
            <p className="text-sm text-slate-500 mt-2">Join the best website in Canada!</p>
            {formStep > 0 && (
              <div className="mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Step {formStep + 1} of ???
                </span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                placeholder="Pick a username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birthday" className="block text-sm font-medium text-slate-700 mb-1">
                Birthday
              </label>
              <input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                placeholder="Choose a strong password"
              />
              
              {/* Password requirements that increase with each step */}
              <div className="mt-2 space-y-1">
                {passwordRequirements.slice(0, formStep + 1).map((requirement, i) => (
                  <p key={i} className="text-xs text-red-500">
                    * {requirement}
                  </p>
                ))}
              </div>
            </div>

            {/* Render additional fields based on form step */}
            {formStep > 0 && additionalRequirements.slice(0, formStep).map(req => renderExtraField(req.field))}

            <div className="mt-6">
              <Button
                type="button"
                onClick={() => setFormStep(formStep + 1)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Continue
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-500 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {formStep > 7 && (
            <div className="mt-4 text-center">
              <p className="text-xs text-red-500 italic">
                Note: Our security team highly advises that you write down your password as you'll need to include all of these requirements when logging in.
              </p>
            </div>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} bestwebsite.ca. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;