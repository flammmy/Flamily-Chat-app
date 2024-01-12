A simple real-time chat application built with React.js, Node.js, Express.js, and MongoDB.
## Overview

This project is a real-time chat application that allows users to communicate in real-time. It includes both client-side (React.js) and server-side (Node.js, Express.js, MongoDB) components.

## Features

- Real-time chat functionality
- User authentication and authorization
- Message persistence using MongoDB

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB

### Steps

1. Clone the repository:
```
git clone https://github.com/flammmy/real-time-chat-app.git
```

Navigate to the project directory:

```
cd flamily-chat-app
```

Install dependencies for the client:

```
cd public
npm install
```

Install dependencies for the server:

```
cd ../server
npm install
```

Configure the environment variables:

Create a .env file in the server directory and set the necessary variables such as MongoDB connection string,PORT etc
Start the client and server:

# Start the frontend (in the public directory)
```
npm start
```

# Start the server (in the server directory)
```
cd ../server
npm start
```

Open your browser and navigate to http://localhost:3000 to use the application.

**Usage**
Register or log in with your credentials.
Enter a chat room or create a new one.
Start chatting in real-time with other users in the same chat room.
Technologies Used
React.js
Node.js
Express.js
MongoDB
Socket.io (for real-time communication)

**Contributing**
Contributions are welcome! Feel free to open issues or pull requests.
