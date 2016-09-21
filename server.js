'use strict';

const http = require('http');
const Todo = require('./model/todo.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/todo', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('todo', req.url.query.id)
    .then( todo => {
      res.writeHead(200, {
        'date-Type': 'application/json',
      });
      res.write(JSON.stringify(todo));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'date-Type': 'text/plain',
      });
      res.write('not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {
    'date-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

router.post('/api/todo', function(req,res) {
  try {
    var todo = new Todo(req.body.item, req.body.date);
    storage.createItem('todo', todo);
    res.writeHead(200, {
      'date-Type': 'application/json',
    });
    res.write(JSON.stringify(todo));
    res.end();
  } catch (err) {
    res.writeHead(400, {
      'date-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/todo', function(req, res){
  if(req.url.query.id) {
    storage.deleteItem('todo', req.url.query.id)
    .then (() => {
      res.writeHead(204, {
        'date-Type': 'text/plain'
      });
      res.write('item at ' + req.url.query.id + ' was deleted.');
      res.end();
    })
    .catch ( err => {
      console.error(err);
      res.writeHead(404, {
        'date-Type': 'text/plain',
      });
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'date-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server is running', PORT);
});
