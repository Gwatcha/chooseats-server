const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const validate = require('./users.errors');

const defaultUserName = require('./hooks/defaultUserName.js');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), hooks.queryWithCurrentUser({ idField: 'id', as: 'id' })],
    get: [authenticate('jwt'), hooks.queryWithCurrentUser({ idField: 'id', as: 'id' })],
    create: [validate, hashPassword(), defaultUserName],
    update: [hashPassword(), authenticate('jwt'), hooks.restrictToOwner({ idField: 'id', ownerField: 'id' })],
    patch: [hashPassword(), authenticate('jwt'), hooks.restrictToOwner({ idField: 'id', ownerField: 'id' })],
    remove: [authenticate('jwt'), hooks.restrictToOwner({ idField: 'id', ownerField: 'id' })]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
