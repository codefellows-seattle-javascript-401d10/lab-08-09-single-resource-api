![cf](https://i.imgur.com/7v5ASc8.png) lab-08-single-resource-api
======


# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* create a package.json that lists all dependencies and developer dependencies
* include an .eslintrc
* include a .gitignore
* include a readme with project description
* create a gulpfile

# Directions
* Create these directories to organize your code:
 * lib
 * model
 * test
* Create a HTTP Server using the http module
* Create a Object Constructor that creates a _simple resource_ with at least 3 properties
 * An `id` property that is set to a unique **node-uuid** id is required
 * Also include two other properties of your choice (like name, creationDate, etc.)
* Create a body parser that uses Promises to parse the json in the body of `POST` and `PUT` requests
* Create a url parser that returns a promise and uses nodes `url` and `querystring` modules parse the request url
* Create a Router Constructor that manages requests to `GET`, `POST`, `PUT`, and `DELETE` requests
* Create a route for doing `CREATE`, `READ`, and `DELETE` operations on your _simple resource_
* Create a storage module that will store resources by their type and id

## Server Endpoints
### `/api/simple-resource-name`
* `POST` request
 * pass data as stringifed json in the body of a post request to create a resource
* `GET` request
 * pass an `?id=<uuid>` in the query string to retrieve a specific resource as json
* `DELETE` request
 * pass an `?id=<uuid>` in the query string to delete a specific resource
 * should return 204 status with no content in the body

## Tests  
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `GET` - test 400, responds with 'bad request' if no id was provided in the request
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
 * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
 * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body

## Bonus
* **2pts** a `GET` request to `/api/simple-resource-name` with no **?id=** should retrun an array of all of the ids for that resource

## About The Program:
This program is a simple REST API that keeps track of and regulates journal entries. The specifications on what a valid journal entry should include is represented in the model with mandatory properties like a unique id, headline, and article. The user can write to and receive information from previously existing journal entries as well as write new ones and delete or edit old ones. To achieve this functionality a user can implement the following http methods: GET, POST, or DELETE. The program makes use of node's URL and querystring modules to parse a given request URL which can then be routed and handled appropriately depending on what method was being passed in as part of the URL as an endpoint.

##User Guide:
It is important to structure your files as follows:
* **lib dir** will contain your JSON and URL parse files and router and storage files
* **model dir** will contain your object constructor which will be a simple resource
* **test dir** will contain your program test files

Once your file structure has been set up you can install the following as Dev dependencies:
* mocha
* chai
* eslint
* superagent

Other dependencies:
* node-uuid
