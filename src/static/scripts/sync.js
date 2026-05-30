function activateTab(selectedTab) {
  const manager = selectedTab.dataset.manager;

  const update = () => {
    document.querySelectorAll("[role='tablist']").forEach((tablist) => {
      tablist.querySelectorAll("[role='tab']").forEach((tab) => {
        const isSelected = tab.dataset.manager === manager;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });
    });

    document.querySelectorAll(".cmd-group").forEach((group) => {
      group.toggleAttribute("inert", group.dataset.manager !== manager);
    });
  };

  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

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

document.querySelectorAll("[role='tab']").forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));
});
