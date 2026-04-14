console.log("initialized");
const observeItems = document.querySelectorAll("[data-triggered]");

const percentage = 0;

const intersectionSettings = {
  root: null, // Use the viewport
  rootMargin: `${percentage}% 0px 0px 0px`,
  threshold: [0.4],
};

const intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry, "triggered");

      entry.target.dataset.triggered = "true";
      triggerEnhancement(entry.target);
      // Stop observing this item after animating
      itemIntersection.unobserve(entry.target);
    }
  });
};

const triggerEnhancement = (parent) => {
  const children = parent.querySelectorAll("[data-char]");
  children.forEach((child, index) => {
    // Calculate delay for each child based on its index
    const delay = index * 45 + 600;
    setTimeout(() => {
      child.dataset.enhanced = "true";
    }, delay);
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
