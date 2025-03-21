import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Navbar from "./NavBar/navbar";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activePage="info" />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
            Our Features
          </h2>
          <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">
            Explore our collection of games, tools, and resources designed to entertain, educate, and occasionally confuse.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chess Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
                alt="Chess board"
                className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Chess</h3>
                <p className="text-slate-600 mb-4">
                A classic game of strategy and skill, reimagined for the web. Challenge your mind with one of the world's oldest and most beloved board games.
                </p>
                <a href="/chess/">
                <Button 
                    variant="outline" 
                    className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700"
                >
                    Play Now
                </Button>
                </a>
            </div>
            </Card>

            {/* Wordit Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://thesportscentral.com/wp-content/uploads/2025/01/DALL%C2%B7E-2025-01-18-19.05.57-An-artistic-representation-of-a-Wordle-like-game-grid.-The-grid-has-black-squares-with-white-letters-some-tiles-highlighted-in-green-to-indicate-corr-600x400.webp"
                  alt="Word puzzle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Wordit</h3>
                <p className="text-slate-600 mb-4">
                  Challenge your word skills with Wordit! Guess the daily word or try random words. A fun, fast-paced game with unique animations and interactive gameplay.
                </p>
                <a href="/wordit/">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    Play Now
                  </Button>
                </a>
              </div>
            </Card>

            {/* Notes Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
                  alt="DNA double helix"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Notes</h3>
                <p className="text-slate-600 mb-4">
                  Comprehensive notes covering key concepts in Biology and Chemistry, formatted for easy review and study.
                </p>
                <Link to="/StudyPage">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    View Notes
                  </Button>
                </Link>
              </div>
            </Card>

            {/* DVD Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://i.pinimg.com/originals/9b/aa/d7/9baad739910e7144a7ae561c73f6aecc.jpg"
                  alt="DVD logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">DVD</h3>
                <p className="text-slate-600 mb-4">
                  Watch the DVD logo bounce around your screen, waiting for that perfect corner hit. A nostalgic tribute to the classic DVD player screensaver.
                </p>
                <a href="/dvd/">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    Launch
                  </Button>
                </a>
              </div>
            </Card>

            {/* FAQ Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
                  alt="FAQ speech bubble"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Frequently Asked Questions (FAQ)</h3>
                <p className="text-slate-600 mb-4">
                  Welcome to our FAQ section! Here, you'll find answers to common questions about our website, services, and features.
                </p>
                <Link to="/faq">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    Read FAQ
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Something Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
                  alt="Question mark"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Something</h3>
                <p className="text-slate-600 mb-4">
                  A mysterious project that could be anything. Click to discover what lies behind this intriguing title.
                </p>
                <a href="/something/">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    Discover
                  </Button>
                </a>
              </div>
            </Card>

            {/* CPS Tester Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://www.shutterstock.com/image-photo/old-mouse-on-white-background-600nw-2132548831.jpg"
                  alt="Computer mouse"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">CPS Tester</h3>
                <p className="text-slate-600 mb-4">
                  Measure your clicking speed and precision. Find out how many clicks per second you can achieve in this performance tracking tool.
                </p>
                <a href="/cpstester/">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    Test Now
                  </Button>
                </a>
              </div>
            </Card>

            {/* Pong Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTPgntVgjQAGj5zNWwN0wxWuq1DZ_0h2FL0w&s"
                  alt="Pong game"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Pong</h3>
                <p className="text-slate-600 mb-4">
                  Pong is a classic arcade game where players control paddles to bounce a ball back and forth, aiming to score points by getting the ball past their opponent.
                </p>
                <a href="/Pong/">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    Play Now
                  </Button>
                </a>
              </div>
            </Card>

            {/* Tetris Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://nationalcioreview.com/wp-content/uploads/2024/05/Tech-Time-Travel-2.png"
                  alt="Tetris blocks"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Tetris</h3>
                <p className="text-slate-600 mb-4">
                  Tetris is a timeless puzzle game where players rotate and arrange falling tetrominoes to create complete lines without gaps.
                </p>
                <a href="/tetris/">
                  <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-slate-700">
                    Play Now
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
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

export default FeaturesPage;