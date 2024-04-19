// 导入express
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const tiaozian = require('taozian');

// 创建express应用对象
const app = express();

// 声明中间件函数
function recordMiddleware(req, res, next) {
    const timestamp = Date.now(); // 获取当前时间戳
    const date = new Date(timestamp); // 将时间戳转换为日期对象
    const options = { // 定义日期时间格式选项
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'Asia/Shanghai', timeZoneName: 'short'
    };
    const formattedDate = date.toLocaleString('zh-CN', options); // 格式化日期时间
    // 获取ip和请求路径
    let { url, ip } = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${formattedDate} ${timestamp} ${url} ${ip}\r\n`);
    next();
}

// 使用中间件函数
app.use(recordMiddleware);
// 静态资源中间件设置/public是静态资源的目录
app.use(express.static(__dirname + '/page'));

// 创建路由
// ejs渲染
app.get('/An', (req, res) => {
    // 获取当前时间戳
    const timestamp = Date.parse(new Date()) / 1000;
    const time_firstMeet = 1627545420;
    // 计算时间之差
    const time_diff = timestamp - time_firstMeet;
    // 调用函数
    const formatSecond = tiaozian.formatSeconds(time_diff);
    // 读取文件转成string
    let str = fs.readFileSync('./page/index.html').toString();
    // 使用ejs渲染
    let result = ejs.render(str, { time_diff, formatSecond });
    // console.log(result);
    res.send(result);
});

// Ajax
app.get('/time', (req, res) => {
    // 获取当前时间戳
    const timestamp = Date.parse(new Date()) / 1000;
    const time_firstMeet = 1627545420;
    // 计算时间之差
    const time_diff = timestamp - time_firstMeet;
    // 调用函数
    const formatSecond = tiaozian.formatSeconds(time_diff);
    let result = { time_diff, formatSecond };
    // console.log(result);
    res.send(result);
});

// 拦截所有请求
app.all('*', (req, res) => {
    res.send('<h1>404 Not Found</h1>');
});

// 监听端口，启动服务
app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
