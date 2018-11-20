const assert = require('assert');
const app = require('../../src/app');

describe('\'rooms\' service', () => {
  var user;
  var user2;

  before(async function () {
    this.timeout(10000);

    const email = 'testaccount9099212124@example.com';
    const username = '12312';

    const email2 = 'testaccount91199412@example.com';
    const username2 = '123123';

    const password = 'password1';

    user = await app.service('users').create({
      email,
      password,
      username
    });

    user2 = await app.service('users').create({
      email: email2,
      password,
      username: username2
    });
  });

  it('registered the service', () => {
    const service = app.service('rooms');
    assert.ok(service, 'Registered the service');
  });

  it('create a room and retrieve it', async () => {
    const roomName = "Test Room";
    const roomDesc = "This is a test room";
    const roomMax = 2;

    const params = { user };
    const room = await app.service('rooms').create({ roomName, roomDesc, roomMax }, params);

    assert.ok(room.roomCode);
    assert.ok(room.roomName = roomName);
    assert.ok(room.roomDesc = roomDesc);
    assert.ok(room.roomMax = 2);

    const retrievedRoom = await app.service('rooms').get(room.id, params);

    assert.ok(retrievedRoom.roomCode == room.roomCode);
    assert.ok(retrievedRoom.roomName = roomName);
    assert.ok(retrievedRoom.roomDesc = roomDesc);
    assert.ok(retrievedRoom.roomMax = 2);
  });

  it('create a room and have other user join', async () => {
    const roomName = "Test Room";
    const roomDesc = "This is a test room";
    const roomMax = 2;

    const params = { user };
    const room = await app.service('rooms').create({ roomName, roomDesc, roomMax }, params);

    const params2 = { user: user2 };
    const roomCode = room.roomCode;
    const result = await app.service('rooms').patch(roomCode, { roomCode }, params2);
  });

  it('join nonexistant room', async () => {
    const params2 = { user: user2 };
    try {
      await app.service('rooms').patch('ABDEF', { roomCode: 'ABDEF' }, params2);
    } catch (error) {
      assert.ok(error.name === 'NotFound');
    }



  });

  it('join room that is full', async () => {
    const roomName = "Test Room";
    const roomDesc = "This is a test room";
    const roomMax = 1;

    const params = { user };
    const room = await app.service('rooms').create({ roomName, roomDesc, roomMax }, params);

    const params2 = { user: user2 };
    const roomCode = room.roomCode;
    const result = await app.service('rooms').patch(roomCode, { roomCode }, params2);


  });

  it('Get rooms', async () => {
    const params = { user };
    const room = await app.service('rooms').find(params);
    assert(room.data);
  });

  after(async () => {
    var params = { user };
    await app.service('users').remove(user.id, params);

    params = { user2 };
    await app.service('users').remove(user2.id, params);
  });

});
