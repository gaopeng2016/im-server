const config = {
    // 启动端口
    port: 3001,
    env:process.env.NODE_ENV,

    secret:'test jwt',
    // 数据库配置
    database: {
        DATABASE: 'im',
        USERNAME: 'root',
        PASSWORD: '13555486248',
        PORT: '3306',
        HOST: '39.106.127.129'
    }
}

module.exports = config;