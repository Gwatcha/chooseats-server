module.exports = context => {
  const UserModel = context.app.service('users').Model;
  const MessageModel = context.app.service('messages').Model;

  context.params.sequelize = {
    raw: false,
    include: [{ model: UserModel, through: { attributes: ['admin'], as: 'role' }, attributes: ['id', 'email'] }, { model: MessageModel }]
  };
  return context;
};