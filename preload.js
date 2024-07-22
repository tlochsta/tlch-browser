const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const forwardButton = document.getElementById('forward');
  const backButton = document.getElementById('back');
  const refreshButton = document.getElementById('refresh');
  const urlBar = document.getElementById('url');

  forwardButton.addEventListener('click', () => {
    ipcRenderer.send('navigate', 'forward');
  });

  backButton.addEventListener('click', () => {
    ipcRenderer.send('navigate', 'back');
  });

  refreshButton.addEventListener('click', () => {
    ipcRenderer.send('navigate', 'refresh');
  });

  urlBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      ipcRenderer.send('navigate', 'url', urlBar.value);
    }
  });

  ipcRenderer.on('update-url', (event, url) => {
    urlBar.value = url;
  });
});
