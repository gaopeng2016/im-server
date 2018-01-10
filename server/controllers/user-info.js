 const getLoginUserInfo =  async (ctx) => {
    ctx.body = {
        name:'gaopeng',
        id:111
    }
 };

module.exports = { getLoginUserInfo };