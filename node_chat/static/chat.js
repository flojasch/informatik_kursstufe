var socket = io();

function setup() {
  input = createInput();
  input.position(20, 65);
  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(send);
}

function send() {
  let str = input.value();
  socket.emit('chat message', str);
}

socket.on('chat message', function (msg) {
  createP(msg);
});