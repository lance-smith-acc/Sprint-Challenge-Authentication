const request = require("supertest");

const server = require('../api/server');

describe("router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/jokes", function() {
    it("should return 400", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(400);
        });
  
    });

    it("should return users as an array", function() {
      return request(server)
        .get("/api/jokes")
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1ODI5MDk3MjIsImV4cCI6MTU4Mjk5NjEyMn0.O7y9t1TT4J78O9f0qRX6Ynmx_omiejrm0xe404J8rqg')
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
    
  })

  describe("POST /api/auth/login", function() {
    it("should return 500 for no credentials", function() {
      return request(server)
        .post("/api/auth/login")
        .then(res => {
          expect(res.status).toBe(500);
        }); 
    });

    it("should return 200", function() {
      return request(server)
        .post("/api/auth/login")
        .send({username:'test', password:'test', })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(200);
        }); 
    });
    
    it("should return 401", function() {
      return request(server)
        .post("/api/auth/login")
        .send({username:'test', password:'test1', })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(401);
        }); 
    });

  })

  describe("POST /api/auth/register", function() {
    it("should return 500 for no credentials", function() {
      return request(server)
        .post("/api/auth/register")
        .then(res => {
          expect(res.status).toBe(500);
        }); 
    });

    it("should return 201", function() {
      return request(server)
        .post("/api/auth/register")
        .send({username:`${Date.now}`, password:`${Date.now}`, })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(201);
        }); 
    });
    
  })
})