'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Person = require('../model/person.js');

module.exports = function(router) {
  router.get('/api/person', function(req, res){
    if (req.url.query.id) {
      return storage.fetchItem('person', req.url.query.id)
      .then(person => {
        return response.sendJSON(res, 200, person);
      })
      .catch( err => {
        console.error(err);
        return response.sendText(res, 404, 'not found');
      });
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/person', function(req, res){
    try{
      var person = new Person(req.body.name, req.body.age);
      storage.createItem('person', person);
      response.sendJSON(res, 200, person);
    }
    catch (err){
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });


  router.delete('/api/person', function(req, res){
    if (req.url.query.id)
      try {
        storage.deleteItem('person', req.url.query.id);
        response.sendText(res, 204, 'person deleted');
      } catch (err){
        console.error(err);
        response.sendText(res, 404, 'not found');
      }
  });

};
