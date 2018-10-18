const generate = require('nanoid/generate');
const alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = context => {
    console.log(context);
    context.data.roomCode = generate(alphabet, 6);
    return (context);
};