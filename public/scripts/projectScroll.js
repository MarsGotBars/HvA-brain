const observeItems = document.querySelectorAll('[data-observeable]');
const percentage = 40;
console.log('initialized');

const intersectionSettings = {
  root: null, // Use the viewport
  rootMargin: `-${percentage}% 0px 0px 0px`,
  threshold: [0, 1],
};

const animateItIn = (item) => {
  const itemChildren = item.querySelectorAll('[data-view]');
  itemChildren.forEach((child) => {
    child.dataset.view = "viewing";
  });
  console.log('animating!');
};

const intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!document.startViewTransition) {
        animateItIn(entry.target);
      } else {
        console.log('here!');
        const transition = document.startViewTransition(() => animateItIn(entry.target));
      }
      // Stop observing this item after animating
      itemIntersection.unobserve(entry.target);
    }
  });
};

let itemIntersection = new IntersectionObserver(
  intersectionCallback,
  intersectionSettings
);

observeItems.forEach((item) => {
  itemIntersection.observe(item);
});
