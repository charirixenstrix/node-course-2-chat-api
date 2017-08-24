const path =require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage, generateLocationMessage}=require('./utils/message');
const publicPath=path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));


  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback)=>{
    console.log('createMessage: ', message);
    //mindenki megkapja, a küldő is
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
    //a küldő nem kapja meg
    /*socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });*/
  });

  socket.on('createLocationMessage', (location)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude));
  });

  socket.on('disconnect', ()=>{
    console.log('User disconnected from server');
  });
});

server.listen(port, ()=>{
  console.log('Server started');
});
