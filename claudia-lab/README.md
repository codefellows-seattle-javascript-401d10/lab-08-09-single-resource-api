##about

We created an HTTP server that allows a simple resource to be created and a simple persistence layer to save them.

`server.js` creates a new router.

`router.js` matches methods adds methods to the router according to endpoint and callback function. `GET` finds a created file if given a correct id. POST creates a file given a name and body. A random id is assigned using `node-uuid`. `DELETE` removes a file if the correct id is given.

`recipe-route.js` calls the methods on the storage object and handles errors using promises, sending status codes to the server.

`storage.js` handles asychronous callbacks from the router methods using promises. If errors are encountered, the promise is rejected and it doesn't finish running.

a data/recipe path is set up to hold all the created recipes.

`parse-json.js` and `parse-url.js` allow us to convert json and url data to information that can be sent over HTTP and be read easily on the client and server sides.
