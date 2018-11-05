const { BadRequest } = require('@feathersjs/errors');
const isEmptyObject = require('is-empty-object');

/*
 * Hook which asserts that the data's 'userId' and 'roomId' are associated,
 * meaning the user is currently in the room .
 */
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

  // Check this room exists and the user is a part of it, if so, throw
  // BadRequest
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
  });

  return context;
};
