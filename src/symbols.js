/* globals AppController, NSWorkspace */
/* eslint-disable global-require */
const sketch = require('sketch') // eslint-disable-line
const UI = require('sketch/ui') // eslint-disable-line
const BrowserWindow = require('sketch-module-web-view')

export default function() {
  const options = {
    identifier: 'symbols.manager',
    width: 830,
    height: 400,
    minWidth: 700,
    minHeight: 300,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    acceptFirstMouse: true,
    title: 'Sketch DevTools',
    resizable: true,
    show: false,
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const { webContents } = browserWindow

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  // const document = sketch.fromNative(context.document)
  // const { pages } = document
  // const symbolsPage = pages.find(p => p.name === 'Symbols')

  // const getSymbolsInfo = page => {
  //   if (!page) {
  //     console.log('No symbols page found')
  //     log('No symbols page found')
  //   }

  //   page.layers.map(l => {
  //     console.log(`Symbol name is: ${l.name} with id ${l.symbolId}`)
  //     log(`Symbol name is: ${l.name} with id ${l.symbolId}`)
  //     return l
  //   })
  // }

  // add a handler for a call from web content's javascript
  // webContents.on('nativeLog', s => {
  //   UI.message(s)
  //   webContents
  //     .executeJavaScript(`setRandomNumber(${Math.random()})`)
  //     .catch(console.error)
  // })

  // webContents.on('symbolsLog', s => {
  //   UI.message(s)
  //   getSymbolsInfo(symbolsPage)
  //   webContents.executeJavaScript(`getSymbols()`).catch(console.error)
  // })

  browserWindow.loadURL(require('../resources/webview.html'))
}
