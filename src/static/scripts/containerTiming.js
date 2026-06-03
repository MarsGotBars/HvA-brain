const firstPaints = {};
let hoverAt = null;

document.addEventListener("mouseover", (e) => {
  if (e.target.closest('[containertiming="steamhappy"]')) {
    hoverAt = performance.now();
  }
});

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!firstPaints[entry.identifier]) {
      firstPaints[entry.identifier] = entry.firstRenderTime;
    }

    const elapsed = (entry.startTime - firstPaints[entry.identifier]).toFixed(1);
    const startSeconds = (entry.startTime / 1000).toFixed(2);

    console.log(
      "Container painted:",
      entry.identifier,
      "at",
      `${startSeconds}s`,
      "size:",
      entry.size,
      "| +",
      `${elapsed}ms since first paint`,
      "| last painted el:",
      entry.lastPaintedElement,
    );

    if (entry.identifier === "steamhappy" && hoverAt) {
      console.log("hover to paint:", (entry.startTime - hoverAt).toFixed(1) + "ms");
      hoverAt = null;
    }

    console.log(entry);
  }
});

observer.observe({ entryTypes: ["container"] });
