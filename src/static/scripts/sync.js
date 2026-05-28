const swappingSections = document.querySelectorAll("[data-swapping]");

swappingSections.forEach((section) => {
  const tabsInsideSection = section.querySelectorAll("details");

  tabsInsideSection.forEach((tab) => {
    tab.addEventListener("toggle", (event) => {
      if (!tab.open) return;

      const chosenManager = tab.querySelector("summary").textContent.trim();

      syncAllTabsOnPage(chosenManager);
    });
  });
});

function syncAllTabsOnPage(managerName) {
  const allTabs = document.querySelectorAll("[data-swapping] details");

  allTabs.forEach((tab) => {
    const currentTabManager = tab.querySelector("summary").textContent.trim();

    if (currentTabManager === managerName) {
      if (!tab.open) tab.open = true;
    } else {
      if (tab.open) tab.open = false;
    }
  });
}
