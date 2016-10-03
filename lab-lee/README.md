# Project Overview

The purpose of this project is to create a RESTful API with persistent storage for creating, reading, updating and deleting notes. The user may create the content of the notes, as well as their name, but the server will handle creation of a randomly generated note id through the use of an object constructor.

The project is modularized, which each module performing a distinct task for the application.

The project uses test-driven-development which tests creating a note, reading a note, and then deleting a note. If the filepath does not exist for where the note is being created in the data/note directory, the test will create the filepath. This allows for the testing of persistent storage by writing a file with the data, ensuring the POST method actually works.
