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


    //REQUEST HELP
    socket.on('sendRequest', function(data){
      socket.join(data.user.email);
      socket.broadcast.emit('request', data);
    });

    //ADMIN ACCEPT HELP
    socket.on('joinRoom', function(data){
      socket.join(data);
      socket.to(data).emit('requestAccepted', '');
    });

    //SEND MSG HELP
    socket.on('message', message => {
      io.to(message.email).emit('message', message)
    });

    //JOIN CHAT ROOM
    socket.on('joinRoomChat', function(data){
      socket.join(data);
      const usersRoom = [...io.sockets.adapter.rooms.get(data)];
      socket.emit('usersRoomChat', usersRoom);
      socket.to(data).emit('usersRoomChat', usersRoom);
    });
  
    // socket.on('disconnect', function(){
    //   console.log('user ' + users[socket.id] + ' disconnected');
    //   // remove saved socket from users object
    //   delete users[socket.id];
    // });
  });

}