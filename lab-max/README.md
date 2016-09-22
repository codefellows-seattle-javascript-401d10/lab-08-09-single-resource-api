#Single Resource API

For this assignment we created a simple, single resource REST API allowing a user to use the normal CRUD operations (except you can't update yet). The server was created using the 'http' module in Node. I specifically made a /api/beer resource, with properties of: name, style, and abv. A unique generated id is also created when a new Beer object is POSTed.

All examples shown are run using httpie.

npm modules used:

- cowsay
- gulp
- gulp-eslint

Node modules used:

- http
- uuid
- url
- querystring

#Start Server
```
node server.js
```
#POST
- To make a valid POST, will return a 200 status code:
  - ```
  echo { "name": "Rainier", "style": "Lager", "abv": "4.0" | http POST localhost:3000/api/beer
  ```
- Example of a 'bad request' will return a 400 status code:
  - ```
  echo { "name": "Rainier", "style": "", "whoops": "4.0" | http POST localhost:3000/api/beer
  ```

#GET
- Once one or more POST requests have been made, you can run GET requests to receive that data.
- A valid GET request, will return a 200 status code:
  - ```
  http localhost:3000/api/beer?id=(specific id)
  ```
- A GET request to an id that doesn't exist will return a 404 status code:
  - ```
  http localhost:3000/api/beer?id=12345
  ```
- A 'bad request' GET request will return a 400 status code:
  - ```
  http localhost:3000/api/beer
  ```

#DELETE
- One one ore most POST requests have been made, you can run DELETE requests to delete data from the 'database'.
- A valid DELETE request, will return a 204 status code:
  - ```
  http DELETE localhost:3000/api/beer?id=(specific id)
  ```
- A DELETE request to an id that doesn't exist will return a 404 status code:
  - ```
  http DELETE localhost:3000/api/beer?id=12345
  ```
- A 'bad request' DELETE request will return a 400 status code:
  - ```
  http DELETE localhost:3000/api/beer
  ```
