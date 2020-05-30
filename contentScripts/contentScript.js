const inputTypes = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.emoji) {
    const emoji = request.emoji;
    const activeElement = document.activeElement;

    if (
      activeElement.tagName === "INPUT" &&
      ["text", "search"].includes(activeElement.type)
    ) {
      activeElement.value += request.emoji;
    } else {
      console.error(`Don't know how to write to ${activeElement.tagName}`);
    }
  }
});
