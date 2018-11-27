const { authenticate } = require('@feathersjs/authentication').hooks;
const setUserId = require('../../hooks/set_userId.js');
const voted_message = require('./hooks/voted_message');

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
    create: [voted_message],
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
