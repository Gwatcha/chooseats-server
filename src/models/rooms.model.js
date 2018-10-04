// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const rooms = sequelizeClient.define('rooms', {
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });

  // Define join table for RoomUsers
  const RoomUsers = sequelizeClient.define('roomUsers', {
    admin: { type: DataTypes.BOOLEAN, defaultValue: false }
  })

  // eslint-disable-next-line no-unused-vars
  rooms.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    rooms.belongsToMany(models.users, { through: RoomUsers });
  };

  return rooms;
};
