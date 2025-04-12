// cool snippet
// const {matches: motionOk} = window.matchMedia('(prefers-reduced-motion: no-preference)')
// console.log(motionOk);

/**
 * MouseFollow class - Creates a smooth, physics-based cursor follower.
 * 
 * This class creates an element that follows the cursor with a spring-like motion.
 * It has customizable offsets, spring physics parameters, and transition effects.
 */
class MouseFollow {
  _blob;
  _page;

  _mouseLeave;
  _mouseMove;

  _mouseX = 0;
  _mouseY = 0;

  _blobX = 0;
  _blobY = 0;

  _velocityX = 0;
  _velocityY = 0;

  _offsetX = 20;
  _offsetY = 25;
  // Target offset values for lerping
  _targetOffsetX = 20;
  _targetOffsetY = 25;
  
  // Lerp factor (0-1) - higher is faster
  _lerpFactor = 0.1;
  
  _ticking = false;
  // store last frame
  _updateFrame = null;

  // spring stiffness
  _stiffness = 0.1;
  // spring damping
  _damping = 0.6;
  // threshold for update check
  _epsilon = 0.1;

  /**
   * Creates a MouseFollow instance.
   * 
   * @param {HTMLElement} blob - The element that will follow the cursor
   * @param {HTMLElement} page - The container element to track mouse movement within
   */
  constructor(blob, page) {
    // our element to move
    this._blob = blob;
    // page
    this._page = page;

    this._mouseLeave = this.mouseLeave.bind(this);
    this._mouseMove = this.mouseMove.bind(this);
    // start following the mouse
    this.init();
  }

  /**
   * Initialize event listeners and start the animation loop.
   */
  init() {
    // add eventlisteners to our page
    this._page.addEventListener("mousemove", this._mouseMove);
    this._page.addEventListener("mouseleave", this._mouseLeave);
    // begin the update loop
    this.startUpdateLoop();
  }

  /**
   * Handle mouse leave events.
   * @param {MouseEvent} e - The mouse event
   */
  mouseLeave(e) {
    if (!this._blob.classList.contains("locked")) {
      this._blob.classList.add("gone");
    }
  }

  /**
   * Handle mouse move events.
   * @param {MouseEvent} e - The mouse event
   */
  mouseMove(e) {
    if (this._blob.classList.contains("gone")) {
      this._blob.classList.remove("gone");
    }
    // update mouse position on movement
    this._mouseX = e.clientX;
    this._mouseY = e.clientY;

    // reset the ticking flag and restart the update loop if mouse moves
    if (!this._ticking) {
      this._ticking = true;
      this.startUpdateLoop();
    }
  }
  
  /**
   * Linear interpolation function.
   * 
   * See https://en.wikipedia.org/wiki/Linear_interpolation
   * 
   * @param {number} start - Starting value
   * @param {number} end - Target value
   * @param {number} factor - Interpolation factor (0-1)
   * @returns {number} - Interpolated value
   */
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  /**
   * Set target offset values for lerping in update loop.
   * 
   * If no values are provided, the initial values will be used.
   * 
   * @param {number} [offsetX=20] - Target horizontal offset from cursor
   * @param {number} [offsetY=25] - Target vertical offset from cursor
   * 
   */
  changeOffset(offsetX, offsetY) {
    // Set target offsets
    this._targetOffsetX = offsetX ? offsetX : 20;
    this._targetOffsetY = offsetY ? offsetY : 25;
    
    // Ensure update loop is running
    if (!this._ticking) {
      this._ticking = true;
      this.startUpdateLoop();
    }
  }
  /**
   * Check on which side of the screen we are and invert the position of the blob
     */
  screenSideCheck() {
  }
  
  /**
   * Start the animation update loop
   */
  startUpdateLoop() {
    const update = () => {
      // Check if offset values need to be updated
      const offsetXDiff = Math.abs(this._targetOffsetX - this._offsetX);
      const offsetYDiff = Math.abs(this._targetOffsetY - this._offsetY);
      
      // Update offset values with lerp if needed
      if (offsetXDiff > 0.1 || offsetYDiff > 0.1) {
        this._offsetX = this.lerp(this._offsetX, this._targetOffsetX, this._lerpFactor);
        this._offsetY = this.lerp(this._offsetY, this._targetOffsetY, this._lerpFactor);
        this._ticking = true; // Keep updating
      }
      
      // Check if position needs updating
      const positionNeedsUpdate = 
        Math.abs(this._mouseX - this._blobX) > this._epsilon ||
        Math.abs(this._mouseY - this._blobY) > this._epsilon;
      
      if (positionNeedsUpdate || offsetXDiff > 0.1 || offsetYDiff > 0.1) {
        // update position
        this.updatePosition();
        // then loop
        this._updateFrame = requestAnimationFrame(update);
      } else {
        // stop updating when everything is stable
        this._ticking = false;
        cancelAnimationFrame(this._updateFrame);
      }
    };
    // start the animation frame loop
    this._updateFrame = requestAnimationFrame(update);
  }

  /**
   * Update the blob's position using spring physics
   * 
   * Thanks to https://www.joshwcomeau.com/animation/css-mouses-cursor/
   * 
   * Calculates spring forces based on the distance between mouse and blob,
   * updates velocity and position, then applies the transform.
   */
  updatePosition() {
    // displacement
    const deltaX = this._mouseX - this._blobX;
    const deltaY = this._mouseY - this._blobY;

    // spring calculations
    const forceX = deltaX * this._stiffness - this._velocityX * this._damping;
    const forceY = deltaY * this._stiffness - this._velocityY * this._damping;

    // velocity
    this._velocityX += forceX;
    this._velocityY += forceY;

    // change position based on velocity
    this._blobX += this._velocityX;
    this._blobY += this._velocityY;

    // update blob
    this._blob.style.transform = `translate3d(${this._blobX + this._offsetX}px, ${this._blobY - this._offsetY}px, 0)`;
  }
  
  /**
   * Stop tracking mouse movement
   */
  stopTracking() {
    this._page.removeEventListener("mousemove", this._mouseMove);
    this._page.removeEventListener("mouseleave", this._mouseLeave);
  }
}

/**
 * pageClickTransition class - Handles cursor behavior and transitions on links
 * 
 * This class manages the cursor's appearance and behavior when
 * hovering over links, and handles page transitions on click.
 */
class pageClickTransition {
  _blob;
  _blobText;
  _page;
  _mouseTracker;
  
  /**
   * Creates a pageClickTransition instance
   * 
   * @param {HTMLElement} blob - The cursor element
   * @param {HTMLElement} blobText - The text element inside the cursor
   * @param {HTMLElement} page - The container element
   * @param {MouseFollow} mouseTracker - Instance of MouseFollow class
   */
  constructor(blob, blobText, page, mouseTracker) {
    this._blob = blob;
    this._blobText = blobText;
    this._page = page;
    // might use this later on for custom transition
    this._mouseTracker = mouseTracker;

    this.init();
  }
  
  /**
   * Initialize event listeners for links
   */
  init() {
    const links = this._page.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        this._blobText.textContent = link.textContent;
        // update per frame
        requestAnimationFrame(() => {
          const { width, height } = this._blobText.getBoundingClientRect();
          this._blob.style.setProperty("--custom-width", `${width}px`);
          this._blob.style.setProperty("--custom-height", `${height}px`);
        });
        this._blob.classList.add("hovering");
        this._mouseTracker.changeOffset(25, 60);
      });
      
      link.addEventListener("mouseleave", () => {
        this._blob.classList.remove("hovering");
        this._blobText.textContent = "";
        // empty to reset the offset
        this._mouseTracker.changeOffset();
      });
    });
    // ! probably not needed
    this._page.addEventListener("click", (e) => {
      // e.preventDefault();
      console.log(e)
      // this._mouseTracker.stopTracking();

    })
  }
  
  /**
   * Trigger a page transition
   * Currently empty, for future implementation
   */
  triggerPageTransition() {
    // page transition stuff after click...
  }
}

// create my blob
const blob = document.createElement("div");
const blobText = document.createElement("span");
// initial display / state
blob.classList.add("seeker", "gone");

// and add my blob to the body
document.body.appendChild(blob);
blob.append(blobText);

// initialize classes
const mouse = new MouseFollow(blob, document.body);
const clicked = new pageClickTransition(blob, blobText, document.body, mouse);