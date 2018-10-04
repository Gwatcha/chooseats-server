const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

const includeUser = require('../../hooks/include_user');
const createRoomID = require('./hooks/create_room_id');
const associateRoomAdmin = require('./hooks/associate_room_admin');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [includeUser],
    get: [includeUser],
    create: [createRoomID],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [associateRoomAdmin],
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

