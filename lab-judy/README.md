Single Resource API - Day 8 Lab

This project enables a user to get, post, and delete data passed in to the server.

The data takes the form of an object:

{name: <name>, age: <age>}

Firstly, the user should install http pie onto their machine for optimal use.

The user should start their server on Port 3000 by typing "node index.js" in their terminal.

In a new tab, the user should type '{"name": "<name", "age": "<age>"}' | http :3000/api/person. They will get this data returned with a unique ID attached to it.

In order to receive this data back, the user should type http GET :3000/api/person/ id==<the id#>.

In order to delete the data, the user should type http DELETE :3000/api/person/id==<the id#>.
