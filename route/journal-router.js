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
    try {
      var journal = new Journal(req.body.headline, req.body.article);
      storage.createItem('journal', journal);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(journal));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });

  router.delete('/api/journal', function(req, res){
    if(req.url.query.id) {
      storage.deleteItem('journal', req.url.query.id)
      .then (() => {
        res.writeHead(204, {
          'Content-Type': 'text/plain'
        });
        res.end();
      })
      .catch ( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  });
};
