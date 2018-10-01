const { authenticate } = require('@feathersjs/authentication').hooks;
const createRoomID = require('../../hooks/room_hooks');
const addAssociations = require('../../hooks/add_associations');

module.exports = {
  before: {
    all: [],
    find: [
      context => {
        const sequelize = context.params.sequelize || {};
        sequelize.raw = true;
        sequelize.include = [
          {
            model: context.app.sequelizeClient,
            as: 'roomUsers'
          }
        ];

        return context;
      }
    ],
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
    create: [],
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

