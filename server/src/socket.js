const _ = require("lodash");

module.exports = function (io, app) {
  let users = {};
  let onlineUsers = 0;
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
      console.log(message);
      io.to(message.room).emit('message', message)
    });

    //JOIN CHAT ROOM
    socket.on('joinRoomChat', function(data){
      socket.join(data.room);
      const usersRoom = [...io.sockets.adapter.rooms.get(data.room)];
      socket.emit('usersRoomChat', usersRoom);
      socket.to(data.room).emit('usersRoomChat', usersRoom);
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