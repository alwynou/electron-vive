import { BrowserWindow, app } from 'electron'

const main = () => {
  const mainWin = new BrowserWindow({
    width: 600,
    height: 400,
  })
  mainWin.loadURL('http://localhost:8990')
}

app.whenReady().then(main)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})
