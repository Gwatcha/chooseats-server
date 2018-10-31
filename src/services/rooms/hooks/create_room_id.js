const generate = require('nanoid/generate');
const alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const roomCodeLength = 6;

module.exports = context => {
  console.log(context);
  context.data.roomCode = generate(alphabet, roomCodeLength);
  return (context);
};

