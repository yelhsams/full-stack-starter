const assert = require('assert');
const HttpStatus = require('http-status-codes');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');

describe('/api/sections', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['sections', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns a list of sections ordered by position', async () => {
      /// request user list
      const response = await testSession
        .get('/api/sections')
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK);
      assert(response.body?.length, 3);

      const sections = response.body;
      assert.strictEqual(sections[0].name, 'Section 1');
      assert.strictEqual(sections[0].position, 1);
      assert.strictEqual(sections[1].name, 'Section 2');
      assert.strictEqual(sections[1].position, 2);
      assert.strictEqual(sections[2].name, 'Section 3');
      assert.strictEqual(sections[2].position, 3);
    });
  });
});
