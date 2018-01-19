const UserService = require('../services/UserService');
const MessageInfo = require('../utils/MessageInfo');
const JWTUtil = require('../utils/JWTUtil');

class UserController {

    async getUserInfoByUserName  (ctx){
        const userName = ctx.params.userName;
        let user = await UserService.getUserByUsername(userName);
        ctx.body = user;
    }

    async findUserInfoBySearchText (ctx) {
        const { searchText } = ctx.params;
        let user = await UserService.getUserByUserNameOrEmail(searchText);
        ctx.body = new MessageInfo("查询用户成功", user);
    }

    async userLogin (ctx) {
        let loginInfo = ctx.request.body;
        ctx.body = await UserService.userLogin(loginInfo);
    }

    /**
     * 获取 用户好友列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    async findUserRelation(ctx) {
        const {authorization} =  ctx.request.headers;
        let payload = await JWTUtil.verify(authorization.split(' ')[1]);
        const friendList = await UserService.findUserRelation(payload.userId);
        ctx.body = friendList;
    }

    /**
     * 获取 用户群聊信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    async findGroupRelation(ctx){
        const {authorization} =  ctx.request.headers;
        let payload = await JWTUtil.verify(authorization.split(' ')[1]);
        const groupList = await UserService.findGroupRelation(payload.userId);
        ctx.body = groupList;
    }


}

module.exports = new UserController();