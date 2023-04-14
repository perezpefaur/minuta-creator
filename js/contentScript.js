let transcript = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "exportTranscript") {
    exportTranscript();
  }
});

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          transcript += node.textContent.trim() + "\n";
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

function exportTranscript() {
  const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "transcripcion.txt";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
