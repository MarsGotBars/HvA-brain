const observeItems = document.querySelectorAll("[data-triggered]");

const percentage = 0;
console.log("initialized");

const intersectionSettings = {
  root: null, // Use the viewport
  rootMargin: `${percentage}% 0px 0px 0px`,
  threshold: [.4],
};

const intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry, "triggered");

      entry.target.dataset.triggered = "true";
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
  item.dataset.triggered = "ready";
  itemIntersection.observe(item);
});
