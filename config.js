const config = {
    // 启动端口
    port: 3001,
    env:process.env.NODE_ENV,

    secret:'test jwt',
    // 数据库配置
    database: {
        DATABASE: 'koa_demo',
        USERNAME: 'root',
        PASSWORD: '13555486248',
        PORT: '3306',
        HOST: 'localhost'
    }
}

module.exports = config;