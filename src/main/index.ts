import { BrowserWindow, app } from 'electron'
import { plus } from './app'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  // eslint-disable-next-line n/no-path-concat
  __DEV__ ? win.loadURL(`http://localhost:${__DEV_PORT__}`) : win.loadFile(`file://${__dirname}/index.html`)
}

app.whenReady().then(() => {
  createWindow()
  console.log(plus())
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
      app.quit()
  })
})

