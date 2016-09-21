'use strict';

const uuid = require('node-uuid');

module.exports = function(title, author, description){
  if(!title) throw new Error('title expected');
  if(!author) throw new Error('author expected');
  if(!description) throw new Error('description expected');
  this.id = uuid.v1();
  this.title = title;
  this.author = author;
  this.description = description;
};
