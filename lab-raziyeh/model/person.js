'use strict';

const uuid = require('node-uuid');

module.exports = function(name, content) {
  if (!name || !content) throw new Error('Name / content are expected');
  this.id = uuid.v1();
  this.name = name;
  this.creationDate = new Date();
  this.content = content;
};