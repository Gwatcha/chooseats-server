module.exports = context => {
  const UserModel = context.app.service('users').Model;
  const MessageModel = context.app.service('messages').Model;
  const ReadyModel = context.app.service('ready').Model;
  const RestaurantsModel = context.app.service('restaurants').Model;
  const VotesModel = context.app.service('votes').Model;

  context.params.sequelize = {
    raw: false,
    include: [{ model: UserModel, through: { attributes: ['admin'], as: 'role' }, attributes: ['id', 'email'] }, { model: MessageModel }, {model: ReadyModel }, {model: RestaurantsModel}, {model: VotesModel }]
  };
  return context;
};
