const TestSocketHandle = function (socket, io) {

    //有人加入
    console.log(`${socket.id} 加入-`);

    // 有人发消息


    //有人断开链接
    socket.on("disconnect", () => {
        console.log(`${socket.id} 断开链接`)
    })

} ;

module.exports = TestSocketHandle;