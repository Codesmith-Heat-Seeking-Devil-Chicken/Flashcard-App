const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
    // leave post route til later
    describe('PATCH', () => {
      // TBD
    });
  });
  describe('/deck/65af0b85e559c4438406534b/card', () => {
    describe('GET', () => {
      // it should...
      it('responds with application/json content type', () => {
        return request(server)
          .get('/deck/65af0b85e559c4438406534b/card')
          .expect('Content-Type', /application\/json/);
      });
    });
  });
});
