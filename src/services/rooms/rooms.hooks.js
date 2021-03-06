const { authenticate } = require('@feathersjs/authentication').hooks;

const includeAll = require('./hooks/include_all');
const createRoomID = require('./hooks/create_room_id');
const associateRoomAdmin = require('./hooks/associate_room_admin');
const joinRoom = require('./hooks/join_room');
const restrictUsers = require('./hooks/restrict_to_room_users');
const queryWithCurrentUser = require('./hooks/query_with_current_user');
const isAdmin = require('./hooks/is_admin');
const checkFinish = require('./hooks/checkFinish.js');


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [includeAll, queryWithCurrentUser()],
    get: [includeAll, restrictUsers()],
    create: [createRoomID],
    update: [restrictUsers()],
    patch: [joinRoom, restrictUsers()],
    remove: [restrictUsers()]
  },

  after: {
    all: [],
    find: [isAdmin()],
    get: [],
    create: [associateRoomAdmin, (context) => context.app.emit('roomjoin', context)],
    update: [],
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

