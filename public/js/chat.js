var socket=io(); //létrehozza a kapcsolatot

function scrollToBottom(){
  var messages=$('#messages');
  var newMessage=messages.children('li:last-child');
  var clientheight=messages.prop('clientHeight');
  var scrolltop=messages.prop('scrollTop');
  var scrollheight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientheight+scrolltop+newMessageHeight+lastMessageHeight>=scrollheight){
    messages.scrollTop(scrollheight);
  }
}

socket.on('connect', function (){
  var params=jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err){
    if(err){
      alert(err);
      window.location.href="/";
    }
    else{
      console.log('No error');
    }
  });
});

socket.on('updateUserList', function (users){
  var ol=$('<ol></ol>');
  users.forEach(function (user){
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  var template=$('#message-template').html();
  var html=Mustache.render(template, {
    text: message.text,
    time: moment(message.createdAt).format('HH:mm'),
    from: message.from
  });
  $('#messages').append(html);
  scrollToBottom();
  /*$('#messages').append(`<p>${message.from} ${moment(message.createdAt).format('HH:mm')}: ${message.text}</p>`);*/
});
socket.on('newLocationMessage', function (message){
  var template=$('#location-message-template').html();
  var html=Mustache.render(template, {
    link: message.url,
    time: moment(message.createdAt).format('HH:mm'),
    from: message.from
  });
  $('#messages').append(html);
  scrollToBottom();
  /*$('#messages').append(`<p>${message.from} ${moment(message.createdAt).format('HH:mm')}: <a href="${message.url}" target="_blank">My location</a></p>`);*/
});


$('#message-form').on('submit', function(e){
  e.preventDefault();
  var messagebox=$("[name=message]");
  socket.emit('createMessage', {
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
