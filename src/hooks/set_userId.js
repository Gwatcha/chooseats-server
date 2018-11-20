// This sets the userId field to the current user, so users don't have to do it.
module.exports = async context => {
  context.data.userId = context.params.user.id;
  return context;
};
