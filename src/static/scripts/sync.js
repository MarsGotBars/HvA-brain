document.querySelectorAll("[role='tab']").forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));
});

document.querySelectorAll("[role='tablist']").forEach((tablist) => {
  const tabs = [...tablist.querySelectorAll("[role='tab']")];

  tablist.addEventListener("keydown", (e) => {
    const current = tabs.indexOf(document.activeElement);
    let next;

    if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;

    e.preventDefault();
    tabs[next].focus();
    activateTab(tabs[next]);
  });
});

function activateTab(selectedTab) {
  const manager = selectedTab.dataset.manager;
  const tablist = selectedTab.closest("[role='tablist']");
  const packageTab = selectedTab.closest(".PackageTab");

  // Find the associated CodeBlock within the same PackageTab
  const codeBlock = packageTab ? packageTab.querySelector(".CodeBlock") : null;

  const update = () => {
    // Update only the tabs in this tablist
    if (tablist) {
      const tabs = [...tablist.querySelectorAll("[role='tab']")];
      tabs.forEach((tab) => {
        const isSelected = tab.dataset.manager === manager;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });
    }

    // Update only the cmd-groups in the associated CodeBlock
    if (codeBlock) {
      const groups = codeBlock.querySelectorAll(".cmd-group");
      groups.forEach((group) => {
        const isActive = group.dataset.manager === manager;
        if (isActive) {
          group.removeAttribute("inert");
        } else {
          group.setAttribute("inert", "");
        }
      });

      // Also update CopyButtons within this CodeBlock if they have data-manager
      const copyButtons = codeBlock.querySelectorAll(".CopyButton[data-manager]");
      copyButtons.forEach((btn) => {
        const isActive = btn.dataset.manager === manager;
        if (isActive) {
          btn.removeAttribute("inert");
        } else {
          btn.setAttribute("inert", "");
        }
      });
    }
  };

  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}
