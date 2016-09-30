'use strict';

const uuid = require('node-uuid');

module.exports = function(name, age){
  if (!name) throw new Error('name expected');
  if (!age) throw new Error('age expected');
  this.id = uuid.v1(),
  this.name = name;
  this.age = age;
};
