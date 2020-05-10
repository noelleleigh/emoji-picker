const inputTypes = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.emoji) {
    const emoji = request.emoji;
    const activeElement = document.activeElement;
    console.log(emoji);
    console.log(activeElement);

    if (
      activeElement.tagName === "INPUT" &&
      ["text", "search"].includes(activeElement.type)
    ) {
      activeElement.value += request.emoji;
    }
  }
});
