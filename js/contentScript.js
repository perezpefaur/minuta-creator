let transcript = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "exportTranscript") {
    console.log("entro al export");
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
  console.log("dentro funcion export");
  const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  console.log("dentro funcion export2");

  a.href = url;
  a.download = "transcripcion.txt";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
