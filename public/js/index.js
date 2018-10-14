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
    let formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('new Message entered', message);
    var li = $('<li></li>'); //used jquery to create an element
    li.text(`${message.from}: ${message.text} at ${formattedTime}`);
    $('#messages').append(li);
})

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data){
//     console.log('Got it', data);
// });
socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    li.append(" " + formattedTime);
    $('#messages').append(li);
})

$('#message-form').on('submit', function(e){

    var messageTextbox = $('[name=message]');
    e.preventDefault();
    // console.log('u clicked me');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val() //get the value
    }, function(){
        messageTextbox.val(''); //set the value to an empty string
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
    console.log('hello');

    // if(!navigator.geolocation){
    //     return alert('Geolation not supported by ur browser')
    // }
    locationButton.attr('disabled', 'disabled').html('Sending location <i class="fa fa-spinner fa-spin"></>');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        // console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});

