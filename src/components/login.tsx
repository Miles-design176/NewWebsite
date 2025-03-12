import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  // Array of funny error messages
  const funnyErrors = [
    "We don't feel like logging you in right now. Try again when we're in a better mood.",
    "Error 418: I'm a teapot. I cannot brew coffee or log you in.",
    "Login attempt rejected: Mercury is in retrograde.",
    "Our authentication hamsters are on strike. Please wait until their demands are met.",
    "Your password looks too much like a password. Be more creative.",
    "The login server is having an existential crisis. Please respect its privacy.",
    "Error: User too awesome for our simple authentication system.",
    "Access denied: Your keyboard isn't RGB enough for this website.",
    "Login failed: You didn't say the magic word.",
    "Authentication service is taking a nap. Please tiptoe away quietly.",
    "Server says: New login, who dis?",
    "Your login attempt has been filed under 'Maybe Later'.",
    "Error 42: The meaning of life is not to be logged in to this website.",
    "Login unsuccessful: Our AI thinks you might be a human."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get a random error message
    const randomError = funnyErrors[Math.floor(Math.random() * funnyErrors.length)];
    setErrorMessage(randomError);
    setShowError(true);
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
            <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
            <p className="text-sm text-slate-500 mt-2">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <div>
                <a href="forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="bg-white hover:bg-slate-50 border border-slate-300 rounded-md p-2 flex justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M9.5 5.5V8.5H13.5V5.5H9.5Z" fill="#4285F4" />
                  <path d="M9.5 11.5V14.5H13.5V11.5H9.5Z" fill="#34A853" />
                  <path d="M16.5 5.5V8.5H13.5V5.5H16.5Z" fill="#EA4335" />
                  <path d="M16.5 11.5V14.5H13.5V11.5H16.5Z" fill="#FBBC05" />
                </svg>
              </button>
              <button className="bg-white hover:bg-slate-50 border border-slate-300 rounded-md p-2 flex justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM12 4.5C14.079 4.5 15.855 5.459 17.033 6.967C16.01 7.771 15.174 8.89 14.697 10.172C13.973 9.731 13.126 9.5 12 9.5C10.874 9.5 10.027 9.731 9.303 10.172C8.826 8.89 7.99 7.771 6.967 6.967C8.145 5.459 9.921 4.5 12 4.5ZM6.5 12C6.5 9.474 8.474 7.5 11 7.5C13.526 7.5 15.5 9.474 15.5 12C15.5 14.526 13.526 16.5 11 16.5C8.474 16.5 6.5 14.526 6.5 12ZM12 19.5C9.921 19.5 8.145 18.541 6.967 17.033C7.99 16.229 8.826 15.11 9.303 13.828C10.027 14.269 10.874 14.5 12 14.5C13.126 14.5 13.973 14.269 14.697 13.828C15.174 15.11 16.01 16.229 17.033 17.033C15.855 18.541 14.079 19.5 12 19.5Z" />
                </svg>
              </button>
              <button className="bg-white hover:bg-slate-50 border border-slate-300 rounded-md p-2 flex justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.879C18.343 21.129 22 16.99 22 12Z" />
                </svg>
              </button>
            </div>
          </div>
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

      {/* Error Dialog */}
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center text-red-500">Login Error</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-center mb-4">{errorMessage}</p>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="text-sm font-mono text-center text-red-500">
                Error Code: {Math.floor(Math.random() * 900) + 100}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => setShowError(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Try Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;