const { rejects } = require("assert");
const { resolve } = require("path");
// 引入xml2js模块,将xml数据装换成js对象
const { parseString } = require('xml2js')
const { writeFile, readFile } = require('fs');

module.exports = {
    getUserDataAsync(req) {
        return new Promise((resolve, rejects) => {
            let xmlData = ''
                // 当流式数据过来是 触发
            req.on('data', data => {
                    console.log(data);
                    xmlData += data.toString();
                })
                .on('end', () => {
                    // 当流式数据接受完毕时 触发
                    resolve(xmlData)
                })
        })
    },

    parseXMLAsync(xmlData) {
        return new Promise((resolve, rejects) => {
            parseString(xmlData, { trim: true }, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    rejects('parseXMLAsync方法出了问题：' + err);
                }
            })
        })
    },

    formatMessage(jsData) {
        let message = {};
        jsData = jsData.xml;
        if (typeof jsData === 'object') {
            for (let key in jsData) {
                let value = jsData[key];
                // 过滤空数据
                if (Array.isArray(value) || value > 0) {
                    message[key] = value[0];
                }
            }
        }

        return message;
    },

    writeFileAsync(data, fileName) {
        data = JSON.stringify(data)
        const filePath = resolve(__dirname, fileName)
        return new Promise((resolve, rejects) => {
            writeFile(filePath, data, err => {
                if (!err) {
                    console.log('文件保存成功');
                    resolve();
                } else {
                    rejects('writeFileAsync方法出错了：' + err)
                }
            })
        })
    },

    readFileAsync(fileName) {
        const filePath = resolve(__dirname, fileName)
        return new Promise((resolve, rejects) => {
            readFile(filePath, (err, data) => {
                if (!err) {
                    console.log('文件读取成功');
                    data = JSON.parse(data)
                    resolve(data);
                } else {
                    rejects('readFileAsync方法出错了：' + err);
                }
            })
        })
    }
}