const UserService = require('../services/UserService');

class UserController {

    async getUserInfoByUserName  (ctx){
        const userName = ctx.params.userName;
        let user = await UserService.getUserByUsername(userName);
        ctx.body = user;
    }

    async userLogin (ctx) {
        let loginInfo = ctx.request.body;
        ctx.body = await UserService.userLogin(loginInfo);
    }
}

module.exports = new UserController();