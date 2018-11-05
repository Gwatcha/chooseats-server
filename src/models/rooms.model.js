// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const rooms = sequelizeClient.define('rooms', {
    roomCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    roomDesc: {
      type: DataTypes.STRING,
    },

    // For now state can be either "voting", or "ready". The state of a room is
    // set to ready when all users are ready, or when the admin says so
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // this field is set by the server after the last user ready or admin start
    // it is a foreign key for a restaurant associated with this room
    selectedRestaurant: {
      type: DataTypes.INTEGER,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // Define join table for RoomUsers
  const roomUsers = sequelizeClient.define('roomUsers', {
    admin: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  // eslint-disable-next-line no-unused-vars
  rooms.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    rooms.belongsToMany(models.users, { through: roomUsers });
    rooms.hasMany(models.votes);
    rooms.hasMany(models.restaurants);
    rooms.hasMany(models.messages);
    rooms.hasMany(models.ready);
  };

  return rooms;
};
