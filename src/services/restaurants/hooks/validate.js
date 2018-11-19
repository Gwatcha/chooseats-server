const { BadRequest } = require('@feathersjs/errors');

/*
 * Hook which asserts that the room associated with this retaurant creation is
 * in the state "voting"
 */
module.exports = async context => {
  // Get the rooms for this roomId
  const roomsModel = context.app.service('rooms').Model;
  await roomsModel.findOne({
    where: { id : context.data.roomId }
  }).then( (room) => {
    if ( room == undefined ) {
      console.log('room is undefined!');
      throw new BadRequest('The room for this restaurant does not exist.', { roomId : context.data.roomId });
    }
  });

  return context;
};
