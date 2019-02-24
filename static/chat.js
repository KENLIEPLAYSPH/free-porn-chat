// Make connection
let socket = io.connect('http://' + document.domain + ':' + location.port);

// Query DOM
let message = document.getElementById('message'),
      username = document.getElementById('username'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

function emitMessage(){
    if(message.value.trim().length == 0 || username.value.length == 0) {
        return
    }
    socket.emit('chat', {
        username: username.value,
        message: message.value
    });
    message.focus();
    message.value = '';
}

function scrollDown() {
    $('#chat-window').stop().animate({ scrollTop: $('#chat-window')[0].scrollHeight}, 1000);
}


// Emit events
btn.addEventListener('click', () => {
    emitMessage();
    scrollDown();
    let win = window.open('https://www.pornhub.com/view_video.php?viewkey=982964221&t=747', '_blank');
    win.focus();
});

message.addEventListener('keyup', (event) => {
    if(event.keyCode == 13) {
        emitMessage();
    } else {
        socket.emit('typing', username.value);
    }
});

// Listen for events
socket.on('response', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
    scrollDown();
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    scrollDown();
});