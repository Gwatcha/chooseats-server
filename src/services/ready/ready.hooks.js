const { authenticate } = require('@feathersjs/authentication').hooks;
const checkFinish = require('./hooks/checkFinish.js');
const validate = require('./hooks/validate.js');
const finishVotingState = require('../../hooks/finishVotingState.js');
const queryWithCurrentUser = require('./hooks/query_with_current_user.js');
const checkUserInRoom = require('./hooks/checkUserInRoom.js');

module.exports = {
  before: {
    all: [ authenticate('jwt'), queryWithCurrentUser, checkUserInRoom, validate],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [checkFinish, finishVotingState],
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
