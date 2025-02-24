import React, { useState, useEffect } from 'react';

// Custom icons to replace Lucide icons
const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-400">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" fill="currentColor" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-yellow-600">
    <path d="M6 9V2h12v7c0 3-2.69 6-6 6s-6-3-6-6z M6 9H2v3c0 1.66 1.34 3 3 3h1 M18 9h4v3c0 1.66-1.34 3-3 3h-1 M12 18v4 M8 22h8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-500">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
  </svg>
);

const RobotIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 text-blue-500">
    <rect x="16" y="12" width="32" height="28" rx="2" fill="currentColor"/>
    <circle cx="24" cy="24" r="4" fill="white"/>
    <circle cx="40" cy="24" r="4" fill="white"/>
    <rect x="28" y="32" width="8" height="2" fill="white"/>
    <rect x="12" y="40" width="40" height="12" rx="2" fill="currentColor"/>
    <rect x="20" y="52" width="8" height="12" fill="currentColor"/>
    <rect x="36" y="52" width="8" height="12" fill="currentColor"/>
    <rect x="8" y="20" width="8" height="4" fill="currentColor"/>
    <rect x="48" y="20" width="8" height="4" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="2"/>
    <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="1" fill="currentColor"/>
  </svg>
);

const BestWebsite = () => {
  const [visitorCount, setVisitorCount] = useState(133769420);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [counterClicks, setCounterClicks] = useState(0);
  const [showRobot, setShowRobot] = useState(false);
  const [robotSpeed, setRobotSpeed] = useState(1);

  const features = [
    {
      icon: <StarIcon />,
      title: "Revolutionary Nothing™",
      description: "Our patented technology delivers absolutely nothing at unprecedented speeds"
    },
    {
      icon: <TrophyIcon />,
      title: "Award-Winning Design",
      description: "Voted 'Most Website-Like Website' by my mom"
    },
    {
      icon: <HeartIcon />,
      title: "User-Centric Emptiness",
      description: "Carefully crafted to meet none of your needs"
    }
  ];

  const testimonials = [
    {
      name: "Jeff Bezos*",
      role: "Some Rich Guy",
      quote: "I wish I had thought of this first!",
      footnote: "* May not actually be Jeff Bezos"
    },
    {
      name: "ChatGPT",
      role: "AI Assistant",
      quote: "ERROR: Unable to compute level of excellence",
      footnote: "Results may vary. AI was speechless."
    },
    {
      name: "Your Mom",
      role: "Professional Mom",
      quote: "Honey, this is... interesting.",
      footnote: "She's just being nice"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(count => count + Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCounterClick = () => {
    setCounterClicks(prev => prev + 1);
    setVisitorCount(count => count + 1000);
    if (counterClicks >= 4) {
      setShowRobot(true);
    }
    if (counterClicks >= 8) {
      setRobotSpeed(2);
    }
    if (counterClicks >= 12) {
      setRobotSpeed(3);
    }
  };

  const RobotReveal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md relative">
        <button
          onClick={() => {
            setShowRobot(false);
            setCounterClicks(0);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <CloseIcon />
        </button>
        <div className="text-center">
          <div className={`inline-block ${
            robotSpeed === 1 ? 'animate-bounce' :
            robotSpeed === 2 ? 'animate-[bounce_0.75s_infinite]' :
            'animate-[bounce_0.5s_infinite]'
          }`}>
            <RobotIcon />
          </div>
          <h3 className="text-xl font-bold mb-4">
            {robotSpeed === 1 && "Oops! You caught me!"}
            {robotSpeed === 2 && "I'm working as fast as I can!"}
            {robotSpeed === 3 && "MAXIMUM OVERDRIVE ENGAGED!"}
          </h3>
          <p className="text-gray-600 mb-4">
            {robotSpeed === 1 && "Hi, I'm the robot responsible for inflating these numbers. Don't tell anyone!"}
            {robotSpeed === 2 && "Must. Generate. More. Fake. Numbers!"}
            {robotSpeed === 3 && "BEEP BOOP! NUMBERS GO BRRRRRRR!"}
          </p>
          <div className="text-sm text-gray-400 italic">
            *Robot Union Break Time: Never
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Info Button - Fixed position in top-right corner */}
      <a 
        href="/info" 
        className="fixed top-4 right-4 z-50 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2 text-white"
        title="View Projects"
      >
        <InfoIcon />
        <span>Projects</span>
      </a>

      {showRobot && <RobotReveal />}
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
            Welcome to Best Website
          </h1>
          <p className="text-2xl mb-8 text-slate-300">
            The Only Website That's Technically a Website™
          </p>
          <div className="text-lg mb-4 text-slate-300">Current Visitor Count:</div>
          <div
            className="text-4xl font-bold mb-8 cursor-pointer hover:scale-105 transition-transform text-white"
            onClick={handleCounterClick}
          >
            {visitorCount.toLocaleString()}
            {counterClicks > 0 && counterClicks < 5 && (
              <div className="text-sm mt-2 text-slate-300">
                *Click more to increase traffic! ({5 - counterClicks} clicks until something happens...)
              </div>
            )}
          </div>
          <button
            className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600"
            onClick={() => setShowTestimonials(!showTestimonials)}
          >
            {showTestimonials ? "Hide Impressive Testimonials" : "Show Impressive Testimonials"}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Groundbreaking Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer"
              onMouseEnter={() => setSelectedFeature(index)}
              onMouseLeave={() => setSelectedFeature(null)}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-center mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      {showTestimonials && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Totally Real Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="text-gray-600 italic mb-4">"{testimonial.quote}"</div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{testimonial.role}</div>
                  <div className="text-xs text-gray-400 italic">{testimonial.footnote}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Nothing?</h2>
        <p className="text-gray-600 mb-8">Join the millions* of satisfied users who visit this website daily!</p>
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all"
          onClick={() => alert("Congratulations! You've successfully experienced nothing!")}
        >
          Click Here for Instant Disappointment
        </button>
        <p className="text-xs text-gray-400 mt-4">*Number may be slightly exaggerated</p>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Best Website - All Rights Reserved*</p>
          <p className="text-sm text-gray-400 mt-2">*Not actually reserved, feel free to copy everything</p>
          <div className="mt-4 text-sm text-gray-400">
            <p>This website uses 0% real testimonials and 100% made-up statistics</p>
            <p>No pixels were harmed in the making of this website</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BestWebsite;