const rp = require('request-promise-native');
const { writeFile, readFile } = require('fs');
const { appId, appsecret } = require('../config');
const { resolve } = require('path');
const { rejects } = require('assert');
const menu = require('./menu')
const { writeFileAsync, readFileAsync } = require('../utils/tool')

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
            return writeFileAsync(accessToken, 'access_token.txt')
        }
        // 用来读取本地文件中的access_token
    readAccessToken() {
        return readFileAsync('access_token.txt');
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

        return data.expires_in > (new Date()).getTime();
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

    // 用来获取jsapi_ticket
    getTicket() {

        return new Promise(async(resolve, rejects) => {
            const data = await this.fetchAccessToken();
            const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${data.access_token}&type=jsapi`

            rp({ method: 'GET', url, json: true })
                .then(res => {
                    let time = (new Date()).getTime();

                    resolve({ ticket: res.ticket, expires_in: time + (res.expires_in - 300) * 1000 });
                })
                .catch(err => {
                    console.log(err);
                    rejects("getTicket方法出了问题" + err);
                })
        })
    }

    // 用来保存jsapi_ticket
    saveTicket(ticket) {
            return writeFileAsync(ticket, 'tickent.txt')
        }
        // 用来读取本地文件中的jsapi_ticket
    readTicket() {
        return readFileAsync('ticket.txt');
    }

    // 检测ticket是否有效
    isValidTicket(data) {
        if (!data && !data.ticket && !data.expires_in) {
            return false;
        }
        console.log((new Date()).getTime());
        console.log(data.expires_in);
        return data.expires_in > (new Date()).getTime();
    }

    fetchTicket() {
        if (this.ticket && this.ticket_expires_in && this.isValidTicket(this)) {
            // ticket是有效的
            return Promise.resolve({
                ticket: this.ticket,
                expires_in: this.expires_in
            })
        }
        return this.readTicket()
            .then(async res => {
                // 本地有文件
                // 判断是否过期
                if (this.isValidTicket(res)) {
                    // resolve(res);
                    return Promise.resolve(res)
                } else {
                    const res = await this.getTicket()
                        // 保存到本地文件
                    await this.saveTicket(res)
                        // resolve(res);
                    return Promise.resolve(res)
                }
            })
            .catch(async err => {
                // 没有文件，发送请求获取ticket
                const res = await this.getTicket()
                    // 保存到本地文件
                await this.saveTicket(res)
                    // resolve(res);
                return Promise.resolve(res)
            })
            .then(res => {
                // 将ticket挂载到this上
                this.ticket = res.ticket;
                this.ticket_expires_in = res.expires_in;
                return Promise.resolve(res);
            })
    }

    // 创建自定义菜单
    createMenu(menu) {
            return new Promise(async(resolve, rejects) => {
                try {
                    // 获取access_token
                    const data = await this.fetchAccessToken()
                    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`
                        // 发送请求
                    const result = rp({ method: 'POST', url, json: true, body: menu })
                    resolve(result)
                } catch (e) {
                    rejects('createMenu方法出问题了：' + e)
                }
            })
        }
        // 删除自定义菜单
    deleteMenu() {
        return new Promise(async(resolve, rejects) => {
            try {
                const data = await this.fetchAccessToken();
                const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token} `
                const result = await rp({ method: 'GET', url, json: true })
                resolve(result)
            } catch (e) {
                rejects('deleteMenu方法出问题了：' + e)
            }
        })
    }

}

// (async() => {
//     const w = new Wechat();

//     let result = await w.deleteMenu();
//     console.log(result);

//     result = await w.createMenu(menu);
//     console.log(result);

//     const data = await w.fetchTicket();
//     console.log(data);
// })()

module.exports = Wechat;