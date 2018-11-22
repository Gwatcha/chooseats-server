const finishVotingState = require('../../../hooks/finishVotingState');

/*
 * Hook which checks if all users associated with the data's room_id are ready.
 * If so, it selects a restaurant based on the rooms voting scheme and  patches
 * the room, altering selectedRestaurant and roomVoting=0
 */
module.exports = async context => {
  // If this roomType is true random and the room has been patched with
  // 'voting' we are done immediately
  console.log('User patched room with', context.data.roomState);

  const roomsModel = context.app.service('rooms').Model;

  var room = await roomsModel.findOne({
    where: { id: context.result.id }
  });


  if (room.roomType === 'truerandom' && context.data.roomState === 'voting') {
    console.log('checkFinish: Select random restaurant');
    return finishVotingState(context);
  }

  return context;
};


