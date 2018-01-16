const UserService = require('../services/UserService');


class UserController {
    async getUserInfoByUserName  (ctx){
        const userName = ctx.params.userName;
        let user = await UserService.getUserByUsername(userName);
        ctx.body = user;
    }
}

module.exports = new UserController();