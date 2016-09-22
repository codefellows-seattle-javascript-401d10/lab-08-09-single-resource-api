'use strict';

//when you pass err to done, thinks there's been an error. So only pass err to done when you want there to be an error....or something

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing recipe routes', function(){
  var recipe = null;
  describe('testing POST /api/recipe', function(){
    it('should return a recipe', function(done){
      request.post('localhost:3000/api/recipe')
      .send({name: 'Cake', content: 'flour and chocolate'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        console.log('body',res.body);
        expect(res.body.name).to.equal('Cake');
        expect(res.body.content).to.equal('flour and chocolate');
        recipe = res.body;
        done();
      });
    });
    it('should return a response status of 400', function(done){
      request.post('localhost:3000/api/recipe')
      .send({})
      .end((err, res) => {
        console.error('res.status', res.status);
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing GET /api/recipe', function(){
    it('should return a recipe', function(done){
      request.get(`localhost:3000/api/recipe?id=${recipe.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Cake');
        expect(res.body.content).to.equal('flour and chocolate');
        done();
      });
    });
    it('should return a status of 400', function(done){
      request.get('localhost:3000/api/recipe')
      .end((err,res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should return a status of 404', function(done) {
      request.get('localhost:3000/api/recipe?id=7fhjkdfs')
      .end((err,res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});

describe('testing unregistered routes', function(){
  it('should return a status of 404', function(done){
    request.get('localhost:3000/nonsense/route')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
});
