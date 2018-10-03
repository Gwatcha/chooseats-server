module.exports = context => {
    const UserModel = context.app.service('users').Model;

    context.params.sequelize = {
        include: [{ model: UserModel }]
    }
    return context;
}