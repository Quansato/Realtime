$(function () {
    //Kết nối tới server socket đang lắng nghe
    var socket = io.connect('http://localhost:3000');
    var username = prompt("Nhập tên của bạn:")
    document.getElementById("name-in").innerHTML = "Chào "+ username;
//Nhan data 
    socket.on("send", function (data) {
        console.log(data);
        var me= socket.id;
        console.log(me);
        if(data.Id==me){
            $('#content').append("<p class='timee' style='margin-left:220px;' >"+ data.time + "</p>") ;
        $("#content").append("<p class='message' style='margin-left:220px;'> " + data.message + "</p>");   
        }
        else{
            $('#content').append("<p class='timee'>"+ data.time + "</p>") ;
           $("#content").append("<p class='message' style='background-color:rgb(241, 240, 237);color:black;'><b style='color:#1a1e4a;font-size:15px;'>" +data.username +"</b>"+": " + data.message + "</p>");
        }
        
    
    })
    
    //Bắt sự kiện click gửi message
    $("#sendMessage").on('click', function () {
        var message = $('#message').val();
        var now = new Date().getHours();
        var Min = new Date().getMinutes();
        var Mins = new Date().getSeconds();
        var time = now + ':' +Min +':'+Mins;
        if (username == '' || message == '') {
            alert('Nhập tin nhắn!!');
        } else {
            //Gửi dữ liệu cho socket
            socket.emit('send',{username: username, message: message,time:time,Id:socket.id});
            $('#message').val('');
            console.log(time);
        }
    })
})