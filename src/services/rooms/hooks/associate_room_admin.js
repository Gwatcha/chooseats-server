module.exports = context => {
    context.app.service('rooms').Model.findById(context.result.id).then((room) => {
        room.addUser(context.params.user.id, { through: { admin: true } });
    }).catch(
        error => console.log(error)
    );
}