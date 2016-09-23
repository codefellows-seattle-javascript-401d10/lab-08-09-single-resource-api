'use strict';
//gets random id
const uuid = require('node-uuid');

module.exports = function(name, content, type) {
  if (!name) throw new Error('name expected');
  if (!content) throw new Error('content expected');
  if (!type) throw new Error('type expected');
  this.id = uuid.v1(); //can make use of timestamp
  this.name = name;
  this.content = content;
  this.type = type;
};

// get errors as soon as possible so you can do something about it
// if something is thrown, you need to put it in a try block so you can catch it otherwise it crashes program
