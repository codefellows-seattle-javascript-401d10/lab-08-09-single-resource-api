//superagent - only need it for testing
//makes ajax request to server and comes back as data
//we test that data was as expected
// npm i --save superagent

//recipe-test.js -- has tests for get, put, pust, DELETE

'use strict';

//request is the common name of ajax library
const request = require('superagent');
const expect = require('chai').expect;
//npm i -D chai
//use mocha to call in terminal

require ('../server.js'); //starts the server - have to close server be

describe('testing recipe routes', function(){

  var recipe = null; //cheating! eeeeeee!!!

  describe('testing POST /api/recipe', function(){
    it ('should return a recipe', function(done){
      request.post('localhost:3000/api/recipe')
      .send({name: 'recipe1', content: 'goose'}) //if you pass in done, that means that an error has occurred
      .end((err,res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('recipe1');
        expect(res.body.content).to.equal('goose');
        recipe  = res.body;
        done(); //get this otherwise timeout error
      });
    });

    it ('should return error 400', function(done){
      request.post('localhost:3000/api/recipe')
      .send({})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        done();
      });
    });

  });

  //pass a recipe with an id, test for name and content
  describe('testing GET /api/recipe', function(){
    it ('should return a recipe', function(done){
      request.get(`localhost:3000/api/recipe?id=${recipe.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('recipe1');
        expect(res.body.content).to.equal('goose');
        done(); //get this otherwise timeout error
      });
    });
    //pass nothing through it- check for 400 error
    it ('should return error 400', function(done){
      request.get('localhost:3000/api/recipe?')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        done();
      });
    });

    it ('should return error 404', function(done){
      request.get('localhost:3000/api/recipe?id=12479128347912384')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        done(); //get this otherwise timeout error
      });
    });
  });
});
