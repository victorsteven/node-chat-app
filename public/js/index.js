var socket = io(); //initialise/create connection

    socket.on('connect', function() { //listen to connection
        console.log('Connected to server');

        // socket.emit('createEmail', {
        //     to: 'jane@example.com',
        //     text: 'Hey this is victor',
        //     createdAt: 1234
        // });

        // socket.emit('createMessage', {
        //     from: 'agu@gmail.com',
        //     text: 'Agu created a new message'
        // });
    });

    socket.on('disconnect', function() {
        console.log('disconnected from server')
});

// socket.on('newEmail', function(email){
//     console.log('new email', email);
// })

socket.on('newMessage', function(message){
    console.log('new Message entered', message);
    var li = $('<li></li>'); //used jquery to create an element
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
})

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data){
//     console.log('Got it', data);
// });

$('#message-form').on('submit', function(e){

    e.preventDefault();
    // console.log('u clicked me');
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val() //get the value
    }, function(){

    })
    $('[name=message]').val('');

    
});
