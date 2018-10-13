var socket = io(); //initialise/create connection

    socket.on('connect', function() { //listen to connection
        console.log('Connected to server');

        // socket.emit('createEmail', {
        //     to: 'jane@example.com',
        //     text: 'Hey this is victor',
        //     createdAt: 1234
        // });

        socket.emit('createMessage', {
            from: 'agu@gmail.com',
            text: 'Agu created a new message'

        });
    });

    socket.on('disconnect', function() {
        console.log('disconnected from server')
});

// socket.on('newEmail', function(email){
//     console.log('new email', email);
// })

socket.on('newMessage', function(newMsg){
    console.log('new Message entered', newMsg);
})
