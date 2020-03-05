var path = require("path");
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const users={}
//Chỉ ra đường dẫn chứa css, js, images...
app.use('/public',express.static(path.join(__dirname, '/public')));
//Tạo router
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/chat.html'));
});
//Tạo socket 
io.on('connection', function (socket) {
    console.log('Connect success!!');
    console.log("ID:"+socket.id);
    // fire
    socket.on('send', function (data) {
        io.sockets.emit('send', data);
    });
});
server.listen(3000);