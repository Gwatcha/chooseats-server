module.exports = context => {
  context.app.service('rooms').Model.findById(context.result.id).then((room) => {
    room.addUser(context.params.user.id, { through: { admin: true } });
		// Emit an event saying this user is joining this rooms channel. A
		// listener defined in channels.js will add this user to the channel.
		context.app.emit('roomjoin', context.params); 
  }).catch(
    error => console.log(error)
  );
};
