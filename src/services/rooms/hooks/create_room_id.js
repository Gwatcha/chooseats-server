const generate = require('nanoid/generate');
const alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = context => {
    //console.log(context);
    if (context.data === undefined) {
        debug(`hook.data is undefined. Skipping createRoomID hook.`);
        return Promise.resolve(context);
    }

    const dataIsArray = Array.isArray(context.data);
    const data = dataIsArray ? context.data : [context.data];

    context.data.roomId = generate(alphabet, 6);
    return (context);
};