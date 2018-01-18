const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const jwtKoa = require('koa-jwt');

const config = require('./../config');
const routers = require('./routers/index');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server,{
    serveClient: (config.env === 'production') ? false : true,
    pingInterval: 10000,//请求间隔时间(ms)
    pingTimeout: 5000,//连接超时时间,超时后自动关闭(ms)
    cookie: false,//禁用缓存
    allowRequest: (req, cb) => {
        console.log(req._query.token);
        // if (req._query && req._query.token === 'abc') return cb(null, true)
        // cb(null, false)
        cb(null, true);
    }
});
const testSocketHandle = require('./controllers/TestSocketController');


// 配置控制台日志中间件
app.use(convert(koaLogger()));

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

// 配置ctx.body解析中间件 post
app.use(bodyParser());

//
app.use(jwtKoa({secret:config.secret}).unless({
    path: ['/api/login','/api/chat'] //数组中的路径不需要通过jwt验证
}));

app.use(convert(koaStatic(
    path.join(__dirname , './../static')
)));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// // socket 更改全局socketid 生成策略
// io.engine.generateId = (req) => {
//     return "custom:id:" + 1; // custom id must be unique
// };
let test = io.of("/test");
test.use((socket, next) => {
    // if (socket.request.headers.cookie) return next()
    // return  new Error('Authentication error')
    // return next();

   // let token = socket.handshake.query.token;
   // if(token !== "111"){
   //     throw  new Error('Authentication error')
   // }

    console.log('中间件');
   next()
}).on('connection', function(socket){
    testSocketHandle(socket, test);
});




// 监听启动端口
server.listen( config.port );
console.log(`the server is start at port ${config.port}`);