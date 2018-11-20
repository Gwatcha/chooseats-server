const generate = require('nanoid/generate');
const alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const roomCodeLength = 6;

module.exports = context => {
  context.data.roomCode = generate(alphabet, roomCodeLength);
  context.data.roomState = 'starting';
  return (context);
};

