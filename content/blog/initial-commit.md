---
title: Initial commit
tags:
  - CSS25
  - CSSDAY
---
## Why bother using JS when you have CSS?

The web development landscape has dramatically shifted in 2025. What once required complex JavaScript libraries and hundreds of lines of code can now be achieved with just a few CSS declarations. It's time we seriously reconsider our JavaScript-first approach.

### The Performance Revolution

**CSS runs on the main thread, but it's optimized by the browser.** JavaScript, on the other hand, blocks the main thread and can cause jank. When you use CSS for animations, transitions, and interactions, you're leveraging the browser's highly optimized rendering engine.

```css
/* Smooth page transitions with just 2 lines */
@view-transition {
  navigation: auto;
}
```

This replaces entire JavaScript routing libraries and provides buttery-smooth page transitions that feel native.

### Interactions Without JavaScript

#### Hover Effects and State Management

The most obvious and usefull one!

And with recent additions even a :has() selector exists
```css
.card {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

/* Parent selector - style parents based on children! */
.form:has(input:invalid) {
  border: 2px solid red;
}
```

**The `:has()` selector is revolutionary** - it's the parent selector we've been waiting decades for! For the first time in CSS history, you can style an element based on what it contains.

#### Real-World `:has()` Examples:

```css
/* Highlight form sections with errors */
.form-section:has(input:invalid) {
  background-color: #fee;
  border-left: 4px solid red;
}

/* Style cards differently when they contain images */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Hide empty containers */
.sidebar:not(:has(*)) {
  display: none;
}

/* Style navigation when user is on current page */
nav:has(a[aria-current="page"]) {
  border-bottom: 2px solid blue;
}
```

Before `:has()`, achieving these effects required:
- Complex JavaScript DOM traversal
- MutationObserver APIs
- Event listeners on child elements
- Constant DOM querying and class manipulation

Now it's just CSS. **Pure, declarative, performant CSS.**

[And it is also a selector that I used for the cool hover effect on my about page! <br/>(Hover over the different bits in the grid!)](../)

#### Scroll-Driven Animations
```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal-on-scroll {
  animation: reveal linear;
  animation-timeline: scroll(root);
  animation-range: entry 0% entry 100%;
}
```

**No Intersection Observer. No scroll event listeners. Just CSS.**
[You can even shift colors with it!](../portfolio/ara)
### View Transitions - The Game Changer
[My personal favorite that I've implemented all across this project!](../)
Perhaps the most revolutionary CSS feature of 2025 is **View Transitions**. With just two lines of CSS, you can transform how users experience navigation on your website.

```css
@view-transition {
  navigation: auto;
}
```

#### What View Transitions Do

Instead of the jarring "flash of white" between page loads, view transitions create smooth crossfades between pages. Elements that remain the same (like headers, navigation) stay perfectly in place, while content that changes fades smoothly from old to new.

#### Before View Transitions:
- Page 1 → **Flash of white** → Page 2
- Headers and navigation "blink" and repaint
- Feels like separate, disconnected pages
- Requires JavaScript libraries like Barba.js or custom solutions

#### After View Transitions:
- Page 1 → **Smooth crossfade** → Page 2  
- Persistent elements never move or flicker
- Feels like a single, cohesive application
- **Zero JavaScript required**

#### Advanced View Transitions

You can also create custom transitions for specific elements:

```css
/* Give an element a transition name */
.hero-image {
  view-transition-name: hero;
}

/* Customize the transition */
::view-transition-old(hero) {
  animation: slide-out 0.3s ease-out;
}

::view-transition-new(hero) {
  animation: slide-in 0.3s ease-out;
}
```

This allows elements to smoothly morph from one page to another, creating the illusion that the same element is moving and changing rather than being replaced.

#### Browser Support Reality

- **Safari 18.2+**: ✅ Full support
- **Chrome 126+**: ✅ Full support  
- **Edge 126+**: ✅ Full support
- **Global coverage**: ~85% of users

The fallback is graceful - browsers without support simply behave normally. No broken experiences, no JavaScript errors.

#### Why This Matters

View transitions represent a fundamental shift in web UX. They make websites feel more like native applications while requiring **zero additional JavaScript**. No more:
- Complex routing libraries
- Manual animation coordination
- Performance overhead from JS-driven transitions
- Accessibility concerns from custom implementations

Just two lines of CSS that work better than anything we could build ourselves.

### Layout That Actually Works

#### Container Queries - The Game Changer
```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

Components that respond to their container, not the viewport. This is what we've been trying to achieve with JavaScript for years.

#### Anchor Positioning - Goodbye Popper.js
```css
.tooltip {
  position: absolute;
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
}
```

Perfect positioning without calculating coordinates, handling edge cases, or importing 50KB libraries.

[I even hid one of these tooltips on my own name on the about page...](../)


### The Maintenance Nightmare of JavaScript

**JavaScript breaks.** CSS degrades gracefully. When your JavaScript fails:
- Users see broken functionality
- You need error boundaries
- Bundle sizes explode
- Dependencies become security risks

When CSS "fails":
- Browsers ignore unknown properties
- Fallbacks work automatically
- Zero runtime errors
- Progressive enhancement by default