import path from 'path'
import { BrowserWindow, app } from 'electron'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.loadURL(__DEV__ ? `http://localhost:${__DEV_PORT__}` : `file://${path.resolve(__dirname, '../index.html')}`)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow()
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
      app.quit()
  })
})

