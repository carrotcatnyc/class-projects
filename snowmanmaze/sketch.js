// snow
var xPositions = [];
var yPositions = [];
var colors = [];
var numPositions = 0;
var drops = 0;
var riverHeight = 0;

// player
let x = 60;
let y = 55;
let deltaX = 0;
let deltaY = 0;
let hp = 100;

// ornaments
let xOrnaments;
let yOrnaments;
let colorOrnaments;
let gotOrnaments;
let collectedOrnaments;
let numOrnaments;

// level
let currentLevel = 1;

function setup() {
  createCanvas(800, 700);
  reset();
}

function reset() {
  riverHeight = 0;
  hp = 100;
  xPositions = [];
  yPositions = [];
  colors = [];
  numPositions = 0;
  drops = 0;
  x = 60;
  y = 55;
  deltaX = 0;
  deltaY = 0;
  setupOrnaments();
}

function setupOrnaments() {
  xOrnaments = [50, 50, 360, 260, 160, 460, 50];
  yOrnaments = [245, 535, 55, 55, 55, 55, 350];
  colorOrnaments = [];
  gotOrnaments = [];
  numOrnaments = xOrnaments.length;
  collectedOrnaments = 0;
  for (let i = 0; i < numOrnaments; i++) {
    colorOrnaments.push(color(random(0, 254), random(0, 255), random(0, 255)));
    gotOrnaments.push(false);
  }
}

function draw_bg() {
  background(45, 34, 196);
  //print(mouseX, mouseY);
  r = map(mouseX, 0, 500, 184, 81);
  g = map(mouseX, 0, 500, 208, 97);
  b = map(mouseX, 0, 500, 218, 129);
  background(r, g, b);
  

  // snowman
  noStroke();
  fill(255);
  ellipse(145, 625, 120);
  ellipse(145, 555, 100);
  ellipse(145, 490, 80);
  fill(0);
  ellipse(125, 475, 10);
  ellipse(165, 475, 10);
  fill(252, 115, 3);
  triangle(140, 480, 140, 500, 200, 500);
  fill(245, 245, 245);
  rect(0, 680, 520, 30);
  fill(255);
  ellipse(300, 625, 120);
  ellipse(300, 555, 100);
  ellipse(300, 490, 80);
  fill(0);
  ellipse(320, 475, 10);
  ellipse(280, 475, 10);
  fill(252, 115, 3);
  triangle(300, 500, 370, 500, 300, 480);
  
  drawInstructions();
}


draw = function () {
  draw_bg();

  riverHeight = drops / (20 - 2 * currentLevel); // the higher the level, the quicker the snow accumulates
  if (keyIsPressed) {
    if (riverHeight >= 700 || hp <= 0) {
      reset();
    }
    xPositions[numPositions] = Math.floor(Math.random() * 500);
    yPositions[numPositions] = 0;
    numPositions++;
  }

  fill(245, 245, 245);
  rect(0, 700 - riverHeight, 500, riverHeight);

  if (riverHeight >= 700 || hp <= 0) {
    fill(255, 0, 0);
    textSize(69);
    text("game over!", 60, 175);
    textSize(29);
    text("press any key to restart.", 60, 300);
  } else {
    drawSnow();
    drawMaze();
    drawOrnaments();
    drawExit();
    drawLevel();
    drawBall();
    drawHP();
  }

 
};

function keyPressed() {
  if (key == "a") {
    deltaX = -5;
  }
  if (key == "d") {
    deltaX = 5;
  }
  if (key == "w") {
    deltaY = -5;
  }
  if (key == "s") {
    deltaY = 5;
  }
  if (key == "r") {
    currentLevel=1;
    reset();
  }
}
function keyReleased() {
  if (key == "a") {
    deltaX = 0;
  }
  if (key == "d") {
    deltaX = 0;
  }
  if (key == "w") {
    deltaY = 0;
  }
  if (key == "s") {
    deltaY = 0;
  }
}

function drawHP() {
  fill(0, 0, 155);
  text("hp:" + hp, 200, 15);
}

function drawSnow() {
  for (var i = 0; i < xPositions.length; i++) {
    noStroke();
    colors[numPositions] = getSnowColor();
    fill(colors[numPositions]);
    ellipse(xPositions[i], yPositions[i], 10, 10);
    yPositions[i] += 5;
    if (yPositions[i] >= 700 - riverHeight) {
      yPositions[i] = 0;
      drops++;
    }
  }
}

function getSnowColor() {
  // if (currentLevel>1) {
  //   var r = randam(1,100);
  //   if (r<currentLevel*4) {
  //     return color(255,0,0);
  //   } else {
  //     return color(245, 245, 245);
  //   }
  // }
  return color(245, 245, 245);
}

function drawOrnaments() {
  for (let i = 0; i < numOrnaments; i++) {
    // collect ornament when moving close
    if (dist(xOrnaments[i], yOrnaments[i], x, y) < 20) {
      if (!gotOrnaments[i]) {
        // if not collected yet, collect it and add to the collectedOrnaments
        gotOrnaments[i] = true;
        collectedOrnaments++;
        moreHealth();
      }
    }
    if (!gotOrnaments[i]) {
      // if not collected, show it
      fill(colorOrnaments[i]);
      ellipse(xOrnaments[i], yOrnaments[i], 25, 25);
    }
  }
  textSize(15);
  fill(0);
  text("collected ornaments: " + collectedOrnaments, 340, 15);
}

function collectedAllOrnaments() {
  return collectedOrnaments == numOrnaments;
}

function drawExit() {
  if (collectedAllOrnaments()) {
    fill(62, 155, 50);
    rect(200, 650, 50, 50);
  }
}
function drawMaze() {
  fill(255, 0, 0);
  rect(0, 0, 500, 20);
  rect(0, 75, 20, 700);
  rect(100, 15, 20, 200);
  rect(200, 15, 20, 200);
  rect(300, 15, 20, 200);
  rect(400, 15, 20, 500);
  rect(415, 15, 20, 50);
  rect(15, 300, 300, 20);
  rect(15, 400, 300, 20);
  rect(500, 0, 20, 700);

  
}

function lessHealth() {
  hp = hp - 5;
}
function moreHealth() {
  hp = hp + 10;
  if (hp > 100) hp = 100;
}

function drawBall() {
  if (x < 15) {
    x = 15;
  }

  if (x > 485) {
    x = 485;
  }
  if (y < 15) {
    y = 15;
  }

  if (y > 685) {
    y = 685;
  }
  x = x + deltaX;
  y = y + deltaY;
  if (red(get(x - 10.01, y)) == 255) {
    lessHealth();
    x = x + 5;
  }
  if (red(get(x + 10.01, y)) == 255) {
    lessHealth();
    x = x - 5;
  }
  if (red(get(x, y + 10.01)) == 255) {
    lessHealth();
    y = y - 5;
  }
  if (red(get(x, y - 10.01)) == 255) {
    lessHealth(); 
    y = y + 5;
  }
  fill(0);
  ellipse(x, y, 25, 25);
  fill(255, 0, 0);
}
function drawLevel() {
  fill(0, 0, 155);
  text("level:" + currentLevel, 15, 15);
  if (collectedAllOrnaments()) {
    // when the exit is showing
    if (dist(225, 675, x, y) < 25) {
      reset();
      currentLevel++;
    }
  }
}
function drawInstructions() {
  fill(6, 89, 85)
  rect(520,0,280,700);
  textSize(20);
  fill(180);
text('instructions:\n\n1. use lowercase wasd to move around the map. use r to reset your progress. \n\n2. collect the ornaments by touching them. \n\n3. if you touch the red walls, you will lose health. \n\n4. once you get all the ornaments, you can move on to the next level. \n\n5. when a key is pressed, a new snowflake will be created, and will drop and add to the snow build-up. \n\n6. it will get increasingly harder each level you move on, as the snow build-up speed will be faster. \n\n7. have fun!', 525, 5, 275);
}
