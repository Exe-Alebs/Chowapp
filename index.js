// const express = require('express');
// const app = express();
// const server = require('http').createServer(app);
// const port = process.env.PORT || 3000;
// const io = require('socket.io')(server);
// const path = require('path');

// app.use(express.static(path.join(__dirname + '/public')));

// io.on('connection', (socket) => {
//   // console.log('Some client connected');

//   socket.on('chat', (message) => {
//     console.log('From client to server: ', message);
//     io.emit('chat', message);
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const uuid = require('uuid');

const sessions = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  const sessionId = uuid.v4();
  sessions[sessionId] = { socket: socket };

  socket.emit('chat message', 'Welcome to the restaurant chatbot!');
  socket.emit('chat message', 'Select 1 to Place an order');
  socket.emit('chat message', 'Select 99 to checkout order');
  socket.emit('chat message', 'Select 98 to see order history');
  socket.emit('chat message', 'Select 97 to see current order');
  socket.emit('chat message', 'Select 0 to cancel order');

  socket.on('chat message', function (msg) {
    if (msg === 'Hello') {
      socket.emit(
        'chat message',
        'Welcome to the restaurant chatbot! Please select an option:'
      );
    } else {
      // Handle other messages here
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete sessions[sessionId];
  });

  socket.on('chat message', (msg) => {
    const session = sessions[sessionId];
    const msgArray = msg.split(' ');
    const cmd = msgArray[0];
    switch (cmd) {
      case '1':
        session.order = [];
        socket.emit('chat message', 'What would you like to order?');
        break;
      case '99':
        if (session.order) {
          socket.emit('chat message', 'Order placed.');
          session.order = null;
        } else {
          socket.emit('chat message', 'No order to place.');
        }
        break;
      case '98':
        if (session.order) {
          socket.emit(
            'chat message',
            'Your current order is: ' + session.order.join(', ')
          );
        } else {
          socket.emit('chat message', 'No order placed.');
        }
        break;
      case '97':
        if (session.order) {
          socket.emit(
            'chat message',
            'Your current order is: ' + session.order.join(', ')
          );
        } else {
          socket.emit('chat message', 'No order placed.');
        }
        break;
      case '0':
        if (session.order) {
          socket.emit('chat message', 'Order cancelled.');
          session.order = null;
        } else {
          socket.emit('chat message', 'No order to cancel.');
        }
        break;
      default:
        if (session.order) {
          session.order.push(msg);
          socket.emit(
            'chat message',
            'Added ' +
              msg +
              ' to your order. Select 99 to checkout or continue adding items.'
          );
        } else {
          socket.emit(
            'chat message',
            'Invalid command. Select 1 to start a new order.'
          );
        }
        break;
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
