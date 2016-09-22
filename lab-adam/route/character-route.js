'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Character = require('../model/character.js');

module.exports = function(router){
  router.get('/api/character', function(req, res){
    if (req.url.query.id) {
      storage.fetchItem('character', req.url.query.id)
      .then(character => {
        response.sendJSON(res, 200, character);
      })
      .catch(() => {
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    storage.availIDs('character')
    .then(allIDs => {
      response.sendJSON(res, 400, allIDs);
    });
  });

  router.delete('/api/character', function(req, res){
    if (req.url.query.id) {
      storage.deleteItem('character', req.url.query.id)
      .then(() => {
        response.sendText(res, 204);
      })
      .catch(() => {
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'no character ID given');
  });

  router.post('/api/character', function(req, res){
    try {
      var character = new Character(req.body.name, req.body.height, req.body.weight, req.body.saying);
      storage.createItem('character', character);
      response.sendJSON(res, 200, character);
    } catch (err) {
      response.sendText(res, 400, 'bad request');
    }
  });
};
