const { BadRequest } = require('@feathersjs/errors');
const isEmptyObject = require('is-empty-object');

module.exports = async context => {
  const { data } = context;
  const errors = {};

  if (!data.userId) {
    errors.userId = 'userId is required';
  } 

  if (!data.roomId) {
    errors.roomId = 'roomId is required';
  }

  // Check if there are empty fields
  if (!isEmptyObject(errors)) {
    throw new BadRequest({
      errors: errors
    });
  }

  // Check if user is trying to create two readys, 
  if (context.method == 'create') {
    context.app.service('ready').Model.count({
      where: { roomId : data.roomId,userId : data.userId } 
    }).then( (count) => { 
      if (count > 0) {
        errors.roomId = 'this user has already posted a ready for this room';
        throw new BadRequest({
          errors: errors
        });
      }
    });
  }

  // Check this room exists and the user is a part of it
  context.app.service('rooms').Model.findOne({
    where: { id : data.roomId },
    include: { 
      model: context.app.service('users').Model,
      where: {
        id : data.userId
      }
    }
  }).then( room => {
    if (room === null) {
      errors.roomId = 'roomId for this user not found';
      throw new BadRequest({
        errors: errors
      });
    }

    //(may want to delete after voting...)
    // if (room.state !== 'voting') {
    //   errors.roomId = 'room must be in a voting state';
    //   throw new BadRequest({
    //     errors: errors
    //   });
    // }
  }).catch(() => {
    throw new BadRequest({
      errors: errors
    });
  });


  return context;
};
