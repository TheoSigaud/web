const _ = require("lodash");

module.exports = function (io, app) {
  let users = {};
  io.on('connection', function(socket){
    
  let userId = socket.handshake.query.userId; // GET USER ID
  
  // CHECK IS USER EXHIST 
  if (!users[userId]) users[userId] = [];
  
  // PUSH SOCKET ID FOR PARTICULAR USER ID
  users[userId].push(socket.id);

  // USER IS ONLINE BROAD CAST TO ALL CONNECTED USERS
  io.sockets.emit("online", userId);
  console.log(userId, "Is Online!", socket.id);

  // DISCONNECT EVENT
  socket.on('disconnect', (reason) => {

    // REMOVE FROM SOCKET USERS
    _.remove(users[userId], (u) => u === socket.id);
    if (users[userId].length === 0) {
      // ISER IS OFFLINE BROAD CAST TO ALL CONNECTED USERS
      io.sockets.emit("offline", userId);
      // REMOVE OBJECT
      delete users[userId];
    }

    socket.disconnect(); // DISCONNECT SOCKET

    console.log(userId, "Is Offline!", socket.id);

  });

    // socket.on('login', function(data){
    //   console.log('a user ' + data.userId + ' connected');
    //   // saving userId to object with socket ID
    //   users[socket.id] = data.userId;
    // });

    socket.on('sendRequest', function(data){
      console.log(data.user.email);
      socket.join(data.user.email);
      socket.broadcast.emit('request', data);
    });

    socket.on('joinRoom', function(data){
      console.log(data);
      socket.join(data);
      socket.to(data).emit('requestAccepted', '');
    });

    socket.on('joinRoomChat', function(data){
      socket.join(data);
      const usersRoom = io.sockets.adapter.rooms.get(data);
      socket.to(data).emit('usersRoomChat', usersRoom);
    });

    socket.on('sendMessage', (room, data) => {
      console.log(room);
      socket.to(room).emit('getMessages', data.text);
    });
  
    // socket.on('disconnect', function(){
    //   console.log('user ' + users[socket.id] + ' disconnected');
    //   // remove saved socket from users object
    //   delete users[socket.id];
    // });
  });

}