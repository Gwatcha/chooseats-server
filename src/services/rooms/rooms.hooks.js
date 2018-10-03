const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

const createRoomID = require('../../hooks/room_hooks');
const addAssociations = require('../../hooks/add_associations');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [createRoomID],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [context => {
      context.app.service('rooms').get(context.result.id).then((room) => {
        console.log(context.service.Model.associations);
        room.addUser(context.params.user.id, { through: { admin: true } });
      }).catch(
        error => console.log(error)
      );
    }
    ],
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

