'use strict';

const uuid = require('node-uuid');

module.exports = function(name, style, abv){
  if (!name) throw new Error('name expected');
  if (!style) throw new Error('style expected');
  if (!abv) throw new Error('abv expected');
  this.id = uuid.v1();
  this.name = name;
  this.style = style;
  this.abv = abv;
};
