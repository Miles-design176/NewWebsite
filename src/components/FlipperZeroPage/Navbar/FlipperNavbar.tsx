import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Bell, BellOff, Menu } from "lucide-react";

const FlipperNavbar = ({ activePage = "home" }) => {
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
    <div className={discoMode ? 'bg-gradient-to-r from-[#FF8D29]/50 via-[#FF8D29]/70 to-[#FF8D29]/50 transition-all duration-500' : ''}>
      <nav className={`${discoMode ? 'bg-transparent' : 'bg-black'} shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center" onClick={handleLogoClick}>
              <div className="h-8 w-8 bg-[#FF8D29] rounded-full flex items-center justify-center mr-2">
                <span className="text-black font-bold">F</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-blue-500">Best</span>
                <span className="text-[#FF8D29]">Flipper</span>
              </span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className={`${activePage === "home" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Home
                </Link>
                <Link to="/calc" className={`${activePage === "calc" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Mortgage Calculator
                </Link>
                <Link to="/Flipper" className={`${activePage === "projects" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Flipper
                </Link>
                <Link to="/money" className={`${activePage === "money" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Money Visualizer
                </Link>
                <Link to="/recipes" className={`${activePage === "money" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Recipes
                </Link>
                <Link to="/info" className={`${activePage === "info" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Info
                </Link>
                <Link to="/features" className={`${activePage === "features" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Features
                </Link>
                <Link to="/pricing" className={`${activePage === "pricing" ? "border-[#FF8D29] text-[#FF8D29]" : "border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100"} border-b-2 px-1 pt-1 text-sm font-medium ${discoMode ? 'text-white border-white hover:text-white hover:border-white' : ''}`}>
                  Pricing
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button 
                type="button" 
                className={`relative p-1 rounded-full focus:outline-none group transition-colors ${
                  loaded ? (notificationsEnabled ? 'text-[#FF8D29]' : 'text-gray-400 hover:text-gray-300') : 'text-gray-400'
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
                <Link to="/signin" className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${discoMode ? 'text-black bg-white shadow-sm hover:bg-gray-100' : 'text-black bg-[#FF8D29] shadow-sm hover:bg-[#FF8D29]/90'} focus:outline-none transition`}>
                  Sign in
                </Link>
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button 
                type="button" 
                className={`inline-flex items-center justify-center p-2 rounded-md ${discoMode ? 'text-white hover:text-gray-200 hover:bg-white/10' : 'text-gray-300 hover:text-white hover:bg-gray-800'} focus:outline-none`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`sm:hidden ${discoMode ? 'bg-gradient-to-r from-[#FF8D29]/90 via-[#FF8D29]/90 to-[#FF8D29]/90' : 'bg-black'}`} id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/" className={`${activePage === "home" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Home
              </Link>
              <Link to="/calc" className={`${activePage === "calc" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Mortgage Calculator
              </Link>
              <Link to="/Flipper" className={`${activePage === "projects" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Flipper
              </Link>
              <Link to="/money" className={`${activePage === "money" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Money Visualizer
              </Link>
              <Link to="/recipes" className={`${activePage === "features" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Recipes
              </Link>
              <Link to="/info" className={`${activePage === "info" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Info
              </Link>
              <Link to="/features" className={`${activePage === "features" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Features
              </Link>
              <Link to="/pricing" className={`${activePage === "pricing" ? (discoMode ? "bg-white/20 border-l-4 border-white text-white" : "bg-gray-900 border-l-4 border-[#FF8D29] text-[#FF8D29]") : (discoMode ? "border-transparent text-white hover:bg-white/10 hover:border-white hover:text-white" : "border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-300 hover:text-gray-100")} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Pricing
              </Link>
              <div className={`pt-4 pb-3 border-t ${discoMode ? 'border-white/30' : 'border-gray-700'}`}>
                <Link to="/signin" className={`block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md ${discoMode ? 'text-black bg-white shadow-sm hover:bg-gray-100' : 'text-black bg-[#FF8D29] shadow-sm hover:bg-[#FF8D29]/90'}`}>
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

export default FlipperNavbar;