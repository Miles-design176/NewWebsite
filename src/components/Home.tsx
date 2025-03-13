import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import {
  Bolt,
  LockKeyhole,
  MessageSquare,
  Code,
  Bell,
  Menu,
  Star,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Github,
  Twitter,
  Instagram,
  Facebook
} from "lucide-react";

// Array of jokes to display in the joke generator
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  "Why was the website cold? It left its domain open!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Why did the web developer always go to the bar by himself? Because he couldn't resolve his dependencies.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "Why was the function sad after a party? It didn't get any calls."
];

// Feature items for the features section
const features = [
  {
    icon: <Bolt className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "So fast that if our website were a joke, you wouldn't even have time to laugh. Which might explain why no one's laughing."
  },
  {
    icon: <LockKeyhole className="h-6 w-6" />,
    title: "Super Secure",
    description: "Our security is so tight, even our developers can't figure out how to log in sometimes. That's commitment!"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Actually Funny",
    description: "We hired real comedians to write our error messages. 404 pages have never been this entertaining!"
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "100% Real Code",
    description: "Our website is made with genuine, artisanal code. No artificial algorithms or synthetic functions."
  }
];

// Testimonials for the testimonials section
const testimonials = [
  {
    text: "I've visited a lot of websites in my time, but this is definitely one of them.",
    name: "John Smith",
    title: "Web Enthusiast",
    initials: "JS"
  },
  {
    text: "This website actually made me laugh out loud. My cat looked at me weird.",
    name: "Sarah Johnson",
    title: "Cat Owner",
    initials: "SJ"
  },
  {
    text: "I pressed some keys and suddenly confetti appeared. 10/10 would press random keys again.",
    name: "Mike Brown",
    title: "Keyboard Enthusiast",
    initials: "MB"
  }
];

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [jokeTransition, setJokeTransition] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [discoMode, setDiscoMode] = useState(false);
  
  // Konami code implementation
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [konamiIndex, setKonamiIndex] = useState(0);
  
  // Keyboard event listener for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key ? e.key.toLowerCase() : '';
      const requiredKey = konamiCode[konamiIndex] ? konamiCode[konamiIndex].toLowerCase() : '';
      
      if (key === requiredKey) {
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);
        
        if (nextIndex === konamiCode.length) {
          // Konami code completed
          setEasterEggOpen(true);
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);
  
  // Generate a random joke
  const generateJoke = () => {
    setJokeTransition(true);
    setTimeout(() => {
      let newJoke = currentJoke;
      while (newJoke === currentJoke) {
        newJoke = jokes[Math.floor(Math.random() * jokes.length)];
      }
      setCurrentJoke(newJoke);
      setJokeTransition(false);
    }, 300);
  };
  
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
  
  // Set a random joke on initial load
  useEffect(() => {
    setCurrentJoke(jokes[Math.floor(Math.random() * jokes.length)]);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${discoMode ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-500' : 'bg-slate-50'}`}>
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
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
                <Link to="/" className="border-blue-500 text-blue-500 border-b-2 px-1 pt-1 text-sm font-medium">
                  Home
                </Link>
                <Link to="/info" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Info
                </Link>
                <Link to="/features" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Features
                </Link>
                <Link to="/pricing" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Pricing
                </Link>
                <Link to="/calc" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Mortgage Calculator
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button type="button" className="bg-white p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <Link to="/signin" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 shadow-sm hover:bg-orange-500/90 focus:outline-none transition">
                  Sign in
                </Link>
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/" className="bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500 block pl-3 pr-4 py-2 text-base font-medium">
                Home
              </Link>
              <Link to="/info" className="border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Info
              </Link>
              <Link to="/features" className="border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Features
              </Link>
              <Link to="/pricing" className="border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Pricing
              </Link>
              <div className="pt-4 pb-3 border-t border-slate-200">
                <Link to="/signin" className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 shadow-sm hover:bg-orange-500/90">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto pt-10 sm:pt-16 lg:pt-24">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Welcome to </span>
                    <span className="block text-blue-500 xl:inline">bestwebsite.ca</span>
                  </h1>
                  <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    The website so good, they named it "best" twice. Once in the domain and once in your heart.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500/90 md:py-4 md:text-lg md:px-10 transition">
                        Get started
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a href="#joke-generator" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 md:py-4 md:text-lg md:px-10 transition">
                        Tell me a joke
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
              <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:h-full">
                <div className="absolute transform -translate-x-1/2 translate-y-1/4 left-1/2 lg:translate-x-8">
                  <div className="flex -space-x-4 lg:-space-x-8">
                    <div className="w-44 h-44 rounded-2xl bg-pink-500 bg-opacity-10 rotate-6 animate-[float_6s_ease-in-out_infinite]"></div>
                    <div className="w-44 h-44 rounded-2xl bg-blue-500 bg-opacity-10 -rotate-6 animate-[float_6s_ease-in-out_infinite_1s]"></div>
                    <div className="w-44 h-44 rounded-2xl bg-orange-500 bg-opacity-10 rotate-12 animate-[float_6s_ease-in-out_infinite_2s]"></div>
                  </div>
                </div>
                <div className="absolute text-9xl font-extrabold text-slate-200 transform translate-x-1/3 translate-y-1/2 animate-[spin_8s_linear_infinite]">
                <svg className="w-40 h-40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="#e2e8f0" />
                <text x="50" y="55" textAnchor="middle" fontSize="20" fontFamily="monospace" fill="#3b82f6">BEST</text>
                </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                What Makes Us The Best?
              </p>
              <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                Like a good joke, our features are both unexpected and satisfying. Unlike a good joke, they actually work.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature, index) => (
                  <div key={index} className="relative group">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white group-hover:bg-orange-500 transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-slate-900">{feature.title}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-slate-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Joke Generator */}
        <section id="joke-generator" className="py-16 bg-gradient-to-r from-blue-500/5 to-orange-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Our Random Joke Generator
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Because every great website needs a sense of humor.
              </p>
            </div>
            <div className="mt-10 max-w-xl mx-auto">
              <div className="bg-white shadow-md rounded-lg p-6 border border-slate-200">
                <div className="min-h-[100px] flex items-center justify-center">
                  <p 
                    className={`text-xl text-center font-mono text-slate-700 transition-opacity duration-300 ${jokeTransition ? 'opacity-0' : 'opacity-100'}`}>
                    {currentJoke}
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={generateJoke}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-500/90 transition">
                    Another Joke
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                What People Are Saying
              </p>
              <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                We paid these people nothing to say nice things about us. That's how good we are.
              </p>
            </div>
            
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10">
                          <span className="text-lg font-medium leading-none text-blue-500">
                            {testimonial.initials}
                          </span>
                        </span>
                      </div>
                      <div>
                        <p className="text-base text-slate-700">"{testimonial.text}"</p>
                        <div className="mt-4">
                          <p className="text-sm font-medium text-slate-900">{testimonial.name}</p>
                          <p className="text-sm text-slate-500">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hidden "Easter Egg" */}
        <Dialog open={easterEggOpen} onOpenChange={setEasterEggOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">🎉 You found the Konami Code Easter Egg! 🎮</DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <p className="text-center mb-4">Congratulations, you've unlocked the secret page!</p>
              <div className="bg-blue-500/10 p-6 rounded-lg mb-4">
                <p className="text-lg font-mono text-center">
                  <span className="text-blue-500">function</span> <span className="text-orange-500">generateEasterEgg</span>() &#123;<br />
                  &nbsp;&nbsp;<span className="text-blue-500">return</span> "You're awesome! 🚀";<br />
                  &#125;
                </p>
              </div>
              <p className="text-sm text-slate-500 text-center">Hint: Try clicking the logo 5 times for another surprise!</p>
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={() => setEasterEggOpen(false)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-500/90 transition">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Newsletter */}
        <section className="py-16 bg-blue-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to join the best?
                </h2>
                <p className="mt-2 text-lg text-blue-100">
                  Sign up for our definitely real newsletter and get jokes delivered to your inbox.
                </p>
              </div>
              <div className="mt-5 lg:mt-0 lg:ml-8">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-5 py-3 border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white sm:w-auto transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-sm text-blue-200">
                  We promise not to spam you. Except with jokes. We'll definitely spam you with jokes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/about" className="text-base text-slate-400 hover:text-slate-300">About</Link></li>
                <li><Link to="/jobs" className="text-base text-slate-400 hover:text-slate-300">Jobs</Link></li>
                <li><Link to="/press" className="text-base text-slate-400 hover:text-slate-300">Press</Link></li>
                <li><Link to="/partners" className="text-base text-slate-400 hover:text-slate-300">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/docs" className="text-base text-slate-400 hover:text-slate-300">Documentation</Link></li>
                <li><Link to="/guides" className="text-base text-slate-400 hover:text-slate-300">Guides</Link></li>
                <li><Link to="/api" className="text-base text-slate-400 hover:text-slate-300">API Status</Link></li>
                <li><Link to="/blog" className="text-base text-slate-400 hover:text-slate-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/privacy" className="text-base text-slate-400 hover:text-slate-300">Privacy</Link></li>
                <li><Link to="/terms" className="text-base text-slate-400 hover:text-slate-300">Terms</Link></li>
                <li><Link to="/cookies" className="text-base text-slate-400 hover:text-slate-300">Cookies</Link></li>
                <li><Link to="/licenses" className="text-base text-slate-400 hover:text-slate-300">Licenses</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-center">
                  <Twitter className="h-5 w-5 text-slate-400 mr-2" />
                  <Link to="https://twitter.com" className="text-base text-slate-400 hover:text-slate-300">Twitter</Link>
                </li>
                <li className="flex items-center">
                  <Facebook className="h-5 w-5 text-slate-400 mr-2" />
                  <Link to="https://facebook.com" className="text-base text-slate-400 hover:text-slate-300">Facebook</Link>
                </li>
                <li className="flex items-center">
                  <Instagram className="h-5 w-5 text-slate-400 mr-2" />
                  <Link to="https://instagram.com" className="text-base text-slate-400 hover:text-slate-300">Instagram</Link>
                </li>
                <li className="flex items-center">
                  <Github className="h-5 w-5 text-slate-400 mr-2" />
                  <Link to="https://github.com" className="text-base text-slate-400 hover:text-slate-300">GitHub</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8">
            <p className="text-base text-slate-400 text-center">
              &copy; {new Date().getFullYear()} BestWebsite.ca. All rights reserved. Any resemblance to real websites is purely coincidental.
            </p>
          </div>
        </div>
      </footer>

      {/* Animations are defined in index.css */}
    </div>
  );
};

export default LandingPage;