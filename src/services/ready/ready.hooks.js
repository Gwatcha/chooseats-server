const { authenticate } = require('@feathersjs/authentication').hooks;
const checkReady = require('./hooks/checkReady');
const validate = require('./hooks/validate.js');
const checkUserInRoom = require('./hooks/checkUserInRoom.js');
const setUserId = require('../../hooks/set_userId.js');

module.exports = {
  before: {
    all: [authenticate('jwt'), validate],
    find: [],
    get: [],
    create: [setUserId, checkUserInRoom],
    update: [],
    patch: [],
    remove: [setUserId]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [checkReady],
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
