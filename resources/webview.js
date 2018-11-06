// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
});

document.getElementById('button').addEventListener('click', () => {
  window.postMessage('nativeLog', 'Called from the webview')
});

// called from the plugin
window.setRandomNumber = function (randomNumber) {
  document.getElementById('answer').innerHTML =    `Random number from the plugin: ${  randomNumber}`;
};

// My
document.getElementById('button-symbols').addEventListener('click', () => {
  window.postMessage('symbolsLog', 'Got Symbols')
});

window.getSymbols = function () {
  document.getElementById('answer-symbols').innerHTML = 'Symbols called';
};
