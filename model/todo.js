'use strict';

const uuid = require('node-uuid');

module.exports = function(item, date){
  if (!item) throw new Error('item expected');
  if (!date) throw new Error('date expected');
  this.id = uuid.v1();
  this.item = item;
  this.date = date;
};
