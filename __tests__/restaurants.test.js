const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it ('/restaurants should return a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body.length).toEqual(4);
    expect(res.status).toEqual(200);
  });
});


afterAll(() => {
  pool.end();
});
