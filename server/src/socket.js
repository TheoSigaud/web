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

    socket.on('sendMessage', (room, data) => {
      console.log(room);
      socket.to(room).emit('getMessages', data.text);
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