import { generateRandomStringBase64 } from './helpers';
import { flow, browerApi } from '../../config';

let ua_system_version: any[] = ['Windows 7', 'Windows 8', 'Windows 10', 'Windows 11', 'Mac OS X 12', 'Mac OS X 13'];

const createBrower = (options: any) => {
    return new Promise((resolve, reject) => {
        if (!options) return reject('参数有误');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let randomStr = generateRandomStringBase64();
        let region = '';
        let countyCode = 'us';
        if (options.countyCode) {
            countyCode = options.countyCode.toLowerCase();
            region = `-region-${countyCode}`;
        }
        const raw = JSON.stringify({
            group_id: '0',
            open_urls: options.open_urls,
            fingerprint_config: {
                random_ua: {
                    ua_system_version
                }
            },
            user_proxy_config: {
                proxy_soft: 'ipideaauto',
                proxy_type: 'socks5',
                proxy_host: `${flow['IPIDEA']['api']}`,
                proxy_port: `${flow['IPIDEA']['port']}`,
                proxy_user: `${flow['IPIDEA']['account']}-zone-custom${region}-session-${randomStr}-sessTime-120`,
                proxy_password: `${flow['IPIDEA']['password']}`
            },
            country: countyCode
        });

        const requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${browerApi}/api/v1/user/create`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log('result: ', result);
                if (result.code === 0) {
                    resolve(result);
                } else if (result.code === 8616) {
                    reject(`窗口超过最大创建限制，请删除窗口后再使用`);
                } else {
                    reject(result.msg);
                }
            })
            .catch((error) => {
                console.log('error: ', error);
                reject(`${error.message}：请检查指纹浏览器是否已经正常启动。`);
            });
    });
};

function openBrower(id: any) {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject('启动出错,请检查指纹浏览器是否已经启动');
        }
        const requestOptions: any = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${browerApi}/api/v1/browser/start?user_id=${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log('result: ', result);
                if (result.code === 0) {
                    resolve(result);
                } else {
                    reject(result.msg);
                }
            })
            .catch((error) => {
                console.log('error: ', error);
                reject(error.message);
            });
    });
}

export { createBrower, openBrower };
