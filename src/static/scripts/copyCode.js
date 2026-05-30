document.querySelectorAll(".CodeBlock").forEach((block) => {
  block.addEventListener("click", () => {
    const btn = block.querySelector(".CopyButton");
    if (!btn) return;
    btn.click();
  });
});

document.querySelectorAll(".CopyButton").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      const currentClipboardText = await navigator.clipboard.readText();
      const text = btn.dataset.copy;
      if (currentClipboardText === text) {
        console.log("why??");
        return;
      }
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text);
    }
  });
  btn.classList.add("render");
});
