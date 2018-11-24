/*
 * Hook which patches the room in context.data.roomId to be in state "done" and
 * sets the selected restaurant for that room according to the voting method. 
 */
module.exports = async context => {
  console.log('Finish voting state triggered!');

  const restaurantsModel = context.app.service('restaurants').Model;
  const votesModel = context.app.service('votes').Model;
  const roomsModel = context.app.service('rooms').Model;

  // get room and room type
  var room;
  if (context.path == 'rooms') {
    room = await roomsModel.findOne({
      where: { id: context.id }
    });
  }
  else if (context.path == 'ready') {
    room = await roomsModel.findOne({
      where: { id: context.data.roomId }
    });
  }
  else {
    console.log('Error! finishVotingState hook should only be used on rooms and ready service');
  }

  const roomId = room.id;
  const roomType = room.roomType;



  // get the restaurants (with votes) for this room 
  const restaurants = await restaurantsModel.findAll({
    where: { roomId: roomId },
    include: { model: votesModel }
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
    for (i = 0; i < restaurants.length; i++) {
      // count the number of votes for this restaurant
      count = await votesModel.count({
        where: { restaurantId: restaurants[i].id },
        include: {
          model: restaurantsModel,
          where: { roomId: roomId }
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
    for (i = 0; i < restaurants.length; i++) {
      probSum = votes[i] / totalVotes;
      if (randomNum <= probSum) {
        chooseat = restaurants[i];
        break;
      }
    }
  }

  // true random dosen't care for votes
  else if (roomType === 'truerandom') {
    chooseat = restaurants[getRandomInt(restaurants.length)];
  }

  // default is single, or ranked style, which are the same from the servers
  // perspective
  else {
    var maxcount = 0;
    var maxi = [];
    // if we are voting in max and restaurants are tied, select randomly
    // note, this is probably a bad way to do this since I run a lot of queries,
    // but I don't know how to parse json, so yea
    for (i = 0; i < restaurants.length; i++) {
      // count the number of votes for this restaurant
      count = await votesModel.count({
        where: { restaurantId: restaurants[i].id },
        include: {
          model: restaurantsModel,
          where: { roomId: roomId }
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
  if (room.roomState != 'done') {
    context.app.service('messages').create({
      roomId: roomId,
      type: 'system',
      text: 'A restaurant has been selected!'
    },
    context.params
    );
    context.app.service('rooms').patch(roomId,
      { roomState: 'done', selectedRestaurant: chooseat.google_places_id },
      context.params
    );
  }

  return context;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
