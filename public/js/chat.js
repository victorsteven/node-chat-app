var socket = io(); //initialise/create connection


function scrollToButton(){

    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight(); //get the second to the last li and get the height

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        // console.log("should scroll");
        messages.scrollTop(scrollHeight);
    }
}

    socket.on('connect', function() { //listen to connection
        console.log('Connected to server');

        var params = $.deparam(window.location.search);
        socket.emit('join', params, function(err) {
            if(err){
                alert(err);
                window.location.href = '/';
            }else{
                console.log("No error")
            };
        });

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


socket.on('updateUserList', function(users){
    // console.log("Users list", users);
    var ol = $('<ol></ol>');
    users.forEach(function(user){
        ol.append($('<li></li>').text(user));
    });
    //We are appending to the list, we are getting the latest list
    $('#users').html(ol);
});

// socket.on('newEmail', function(email){
//     console.log('new email', email);
// })

socket.on('newMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime

    });
    $('#messages').append(html);
    scrollToButton();

    // let formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log('new Message entered', message);
    // var li = $('<li></li>'); //used jquery to create an element
    // li.text(`${message.from}: ${message.text} at ${formattedTime}`);
    // $('#messages').append(li);

})

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data){
//     console.log('Got it', data);
// });
socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');

    let template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        // text: message.text,
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    $('#messages').append(html);
    scrollToButton();


    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');
    // li.text(`${message.from}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // li.append(" " + formattedTime);
    // $('#messages').append(li);
})

$('#message-form').on('submit', function(e){

    var messageTextbox = $('[name=message]');
    e.preventDefault();
    // console.log('u clicked me');
    socket.emit('createMessage', {
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

