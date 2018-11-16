module.exports = context => {
  const UserModel = context.app.service('users').Model;

  context.params.sequelize = {
    raw: false,
    include: [{ model: UserModel, through: { attributes: ['admin'], as: 'role' }, attributes: ['id', 'email'], required: true }]// { model: MessageModel, include: [{ model: UserModel, attributes: ['id', 'email'] }] }]
  };
  return context;
};