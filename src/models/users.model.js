// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING
    },
    googleId: { type: Sequelize.STRING },
    facebookId: { type: Sequelize.STRING },

  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    // RoomUsers join table is defined in rooms.model.js
    users.belongsToMany(models.rooms, { through: 'roomUsers' });
    users.hasMany(models.votes);
    users.hasMany(models.restaurants);
    users.hasMany(models.messages);
  };

  return users;
};
