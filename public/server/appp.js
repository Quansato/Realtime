var path = require("path");
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const users={}
//Chỉ ra đường dẫn chứa css, js, images...
app.use(express.static(path.join(__dirname+ '/public')));

//Tạo router
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/chat.html'));
});
///views
//Tạo socket 
io.on('connection', function (socket) {
    console.log('Connect success!!');
    const sessionID = socket.id;
    console.log("ID:"+sessionID);
    // fire
    socket.on('send', function (data) {
        io.sockets.emit('send', data);
        io.sockets.emit('checkID ', sessionID);
    });
});
server.listen(3000);