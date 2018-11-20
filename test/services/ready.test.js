const assert = require('assert');
const app = require('../../src/app');

describe('\'ready\' service', () => {
  it('registered the service', () => {
    const service = app.service('ready');

    assert.ok(service, 'Registered the service');
  });
});
