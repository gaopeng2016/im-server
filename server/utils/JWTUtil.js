const jwt = require('jsonwebtoken');
const config = require('../../config');
const CommonException = require("../exception/CommonException");

class JWTUtil {
    static sign (payload) {

        try{
           let token = jwt.sign(payload, config.secret, { expiresIn: '1h' });
            return token;
        } catch (e) {
            throw new CommonException(2, e.message);
        }

    }

    static async verify (token) {
        try{
            let payload = await jwt.verify(token, config.secret);
            return payload;
        } catch (e) {
            throw new CommonException(3, e.message);
        }

    }
}

module.exports = JWTUtil;
