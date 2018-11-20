// Initializes the `ready` service on path `/ready`
const createService = require('feathers-sequelize');
const createModel = require('../../models/ready.model');
const hooks = require('./ready.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ready', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('ready');

  service.hooks(hooks);
};
