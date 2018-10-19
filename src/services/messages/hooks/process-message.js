// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {data} = context;  

    if(!data.text) {
        throw new Error('A message must have text');
    }

    // Messages must be associated with rooms
    if(!data.room_id) {
        throw new Error('A message must have a room_id');
    }

    // This room must exist
    if ( context.app.service('rooms').Model.findOne(
      {where: {room_id: data.room_id}}) == null) {
      throw new Error('Room with room_id not found');
    }

    const user = context.params.user;
    const text = context.data.text
    // Messages can't be longer than 400 characters
    .substring(0, 400);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      text,
      // Set the user id
      userId: user._id, // Is this the right format?
      // Add the current date
      createdAt: new Date().getTime()
    };


    return context;
  };
};


