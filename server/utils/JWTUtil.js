const jwt = require('jsonwebtoken');
const config = require('../../config');
const CommonException = require("../exception/CommonException");

class JWTUtil {
    static sign (payload) {
        try{
           let token = jwt.sign(payload, config.secret, { expiresIn: '1h' });
            return token;
        } catch (e) {
            throw new CommonException(2, '生成token错误');
        }

    }
}

module.exports = JWTUtil;
