![cf](https://i.imgur.com/7v5ASc8.png) Javascript 401d10 -- Lab 08
======

## Single Resource API -- CatAPI

This simple REST API allows you to keep track of your cats and their breed. At last, an API that can track an unlimited number of cats!

CatAPI is built using the HTTP module of Node.js, and is tested using SuperAgent.

# Start the API

From your terminal, navigate to the home directory and enter `node server.js`. A welcome message will greet you and the API is ready to use.

# Use the API

CatAPI has one endpoint: `/api/cats`. It accepts three HTTP methods: GET, POST and DELETE.

GET and DELETE receive a querystring with an ID. POST accepts a JSON object with `name` and `breed` parameters. POSTing a new cat will return a JSON object:

`{
    "breed": "Shorthair",
    "id": "513d0780-8072-11e6-a385-fbc82196f8d7",
    "name": "Moggy"
}
`
Make a mental note of this easy-to-remember ID number. It is the best way to retrieve your cat record. It is also the only way.

CatAPI can only record the name and breed of your cats. Attempting to enter additional information will return an error message. Can our competitors say the same?

# Break the API

CatAPI's error messages are among the clearest in the cat API industry. The possible status codes and error messages are:

* `200`: Something is working!
* `204`: You successfully deleted your content.
* `404` and the message `Id not found!`: You've entered the wrong ID.
* `404` and the message `Not found!`: You're not using the `/api/cat` endpoint.
* `400` and the message `Bad request!`: You haven't entered an ID.
* `400` and the message `Bad request!`: You are attempting to POST improperly formatted JSON objects.
* `400` and the message `Bad request!`: You are attempting to POST without including a JSON object.

# Closing the API

From the shell instance running the server, end the server with `^C`.

NOTE! Closing the server will erase all data! IT IS HIGHLY RECOMMENDED THAT YOU RUN CatAPI AT ALL TIMES. WE ARE NOT RESPONSIBLE FOR LOST CATS.

# What to do if you encounter a bug

* If you are a Codefellows instructor, mark me down and leave me a note and I will fix it.
* Everyone else should pray. Nothing else has the slightest chance of working.
