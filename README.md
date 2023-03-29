# ChatApp using React

This is a real-time chat application built using React and Socket.IO. The app allows users to join a chat room and communicate with each other in real time.

# Use case diagram

![nimetön](https://user-images.githubusercontent.com/49494825/220278067-b1f9dd3e-b02b-47c3-a5a0-3d3513276cd7.png)


# Front-end Dependencies
* Axios
* React-router-dom
* Socket.io-client
* Hooks (UseState, useContext, useEffect)
* RestApi

# Back-end Dependencies
* Dotenv
* Mongoose
* Socket.io
* Cors (helps to connect the front-end React with the server)
* Express
* Bcrypt (password hasher)

# Technologies Used

* Node.js: This is a JavaScript runtime environment that enables the execution of JavaScript code on the server side.
* React: This is a JavaScript library that allows the creation of interactive user interfaces.
* Express: This is a web application framework for Node.js that makes it easier to create web applications.
* Socket.IO: This is a library that enables real-time bidirectional communication between the client and server.
* Database: You will need a database to store the chat messages. I have used MongoDB and Mongoose.

# Functionality
* When a user connects to the application, their message is recorded on the server and they are added to the chat room.
* When a user sends a message, it is recorded on the server and saved to the MongoDB database. The message is then broadcast to all users in the chat room.
* When a user disconnects from the application, their message is recorded on the server and they are removed from the chat room.

# Schedule

| Week       | Dates            | Tasks                                                                                                                                                                                                                                                                                                         |
|------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Week 1** | Feb 20 - Feb 26  | - Plan project requirements and architecture<br>- Set up development environment<br>- Create basic React app structure<br>- Add basic styling to the chat room component<br>- Implement user authentication                                            |
| **Week 2** | Feb 27 - Mar 5   | - Add Socket.IO integration to the client and server<br>- Implement basic chat functionality (sending and receiving messages)<br>- Set up MongoDB and Mongoose for storing chat messages<br>- Add error handling and validation for user inputs                |
| **Week 3** | Mar 6 - Mar 12   | - Add user profile and avatar functionality<br>- Implement private messaging between users<br>- Add functionality to edit and delete messages<br>- Improve chat room styling and responsiveness                                                     |
| **Week 4** | Mar 13 - Mar 19  | - Implement real-time typing indicators<br>- Add sound notifications for new messages<br>- Add the ability to join and leave chat rooms<br>- Implement user blocking and reporting functionality                                                        |
| **Week 5** | Mar 20 - Mar 26  | - Add search functionality for messages and users<br>- Implement file sharing and image uploading<br>- Add the ability to mute and unmute notifications<br>- Improve accessibility of the app                                                             |
| **Week 6** | Mar 27 - Apr 2   | - Write tests for the application<br>- Optimize the application for better performance<br>- Add documentation for the codebase<br>- Fix any outstanding bugs or issues                                                                                    |
| **Week 7** | Apr 3 - Apr 10   | - Finalize the project<br>- Prepare the project for presentation and demo                                                                                   |
