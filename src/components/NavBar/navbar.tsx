import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Bell, BellOff, Menu } from "lucide-react";

const Navbar = ({ activePage = "home" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [discoMode, setDiscoMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [bellAnimating, setBellAnimating] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("notificationsEnabled");
    if (storedPreference !== null) {
      setNotificationsEnabled(storedPreference === "true");
    }
    setTimeout(() => setLoaded(true), 25); // Ensure UI updates before applying transitions
  }, []);

  // Logo easter egg
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount >= 5) {
      setDiscoMode(true);
      setTimeout(() => {
        setDiscoMode(false);
        setLogoClickCount(0);
      }, 3000);
    }
  };

  
  const toggleNotifications = () => {
    setBellAnimating(true);
    setTimeout(() => {
      setNotificationsEnabled((prev) => {
        const newValue = !prev;
        localStorage.setItem("notificationsEnabled", newValue.toString());
        return newValue;
      });
      setBellAnimating(false);
    }, 300);
  };

  return (
    <div className={discoMode ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-500' : ''}>
      <nav className={`${discoMode ? 'bg-transparent' : 'bg-white'} shadow-sm sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center" onClick={handleLogoClick}>
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-xl font-bold text-blue-500">bestwebsite<span className="text-orange-500">.ca</span></span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className={`${activePage === "home" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Home
                </Link>
                <Link to="/calc" className={`${activePage === "calc" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Mortgage Calculator
                </Link>
                <Link to="/flipper"   className={`${activePage === "" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-orange-500 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Flipper
                </Link>
                <Link to="/money" className={`${activePage === "money" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Money Visualize
                </Link>
                <Link to="/recipes" className={`${activePage === "recipes" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Recipes
                </Link>
                <Link to="/info" className={`${activePage === "info" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Info
                </Link>
                <Link to="/features" className={`${activePage === "features" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Features
                </Link>
                <Link to="/pricing" className={`${activePage === "pricing" ? "border-blue-500 text-blue-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Pricing
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button 
              type="button" 
              className={`relative p-1 rounded-full focus:outline-none group transition-colors ${
                loaded ? (notificationsEnabled ? 'text-blue-500' : 'text-slate-400 hover:text-slate-500') : 'text-slate-400'
              } ${bellAnimating ? 'animate-bell-shake' : ''} ${discoMode ? 'text-white' : ''}`}
              onClick={toggleNotifications}
            >
              <span className="sr-only">
                {notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
              </span>
              <div className="relative">
                {notificationsEnabled ? 
                  <Bell className={`h-6 w-6 transition-transform duration-300 ${bellAnimating ? 'scale-0' : 'scale-100'}`} /> : 
                  <BellOff className={`h-6 w-6 transition-transform duration-300 ${bellAnimating ? 'scale-0' : 'scale-100'}`} />
                }
                {notificationsEnabled && 
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform -translate-y-1/2 translate-x-1/2"></span>
                }
              </div>
            </button>
              <div className="ml-3 relative">
                <Link to="/signin" className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${discoMode ? 'text-orange-500 bg-white shadow-sm hover:bg-slate-100' : 'text-white bg-orange-500 shadow-sm hover:bg-orange-500/90'} focus:outline-none transition`}>
                  Sign in
                </Link>
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button 
                type="button" 
                className={`inline-flex items-center justify-center p-2 rounded-md ${discoMode ? 'text-white hover:text-slate-200 hover:bg-white/10' : 'text-slate-400 hover:text-slate-500 hover:bg-slate-100'} focus:outline-none`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`sm:hidden ${discoMode ? 'bg-gradient-to-r from-purple-500/90 via-pink-500/90 to-red-500/90' : 'bg-white'}`} id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/" className={`${activePage === "home" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Home
              </Link>
              <Link to="/calc" className={`${activePage === "calc" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Mortgage Calculator
              </Link>
              <Link to="/flipper" className={`${activePage === "flipper" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Flipper
              </Link>
              <Link to="/money" className={`${activePage === "money" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Money Visualize
              </Link>
              <Link to="/recipes" className={`${activePage === "money" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Recipes
              </Link>
              <Link to="/info" className={`${activePage === "info" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Info
              </Link>
              <Link to="/features" className={`${activePage === "features" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Features
              </Link>
              <Link to="/pricing" className={`${activePage === "pricing" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Pricing
              </Link>
              <div className={`pt-4 pb-3 border-t ${discoMode ? 'border-white/30' : 'border-slate-200'}`}>
                <Link to="/signin" className={`block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md ${discoMode ? 'text-orange-500 bg-white shadow-sm hover:bg-slate-100' : 'text-white bg-orange-500 shadow-sm hover:bg-orange-500/90'}`}>
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;