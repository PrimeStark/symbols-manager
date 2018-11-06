import BrowserWindow from 'sketch-module-web-view'

const UI = require('sketch/ui')
const sketch = require('sketch')

export default function(context) {
  const options = {
    identifier: 'unique.id',
    width: 240,
    height: 180,
    show: false,
  }

  var browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  const document = sketch.fromNative(context.document)
  const pages = document.pages
  const symbolsPage = pages.find(p => p.name === 'Symbols')

  const getSymbolsInfo = page => {
    if (!page) {
      console.log('No symbols page found')
      log('No symbols page found')
    }

    page.layers.map(l => {
      console.log(`Symbol name is: ${l.name} with id ${l.symbolId}`)
      log(`Symbol name is: ${l.name} with id ${l.symbolId}`)
    })
  }

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', s => {
    UI.message(s)
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })

  webContents.on('symbolsLog', s => {
    UI.message(s)
    getSymbolsInfo(symbolsPage)
    webContents.executeJavaScript(`getSymbols()`).catch(console.error)
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}
