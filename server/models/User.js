/**
 * 对应user表
 */
class User {

    constructor(userId, userName, password, realName, email){
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.realName = realName;
        this.email = email;
    }

    userId;
    userName;
    password;
    realName;
    email;

    getUserId() {
        return this.userId;
    }

    setUserId(userId){
        this.userId = userId;
    }

}