'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing note routes', function() {
  var note = null;

  describe('testing POST /api/note', function() {
    it('should return a note', function(done) {
      request.post('localhost:3000/api/note')
      .send({name: 'hello', content: 'goodbye'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('goodbye');
        note = res.body;
        done();
      });
    });
  });
  describe('testing GET /api/note', function(){
    it('should return a note', function(done){
      request.get(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('goodbye');
        done();
      });
    });
  });
});
