const homepageUrl = "https://startyparty.dev/";

// Click Icon
chrome.browserAction.onClicked.addListener((tab, onClickData) => {
  switch (onClickData.button) {
    case 0:
      if (onClickData.modifiers.includes("Shift")) {
        browser.sidebarAction.open();
        return;
      }
      chrome.tabs.update(tab.id, { url: homepageUrl, loadReplace: true });
      break;
    case 1:
      chrome.tabs.create({ url: homepageUrl });
      break;
  }
});

// Open New Window
browser.windows.onCreated.addListener(async (window) => {
  if (window.type !== "normal") return;

  const w = await browser.windows.get(window.id, { populate: true });
  const tabs = await browser.tabs.query({ windowId: w.id });

  if (
    tabs.length === 1 &&
    tabs[0].url === "about:blank" &&
    tabs[0].status === "complete" &&
    tabs[0].title === "New Tab"
  ) {
    await browser.tabs.update(tabs[0].id, {
      url: homepageUrl,
      loadReplace: true,
    });
  }
});
