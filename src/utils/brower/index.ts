
// let browerApi: string = 'https://boolsruvey.mynatapp.cc';
// let browerApi = 'https://6d38-205-198-121-5.ngrok-free.app'
// let ua_system_version: any[] = ['Windows 7', 'Windows 8', 'Windows 10', 'Windows 11', 'Mac OS X 12', 'Mac OS X 13'];

function createBrower(options: any) {
    if (!options) return;
    return new Promise((resolve, reject) => {
        window.ipcRenderer
            .invoke('create-brower', options)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function openBrower(id: any) {
    if (!id) return;
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject('启动出错,请检查指纹浏览器是否已经启动');
        }
        window.ipcRenderer
            .invoke('open-brower', id)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export { createBrower, openBrower };
