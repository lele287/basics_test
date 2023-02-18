const rp = require('request-promise-native');
const request = require('request');
const { writeFile, readFile, createReadStream, createWriteStream } = require('fs');
const { appId, appsecret } = require('../config');
const { resolve, join } = require('path');
const { rejects } = require('assert');
const menu = require('./menu')
const { writeFileAsync, readFileAsync } = require('../utils/tool');
const { reject } = require('async');

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

    // 保存ticket到本地
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

    // 上传临时素材
    uploadTemporayMaterial(type, fileName) {
        try {
            // 获取文件绝对路径
            const filePath = resolve(__dirname, '../media', fileName)
            return new Promise(async(resolve, reject) => {
                const data = await this.fetchAccessToken();
                const url = `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${data.access_token}&type=${type}`
                const formData = {
                        media: createReadStream(filePath)
                    }
                    // 以foem表单的方式发送请求
                const result = rp({ method: 'POST', url, json: true, formData })
                resolve(result)
            })
        } catch (e) {
            reject('uploadTemporayMaterial方法出了问题' + e);
        }
    }

    // 获取临时素材
    getTemporarMaterial(type, mediaId, fileName) {
        // 获取文件绝对路径
        const filePath = resolve(__dirname, '../media', fileName)
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.fetchAccessToken();
                let url = `https://api.weixin.qq.com/cgi-bin/media/get?access_token=${data.access_token}&media_id=${mediaId}`
                if (type === 'video') {
                    // 视频文件只支持http协议
                    url = url.replace('https://', 'http://');
                    const data = await rp({ method: 'GET', url, json: true });
                    resolve(data);
                } else {
                    console.log(filePath);
                    request(url)
                        .pipe(createWriteStream(filePath))
                        .once('close', resolve) //当文件读取完毕时，可读流自动关闭，关闭时触发close事件，调用resolve方法通知外部文件读取完毕
                }
            } catch (e) {
                reject('getTemporarMaterial方法出了问题' + e)
            }
        })
    }

    // 上传永久素材
    uploadPermanentMaterial(type, material, body) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.fetchAccessToken();
                let options = {
                    method: 'POST',
                    json: true
                }
                if (type === 'news') {
                    // 图文消息
                    options.url = `https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=${data.access_token}`
                    options.body = material;
                } else if (type === 'pic') {
                    // 图片
                    options.url = `https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${data.access_token}`
                    options.formData = {
                        media: createReadStream(join(__dirname, '../media', material))
                    }
                } else {
                    options.url = `https https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${data.access_token}&type=${type}`
                    options.formData = {
                            media: createReadStream(join(__dirname, '../media', material))
                        }
                        // 视频素材
                    if (type === 'video') {
                        options.body = body;
                    }
                }
                const result = await rp(options)
                resolve(result);
            } catch (e) {
                reject('uploadPermanentMaterial方法出错' + e)
            }
        })
    }

    // 获取永久素材
    getPermanentMaterial(type, mediaId, fileName) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.fetchAccessToken();
                const url = `https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=${data.access_token}`

                const options = { method: 'POST', url, json: true, body: { media_id: mediaId } }

                if (type === 'news' || 'video') {
                    const data = await rp(options);
                    resolve(data)
                } else {
                    request(options)
                        .pipe(createWriteStream(join(__dirname, '../media', fileName)))
                        .once('close', resolve)
                }
            } catch (e) {
                reject('getPermanentMaterial方法出了问题' + e);
            }
        })
    }

    // 上传素材
    uploadMaterial(type, material, body, isPermanent = false) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.fetchAccessToken();
                let options = {
                    method: 'POST',
                    json: true,
                    formData: {
                        media: createReadStream(join(__dirname, '../media', material))
                    }
                }

                if (isPermanent) {
                    // 永久素材的逻辑
                    if (type === 'news') {
                        // 图文消息
                        options.url = `https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=${data.access_token}`
                        options.body = material;
                        options.formData = null;
                    } else if (type === 'pic') {
                        // 图片
                        options.url = `https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${data.access_token}`

                    } else {
                        options.url = `https https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${data.access_token}&type=${type}`

                        // 视频素材
                        if (type === 'video') {
                            options.body = body;
                        }
                    }
                } else {
                    // 临时素材逻辑
                    options.url = `https https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${data.access_token}&type=${type}`

                }

                const result = await rp(options)
                resolve(result);
            } catch (e) {
                reject('uploadPermanentMaterial方法出错' + e)
            }
        })
    }

}

(async() => {
    const w = new Wechat();
    let result
        // 删除自定义菜单
    result = await w.deleteMenu();
    console.log(result);

    // 创建自定义菜单
    result = await w.createMenu(menu);
    console.log(result);

    // 保存ticket到本地
    result = await w.fetchTicket();
    console.log(result);

    // 上传临时素材
    // result = await w.uploadTemporayMaterial('image', '项目目录结构.png')
    // console.log(result);

    // 获取临时素材
    // result = await w.getTemporarMaterial('image', '-9Z1rQLjLaic1V5FDWNvIOGJ7zDPmXEywsa8G-Bv5_D4nTM-T59fYmUd16zUjNS4', '临时素材.png')
    // console.log(result);
})()

module.exports = Wechat;