'use strict';

//node modules
//npm modules
//app modules
const parseUrl = require('./parse-url');
const parseJson = require('./parse-json');
const response = require('./response');
//module constants
//module logic

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(){
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
    .then( () => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }

      console.error('Route not found!');
      response.sendText(res, 404, 'Not found!');
    })
    .catch( err => {
      console.error(err);
      response.sendText(res, 400, 'Bad router request!');
    });
  };
};
