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
