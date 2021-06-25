const { ipcRenderer } = require('electron')
btnCrawl = document.getElementById("crawl");
url = document.getElementById("url");


btnCrawl.addEventListener("click", () => {
  console.log('Send');
  ipcRenderer.send('request-mainprocess-action', url.value);
});

