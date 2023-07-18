let donuts = [];
let stars = []; // Array to store star objects
let ORB;
let face = "The Inner Galactic\n Event";
let date = "Date\n Juli 31";
let currentColor = 0; // Variable to keep track of the current color index
let Sound;


function preload() {
  ORB = loadFont("Orbitron-VariableFont_wght.ttf");
 Sound = loadSound("Deep House (1).mp3");

}

function setup() {
  createCanvas(1000, 1000, WEBGL); // Switch to WEBGL mode
  background(0);

  // Create three donuts with different sizes and random positions
  for (let d = 0; d < 19; d++) {
    let donutSize = random(50, 150); // Change size to donutSize
    let xd = random(-width / 2, width / 2);
    let yd = random(-height / 2, height / 2);
    let zd = random(-400, 400);
    let donut = new Donut(xd, yd, zd, donutSize); // Change size to donutSize
    donuts.push(donut);
  }

  // Create initial stars
  for (let i = 0; i < 800; i++) {
    let x = random(width);
    let y = random(height);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    stars.push(new Star(x, y, random(1, 4), speedX, speedY));
  }
}

function draw() {
  background(0);
  Sound.loop();

fill(255);
  textFont(ORB);
  textSize(70);
  textAlign(CENTER, CENTER);
  text(face, 0, -80);

  // Get the current date and time
  let currentDate = new Date();
  let targetDate = new Date("July 31, 2023");

  // Calculate the time difference between the current date and the target date
  let timeDiff = targetDate - currentDate;
  
  // Convert the time difference to days, hours, minutes, and seconds
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  textSize(30);
  let countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  text(countdown, 0, 60);
  textSize(20);
  
  fill(255)
  textSize(15)
  textAlign(CENTER, CENTER)
  let shir = "Designed By @ Shir Lahjani";
  text(shir, 0,465);
textSize(20)
  let press = "Click To Change";
  text(press, 0,430);
  textAlign(LEFT,LEFT);
  text(date,-480, -465);
  textAlign(RIGHT,RIGHT);
  let avi = "p5.js course\n Avi Milgrom\n 2022 -2023";
  text(avi, 480,-465);
 

  // Rotate the scene
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Draw and update each donut
  for (let d = 0; d < donuts.length; d++) {
    donuts[d].update();
    donuts[d].display();
  }

  // Update and draw stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.update();
    star.display();
  }
}

function mouseClicked() {
   // Change colors on mouse click
  currentColor++;
  if (currentColor === 1) {
    // Orange and 
    for (let i = 0; i < donuts.length; i++) {
      donuts[i].setColors(color(255, 165, 0), color(0, 255, 171));
    }
  } else if (currentColor === 2) {
    // Purple and blue
    for (let i = 0; i < donuts.length; i++) {
      donuts[i].setColors(color(134, 93, 255), color(255, 163, 253));
    }
  } else {
    // Reset to original colors
    currentColor = 0;
    for (let i = 0; i < donuts.length; i++) {
      donuts[i].setColors(color(64, 224, 208), color(255, 105, 180));
    }
  }
}

class Donut {
  constructor(xd, yd, zd, size) {
    this.position = createVector(xd, yd, zd);
    this.size = size;
    this.rotationSpeed = random(0.02, 0.06);
    this.colors = [
      color(64, 224, 208), // Turquoise
      color(255, 105, 180), // Pink
    ];
  }

  setColors(color1, color2) {
    // Set new colors
    this.colors[0] = color1;
    this.colors[1] = color2;
  }

  update() {
    // Move the donut
    this.position.x += random(-1, 1);
    this.position.y += random(-1, 1);
    this.position.z += random(-1, 1);
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(frameCount * this.rotationSpeed);
    rotateY(frameCount * this.rotationSpeed);

    // Draw the donut
    let c = random(this.colors);
    fill(c);
    torus(this.size * 0.4, this.size * 0.2);

    pop();
  }
}

class Star {
  constructor(x, y, size, speedX, speedY) {
    this.position = createVector(x, y);
    this.size = random(1, 4);
    this.velocity = createVector(speedX, speedY);
  }

  update() {
    // Move star
    this.position.add(this.velocity);

    // Wrap around the canvas
    if (this.position.x < 0) {
      this.position.x = width;
    } else if (this.position.x > width) {
      this.position.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    } else if (this.position.y > height) {
      this.position.y = 0;
    }
  }

  display() {
    // Draw star
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}