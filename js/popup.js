document.getElementById("exportBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: exportTranscript,
  });
});

function exportTranscript() {
  chrome.runtime.sendMessage({ action: "exportTranscript" });
}
