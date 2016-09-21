'use strict';

//node modules
const http = require('http');
//npm modules
//app modules
const Note = require('./model/note');
const Router = require('./lib/router');
const storage = require('./lib/storage');
//module constants
const router = new Router();
const PORT = process.env.PORT || 3000;
//module logic

router.get('/api/note', function(req, res){
  if (req.url.query.id) {
    storage.fetchItem('note', req.url.query.id)
    .then( note => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Not found!');
      res.end();
    });
  }
});

router.post('/api/note', function(req, res){
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
    res.write('Bad request!');
    res.end();
  }
});

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('Master, the Server awaits your noble command!\nServer exists but to serve!\nIssue Server commands! It begs you to command it!\nPort', PORT);
});
