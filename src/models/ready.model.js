module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const ready = sequelizeClient.define('ready', {});

  // ready has two foreign keys, one for room and one for user
  // composite index asserts that the userId and roomId pair is unique
  ready.associate = function (models) {
    ready.belongsTo(models.rooms, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
      unique: 'compositeIndex'
    });
  };

  ready.associate = function (models) {
    ready.belongsTo(models.users, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
      unique: 'compositeIndex'
    });
  };

  return ready;
};
