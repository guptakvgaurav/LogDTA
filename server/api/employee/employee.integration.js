'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

let newemployee;

describe('Employee API:', function() {
  describe('GET /api/employees', function() {
    let employees;

    beforeEach(function(done) {
      request(app)
        .get('/api/employees')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          employees = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      employees.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/employees', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/employees')
        .send({
          name: 'New employee',
          info: 'This is the brand new employee!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newemployee = res.body;
          done();
        });
    });

    it('should respond with the newly created employee', function() {
      newemployee.name.should.equal('New employee');
      newemployee.info.should.equal('This is the brand new employee!!!');
    });
  });

  describe('GET /api/employees/:id', function() {
    let employee;

    beforeEach(function(done) {
      request(app)
        .get(`/api/employees/${newemployee._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          employee = res.body;
          done();
        });
    });

    afterEach(function() {
      employee = {};
    });

    it('should respond with the requested employee', function() {
      employee.name.should.equal('New employee');
      employee.info.should.equal('This is the brand new employee!!!');
    });
  });

  describe('PUT /api/employees/:id', function() {
    var updatedemployee;

    beforeEach(function(done) {
      request(app)
        .put(`/api/employees/${newemployee._id}`)
        .send({
          name: 'Updated employee',
          info: 'This is the updated employee!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedemployee = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedemployee = {};
    });

    it('should respond with the updated employee', function() {
      updatedemployee.name.should.equal('Updated employee');
      updatedemployee.info.should.equal('This is the updated employee!!!');
    });

    it('should respond with the updated employee on a subsequent GET', function(done) {
      request(app)
        .get(`/api/employees/${newemployee._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let employee = res.body;

           employee.name.should.equal('Updated employee');
           employee.info.should.equal('This is the updated employee!!!');

          done();
        });
    });
  });

  describe('PATCH /api/employees/:id', function() {
    let patchedemployee;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/employees/${newemployee._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched employee' },
          { op: 'replace', path: '/info', value: 'This is the patched employee!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedemployee = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedemployee = {};
    });

    it('should respond with the patched employee', function() {
      patchedemployee.name.should.equal('Patched employee');
      patchedemployee.info.should.equal('This is the patched employee!!!');
    });
  });

  describe('DELETE /api/employees/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/employees/${newemployee._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when employee does not exist', function(done) {
      request(app)
        .delete(`/api/employees/${newemployee._id}`)
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
