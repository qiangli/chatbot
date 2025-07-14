chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showChatPopup,
    });
  }
});

function showChatPopup() {
  const id = 'ai-chatbot-iframe';
  if (document.getElementById(id)) return;
  const iframe = document.createElement('iframe');
  iframe.id = id;

  iframe.style.zIndex = '9999';
  iframe.style.border = '0';
  iframe.style.overflow = 'hidden';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  // iframe.style.width = '300px';
  iframe.style.height = '400px';
  iframe.style.background = 'transparent';

  iframe.src = 'http://localhost:18083/';

  document.body.appendChild(iframe);
}
