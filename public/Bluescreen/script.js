var percentageElement = document.getElementById("percentage");
var percentage = 0;
var stuck = false;

// Create a fake cursor element
const fakeCursor = document.createElement("div");
fakeCursor.id = "fake-cursor";
document.body.appendChild(fakeCursor);

// Restrict cursor movement within a small area
document.addEventListener("mousemove", (event) => {
    const boxX = window.innerWidth / 2; // Center position
    const boxY = window.innerHeight / 2; // Center position

    // Small range for cursor movement (e.g., 10px x 10px area)
    const range = 10; 

    // Constrain mouse movement
    let newX = boxX + Math.min(Math.max(event.clientX - boxX, -range), range);
    let newY = boxY + Math.min(Math.max(event.clientY - boxY, -range), range);

    fakeCursor.style.left = `${newX}px`;
    fakeCursor.style.top = `${newY}px`;
});

// Disable Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        event.preventDefault(); // Prevent default Escape action
    }
});

// Disable F11 key (fullscreen)
document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault(); // Prevent default F11 action (fullscreen toggle)
    }
});

// Disable Ctrl + R (refresh)
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault(); // Prevent refresh
    }
});

// Custom weird key sequence for fullscreen (Ctrl + Shift + F)
let keySequence = [];
const sequence = ['Control', 'Shift', 'F']; // Define the weird key sequence (Ctrl + Shift + F)

document.addEventListener('keydown', function(event) {
    keySequence.push(event.key);

    // Check if the sequence matches
    if (keySequence.slice(-sequence.length).join() === sequence.join()) {
        // If sequence matches, toggle fullscreen
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        keySequence = []; // Reset the sequence
    }

    // Limit sequence length to avoid infinite array growth
    if (keySequence.length > sequence.length) {
        keySequence.shift(); // Keep only the last few keys in the sequence
    }
});


function process() {
  if (!stuck) {
    percentage += parseInt(Math.random() * 3); // Slower increase
    if (percentage > 100) {
      percentage = 100;
    }

    // Introduce random "stuck" behavior
    if (Math.random() < 0.2 && percentage > 30) { 
      stuck = true;
      setTimeout(() => { stuck = false; processInterval(); }, Math.random() * (30000 - 10000) + 10000); // Stuck for 10-30 seconds
      return;
    }

    percentageElement.innerText = percentage;
  }

  processInterval();
}

function processInterval() {
  setTimeout(process, Math.random() * (15000 - 5000) + 5000); // 5-15 seconds delay
}

processInterval();
