let app = require('express')(); // Express initializes app to be a function handler that you can supply to an HTTP server
let http = require('http').Server(app); // HTTP server
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-message', (message) => {
	console.log('Message emitted: ' + message.text);
    io.emit('message', message);    
  });
  
  socket.on('create-card', (card) => {
	console.log('New Card: ' + card.title);
    setTimeout(() => {io.emit('new-card', card)}, 5000);    
  });
  
});

http.listen(3000, () => {
  console.log('started on port 3000');
});