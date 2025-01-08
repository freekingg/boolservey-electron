import { app, BrowserWindow, ipcMain, screen, dialog  } from 'electron'
import { autoUpdater }  from 'electron-updater';

// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {createBrower,openBrower} from './lib/brower'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {

  autoUpdater.checkForUpdatesAndNotify();

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: width - 200,
    height: height - 100,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  win.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,Bool, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// 处理 invoke 调用
ipcMain.handle('create-brower', async (_event, args:any) => {
  console.log('args: ', args);
  return new Promise((resolve, reject) => {
    createBrower(args).then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
    });
  })
});

ipcMain.handle('open-brower', async (_event, args) => {
  return new Promise((resolve, reject) => {
    openBrower(args).then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
    });
  })
});



// 自动更新事件处理
autoUpdater.on('update-available', (info) => {
  console.log('发现更新:', info);
  // 可选择提示用户更新
  dialog.showMessageBox(win, {
    type: 'info',
    buttons: ['更新', '稍后'],
    title: '更新可用',
    message: `发现新版本: ${info.version}\n\n是否立即更新？`
  }).then((response) => {
    if (response.response === 0) {
      autoUpdater.downloadUpdate(); // 下载更新
    }
  });
});

autoUpdater.on('update-not-available', () => {
  console.log('没有可用的更新');
});

autoUpdater.on('error', (error) => {
  console.error('更新失败:', error);
});

autoUpdater.on('update-downloaded', (info: any) => {
  console.log('更新已下载:', info);
  // 下载完成后，提示用户重启应用进行安装
  dialog.showMessageBox(win, {
    type: 'info',
    buttons: ['立即重启', '稍后'],
    title: '更新下载完成',
    message: `新版本已经下载完成。\n\n是否立即重启应用？`
  }).then((response) => {
    if (response.response === 0) {
      autoUpdater.quitAndInstall(); // 重启并安装更新
    }
  });
});

app.whenReady().then(createWindow)
