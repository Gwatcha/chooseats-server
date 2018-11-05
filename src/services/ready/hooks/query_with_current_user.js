const { get } = require('lodash');

const defaults = {
  idField: 'id',
  as: 'userId',
};

/*
 * This hook simply sets the 'userId' field to the current users id, so they
 * can't set it to another users id and delete or create votes for them.
 */
module.exports = function (options = {}) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error('The \'queryWithCurrentUser\' hook should only be used as a \'before\' hook.');
    }

    options = Object.assign({}, defaults, hook.app.get('authentication'), options);
    const userEntity = hook.params[options.entity || 'user'];

    if (!userEntity) {
      if (!hook.params.provider) {
        return hook;
      }

      throw new Error('There is no current user to associate.');
    }

    const id = get(userEntity, options.idField);

    if (id === undefined) {
      throw new Error(`Current user is missing '${options.idField}' field.`);
    }

    hook.params.sequelize.include[0].where = { userId: id };
  };
};
