'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newuser;

describe('User API:', function() {
  describe('GET /api/users', function() {
    var users;

    beforeEach(function(done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          users = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      users.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .send({
          name: 'New user',
          info: 'This is the brand new user!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newuser = res.body;
          done();
        });
    });

    it('should respond with the newly created user', function() {
      newuser.name.should.equal('New user');
      newuser.info.should.equal('This is the brand new user!!!');
    });
  });

  describe('GET /api/users/:id', function() {
    var user;

    beforeEach(function(done) {
      request(app)
        .get(`/api/users/${newuser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          user = res.body;
          done();
        });
    });

    afterEach(function() {
      user = {};
    });

    it('should respond with the requested user', function() {
      user.name.should.equal('New user');
      user.info.should.equal('This is the brand new user!!!');
    });
  });

  describe('PUT /api/users/:id', function() {
    var updateduser;

    beforeEach(function(done) {
      request(app)
        .put(`/api/users/${newuser._id}`)
        .send({
          name: 'Updated user',
          info: 'This is the updated user!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updateduser = res.body;
          done();
        });
    });

    afterEach(function() {
      updateduser = {};
    });

    it('should respond with the updated user', function() {
      updateduser.name.should.equal('Updated user');
      updateduser.info.should.equal('This is the updated user!!!');
    });

    it('should respond with the updated user on a subsequent GET', function(done) {
      request(app)
        .get(`/api/users/${newuser._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let user = res.body;

          user.name.should.equal('Updated user');
          user.info.should.equal('This is the updated user!!!');

          done();
        });
    });
  });

  describe('PATCH /api/users/:id', function() {
    var patcheduser;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/users/${newuser._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched user' },
          { op: 'replace', path: '/info', value: 'This is the patched user!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patcheduser = res.body;
          done();
        });
    });

    afterEach(function() {
      patcheduser = {};
    });

    it('should respond with the patched user', function() {
      patcheduser.name.should.equal('Patched user');
      patcheduser.info.should.equal('This is the patched user!!!');
    });
  });

  describe('DELETE /api/users/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/users/${newuser._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when user does not exist', function(done) {
      request(app)
        .delete(`/api/users/${newuser._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
