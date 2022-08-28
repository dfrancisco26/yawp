const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Flo',
  lastName: 'Jo',
  email: 'iam.speed@gmail.com',
  password: 'running4ever'
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};



describe('Restaurant and review tests', () => {

  beforeEach(() => {
    return setup(pool);
  });


  it ('/restaurants should return a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body.length).toEqual(4);
    expect(res.status).toEqual(200);
  });
});

it('/restaurants/:id should return a restaurant', async () => {
  const res = await request(app).get('/api/v1/restaurants/1');
  expect(res.body.id).toEqual('1');
  expect(res.status).toEqual(200);
});

it('/restaurants/:id returns reviews for that restaurant', async() => {
  const res = await request(app).get('/api/v1/restaurants/1');
  expect(res.body).toHaveProperty('id', '1');
  expect(res.body).toHaveProperty('name', 'Franks');
  expect(res.body).toHaveProperty('type', 'American');
  expect(res.body.reviews[0]).toHaveProperty('id', 1);
});

it('#POST should add a review for authenticated users to a restaurant', async () => {
  const [agent] = await registerAndLogin();
  await agent
    .post('/api/v1/users')
    .send({ ...mockUser });
  const newReview = {
    stars: 5,
    detail: 'Wonderful tandoori wings',
    restaurantId: '3',
  };
  const res = await agent
    .post('/api/v1/restaurants/3/reviews')
    .send(newReview);
  expect(res.body).toEqual({
    id: expect.any(String),
    ...newReview,
    userId: expect.any(String)
  });
});

afterAll(() => {
  pool.end();
});
