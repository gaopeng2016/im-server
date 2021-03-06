const db = require('../utils/db');
const CommonException = require("../exception/CommonException");
const JWTUtil = require('../utils/JWTUtil');
const MessageInfo = require('../utils/MessageInfo');

class UserService {
    /**
     * 根据用户名或者邮箱 查询用户信息
     * @returns {Promise<void>}
     */
    static async getUserByUserNameOrEmail (userNameOrEmail){
        if(userNameOrEmail){
            let sql = 'select * from user where user_name = ? or email = ?';
            let dbData = await db.query(sql, [userNameOrEmail,userNameOrEmail ]);
            if(dbData.length > 1){
                throw new CommonException(1, '用户名已经有重复的！');
            }
            return dbData[0];
        }
    };

    static async getUserByUsername (userName){
        if(userName){
            let sql = 'select * from user where userName = ?';
            let dbData = await db.query(sql, [userName]);

            if(dbData.length > 1){
                throw new CommonException(1, '用户名已经有重复的！');
            }
            return dbData[0];
        } else {
            throw new CommonException(1, '缺少参数 userName');
        }
    };

    static async userLogin (loginInfo) {
        if(!loginInfo || !loginInfo.userName || !loginInfo.password){
            throw new CommonException(501, "参数校验失败");
        }
        const dbUser = await this.getUserByUsername(loginInfo.userName);

        if(dbUser && dbUser.password === loginInfo.password){
            const payload = {
                userId: dbUser.userId,
                userName:dbUser.userName,
                email: dbUser.email
            };
            const token = JWTUtil.sign(payload);
            return new MessageInfo('登录成功', token);
        }

        throw new CommonException(502, "用户名或密码不正确");
    }

    static async findUserRelation (userId) {
        if(userId){
            let sql = 'select u.* from user u where u.userId in ( select f.friendId from friend  f where f.userId = ? )';
            let dbData = await db.query(sql, [userId]);
            return dbData;
        }
        return null;
    }

    static async findGroupRelation (userId) {
        if(userId){
            let sql = 'select g.* from group_user gu LEFT JOIN `group` g on gu.groupId = g.groupId where gu.userId = ?';
            let dbData = await db.query(sql, [userId]);
            return dbData;
        }
        return null;
    }
}

module.exports = UserService;