// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', e => {
  e.preventDefault()
})

// called from the plugin
document.getElementById('button-symbols').addEventListener('click', () => {
  window.postMessage('symbolsLog', 'Got Symbols')
})

window.getSymbols = function() {
  document.getElementById('answer-symbols').innerHTML =
    'Symbols called. Check dev tools console.'
}
