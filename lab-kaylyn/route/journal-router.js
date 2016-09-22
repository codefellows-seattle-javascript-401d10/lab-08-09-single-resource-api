'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Journal = require('../model/journal.js');

module.exports = function(router) {
  router.get('/api/journal', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('journal', req.url.query.id)
      .then( journal => {
        response.sendJSON(res, 200, journal);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/journal', function(req,res) {
    var journal = new Journal(req.body.headline, req.body.article);
    storage.createItem('journal', journal)
    .then( journal => {
      response.sendJSON(res, 200, journal);
    })
    .catch( err => {
      console.error(err);
      response.sendText(res, 404, 'not found');
    });
  });

  router.delete('/api/journal', function(req, res){
    if(req.url.query.id) {
      storage.deleteItem('journal', req.url.query.id)
      .then( journal => {
        response.sendJSON(res, 200, journal);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
