const InfoPage = () => {
  const projects = [
    {
      title: "Chess",
      description: "A classic game of strategy and skill, reimagined for the web. Challenge your mind with one of the world's oldest and most beloved board games.",
      imageUrl: "https://www.chesshouse.com/cdn/shop/files/16-folding-tournament-wood-chess-set-no-4-with-german-acacia-3-pieces-32317519593559_grande.jpg?v=1726262035",
      link: "/chess/"
    },
    {
      title: "Aord Guesser",
      description: "Challenge your word skills with Word Guesser! Guess the daily word or try random words. A fun, fast-paced game with unique animations and interactive gameplay. Are you up for the challenge?",
      imageUrl: "https://thesportscentral.com/wp-content/uploads/2025/01/DALL%C2%B7E-2025-01-18-19.05.57-An-artistic-representation-of-a-Wordle-like-game-grid.-The-grid-has-black-squares-with-white-letters-some-tiles-highlighted-in-green-to-indicate-corr-600x400.webp",
      link: "/Wordit/"
    },
    {
      title: "Notes",
      description: "Comprehensive notes covering key concepts in Biology and Chemistry, formatted for easy review and study.",
      imageUrl: "https://www.shutterstock.com/image-photo/spiral-dna-double-helix-structure-600nw-2476718469.jpg",
      link: "/studypage"
    },
    {
      title: "DVD",
      description: "Watch the DVD logo bounce around your screen, waiting for that perfect corner hit. A nostalgic tribute to the classic DVD player screensaver.",
      imageUrl: "https://i.pinimg.com/originals/9b/aa/d7/9baad739910e7144a7ae561c73f6aecc.jpg",
      link: "/dvd/"
    },
    {
      title: "Something",
      description: "A mysterious project that could be anything. Click to discover what lies behind this intriguing title.",
      imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/008/885/679/small_2x/3d-illustration-of-messages-in-the-form-of-a-question-mark-on-a-black-background-illustration-of-a-question-uncertainty-symbol-of-negotiation-and-uncertainty-photo.jpg",
      link: "/something/"
    },
    {
      title: "CPS Tester",
      description: "Measure your clicking speed and precision. Find out how many clicks per second you can achieve in this performance testing tool.",
      imageUrl: "https://www.shutterstock.com/image-photo/old-mouse-on-white-background-600nw-2132548831.jpg",
      link: "/cpstester/"
    },
    {
      title: "Pong",
      description: "Pong is a classic arcade game where players control paddles to bounce a ball back and forth, aiming to score points by getting the ball past their opponent. With simple mechanics and retro graphics, it’s a fun test of reflexes and hand-eye coordination.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTPgntVgjQAGj5zNWwN0wxWuq1DZ_0h2FL0w&s",
      link: "/Pong/"
    },
    {
      title: "Tetris",
      description: "Tetris is a timeless puzzle game where players rotate and arrange falling tetrominoes to create complete lines without gaps. As lines disappear, the game speeds up, challenging players to think quickly and strategically to achieve high scores.",
      imageUrl: "https://nationalcioreview.com/wp-content/uploads/2024/05/Tech-Time-Travel-2.png",
      link: "/Tetris/"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="relative z-10 py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6">Projects & Games</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Explore our collection of web-based games and interactive experiences. 
              Each project offers a unique way to waste time professionally.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className="group bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-slate-700"
            >
              <div className="aspect-video relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-slate-300">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-700 transition-all border border-slate-700"
        >
          Return to Homepage
        </a>
      </footer>
    </div>
  );
};

export default InfoPage;
