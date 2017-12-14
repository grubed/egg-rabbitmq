'use strict';

const mock = require('egg-mock');

describe('test/rabbit.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/rabbit-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, rabbit')
      .expect(200);
  });
});
