const canvas = document.querySelector("canvas"); // picking canvas
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.image = new Image(); // drawing the image with draw method
    this.image.src = imageSrc;
  }

  draw() {
    if (!this.image) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
  }
  draw() {
    c.fillStyle = "red"; // creating red box
    c.fillRect(this.position.x, this.position.y, 100, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x; // for everyframe we call update adding to velocity
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      //
      this.velocity.y += gravity;
    else this.velocity.y = 0; /// cannot go outside of the canvas
  }
}

const player = new Player({
  x: 0,
  y: 0,
});
const player2 = new Player({
  x: 300,
  y: 100,
});

// animation

// INPUT KEYS
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/Background.png",
});
function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(4, 2);  /// zoom in 
  background.update();
  c.restore();
  player.update();
  player2.update();

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
  if (keys.a.pressed) player.velocity.x = -5;
}

animate(); // activating animation loop

window.addEventListener("keydown", (event) => {
  // click event up down key down events
  switch (
    event.key // event key D activete x + 1
  ) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    ///jump below
    case "w":
      player.velocity.y = -10; // velocity y = up /// jump
      break;
  }
});

window.addEventListener("keyup", (event) => {
  // click event up down key down events
  // if keys false stop move
  switch (
    event.key // event key D activete x + 1
  ) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
