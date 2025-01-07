import { app as l, BrowserWindow as m, ipcMain as _, screen as I } from "electron";
import { fileURLToPath as E } from "node:url";
import a from "node:path";
function R(o = 8) {
  const n = crypto.getRandomValues(new Uint8Array(o));
  return btoa(String.fromCharCode(...n)).replace(/[+/=]/g, "").slice(0, o);
}
const c = {
  IPIDEA: {
    name: "IPIDEA",
    api: "e3954635a37ce335.lqz.na.ipidea.online",
    port: "2333",
    account: "belj506",
    password: "belj506"
  }
}, h = "http://local.adspower.net:50325";
let A = ["Windows 7", "Windows 8", "Windows 10", "Windows 11", "Mac OS X 12", "Mac OS X 13"];
const T = (o) => new Promise((n, r) => {
  if (!o) return r("参数有误");
  const i = new Headers();
  i.append("Content-Type", "application/json");
  let e = R(), w = "", p = "us";
  o.countyCode && (p = o.countyCode.toLowerCase(), w = `-region-${p}`);
  const y = JSON.stringify({
    group_id: "0",
    open_urls: o.open_urls,
    fingerprint_config: {
      random_ua: {
        ua_system_version: A
      }
    },
    user_proxy_config: {
      proxy_soft: "ipideaauto",
      proxy_type: "socks5",
      proxy_host: `${c.IPIDEA.api}`,
      proxy_port: `${c.IPIDEA.port}`,
      proxy_user: `${c.IPIDEA.account}-zone-custom${w}-session-${e}-sessTime-120`,
      proxy_password: `${c.IPIDEA.password}`
    },
    country: p
  }), P = {
    method: "POST",
    headers: i,
    body: y,
    redirect: "follow"
  };
  fetch(`${h}/api/v1/user/create`, P).then((s) => s.json()).then((s) => {
    console.log("result: ", s), s.code === 0 ? n(s) : s.code === 8616 ? r("窗口超过最大创建限制，请删除窗口后再使用") : r(s.msg);
  }).catch((s) => {
    console.log("error: ", s), r(`${s.message}：请检查指纹浏览器是否已经正常启动。`);
  });
});
function v(o) {
  return new Promise((n, r) => {
    if (!o)
      return r("启动出错,请检查指纹浏览器是否已经启动");
    const i = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${h}/api/v1/browser/start?user_id=${o}`, i).then((e) => e.json()).then((e) => {
      console.log("result: ", e), e.code === 0 ? n(e) : r(e.msg);
    }).catch((e) => {
      console.log("error: ", e), r(e.message);
    });
  });
}
const f = a.dirname(E(import.meta.url));
process.env.APP_ROOT = a.join(f, "..");
const d = process.env.VITE_DEV_SERVER_URL, C = a.join(process.env.APP_ROOT, "dist-electron"), u = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = d ? a.join(process.env.APP_ROOT, "public") : u;
let t;
function g() {
  const { width: o, height: n } = I.getPrimaryDisplay().workAreaSize;
  t = new m({
    icon: a.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: o - 200,
    height: n - 100,
    webPreferences: {
      preload: a.join(f, "preload.mjs")
    }
  }), t.webContents.on("did-finish-load", () => {
    t == null || t.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), t.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,Bool, like Gecko) Chrome/131.0.0.0 Safari/537.36"), d ? t.loadURL(d) : t.loadFile(a.join(u, "index.html"));
}
l.on("window-all-closed", () => {
  process.platform !== "darwin" && (l.quit(), t = null);
});
l.on("activate", () => {
  m.getAllWindows().length === 0 && g();
});
_.handle("create-brower", async (o, n) => (console.log("args: ", n), new Promise((r, i) => {
  T(n).then((e) => {
    r(e);
  }).catch((e) => {
    i(e);
  });
})));
_.handle("open-brower", async (o, n) => new Promise((r, i) => {
  v(n).then((e) => {
    r(e);
  }).catch((e) => {
    i(e);
  });
}));
l.whenReady().then(g);
export {
  C as MAIN_DIST,
  u as RENDERER_DIST,
  d as VITE_DEV_SERVER_URL
};
