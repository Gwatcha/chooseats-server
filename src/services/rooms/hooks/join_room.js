const feathers = require('@feathersjs/feathers');
const errors = require('@feathersjs/errors');

module.exports = async context => {
  if (context.id === context.data.roomCode) {
    const UserModel = context.app.service('users').Model;

    try {
      const room = await context.app.service('rooms').Model.findOne({
        where: { roomCode: context.data.roomCode },
        include: [{ model: UserModel, through: { attributes: ['admin'], as: 'role' }, attributes: ['id', 'email'] }]
      });
      room.addUser(context.params.user.id, { through: { admin: false } });
      context.result = room;

      // Emit an event saying this user is joining this rooms channel. A
      // listener defined in channels.js will add this user to the channel.
      context.app.emit('roomJoined', context);

    } catch (e) {
      throw new errors.BadRequest({ roomCode: context.data.roomCode });
    }

    return feathers.SKIP;
  }
  return context;
};
