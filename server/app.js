const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')

const config = require('./../config')
const routers = require('./routers/index')

const app = new Koa()
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);


// 配置控制台日志中间件
app.use(convert(koaLogger()))

app.use(async function(ctx, next){
    try{
        await next();
    } catch (e) {
        ctx.body = {
            code: e.code ? e.code : -1,
            message: e.message ? e.message : '未知错误'
        }

    }
});

// 配置ctx.body解析中间件
app.use(bodyParser())

app.use(convert(koaStatic(
    path.join(__dirname , './../static')
)))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

io.on('connection', function(socket){
    console.log(socket.id + ' 有人链接');
    socket.on('disconnect', function(socket){
        console.log(socket.id + ' 断开');
    });
});


// 监听启动端口
server.listen( config.port )
console.log(`the server is start at port ${config.port}`)