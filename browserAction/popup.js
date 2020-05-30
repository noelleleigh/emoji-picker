// Close the popup on Esc
document.onkeyup = (e) => {
  if (e.key === "Escape") {
    window.close();
  }
};

// Focus the query input when opened
const queryInput = document.getElementById("query-input");
queryInput.focus();

const emojiList = document.getElementById("emoji-search-results");
const emojis = ["😀", "🥰", "😔"];
emojis.forEach((emoji) => {
  const input = document.createElement("input");
  input.type = "submit";
  input.value = emoji;
  const li = document.createElement("li");
  li.appendChild(input);
  emojiList.appendChild(li);
});

const emojiHandler = async (emoji) => {
  window.close();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { emoji: emoji });
  });
};

const form = document.getElementById("emoji-form");
form.onsubmit = (e) => {
  e.preventDefault();
  emojiHandler(e.submitter.value);
};
