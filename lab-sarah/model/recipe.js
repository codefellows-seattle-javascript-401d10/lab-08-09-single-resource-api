'use strict';

const uuid = require('node-uuid');

module.exports = function(name, content){
  if (!name) throw new Error('name expected');
  if (!content) throw new Error('content expected');
  this.id = uuid.v4();
  this.name = name;
  this.content = content;
};
