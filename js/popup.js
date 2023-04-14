document.getElementById("exportBtn").addEventListener("click", async () => {
  console.log("presh button");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: exportTranscript,
  });
});

function exportTranscript() {
  console.log("export transcript");
  chrome.runtime.sendMessage({ action: "exportTranscript" });
}
