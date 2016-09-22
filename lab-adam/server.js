'use strict';

// node modules
const http = require('http');
// npm modules
// app modules
const Character = require('./model/character.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
// module constants
const PORT = process.env.PORT || 3000;
// module logic
const router = new Router();
const server = http.createServer(router.route());

router.get('/api/character', function(req, res){
  if (req.url.query.id) {
    storage.fetchItem('character', req.url.query.id)
    .then(character => {
      res.writeHead(200, {
        'Content-Type':'application/json',
      });
      res.write(JSON.stringify(character));
      res.end();
    })
    .catch(err => {
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
    'Content-Type': 'application/json',
  });
  var allIDs = storage.availIDs();
  res.write(JSON.stringify(allIDs));
  res.end();
});

router.delete('/api/character', function(req, res){
  if (req.url.query.id) {
    storage.deleteItem('character', req.url.query.id)
    .then(() => {
      res.writeHead(204);
      res.end();
    })
    .catch(err => {
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
  res.write('no character ID given');
  res.end();
});

router.post('/api/character', function(req, res){
  try {
    var character = new Character(req.body.name, req.body.height, req.body.weight, req.body.saying);
    storage.createItem('character', character);
    res.writeHead(200, {
      'Content-Type':'application/json',
    });
    res.write(JSON.stringify(character));
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

server.listen(PORT, function(){
  console.log('Serverup , booya ::', PORT);
});
