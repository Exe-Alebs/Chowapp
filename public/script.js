// const socket = io();

// const chat = document.querySelector('.chat-form');
// const Input = document.querySelector('.chat-input');
// const chatWindow = document.querySelector('.chat-window');
// const messagesList = document.querySelector('.chat-messages');

// chat.addEventListener('submit', (event) => {
//   event.preventDefault();
//   socket.emit('chat', Input.value);
//   Input.value = '';
// });
// const renderMessage = (message) => {
//   const div = document.createElement('div');
//   div.classList.add('render-message');
//   div.innerTeext = message;
//   chatWindow.appendChild(div);
// };
// socket.on('chat', (message) => {
//   renderMessage(message);
// });

// const initialMessage = `Welcome to our store! How can I assist you today? Here are your options:
// - Select 1 to Place an order
// - Select 99 to checkout order
// - Select 98 to see order history
// - Select 97 to see current order
// - Select 0 to cancel order`;

// socket.on('connect', () => {
//   const li = document.createElement('li');
//   li.textContent = `Bot: ${initialMessage}`;
//   messagesList.appendChild(li);
// });
