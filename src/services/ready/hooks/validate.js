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

  // Check if there are errors
  if (!isEmptyObject(errors)) {
    throw new BadRequest({
      errors: errors
    });
  }

  return context;
};
