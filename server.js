'use strict';

const http = require('http');
const Journal = require('./model/journal.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/journal', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('journal', req.url.query.id)
    .then( journal => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(journal));
      res.end();
    })
    .catch( err => {
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

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server up ::', PORT);
});
