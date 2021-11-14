const {app, dialog, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const handleIPC = require('./ipc')

let win
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if (isDev) {
        win.loadURL('http://localhost:3000');
    } else {
        // const url = path.resolve(__dirname, '../renderer/src/main/build/index.html')
        // const url = path.resolve(__dirname, 'static/index.html')
        // win.loadFile(url).then(res => console.log(res)).catch(error => console.error(error))

        // const url = path.resolve(__dirname, 'static/index.html')
        const url = "../../page/index.html"
        win.loadFile(url).then(res => console.log(res)).catch(error => console.error(error))
    }

    handleIPC(win)
}
