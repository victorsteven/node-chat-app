const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

//__dirname is the server folder

var app = express();

// console.log(__dirname + "/../public");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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

    

socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and room are required");
        }

    //the user join a room, then we remove them from any room joined before, then we add them to the new room
    socket.join(params.room); //join a room by the string given
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //emit to specific user
    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} just joined`));

    callback();
});
    
    //It is the client that create the "createMessage" that is listened here
    socket.on('createMessage', (message, callback) => {
        // console.log('The message', newMsg);
        //io.emit: sends to everyone, including the creator
        console.log("createMessage", message);
        var user = users.getUser(socket.id);
        if(user && message.text){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        // callback('This is from the server');
        callback();
        //this is send the massage message to every other socket but this one
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });

    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
        var user = users.removeUser(socket.id);

        if(user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left`));
        }

    });

}); 
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});