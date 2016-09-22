<h1>REST API for Cartoon Characters with a homegrown Router</h1>

This is a REST API following the CRUD model that allows clients to create, retrieve and delete cartoon characters. It's built on a 'vanilla' or ground up router built off the 'http' and 'router' modules. It uses Mocha, Chai, and Superagent for testing.

With this API you can create, retrieve and delete "Characters" with properties including:
- name (.e.g. bugs bunny)
- height
- weight
- saying (e.g. 'ehh, whats up doc?')

This app features persistent storage, storing characters in individual JSON files.

The router passes all of the following tests:
- GET - test 404, responds with 'not found' for valid request made with an id that was not found
- GET - test 400, responds with 'bad request' if no id was provided in the request
- GET - test 200, response body like {<data>} for a request made with a valid id
- POST - test 400, responds with 'bad request' for if no body provided or invalid body
- POST - test 200, response body like {<data>} for a post request with a valid body

Additionally, if you pass make a GET request with no specified ID, you will receive an array of all available Character IDs.
