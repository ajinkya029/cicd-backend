const request = require('supertest');
const { createApp } = require('../src/app');

describe('API basics', () => {
  const app = createApp();

  test('root endpoint returns service information', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('MERN CI/CD Backend');
  });

  test('unknown route returns JSON 404', async () => {
    const response = await request(app).get('/does-not-exist');
    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/Route not found/);
  });

  test('create task validates title before database access', async () => {
    const response = await request(app).post('/api/tasks').send({ title: '   ' });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/title is required/);
  });
});
