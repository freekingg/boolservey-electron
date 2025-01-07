import { app, BrowserWindow, ipcMain, screen } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
function generateRandomStringBase64(length = 8) {
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  return btoa(String.fromCharCode(...randomBytes)).replace(/[+/=]/g, "").slice(0, length);
}
const flow = {
  "IPIDEA": {
    name: "IPIDEA",
    api: "e3954635a37ce335.lqz.na.ipidea.online",
    port: "2333",
    account: "belj506",
    password: "belj506"
  }
};
const browerApi = "http://local.adspower.net:50325";
let ua_system_version = ["Windows 7", "Windows 8", "Windows 10", "Windows 11", "Mac OS X 12", "Mac OS X 13"];
const createBrower = (options) => {
  return new Promise((resolve, reject) => {
    if (!options) return reject("参数有误");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let randomStr = generateRandomStringBase64();
    let region = "";
    let countyCode = "us";
    if (options.countyCode) {
      countyCode = options.countyCode.toLowerCase();
      region = `-region-${countyCode}`;
    }
    const raw = JSON.stringify({
      group_id: "0",
      open_urls: options.open_urls,
      fingerprint_config: {
        random_ua: {
          ua_system_version
        }
      },
      user_proxy_config: {
        proxy_soft: "ipideaauto",
        proxy_type: "socks5",
        proxy_host: `${flow["IPIDEA"]["api"]}`,
        proxy_port: `${flow["IPIDEA"]["port"]}`,
        proxy_user: `${flow["IPIDEA"]["account"]}-zone-custom${region}-session-${randomStr}-sessTime-120`,
        proxy_password: `${flow["IPIDEA"]["password"]}`
      },
      country: countyCode
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch(`${browerApi}/api/v1/user/create`, requestOptions).then((response) => response.json()).then((result) => {
      console.log("result: ", result);
      if (result.code === 0) {
        resolve(result);
      } else if (result.code === 8616) {
        reject(`窗口超过最大创建限制，请删除窗口后再使用`);
      } else {
        reject(result.msg);
      }
    }).catch((error) => {
      console.log("error: ", error);
      reject(`${error.message}：请检查指纹浏览器是否已经正常启动。`);
    });
  });
};
function openBrower(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject("启动出错,请检查指纹浏览器是否已经启动");
    }
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${browerApi}/api/v1/browser/start?user_id=${id}`, requestOptions).then((response) => response.json()).then((result) => {
      console.log("result: ", result);
      if (result.code === 0) {
        resolve(result);
      } else {
        reject(result.msg);
      }
    }).catch((error) => {
      console.log("error: ", error);
      reject(error.message);
    });
  });
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: width - 200,
    height: height - 100,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,Bool, like Gecko) Chrome/131.0.0.0 Safari/537.36");
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.handle("create-brower", async (_event, args) => {
  console.log("args: ", args);
  return new Promise((resolve, reject) => {
    createBrower(args).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
});
ipcMain.handle("open-brower", async (_event, args) => {
  return new Promise((resolve, reject) => {
    openBrower(args).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  });
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
