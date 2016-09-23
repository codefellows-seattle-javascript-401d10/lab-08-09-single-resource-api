'use strict';

const storage = require('../lib/storage.js');
const Note = require('../model/note.js');

module.exports = function(router){
  router.get('/api/note', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('note', req.url.query.id)
      .then(note => {
        res.writeHead(200, {
          'Content-type': 'application/json',
        });
        res.write(JSON.stringify(note));
        res.end();
      })
      .catch (err => {
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

  router.post('/api/note', function(req, res) {
    try {
      var note = new Note(req.body.name, req.body.content);
      storage.createItem('note', note);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(note));
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

  router.delete('/api/note', function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem('note', req.url.query.id)
      .then(() => {
        res.writeHead(204);
        res.write('successfully deleted');

        res.end();
      })
      .catch (err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('not found; unable to delete');
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
