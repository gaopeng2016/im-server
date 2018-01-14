/**
 * restful api 子路由
 */

const router = require('koa-router')();
const UserController = require('./../controllers/UserController')

const api = router.get('/user/:userName', UserController.getUserInfoByUserName)
    .get('/chat', async (ctx) => {
        await ctx.render('index');
    });
    // .post('/user/signIn.json', userInfoController.signIn)
    // .post('/user/signUp.json', userInfoController.signUp)

module.exports = api;
