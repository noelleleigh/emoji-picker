chrome.runtime.onMessage.addListener((request) => {
  // Listen for color scheme changes
  if (request.scheme) {
    chrome.browserAction.setIcon({
      path: {
        "48":
          request.scheme === "dark"
            ? "icons/icon48dark.png"
            : "icons/icon48.png",
      },
    });
  }
});
