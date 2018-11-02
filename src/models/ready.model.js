const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const ready = sequelizeClient.define('ready', {
    ready: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // ready has two foreign keys, one for room and one for user
  ready.associate = function (models) {
    ready.belongsTo(models.rooms, {foreignKey: { allowNull: false }, onDelete: 'CASCADE'});
    // users may be null since we set it ourselves anyways
    ready.belongsTo(models.users);
  };

  return ready;
};
