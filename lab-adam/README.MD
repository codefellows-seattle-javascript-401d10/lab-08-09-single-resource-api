<h1>Homegrown Router</h1>

This application serves as an example of a 'vanilla' or ground up router built off the 'http' and 'router' modules. It uses Mocha, Chai, and Superagent for testing.

With this API you can create, retrieve and delete "Characters" with properties including:
- name
- height
- weight
- saying

The router passes all of the following tests:
- GET - test 404, responds with 'not found' for valid request made with an id that was not found
- GET - test 400, responds with 'bad request' if no id was provided in the request
- GET - test 200, response body like {<data>} for a request made with a valid id
- POST - test 400, responds with 'bad request' for if no body provided or invalid body
- POST - test 200, response body like {<data>} for a post request with a valid body

Additionally, if you pass make a GET request with no specified ID, you will receive an array of all available Character IDs.
