const observeItems = document.querySelectorAll("[data-observeable]");
observeItems.forEach((item) => {
  const itemChild = item.querySelectorAll("[data-view]");
  console.log(itemChild);
  itemChild.forEach((child) => {
    child.dataset.view = "ready";
  });
});
const percentage = 40;
console.log("initialized");

const intersectionSettings = {
  root: null, // Use the viewport
  rootMargin: `-${percentage}% 0px 0px 0px`,
  threshold: [0, 1],
};

const animateItIn = (item) => {
  const itemChildren = item.querySelectorAll("[data-view]");

  itemChildren.forEach((child) => {
    child.dataset.view = "visible";
  });
  console.log("animating!");
};

const intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateItIn(entry.target);
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
