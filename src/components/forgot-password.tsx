import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  
  // List of humorous messages for when users try to reset their password
  const forgotPasswordMessages = [
    "Nah, we don't feel like resetting your password right now.",
    "Have you tried remembering harder?",
    "Password recovery is taking a personal day. Maybe check back next week.",
    "Our password recovery hamster ran away. Good luck!",
    "We forgot how to reset passwords. Ironic, isn't it?",
    "Have you considered that maybe your password doesn't want to be found?",
    "Password reset service is currently on vacation in the Bahamas.",
    "We could tell you your password, but then we'd have to delete our company.",
    "Sorry, the intern who knew how to reset passwords quit yesterday.",
    "Our AI has determined that you probably don't really need that account anyway.",
    "Error 404: Empathy not found.",
    "Maybe the real password was the friends we made along the way.",
    "Our password recovery system is practicing mindfulness today. Please respect its boundaries.",
    "You know what's cooler than recovering your password? Making a new account!",
    "Password recovery machine broke. Understandable, have a nice day.",
    "According to our records, your account doesn't actually exist. Nice try though!",
    "Your request has been forwarded to /dev/null for processing.",
    "We've considered your request to recover your password and we've decided: no.",
    "It's not you, it's us. Actually, it's definitely you.",
    "Your password is protected by unbreakable encryption. Even we can't get to it. Good job!"
  ];

  // Select a random message on component mount and when refreshed
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * forgotPasswordMessages.length);
    setMessage(forgotPasswordMessages[randomIndex]);
  }, []);

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
            <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
            <p className="text-sm text-slate-500 mt-2">We're here to (not) help</p>
          </div>

          <div className="p-6 bg-orange-50 rounded-lg mb-6">
            <p className="text-center text-lg font-medium text-orange-600">
              {message}
            </p>
          </div>

          <div className="mb-8 text-center text-slate-600">
            <p>Try refreshing this page for a different response!</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Try Again (It Won't Help)
            </Button>
            
            <Link to="/signin">
              <Button
                variant="outline"
                className="w-full border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
              >
                Back to Sign In
              </Button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex space-x-4 justify-center">
              <Link to="/signup" className="text-blue-500 hover:text-blue-700 text-sm">
                Create a new account
              </Link>
              <span className="text-slate-300">|</span>
              <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
                Contact support
              </a>
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
    </div>
  );
};

export default ForgotPassword;