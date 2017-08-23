var socket=io(); //létrehozza a kapcsolatot

socket.on('connect', function (){
  console.log('Connected to the server');

  socket.emit('createMessage', {
    from: 'Jen',
    text: 'Hey, whats up?'
  });
});

socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  console.log('new message', message);
});
