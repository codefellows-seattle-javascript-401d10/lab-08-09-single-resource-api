'use strict';

// node modules
const http = require('http');
// npm modules
// app modules
const todo = require('./model/todo.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
// module constants
const PORT = process.env.PORT || 3000;
const router = new Router();
// module logic

router.get('/api/todo', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('todo', req.url.query.id)
    .then( todo => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(todo));
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
  console.error(err);
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

router.post('/api/todo', function(req,res) {
  try {
    var todo = new Todo(req.body.name, req.body.content);
    storage.createItem('todo', todo);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(todo));
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

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server is running', PORT);
});
