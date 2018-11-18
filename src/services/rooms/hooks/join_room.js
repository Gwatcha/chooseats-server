const feathers = require('@feathersjs/feathers');
const errors = require('@feathersjs/errors');

module.exports = async context => {
  // If users patch with a room code, it means they are joining the room
  if (context.id === context.data.roomCode) {
    const UserModel = context.app.service('users').Model;

    await context.app.service('rooms').Model.findOne({
      where: { roomCode: context.data.roomCode },
      include: [{ model: UserModel, through: { attributes: ['admin'], as: 'role' }, attributes: ['id', 'email'] }]
    }).then( (room) => {

      if ( room === undefined ) {
        throw new errors.NotFound('Room not found');
      }

      // this part checks if this user has already joined, and rejects if so,
      // only admins can patch rooms
      room.users.forEach( (user) => {
        if ( user.id == context.params.user.id ) {
          throw new errors.Forbidden('This user has already joined this room.');
        }
      });

      if (room.users.length >= room.roomMax) {
        throw new errors.BadRequest({
          error: 'Room Full'
        });
      }

      // If we are hear, it means this user is not in the room and the room is
      // not full, so let them in
      room.addUser(context.params.user.id, { through: { admin: false } });
      context.result = room;
      // Emit an event saying this user is joining this rooms channel. A
      // listener defined in channels.js will add this user to the channel.
      context.app.emit('roomJoined', context);
    }).catch ( (error) => {
      throw error;
    });

    return feathers.SKIP;
  }

  return context;
};
