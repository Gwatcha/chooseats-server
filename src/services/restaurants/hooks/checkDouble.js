/*
 * Hook which checks if this restaurant for this room has been posted already,
 * if so, it just skips.
 */
const feathers = require('@feathersjs/feathers');
module.exports = async context => {
  // Get the rooms for this roomId
  const restaurantsModel = context.app.service('restaurants').Model;

  var restaurant = await restaurantsModel.findOne({
    where: { roomId : context.data.roomId, google_places_id : context.data.google_places_id }
  });

  // If a restaurant exists, then return it to the user and skip the call
  if ( restaurant != undefined ) {
    context.result = restaurant;
    return feathers.SKIP;
  }

  return context;
};
