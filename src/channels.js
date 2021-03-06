module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', async (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      // Channels can be named anything and joined on any condition 

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      try {
        const rooms = await app.service('rooms').find({ user });
        rooms.data.forEach(room => {
          app.channel(`rooms/${room.dataValues.id}`).join(connection);
        });
      } catch (error) {
        console.log(error);
      }

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });

  // Event listener for the case in which a user joins a room. The corresponding
  // emitter passes the 'connection' var for this user.
  // The roomjoin event recieves 
  app.on('roomJoined', context => {
    try {
      app.channel(`rooms/${context.result.dataValues.id}`).join(context.params.connection);
    } catch (error) {
      console.log(error);
    }
  });

  app.on('roomCreated', context => {
    try {
      app.channel(`rooms/${context.result.id}`).join(context.params.connection);
    } catch (error) {
      console.log(error);
    }
  });

  // eslint-disable-next-line no-unused-vars
  // app.publish((data, hook) => {
  //   // Here you can add event publishers to channels set up in `channels.js`
  //   // To publish only for a specific event use `app.publish(eventname, () => {})`

  //   console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

  //   // e.g. to publish all service events to all authenticated users use
  //   return app.channel('authenticated');
  // });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  app.service('rooms').publish((data) => {
    console.log(`Publishing room #${data.id} events to all users in that room`);
    return [
      app.channel(`rooms/${data.id}`)
    ];
  });

  // custom room events
  // app.on('roomVoting', async context => {
  //   const room = await context.app.service('rooms').get(context.result.id);
  //   context.app.service('rooms').emit('roomVoting', room.dataValues);
  // });

  // app.on('roomDone', async context => {
  //   const room = await context.app.service('rooms').get(context.result.id);
  //   context.app.service('rooms').emit('roomDone', room.dataValues);
  // });

  /*app.service('messages').publish((data) => {
    console.log(`Publishing messages events to all users in that room #${data.roomId}`);
    return [
      app.channel(`rooms/${data.roomId}`)
    ];
  });*/

  app.on('messageCreated', async context => {
    const messageQuery = await context.app.service('messages').get(context.result.id);
    context.app.service('messages').emit('newMessage', messageQuery.dataValues);
  });

  app.service('messages').publish('created', (data) => {
    return app.channel(`rooms/${data.roomId}`);
  });

  app.service('messages').publish('newMessage', (data) => {
    console.log('newMessage for ' + data.roomId);
    return app.channel(`rooms/${data.roomId}`);
  });

  app.service('restaurants').publish((data) => {
    console.log(`Publishing restaurant events to all users in that room #${data.roomId}`);
    return [
      app.channel(`rooms/${data.roomId}`)
    ];
  });

  app.service('votes').publish((data) => {
    console.log(`Publishing vote events to all users in that room #${data.roomId}`);
    return [
      app.channel(`rooms/${data.roomId}`)
    ];
  });

  app.service('ready').publish((data) => {
    console.log(`Publishing ready events to all users in that room #${data.roomId}`);
    return [
      app.channel(`rooms/${data.roomId}`)
    ];
  });
};
