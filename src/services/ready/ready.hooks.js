const { authenticate } = require('@feathersjs/authentication').hooks;

const checkFinish = require('./hooks/checkFinish.js');
const validate = require('./hooks/validate.js');
const finishVotingState = require('../../hooks/finishVotingState.js');

module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [validate],
    update: [validate],
    patch: [validate],
    remove: [validate]
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
