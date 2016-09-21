'use strict';

const uuid = require('node-uuid');

module.exports = function(name, height, weight, saying){
  if (!name) throw new Error('name expected');
  if (!height) throw new Error('content expected');
  this.id = uuid.v1();
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.saying = saying;
};
