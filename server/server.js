const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

//__dirname is the server folder

var app = express();

// console.log(__dirname + "/../public");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

var server = http.createServer(app);
var io = socketIO(server);

// console.log(publicPath);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected'); //listen for a new connection

    // socket.emit('newEmail', {
    //     from: 'steven@gmail.com',
    //     text: "this is what im telling you",
    //     createdAt: 123
    // });

    // socket.emit('newMessage', {
    //     from: 'akin@gmail.com',
    //     text: 'This is the message from someone',
    //     createdAt: 235443
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail: ', newEmail);
    // });

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Someone just joined the group'));
    
    //It is the client that create the "createMessage" that is listened here
    socket.on('createMessage', (message, callback) => {
        // console.log('The message', newMsg);
        //io.emit: sends to everyone, including the creator
        console.log("createMessage", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        //this is send the massage message to every other socket but this one
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });

    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    })

}); 
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});