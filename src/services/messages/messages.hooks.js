const { authenticate } = require('@feathersjs/authentication').hooks;

const processMessage = require('./hooks/processMessage');
const populateUser = require('./hooks/populate-user');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [populateUser],
    get: [populateUser],
    create: [processMessage()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [(context) => {
      context.app.emit('messageCreated', context);
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
