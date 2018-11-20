const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {

  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  /* it('creates a user, encrypts password', async () => {
    const email = 'testaccount@example.com';
    const password = 'password1';

    const user = await app.service('users').create({
      email: email,
      password: password
    });

    assert.ok(user.email === email);
    assert.ok(user.password !== 'secret');

    const params = { user };
    await app.service('users').remove(user.id, params);
  });

  it('removes password for external requests', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    const user = await app.service('users').create({
      email: 'testaccount123@example.com',
      password: 'secretpassword'
    }, params);

    // Make sure password has been removed
    assert.ok(!user.password);

    await app.service('users').remove(user.id, { user });
  }); */
});
