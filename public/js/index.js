var socket=io(); //létrehozza a kapcsolatot

socket.on('connect', function (){
  console.log('Connected to the server');

  /*socket.emit('createMessage', {
    from: 'Jen',
    text: 'Hey, whats up?'
  });*/
});

socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  console.log('new message', message);
  var li=$('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

/*socket.emit('createMessage', {
  from: 'Jen',
  text: 'Hey, whats up?'
}, function (data){
  console.log('Got it!', data);
});*/
$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $("[name=message]").val()
  }, function (){

  });
  $("[name=message]").val('');
});
