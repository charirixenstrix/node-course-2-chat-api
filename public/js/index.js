var socket=io(); //létrehozza a kapcsolatot

socket.on('connect', function (){

});

socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  $('#messages').append(`<p>${message.from}: ${message.text}</p>`);
});
socket.on('newLocationMessage', function (message){
  $('#messages').append(`<p>${message.from}: <a href="${message.url}" target="_blank">My location</a></p>`);
});


$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $("[name=message]").val()
  }, function (){

  });
  $("[name=message]").val('');
});

var locationButton=$('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (){
    alert('Unable to fetch location.');
  });
});
