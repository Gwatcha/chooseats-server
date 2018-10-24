const { authenticate } = require('@feathersjs/authentication').hooks;

const include = require('./hooks/include');
const createRoomID = require('./hooks/create_room_id');
const associateRoomAdmin = require('./hooks/associate_room_admin');
const joinRoom = require('./hooks/join_room');
const restrictUsers = require('./hooks/restrict_to_room_users');
const queryWithCurrentUser = require('./hooks/query_with_current_user');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [include, queryWithCurrentUser()],
    get: [include, restrictUsers()],
    create: [createRoomID],
    update: [restrictUsers()],
    patch: [joinRoom, restrictUsers()],
    remove: [restrictUsers()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [associateRoomAdmin, (context) => context.app.emit('roomjoin', context)],
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

