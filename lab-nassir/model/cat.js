'use strict';

const uuid = require('node-uuid');

module.exports = function(name, breed){
  if (!name) throw new Error('name expected');
  if (!breed) throw new Error('breed expected');
  this.id = uuid.v1();
  this.name = name;
  this.breed = breed;
};
