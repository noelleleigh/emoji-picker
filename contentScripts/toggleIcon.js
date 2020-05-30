// Update the extension icon when color scheme changes
// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries#Receiving_query_notifications

// Create the query list.
const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

// Define a callback function for the event listener.
function handleColorSchemaChange(mql) {
  chrome.runtime.sendMessage({ scheme: mql.matches ? "dark" : "light" });
}

// Run the change handler once.
handleColorSchemaChange(mediaQueryList);

// Add the callback function as a listener to the query list.
mediaQueryList.addListener(handleColorSchemaChange);
