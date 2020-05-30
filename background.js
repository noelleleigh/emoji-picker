const getColorScheme = () => {
  mql = matchMedia("(prefers-color-scheme: dark)");
  return mql.matches ? "dark" : "light";
};

const toggleIcon = (scheme) => {
  chrome.browserAction.setIcon({
    path: {
      "48": scheme === "dark" ? "icons/icon48dark.png" : "icons/icon48.png",
    },
  });
};

chrome.runtime.onInstalled.addListener(() => {
  // Set the color scheme upon installation
  toggleIcon(getColorScheme());
});

chrome.runtime.onMessage.addListener((request) => {
  // Listen for color scheme changes
  if (request.scheme) {
    toggleIcon(request.scheme);
  }
});
