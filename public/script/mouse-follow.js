class MouseFollow {
  #blob;
  #page;

  #mouseX = 0;
  #mouseY = 0;

  #blobX = 0;
  #blobY = 0;

  #velocityX = 0;
  #velocityY = 0;

  #offsetX = 20
  #offsetY = 25
  #ticking = false;
  // store last frame
  #updateFrame = null;

  // spring stiffness
  #stiffness = 0.1;
  // spring damping
  #damping = 0.6;
  // threshold for update check
  #epsilon = 0.1;

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
    // begin the update loop
    this.startUpdateLoop();
  }

  mouseLeave(e) {
    if (!this.#blob.classList.contains("locked")) {
      this.#blob.classList.add("gone");
    }
  }

  mouseMove(e) {
    if (this.#blob.classList.contains("gone")) {
      this.#blob.classList.remove("gone");
    }
    // update mouse position on movement
    this.#mouseX = e.clientX;
    this.#mouseY = e.clientY;

    // reset the ticking flag and restart the update loop if mouse moves
    if (!this.#ticking) {
      this.#ticking = true;
      this.startUpdateLoop();
    }
  }
  screenSideCheck() {
    // check on which side of the screen we are and invert the position of the blob
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
    this.#blob.style.transform = `translate3d(${this.#blobX + this.#offsetX}px, ${this.#blobY - this.#offsetY}px, 0)`;
  }

  get blob() {
    return this.#blob;
  }
}
document.querySelectorAll("a")
class pageClickTransition {
  #blob
  #blobText
  #page
  constructor(blob, blobText, page) {
    this.#blob = blob
    this.#blobText = blobText
    this.#page = page
    this.init()
  }
  init() {
    console.log(this.#page);
    
    const links = this.#page.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("mouseenter", ()=>{
        this.#blobText.textContent = link.textContent;
        this.#blobText.style.opacity = "0"
        this.#blob.classList.add("hovering")
      })
      link.addEventListener("mouseleave", ()=>{
        this.#blobText.textContent = ""
        this.#blob.classList.remove("hovering")
        this.lerpSize()

      })
    });
    
    // this.#page.addEventListener("click", () => {
    //   this.#blob.classList.toggle("transitioning")

    // })

  }
  lerpSize(){
    console.log(this.#blob.getBoundingClientRect());
    
  }
  triggerPageTransition() {

  }
}
// create my blob
const blob = document.createElement("div");
const blobText = document.createElement("span");
blob.classList.add("seeker", "gone");
// and add it
document.body.appendChild(blob);
blob.append(blobText)
// initialize class
const mouse = new MouseFollow(blob, document.body);
const clicked = new pageClickTransition(blob, blobText, document.body)
