class MouseFollow {
  #blob;
  #page;
  #mouseX = 0;
  #mouseY = 0;
  #blobX = 0;
  #blobY = 0;
  #velocityX = 0;
  #velocityY = 0;
  #ticking = false;
  // store last frame
  #updateFrame = null;

  // spring stiffness
  #stiffness = 0.1;
  // spring damping
  #damping = 0.8;
  // threshold for update check
  #epsilon = 0.5;

  constructor(blob, page) {
    // our element to move
    this.#blob = blob;
    // page
    this.#page = page;
    // start following the mouse
    this.init();
  }

  init() {
    // add eventlisteners to our page
    this.#page.addEventListener("mousemove", this.mouseMove.bind(this));
    this.#page.addEventListener("mouseleave", this.mouseLeave.bind(this));
    this.#page.addEventListener("mouseenter", this.mouseEnter.bind(this));
    // begin the update loop
    this.startUpdateLoop();
  }

  mouseLeave(e) {
    this.#blob.classList.add("gone");
  }
  mouseEnter(e) {
    this.#blob.classList.remove("gone");
  }

  mouseMove(e) {
    // update mouse position on movement
    this.#mouseX = e.clientX;
    this.#mouseY = e.clientY;

    // reset the ticking flag and restart the update loop if mouse moves
    if (!this.#ticking) {
      this.#ticking = true;
      this.startUpdateLoop();
    }
  }

  startUpdateLoop() {
    const update = () => {
      // only update if the mouse is moving and the blob hasn't reached the target position
      if (
        Math.abs(this.#mouseX - this.#blobX) > this.#epsilon &&
        Math.abs(this.#mouseY - this.#blobY) > this.#epsilon
      ) {
        // update position
        this.updatePosition();
        // then loop if not near target position
        this.#updateFrame = requestAnimationFrame(update);
      } else {
        // stop updating when the mouse is stationary and close enough to the blob's position
        this.#ticking = false;
        cancelAnimationFrame(this.#updateFrame);
      }
    };
    // start the animation frame loop
    this.#updateFrame = requestAnimationFrame(update);
  }

  updatePosition() {
    console.log("still going");

    // displacement
    const deltaX = this.#mouseX - this.#blobX;
    const deltaY = this.#mouseY - this.#blobY;

    // spring calculations
    const forceX = deltaX * this.#stiffness - this.#velocityX * this.#damping;
    const forceY = deltaY * this.#stiffness - this.#velocityY * this.#damping;

    // velocity
    this.#velocityX += forceX;
    this.#velocityY += forceY;

    // change position based on velocity
    this.#blobX += this.#velocityX;
    this.#blobY += this.#velocityY;

    // update blob
    this.#blob.style.transform = `translate3d(${this.#blobX + 20}px, ${this.#blobY - 25}px, 0)`;
  }
}
// create my blob
const blob = document.createElement("div");
blob.classList.add("seeker");
// and add it
document.body.appendChild(blob);

// initialize class
const mouse = new MouseFollow(blob, document.body);
