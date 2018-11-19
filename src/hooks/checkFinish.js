/*
 * Hook which checks if all users associated with the data's room_id are ready.
 * If so, it selects a restaurant based on the rooms voting scheme and  patches
 * the room, altering selectedRestaurant and roomVoting=0
 */
module.exports = async context => {
  const feathers = require('@feathersjs/feathers');
  // Get the rooms for this roomId
  const roomsModel = context.app.service('rooms').Model; 
  const readyModel = context.app.service('ready').Model;
  const userModel = context.app.service('users').Model;

  // If this roomType is true random and the room has been patched with
  // 'voting' we are done immediately
  console.log(context.data.roomState);
  var done = 0;
  await roomsModel.findOne({
    where: { id : context.id }
  }).then((room) => { 
    if ( room.roomType === 'truerandom' && context.data.roomState === 'voting' ) {
      done = 1;
    }
  }).catch( (error) => {
    throw error;
  });

  if (done) {
    // move onto finishVotingState hook
    return context;
  }

  var readyCount = await readyModel.count({
    where: { roomId : context.data.roomId }
  });

  console.log('Ready count is', readyCount);

  var userCount = await roomsModel.count({
    where: { id : context.data.roomId },
    include: { 
      model: userModel,
      // group my userId, so we count the number of users in this room
      group: ['userId']
    }
  });

  console.log('User count is', userCount);

  // room is done in this case, so we don't skip later hooks, thus
  // finishVotingState.js runs
  if ((userCount === readyCount) && (userCount !== null)) {
    return context;
  }

  return feathers.SKIP;
};
