'use strict';

const uuid = require('node-uuid');

module.exports = function(name, sex) {
  if (!name || !sex) throw new Error('Name / sex are expected');
  this.id = uuid.v1();
  this.name = name;
  this.creationDate = new Date();
  this.sex = sex;
};