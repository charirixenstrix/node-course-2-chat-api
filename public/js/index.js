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
  var messagebox=$("[name=message]");
  socket.emit('createMessage', {
    from: 'User',
    text: messagebox.val()
  }, function (){
    messagebox.val('');
  });
});

var locationButton=$('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').html('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').html('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (){
    locationButton.removeAttr('disabled').html('Send location');
    alert('Unable to fetch location.');
  });
});
