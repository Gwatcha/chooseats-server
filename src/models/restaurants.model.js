// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const restaurants = sequelizeClient.define('restaurants', {
    google_places_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  restaurants.associate = function (models) {
    restaurants.belongsTo(models.users);
    restaurants.belongsTo(models.rooms);
    restaurants.hasMany(models.votes);
  };

  return restaurants;
};
