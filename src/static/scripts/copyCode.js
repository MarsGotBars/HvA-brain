document.querySelectorAll(".CopyButton").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text);
  });
  btn.classList.add("render");
});
