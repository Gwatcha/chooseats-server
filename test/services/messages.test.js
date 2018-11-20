const assert = require('assert');
const app = require('../../src/app');

describe('\'messages\' service', () => {
  var user;
  var room;

  before(async function () {
    this.timeout(10000);

    const email = 'testaccount9123099123122124@example.com';
    const username = '12312';
    const password = 'password1';

    user = await app.service('users').create({
      email,
      password,
      username
    });

    const roomName = "Test Room";
    const roomDesc = "This is a test room";
    const roomMax = 2;
    const params = { user };
    room = await app.service('rooms').create({ roomName, roomDesc, roomMax }, params);
  });

  it('registered the service', () => {
    const service = app.service('messages');

    assert.ok(service, 'Registered the service');
  });

  it('send message', async () => {
    const text = "Hello World";
    const params = { user };
    const result = await app.service('messages').create({ roomId: room.id, text, type: "user" }, params);
    assert.ok(result.text === text);

    const message = await app.service('messages').get(result.id, params);
    assert.ok(message.text === text);
  });

  it('send empty message', async () => {
    const params = { user };
    try {
      await app.service('messages').create({ roomId: room.id, type: "user" }, params);
    } catch (error) {
      assert.ok(error.message === 'A message must have text');
    }
  });

  it('get messages', async () => {
    const result = await app.service('messages').find({ query: { roomId: room.userid, $sort: -1, $limit: 30 } })
    assert.ok(result.data);
  });

  after(async () => {
    var params = { user };
    await app.service('users').remove(user.id, params);
  });
});
