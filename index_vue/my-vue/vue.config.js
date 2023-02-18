module.exports = {
    publicPath:'./',
    devServer: {
        host: 'localhost',
        port: '8080',
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },

            "/yiqing": {
                target: "https://c.m.163.com/ug/api/wuhan/app/data/list-total",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/yiqing": "",
                },
            },
        
            "/xinlangData": {
                target:
                  "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  "^/xinlangData": "",
                },
              },
        }
    }
}
