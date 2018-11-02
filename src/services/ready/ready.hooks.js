const { authenticate } = require('@feathersjs/authentication').hooks;

const checkFinish = require('./hooks/checkFinish.js');
const validate = require('./hooks/validate.js');

module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [validate],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [checkFinish],
    update: [checkFinish],
    patch: [checkFinish],
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
