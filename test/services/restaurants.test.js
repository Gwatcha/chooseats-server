const assert = require('assert');
const app = require('../../src/app');

describe('\'restaurants\' service', () => {
  var user;
  var room;

  before(async function () {
    this.timeout(10000);

    const email = 'testaccount441992124@example.com';
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
    const service = app.service('restaurants');

    assert.ok(service, 'Registered the service');
  });

  it('added a restaurant', async () => {
    const params = { user };
    const restaurant = await app.service('restaurants').create({ google_places_id: '123412412', roomId: room.id }, params);

    assert.ok(restaurant.id);
    assert.ok(restaurant.roomId === room.id);
    assert.ok(restaurant.userId === user.id);
  })

  it('added a restaurant that is already added', async () => {
    const params = { user };
    const restaurant = await app.service('restaurants').create({ google_places_id: '123412412', roomId: room.id }, params);
    const restaurant2 = await app.service('restaurants').create({ google_places_id: '123412412', roomId: room.id }, params);
  })

  after(async () => {
    var params = { user };
    await app.service('users').remove(user.id, params);
  });
});
