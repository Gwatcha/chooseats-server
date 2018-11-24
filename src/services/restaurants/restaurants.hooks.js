const { authenticate } = require('@feathersjs/authentication').hooks;
const checkDouble = require('./hooks/checkDouble.js');
//const validate = require('./hooks/validate.js');
const hooks = require('feathers-authentication-hooks');

const setUserId = require('../../hooks/set_userId.js');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [setUserId, hooks.associateCurrentUser({ idField: 'id' }), checkDouble],
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
        text: 'A new restaurant has been added!'
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
