const assert = require('assert');
const app = require('../../src/app');

describe('\'authentication\' service', () => {
  it('registered the service', () => {
    const service = app.service('authentication');
    assert.ok(service, 'Registered the service');
  });

  // it('retrieve authentication token', async () => {
  //   const user = await app.service('users').create({
  //     email: 'testauthentication@example.com',
  //     password: 'secretpassword'
  //   });

    // broken
    // const result = await app.authenticate({ email: user.email, password: user.password, strategy: 'local' });

    // assert(result.accessToken);

    // await app.service('users').remove(user.id, { user });
  // });
});
