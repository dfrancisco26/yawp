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

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName, 
      lastName,
      email,
    });
  });

  it('signs in existing user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'iam.speed@gmail.com', password: 'running4ever' });
    expect(res.status).toEqual(200);
  });

  it.skip('returns a 403 when user signs in with invalid credentials', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/users');
    expect(res.status).toEqual(403);
  });

  it('/users should return a 200 if user is admin', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users')
      .send({ firstName: 'lastname', lastName: 'firstname', email: 'admin', password: 'lolol' });
    const res = await agent.get('/api/v1/users/');
    console.log(res.body);
    expect(res.status).toEqual(200);
  });



  afterAll(() => {
    pool.end();
  });
});
