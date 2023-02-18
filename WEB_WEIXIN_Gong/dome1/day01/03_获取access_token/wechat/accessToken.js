const rp = require('request-promise-native');
const { writeFile, readFile } = require('fs');
const { appId, appsecret } = require('../config');
const { resolve } = require('path');
const { rejects } = require('assert');


class Wechat {
    constructor() {

        }
        // 用来获取access_token
    getAccessToken() {
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`

        return new Promise((resolve, rejects) => {
            rp({ method: 'GET', url, json: true })
                .then(res => {
                    console.log(res);
                    // {
                    //     access_token: '39_WTxoqJXh5J_VvF930qZl3gsdan5O_weh4Va93LRwgG4Cdxkn8U-tnutkv-rV-73KXCo8F4rdAJTVfDCEeRMpm4GsTq9rH4fj4JE5eSOAMWLXb6k-h0HNuPmk3yf6d2d7ERbsdpG9hvXTrVlYNCOgACADSE',
                    //     expires_in: 7200
                    //   }

                    let time = (new Date()).getTime();
                    console.log(time);
                    res.expires_in = time + (res.expires_in - 300) * 1000;

                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    rejects("getAccessToken方法出了问题" + err);
                })
        })
    }

    // 用来保存access_token
    saveAccessToken(accessToken) {
            accessToken = JSON.stringify(accessToken)
            return new Promise((resolve, rejects) => {
                writeFile('./accessToken.txt', accessToken, err => {
                    if (!err) {
                        console.log('文件保存成功');
                        resolve();
                    } else {
                        rejects('saveAccessToken方法出错了：' + err)
                    }
                })
            })
        }
        // 用来读取本地文件中的access_token
    readAccessToken() {
        return new Promise((resolve, rejects) => {
            readFile('./accessToken.txt', (err, data) => {
                if (!err) {
                    console.log('文件读取成功');
                    data = JSON.parse(data)
                    resolve(data);
                } else {
                    rejects('readAccessToken方法出错了：' + err);
                }
            })
        })
    }

    // 检测access_token是否有效
    isValidAccessToken(data) {
        if (!data && !data.access_token && !data.expires_in) {
            return false;
        }

        // 检测access_token 是否在有效期内
        // if(data.expires_in < Data.now()){
        //     return false
        // }else{
        //     return true
        // }

        return data.expires_in > Data.now();
    }

    fetchAccessToken() {
        if (this.access_token && this.expires_in && this.isValidAccessToken) {
            // access_token是有效的
            return Promise.resolve({
                access_token: this.access_token,
                expires_in: this.expires_in
            })
        }

        return this.readAccessToken()
            .then(async res => {
                // 本地有文件
                // 判断是否过期
                if (this.isValidAccessToken(res)) {
                    // resolve(res);
                    return Promise.resolve(res)
                } else {
                    const res = await this.getAccessToken()
                        // 保存到本地文件
                    await this.saveAccessToken(res)
                        // resolve(res);
                    return Promise.resolve(res)
                }
            })
            .catch(async err => {
                // 没有文件，发送请求获取access_token
                const res = await this.getAccessToken()
                    // 保存到本地文件
                await this.saveAccessToken(res)
                    // resolve(res);
                return Promise.resolve(res)
            })
            .then(res => {
                // 将access_token挂载到this上
                this.access_token = res.access_token;
                this.expires_in = res.expires_in;
                return Promise.resolve(res);
            })
    }
}



// // 模拟测试
// const w = new Wechat();
// w.getAccessToken();

// new Promise((resolve, rejects) => {
//         w.readAccessToken()
//             .then(res => {
//                 // 本地有文件
//                 // 判断是否过期
//                 if (w.isValidAccessToken(res)) {
//                     resolve(res)
//                 } else {
//                     w.getAccessToken()
//                         .then(res => {
//                             // 保存到本地文件
//                             w.saveAccessToken(res)
//                                 .then(() => {
//                                     resolve(res);
//                                 })
//                         })
//                 }
//             })
//             .catch(err => {
//                 // 没有文件，发送请求获取access_token
//                 w.getAccessToken()
//                     .then(res => {
//                         // 保存到本地文件
//                         w.saveAccessToken(res)
//                             .then(() => {
//                                 resolve(res);
//                             })
//                     })
//             })
//     })
//     .then(res => {
//         console.log(res);
//     })