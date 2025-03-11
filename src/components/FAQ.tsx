import React, { useState, useEffect } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [supportClicks, setSupportClicks] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEasterEggVisible, setIsEasterEggVisible] = useState(false);
  const [visitCounter, setVisitCounter] = useState(1);
  const [theme, setTheme] = useState('light');
  
  // Initialize theme and visit counter from localStorage when component mounts
  useEffect(() => {
    // Load theme preference from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
    
    // Load and increment visit counter
    const storedVisits = localStorage.getItem('visitCount');
    if (storedVisits) {
      setVisitCounter(parseInt(storedVisits) + 1);
      localStorage.setItem('visitCount', (parseInt(storedVisits) + 1).toString());
    } else {
      localStorage.setItem('visitCount', '1');
    }
    
    // Set up konami code detector
    let konamiSequence: string[] = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiSequence.push(e.key);
      if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
      }
      
      if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
        setIsEasterEggVisible(true);
        konamiSequence = [];
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const faqs = [
    {
      question: "Is this really the best website?",
      answer: "Absolutely! We had a committee of experts vote on it. The committee consisted of my mom, my cat, and that one friend who always lies to make me feel better."
    },
    {
      question: "How much does your service cost?",
      answer: "It's completely free! Just like that 'free' sample at the store that somehow leads to you spending $200 on stuff you didn't know you needed."
    },
    {
      question: "Do you collect my data?",
      answer: "We collect just enough data to know that you're the type of person who reads FAQs. That's already too much information about you."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "You can try, but our 'Unsubscribe' button moves around the page like it's playing a game of tag with your cursor."
    },
    {
      question: "How do I contact support?",
      answer: "Keep clicking that tempting support button below. Legend has it that on the 100th click, a support agent materializes out of thin air. Results may vary."
    },
    {
      question: "Is bestwebsite.ca really Canadian?",
      answer: "We're as Canadian as maple syrup on a hockey stick during a snowstorm while apologizing. Sorry for the stereotypes, eh?"
    },
    {
      question: "What makes your website the 'best'?",
      answer: "We added the word 'best' to our domain name. That's legally binding, right? Also, our loading times are measured in geological eras rather than milliseconds."
    },
    {
      question: "Do you have a mobile app?",
      answer: "Our mobile app is currently being developed by a team of highly trained squirrels. They keep burying the code and forgetting where they put it."
    },
    {
      question: "Can I trust your testimonials?",
      answer: "All our testimonials are 100% genuine quotes from people who may or may not exist in this dimension. 'Best site ever!' - Albert Einstein (probably)"
    },
    {
      question: "How secure is your website?",
      answer: "We've implemented military-grade security, which means we printed out all your data and locked it in a filing cabinet that only three people have the key to."
    }
  ];

  const supportMessages = [
    "Our support team is currently busy pretending to work.",
    "Have you tried turning it off and back on again?",
    "All our agents are currently on a coffee break... since 2019.",
    "Please hold while we transfer you to someone who cares... *elevator music*",
    "Support is out chasing butterflies. Please try again when it's raining.",
    "Error 404: Support team not found.",
    "Our support team is currently stuck in a meeting about why meetings are inefficient.",
    "You're now #427 in our queue! Estimated wait time: until the next solar eclipse.",
    "Support is currently hibernating. Please try again in spring.",
    "Have you considered solving this problem yourself? You seem smart!",
    "All agents are busy arguing about whether a hot dog is a sandwich.",
    "Our support team is currently learning to juggle. Your ticket is one of the balls.",
    "Technical difficulties: Our hamster powering the support center needs a nap.",
    "We've forwarded your request to /dev/null for immediate processing.",
    "Support ticket created! We've printed it out and made it into a paper airplane."
  ];

  const handleSupportClick = () => {
    setSupportClicks(prev => prev + 1);
    
    // Easter egg: On the 25th click, show popup
    if (supportClicks === 24) {
      setTimeout(() => {
        setIsPopupOpen(true);
      }, 500);
    }
  };

  const getSupportMessage = () => {
    return supportMessages[supportClicks % supportMessages.length];
  };

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-purple-100' : 'bg-gradient-to-br from-gray-900 to-indigo-900'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-3xl mx-auto ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-lg overflow-hidden transition-colors duration-300`}>
        <div className="bg-indigo-600 py-6 px-6 relative">
          <div className="absolute right-4 top-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-indigo-700 hover:bg-indigo-800 text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              }
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <h1 className="text-3xl font-extrabold text-white text-center">
                bestwebsite.ca FAQs
              </h1>
              <div className="ml-2 bg-yellow-300 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">
                SO GOOD
              </div>
            </div>
            <p className="mt-1 text-indigo-100 text-center">
              The only FAQ page you'll ever read (probably)
            </p>
          </div>
          
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our extremely helpful FAQs..."
                className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-indigo-200 border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-2.5 text-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-indigo-200">
              Visit counter: You've been here {visitCounter} time{visitCounter !== 1 ? 's' : ''}! 
              {visitCounter > 5 ? " Don't you have anything better to do?" : ""}
            </p>
          </div>
        </div>
        
        <div className={`py-6 px-6 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'} transition-colors duration-300`}>
          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg font-medium">No FAQs match your search.</p>
              <p className="mt-2">This is the first time someone has asked about that. Are you okay?</p>
            </div>
          )}
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className={`border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} pb-4 transition-colors duration-300`}>
                <button
                  className={`flex justify-between items-center w-full text-left font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'} focus:outline-none transition-colors duration-300`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-indigo-500 transform transition-transform duration-300 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} transition-colors duration-300`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-10">
            <div className="text-center">
              <button
                onClick={handleSupportClick}
                className="relative overflow-hidden group bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Contact Customer Support</span>
                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {supportClicks > 15 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
              
              {supportClicks > 0 && (
                <div className={`mt-4 p-4 ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-gray-200'} rounded-lg animate-bounce transition-colors duration-300`}>
                  {getSupportMessage()}
                </div>
              )}
              
              {supportClicks >= 5 && supportClicks < 10 && (
                <div className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
                  You've clicked {supportClicks} times. Your determination is admirable, but our support team is still avoiding you.
                </div>
              )}
              
              {supportClicks >= 10 && supportClicks < 15 && (
                <div className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
                  {supportClicks} clicks? Seriously? At this point we're actually impressed. Keep going!
                </div>
              )}
              
              {supportClicks >= 15 && supportClicks < 25 && (
                <div className={`mt-4 text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
                  {supportClicks} clicks. We're starting to think you might actually need help. Have you tried literally anything else?
                </div>
              )}
              
              {supportClicks >= 25 && (
                <div className={`mt-4 text-sm font-bold ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'} transition-colors duration-300`}>
                  🎉 ACHIEVEMENT UNLOCKED: "The Persistent One" ({supportClicks} clicks) 🎉
                  <br/>
                  <span className="font-normal">You've unlocked our secret support line: 1-800-NOT-REAL</span>
                </div>
              )}
            </div>
          </div>
          
          {isEasterEggVisible && (
            <div className="mt-8 p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg shadow-lg text-center animate-pulse">
              <h3 className="text-xl font-bold">🎮 SECRET UNLOCKED! 🎮</h3>
              <p>You found the Konami Code Easter egg! Congratulations, you win absolutely nothing but this message.</p>
            </div>
          )}
          
          <div className="mt-16 text-center border-t border-gray-200 pt-6">
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} transition-colors duration-300`}>
              © 2025 bestwebsite.ca - Proudly claiming to be the best since whenever this page loaded
            </p>
            <p className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} mt-1 transition-colors duration-300`}>
              Any resemblance to an actual useful website is purely coincidental
            </p>
            <p className={`text-xs ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} mt-1 transition-colors duration-300`}>
              Built with love and questionable coding practices
            </p>
          </div>
        </div>
      </div>
      
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-900">Congratulations!</h2>
              <button 
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">You've clicked the support button 25 times!</p>
              <p className="mt-2 text-gray-600">This means you've officially qualified for our premium support package, which includes:</p>
              <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-1">
                <li>The same lack of support, but with a fancier name</li>
                <li>Priority ignoring of your requests</li>
                <li>A complimentary digital high-five</li>
                <li>This popup, which is the most attention you'll ever get from us</li>
              </ul>
            </div>
            <div className="mt-6">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Accept this incredible offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQPage;