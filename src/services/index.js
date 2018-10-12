const users = require('./users/users.service.js');
const rooms = require('./rooms/rooms.service.js');
const messages = require('./messages/messages.service.js');

const restaurants = require('./restaurants/restaurants.service.js');

const votes = require('./votes/votes.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(rooms);
  app.configure(messages);
  app.configure(restaurants);
  app.configure(votes);
};
