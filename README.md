# Express RESTful API

This is a simple RESTful API built with Express.js, designed to store messages in a JSON file. The API supports CRUD operations (Create, Read, Update, Delete) for messages.

## Getting Started

Follow the steps below to set up and run the application locally.

### Prerequisites

- Node.js and npm installed. [Download and install Node.js](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/icortes/RestfulAPIExample.git
2. Open in Visual Studio Code
3. Open Terminal and install dependencies:
   ```bash
   npm install
4. Start the server:
   ```bash
   npm start
5. Open your web browser or use a tool like Postman to interact with the API.
     * To retrieve all messages: GET http://localhost:3000/messages
     * To retrieve a single message by ID: GET http://localhost:3000/messages/:id
     * To add a new message: POST http://localhost:3000/messages
     * To update a message by ID: PUT http://localhost:3000/messages/:id
     * To delete a message by ID: DELETE http://localhost:3000/messages/:id
