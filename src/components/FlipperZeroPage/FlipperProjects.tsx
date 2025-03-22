import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { GithubIcon } from '../FlipperZeroPage/icons/GithubIcon';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../ui/alert-dialog";

// Define types for projects
type ProjectCategory = 'badusb' | 'nfc' | 'rfid' | 'subghz' | 'infrared' | 'gpio';

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  size: string;
  downloadUrl: string;
  githubUrl: string;
  filename: string; // Added filename property for download
}

// CategoryConfig defines styling for categories
type CategoryConfig = {
  [key in ProjectCategory]: {
    label: string;
    bgColor: string;
    textColor: string;
  };
};

const FlipperProjects: React.FC = () => {
  // Terminal related state
  const [terminalCursorVisible, setTerminalCursorVisible] = useState(true);
  const [showSecondCommand, setShowSecondCommand] = useState(false);
  const [showThirdCommand, setShowThirdCommand] = useState(false);
  const [firstCommandText, setFirstCommandText] = useState("");
  const [secondCommandText, setSecondCommandText] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const firstCommand = "flipper info";
  const secondCommand = "scan nfc";


  // Projects related state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all');
  const [showAlert, setShowAlert] = React.useState(true); // State for the alert dialog

  // Reference to search input for clearing
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Define categories configuration
  const categoryConfig: CategoryConfig = {
    badusb: { label: 'BadUSB', bgColor: 'bg-flipper-orange/20', textColor: 'text-flipper-orange' },
    nfc: { label: 'NFC', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
    rfid: { label: 'RFID', bgColor: 'bg-purple-500/20', textColor: 'text-purple-400' },
    subghz: { label: 'Sub-GHz', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
    infrared: { label: 'Infrared', bgColor: 'bg-red-500/20', textColor: 'text-red-400' },
    gpio: { label: 'GPIO', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' }
  };

  // Projects data with updated downloadUrl pointing to files in public/files directory
  const projects: Project[] = [
    {
      id: 'evil-goose',
      title: 'Evil Goose',
      description: 'A payload that hires a goose to hack your target in real time.',
      category: 'badusb',
      size: '1 KB',
      githubUrl: 'https://github.com/Miles-design176/FlipperZero/tree/main/Evil%20Goose',
      downloadUrl: '/files/EvilGooseBadUsbScript.txt',
      filename: 'EvilGooseBadUsbScript.txt'
    },
  ];

  // Terminal cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setTerminalCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Delay before typing starts
  useEffect(() => {
    setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < firstCommand.length) {
          setFirstCommandText(firstCommand.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setShowSecondCommand(true), 1000);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }, 1000); // Initial delay before typing starts
  }, []);

  // Typing animation for second command
  useEffect(() => {
    if (!showSecondCommand) return;
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < secondCommand.length) {
        setSecondCommandText(secondCommand.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);

        // Start scanning animation when command finishes
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.floor(Math.random() * 15) + 5; // Random increase for realism
          if (progress >= 100) {
            setScanProgress(100);
            clearInterval(progressInterval);
            setTimeout(() => setShowThirdCommand(true), 500);
          } else {
            setScanProgress(progress);
          }
        }, 100);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [showSecondCommand]);

  // Filter projects based on category and search term
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle category button click
  const handleCategoryChange = (category: 'all' | ProjectCategory) => {
    setActiveCategory(category);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle file download
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Favorite apps data including URLs
  const favoriteApps = [
    {
      id: 'infrared-universal',
      title: 'Universal IR Remote',
      icon: '📱',
      description: 'Control TVs, ACs, and other IR devices with a single app',
      url: 'https://lab.flipper.net/apps/flipper_xremote',
    },
    {
      id: 'Weather-Station',
      title: 'Weather Station',
      icon: '🌤️',
      description: 'Receive weather data from a wide range of support Sub-1GBz remote sensors',
      url: 'https://lab.flipper.net/apps/weather_station',
    },
    {
      id: 'NFC-URL',
      title: 'NFC From URL',
      icon: '🔑',
      description: 'Create NFC tags that direct you to a URL',
      url: 'https://lab.flipper.net/apps/nfcurl',
    },
    {
      id: 'VIN_Decoder',
      title: 'VIN Decoder',
      icon: '🔑',
      description: 'Vehicle identification Number decoder',
      url: 'https://lab.flipper.net/apps/vin_decoder',
    }
  ];

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      searchInputRef.current.focus();
    }
  };

  // Handle download all projects
  const handleDownloadAll = () => {
    // Create a temporary anchor element to download the zip file
    const link = document.createElement('a');
    link.href = '/files/DownloadAll.zip'; // Path to your zip file in the public directory
    link.download = 'DownloadAll.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-white">My </span>
              <span className="text-[#FF8D29]">Flipper Zero</span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Projects</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Collection of my personal BadUSB payloads, NFC/RFID scripts, and hardware projects for the Flipper Zero.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Miles-design176/FlipperZero" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center px-5 py-3 bg-gray-800 hover:bg-gray-700 transition rounded-md text-white font-medium"
              >
                <GithubIcon className="h-5 w-5 mr-2" />
                GitHub Repository
              </a>
              <button 
                onClick={handleDownloadAll}
                className="flex items-center px-5 py-3 bg-[#FF8D29] hover:bg-orange-600 transition rounded-md text-black font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download All
              </button>
            </div>
          </div>

          {/* Terminal Component */}
          <div className="md:w-5/12">
            <div className="bg-terminal-bg rounded-lg overflow-hidden border border-gray-700 shadow-lg">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-2">flipper_zero.term</span>
              </div>
              <div className="p-4 font-mono text-sm min-h-[160px]"> 
                <div className="mb-2">
                  <span className="text-[#4CAF50]">flipper $</span>
                  <span className="text-white"> {firstCommandText}</span>
                  {firstCommandText.length < firstCommand.length && !showSecondCommand && (
                    <span className={`${terminalCursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                  )}
                </div>
                {firstCommandText === firstCommand && (
                  <>
                    <div className="text-gray-400 mb-1"> &gt; Flipper Zero v0.85</div>
                    <div className="text-gray-400 mb-1"> &gt; Storage: 92% used</div>
                    <div className="text-gray-400 mb-3"> &gt; Battery: 78% remaining</div>
                  </>
                )}

                {showSecondCommand && (
                  <>
                    <div className="mb-2">
                      <span className="text-[#4CAF50]">flipper $</span>
                      <span className="text-white"> {secondCommandText}</span>
                      {secondCommandText.length < secondCommand.length && !showThirdCommand && (
                        <span className={`${terminalCursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                      )}
                    </div>
                    {secondCommandText === secondCommand && (
                      <>
                        <div className="text-gray-400 mb-1"> &gt; Scanning for NFC tags...</div>
                        <div className="text-gray-400 mb-1"> &gt; Progress: {scanProgress}%</div>
                      </>
                    )}
                  </>
                )}

                {showThirdCommand && (
                  <>
                    <div className="text-gray-400 mb-1"> &gt; Scan complete!</div>
                    <div className="text-gray-400 mb-1"> &gt; NFC Tag found: Mifare Classic</div>
                    <div className="text-gray-400 mb-3"> &gt; UID: 4A B3 7C 9F</div>
                    <div>
                      <span className="text-[#4CAF50]">flipper $</span>
                      <span className={`${terminalCursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Images */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src="/images/FlipperZero.png"
              alt="Flipper Zero"
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden p-6">
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-4">Multi-Tool for Hackers</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  BadUSB attacks and payloads
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  RFID and NFC cloning tools
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Sub-GHz radio analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Infrared remote controls
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  GPIO and hardware interfaces
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Apps Section */}
      <div className="container mx-auto px-4 py-8 mb-4">
        <h2 className="text-3xl font-bold mb-8">Favorite Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteApps.map(app => (
            <div 
              key={app.id}
              className="bg-card-bg rounded-lg overflow-hidden border border-gray-700 hover:border-[#FF8D29] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{app.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
                <p className="text-gray-300 mb-4">{app.description}</p>
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto text-[#FF8D29] hover:text-white transition flex items-center"
                >
                  <span>Open App</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">My Projects</h2>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF8D29]"
              onChange={handleSearch}
              value={searchTerm}
            />
            <button 
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={clearSearch}
            >
              {searchTerm ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button 
            className={`px-4 py-2 ${activeCategory === 'all' ? 'bg-[#FF8D29] text-black' : 'bg-gray-800 text-white'} font-medium rounded-full hover:bg-gray-700 transition`}
            onClick={() => handleCategoryChange('all')}
          >
            All Projects
          </button>

          {Object.entries(categoryConfig).map(([category, config]) => (
            <button 
              key={category}
              className={`px-4 py-2 ${activeCategory === category ? 'bg-[#FF8D29] text-black' : 'bg-gray-800 text-white'} font-medium rounded-full hover:bg-gray-700 transition`}
              onClick={() => handleCategoryChange(category as ProjectCategory)}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="bg-card-bg rounded-lg overflow-hidden border border-gray-700 hover:border-[#FF8D29] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                data-category={project.category}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className={`${categoryConfig[project.category].bgColor} ${categoryConfig[project.category].textColor} px-2 py-1 rounded-md text-xs font-medium`}>
                      {categoryConfig[project.category].label}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleDownload(project.downloadUrl, project.filename)}
                          className="text-[#FF8D29] hover:text-white transition flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download
                        </button>
                      </div>
                      <span className="text-gray-400 text-sm">{project.size}</span>
                    </div>

                    <a 
                      href={String(project.githubUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center bg-gray-800 hover:bg-gray-700 transition py-2 rounded-md text-white"
                    >
                      <GithubIcon className="h-5 w-5 mr-2" />
                      <span>View on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card-bg rounded-lg overflow-hidden border border-gray-700 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-400">
              No projects match your current search criteria. Try adjusting your search or category filter.
            </p>
            <button 
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
                if (searchInputRef.current) {
                  searchInputRef.current.value = '';
                }
              }}
              className="mt-4 px-4 py-2 bg-[#FF8D29] text-black font-medium rounded-md hover:bg-orange-600 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
        {showAlert && (
          <AlertDialog open>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Work in Progress</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                This section of the application is still under development.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowAlert(false)}>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default FlipperProjects;