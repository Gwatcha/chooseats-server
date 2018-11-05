const { BadRequest, MethodNotAllowed } = require('@feathersjs/errors');
const isEmptyObject = require('is-empty-object');

module.exports = async context => {
  const { data } = context;
  const errors = {};

  // only allow create and remove methods
  if (context.method != 'create' && context.method != 'remove') {
    throw new MethodNotAllowed({});
  }

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
        errors.roomId = 'user has already posted a ready for this room';
        throw new BadRequest({
          errors: errors
        });
      }
    });
  }

  return context;
};
