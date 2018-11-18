/*
 * Hook which sets a users username to the provided email in the case he does
 * not provide a username.
 */
module.exports = async context => {
  if ( context.data.username == undefined ) {
    context.data.username = context.data.email;
  }

  return context;
};
