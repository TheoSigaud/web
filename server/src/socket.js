const _ = require("lodash");
const jwt = require("jsonwebtoken");

const config = process.env;

function verifyToken(token) {
  if (!token) {
    return false
  }else {
    try {
      return jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
      return false;
    }
  }
};


module.exports = function (io, app) {
  let users = {};
  let onlineUsers = 0;

  io.use((socket, next) => {
    if (!verifyToken(socket.handshake.auth.token)) {
      throw new Error("Unauthorized client")
    }

    next()
  })

  io.on('connection', function(socket){

    socket.on('online', (status) => {
      console.log(`User is now ${status ? 'online' : 'offline'}`);
      if (status) {
        onlineUsers++;  
      }else{
        onlineUsers--;
      }
      console.log("Il y a " + onlineUsers + " utilisateurs en ligne");
      io.emit('updateOnlineUsers', onlineUsers);
    });


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

    //SEND MSG
    socket.on('message', message => {
      io.to(message.room).emit('message', message)
    });

    socket.on('notifications', message => {
      socket.broadcast.emit('receiveNotification', message);
    });

    //JOIN CHAT ROOM
    socket.on('joinRoomChat', function(data){
      socket.email = data.email;
      socket.join(data.room);
      const usersRoom = [...io.sockets.adapter.rooms.get(data.room)];
      let usersEmail = [];
      for (const user of usersRoom) {
        const socket = io.sockets.sockets.get(user);
        if (socket) {
          const email = socket.email;
          usersEmail.push(email);
        }
      }

      socket.emit('usersRoomChat', usersEmail);
      socket.to(data.room).emit('usersRoomChat', usersEmail);
    });

    //GET LIST USERS
    socket.on('getUsers', function(data){

      if(io.sockets.adapter.rooms.get(data.room) === undefined){
        socket.emit('sendLengthUsers', {
            length: 0,
            room: data.room,
            max: data.max
        });
      }else {
        const usersRoom = [...io.sockets.adapter.rooms.get(data.room)];
        socket.emit('sendLengthUsers', {
            length: usersRoom.length,
            room: data.room,
            max: data.max
        });
      }
    });
  
    socket.on('disconnect', function(){
      console.log('User is now disconnected');
      if (onlineUsers > 0){
        onlineUsers--;
      } 
      io.emit('updateOnlineUsers', onlineUsers);
    });
  });

  app.post('/online', (req, res) => {
    // Incrémenter le compteur d'utilisateurs en ligne
    onlineUsers++;
  
    // Envoyer la mise à jour du nombre d'utilisateurs en ligne à tous les clients connectés
    io.emit('updateOnlineUsers', onlineUsers);
    
    res.send({ onlineUsers });
  });
}