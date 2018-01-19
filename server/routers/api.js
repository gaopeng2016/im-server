/**
 * restful api 子路由
 */

const router = require('koa-router')();
const UserController = require('./../controllers/UserController');


const api = router
    .post('/login', UserController.userLogin)
    .get('/chat', async (ctx) => {
        await ctx.render('index');
    })
    .get('/search/:searchText',UserController.findUserInfoBySearchText )
    .get('/findAllRelation', UserController.findUserRelation)


module.exports = api;
