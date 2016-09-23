'use strict';

const uuid = require('node-uuid');

module.exports = function(name, sex) {
  if (!name || !sex) throw new Error('name / sex are expected');
  this.id = uuid.v1();
  this.name = name;
  this.sex = sex;
  this.creationDate = new Date();
};