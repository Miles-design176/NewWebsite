import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Bolt,
  LockKeyhole,
  MessageSquare,
  Code,
  Bell,
  Menu,
  Check,
  Star,
  Shield,
  Cpu,
  Zap,
  Lightbulb,
  Heart,
  Coffee
} from "lucide-react";

// Detailed features with icons, titles, descriptions, and sub-features
const detailedFeatures = [
  {
    icon: <Bolt className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Speed that will make your competitors jealous and your users amazed.",
    subFeatures: [
      "Server response times under 100ms",
      "Optimized code for minimal load times",
      "CDN distribution for global access",
      "Lazy loading of resources for instant initial load"
    ]
  },
  {
    icon: <LockKeyhole className="h-8 w-8" />,
    title: "Super Secure",
    description: "Bank-level security without the boring bank-level aesthetics.",
    subFeatures: [
      "End-to-end encryption for all sensitive data",
      "Two-factor authentication options",
      "Regular security audits and penetration testing",
      "Compliance with international security standards"
    ]
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Actually Funny",
    description: "The only technical product that might actually make you laugh on purpose.",
    subFeatures: [
      "Error messages written by comedy writers",
      "Easter eggs hidden throughout the interface",
      "Personalized humorous interactions",
      "Monthly joke updates (yes, we're serious about being funny)"
    ]
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "100% Real Code",
    description: "Artisanal, hand-crafted code with no artificial ingredients or preservatives.",
    subFeatures: [
      "Clean, maintainable codebase",
      "Modern frameworks and libraries",
      "Comprehensive documentation",
      "Regular updates and improvements"
    ]
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Privacy Focused",
    description: "We're so good at protecting your data, even we don't know what you're doing.",
    subFeatures: [
      "Zero knowledge architecture",
      "No third-party tracking or analytics",
      "Data minimization principles",
      "User-controlled data retention policies"
    ]
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    title: "Smart Automation",
    description: "Let our algorithms do the boring stuff while you focus on what matters.",
    subFeatures: [
      "Intelligent workflow automation",
      "Predictive task scheduling",
      "Machine learning enhanced features",
      "Custom automation rules"
    ]
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Energy Efficient",
    description: "Green computing that won't cost the Earth (literally or figuratively).",
    subFeatures: [
      "Optimized server resource usage",
      "Carbon-neutral hosting",
      "Efficient code reduces battery drain",
      "Sustainable development practices"
    ]
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovative Design",
    description: "So intuitive, your grandma could use it. So stylish, your designer friends will be jealous.",
    subFeatures: [
      "User-centered design approach",
      "Accessibility built in from the ground up",
      "Responsive across all devices",
      "Dark mode that's actually pleasant to use"
    ]
  }
];

// Comparison table data
const comparisonData = {
  features: ["Speed", "Security", "Humor", "Code Quality", "Automation", "Design", "Support", "Price"],
  competitors: [
    {
      name: "bestwebsite.ca",
      values: ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "⭐⭐⭐⭐⭐", "$$$"]
    },
    {
      name: "Competitor A",
      values: ["⭐⭐⭐", "⭐⭐⭐⭐", "⭐", "⭐⭐⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐", "$$$$"]
    },
    {
      name: "Competitor B",
      values: ["⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐⭐⭐", "$$$$"]
    },
    {
      name: "Competitor C",
      values: ["⭐⭐⭐⭐", "⭐⭐", "⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐", "$$$$$"]
    }
  ]
};

const FeaturesPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(0);

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
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Home
                </Link>
                <Link to="/calc" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Mortgage Calculator
                </Link>
                <Link to="/money" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Money Visualize
                </Link>
                <Link to="/info" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Info
                </Link>
                <Link to="/features" className="border-blue-500 text-blue-500 border-b-2 px-1 pt-1 text-sm font-medium">
                  Features
                </Link>
                <Link to="/pricing" className="border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-700 border-b-2 px-1 pt-1 text-sm font-medium">
                  Pricing
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
                <Link to="/" className="border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Home
                </Link>
                <Link to="/calc" className="border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Mortgage Calculator
                </Link>
                <Link to="/money" className="border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Money Visualize
                </Link>
                <Link to="/info" className="border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Info
                </Link>
                <Link to="/features" className="bg-blue-500 bg-opacity-10 border-l-4 border-blue-500 text-blue-500 block pl-3 pr-4 py-2 text-base font-medium">
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
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Features That Will Blow Your Mind
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
              Not just features, but <span className="font-bold">super-powers</span> for your digital experience.
            </p>
            <div className="mt-8">
              <Button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition">
                Get Started Now
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Selection */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">The Full Suite</h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Explore Our Amazing Features
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
                Each feature is meticulously crafted to delight your users and make your life easier.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Feature Selector */}
              <div className="lg:w-1/3">
                <div className="bg-slate-50 rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Feature Menu</h3>
                  <ul className="space-y-2">
                    {detailedFeatures.map((feature, index) => (
                      <li key={index}>
                        <button
                          className={`w-full text-left px-4 py-3 rounded-md transition flex items-center ${selectedFeature === index ? 'bg-blue-500 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                          onClick={() => setSelectedFeature(index)}
                        >
                          <span className="mr-3">{feature.icon}</span>
                          <span className="font-medium">{feature.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Feature Details */}
              <div className="lg:w-2/3">
                <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 p-3 bg-blue-500/10 rounded-lg text-blue-500">
                      {detailedFeatures[selectedFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{detailedFeatures[selectedFeature].title}</h3>
                  </div>
                  
                  <p className="text-lg text-slate-600 mb-8">{detailedFeatures[selectedFeature].description}</p>
                  
                  <div className="bg-slate-50 p-6 rounded-lg mb-8">
                    <h4 className="font-medium text-slate-900 mb-4">Key Capabilities:</h4>
                    <ul className="space-y-3">
                      {detailedFeatures[selectedFeature].subFeatures.map((subFeature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{subFeature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                      Learn More
                    </Button>
                    <Button className="px-6 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition">
                      See Demo
                    </Button>
                  </div>
                </Card>

                {/* Feature Image/Visual */}
                <div className="mt-8 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-lg p-8 flex justify-center">
                  <div className="max-w-lg">
                    <div className="aspect-video bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center border border-slate-200">
                      <div className="text-center p-8">
                        <div className="flex justify-center mb-4 text-blue-500">
                          {selectedFeature % 2 === 0 ? 
                            <Coffee className="h-16 w-16" /> : 
                            <Heart className="h-16 w-16" />
                          }
                        </div>
                        <h4 className="text-lg font-medium text-slate-900 mb-2">Feature In Action</h4>
                        <p className="text-slate-500">Interactive demo would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Comparison</h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                How We Stack Up
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
                We're not saying we're the best, but this completely unbiased comparison might.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Feature
                      </th>
                      {comparisonData.competitors.map((competitor, idx) => (
                        <th key={idx} scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${idx === 0 ? 'text-blue-500' : 'text-slate-500'}`}>
                          {competitor.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {comparisonData.features.map((feature, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {feature}
                        </td>
                        {comparisonData.competitors.map((competitor, cIdx) => (
                          <td key={cIdx} className={`px-6 py-4 whitespace-nowrap text-sm ${cIdx === 0 ? 'text-blue-500 font-medium' : 'text-slate-500'}`}>
                            {competitor.values[idx]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 italic">
                * Comparison based on extensive research and definitely not made up on the spot.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to Experience These Amazing Features?
            </h2>
            <p className="mt-4 text-xl text-orange-100">
              Join thousands of satisfied users who are already loving our platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button className="px-8 py-3 bg-white text-orange-600 rounded-md hover:bg-orange-50 transition">
                Start Free Trial
              </Button>
              <Button className="px-8 py-3 bg-transparent border border-white text-white rounded-md hover:bg-orange-600 transition">
                Schedule Demo
              </Button>
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
                  <Link to="https://twitter.com" className="text-base text-slate-400 hover:text-slate-300">Twitter</Link>
                </li>
                <li className="flex items-center">
                  <Link to="https://facebook.com" className="text-base text-slate-400 hover:text-slate-300">Facebook</Link>
                </li>
                <li className="flex items-center">
                  <Link to="https://instagram.com" className="text-base text-slate-400 hover:text-slate-300">Instagram</Link>
                </li>
                <li className="flex items-center">
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
    </div>
  );
};

export default FeaturesPage;