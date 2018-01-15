const db = require('../utils/db');
const CommonException = require("../exception/CommonException");

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
            let sql = 'select * from user where user_name = ?';
            let dbData = await db.query(sql, [userName]);
            if(dbData.length > 1){
                throw new CommonException(1, '用户名已经有重复的！');
            }
            return dbData[0];
        } else {
            throw new CommonException(1, '缺少参数 userName');
        }
    };
}

module.exports = UserService;