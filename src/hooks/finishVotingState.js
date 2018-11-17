/*
 * Hook which patches the room in context.data.roomId to be in state "done" and
 * sets the selected restaurant for that room according to the voting method. 
 */
module.exports = async context => {
  console.log('Finish voting state triggered!');

  const restaurantsModel =  context.app.service('restaurants').Model; 
  const votesModel =  context.app.service('votes').Model; 
  const roomsModel = context.app.service('rooms').Model; 

  // get room and room type
  const room = await roomsModel.findOne({
    where: { id : context.data.roomId }
  });

  const roomType = room.roomType;

  // get the restaurants (with votes) for this room 
  const restaurants = await restaurantsModel.findAll({
    where: { roomId : context.data.roomId },
    include: { model : votesModel }
  });

  var i;
  var count;
  // the selected restaurant
  var chooseat = null;

  // in the random style, we randomly select but we weigh the selection based on
  // the room, kind of like a wheel of fortune
  if (roomType === 'random') {
    // the number of votes for the resaurant at i
    var totalVotes = 0;
    var votes = [];
    for ( i = 0; i < restaurants.length; i++) {
      // count the number of votes for this restaurant
      count = await votesModel.count({
        where: { restaurantId : restaurants[i].id },
        include: {
          model : restaurantsModel,
          where : { roomId : context.data.roomId }
        }
      });

      totalVotes += count;
      votes.push(count);
    }

    // select the restaurant randomly but weight it by the number of votes
    // the way this is done is by partitioning the region of [0-1] according to
    // each restaurants probability and seeing where randomNum lands

    // random number between 0 and 1
    var randomNum = Math.random();
    var probSum = 0.0;
    for (i = 0; i < restaurants.length; i++ ) {
      probSum =  votes[i] / totalVotes;
      if ( randomNum <= probSum ) {
        chooseat = restaurants[i];
        break;
      }
    }
  }

  // true random dosen't care for votes
  else if ( roomType === 'truerandom' ) {
    chooseat = restaurants[getRandomInt(restaurants.length)];
  }

  // default is max style
  else {
    var maxcount = 0;
    var maxi = [];
    // if we are voting in max and restaurants are tied, select randomly
    // note, this is probably a bad way to do this since I run a lot of queries,
    // but I don't know how to parse json, so yea
    for ( i = 0; i < restaurants.length; i++) {
      // count the number of votes for this restaurant
      count = await votesModel.count({
        where: { restaurantId : restaurants[i].id },
        include: {
          model : restaurantsModel,
          where : { roomId : context.data.roomId }
        }
      });

      // update max i array or add to it in the case of a tie
      if (count >= maxcount) {
        // reset array if >
        if (count > maxcount) {
          maxcount = count;
          maxi = [];
        }
        maxi.push(i);
      }
    }

    // get the chooseat
    chooseat = restaurants[maxi[getRandomInt(maxi.length)]];
  }

  // patch the room and emit an event to notify users in the rooms channel
  context.app.service('rooms').patch( context.data.roomId,
    { roomState : 'done', selectedRestaurant : chooseat.google_places_id }, 
    context.params
  );

  return context;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
