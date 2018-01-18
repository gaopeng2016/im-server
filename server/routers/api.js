/**
 * restful api 子路由
 */

const router = require('koa-router')();
const UserController = require('./../controllers/UserController');


const api = router.post('/login', UserController.userLogin)
    .get('/user/:userName', UserController.userLogin)
    .get('/chat', async (ctx) => {
        await ctx.render('index');
    });

    // .post('/user/signIn.json', userInfoController.signIn)
    // .post('/user/signUp.json', userInfoController.signUp)

module.exports = api;
