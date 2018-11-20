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

  after(async () => {
    var params = { user };
    await app.service('users').remove(user.id, params);
  });
});
