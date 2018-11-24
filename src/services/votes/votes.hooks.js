const { authenticate } = require('@feathersjs/authentication').hooks;
const setUserId = require('../../hooks/set_userId.js');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [setUserId],
    update: [],
    patch: [],
    remove: [setUserId]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [(context)=>{
      context.app.service('messages').create({
        roomId: context.data.roomId,
        type: 'system',
        text: context.params.user.email + ' has voted!'
      },
      context.params
      );

      return context;
    }],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
