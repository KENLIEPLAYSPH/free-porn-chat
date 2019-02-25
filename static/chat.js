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
        return;
    }
    socket.emit('chat', {
        username: username.value,
        message: message.value
    });
    addMessageToHistory(message.value);
    message.focus();
    message.value = '';
}

// Store user's sent messages (local history
let myMessages = [];

// Accessory functions
function scrollDown() {
    $('#chat-window').stop().animate({ scrollTop: $('#chat-window')[0].scrollHeight}, 1000);
}

function addMessageToHistory(msg) {
    myMessages.push(msg);
    positionInMessageHistory = myMessages.length;
    
}

const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ENTER = 13;
let positionInMessageHistory = 0;


// Emit events
btn.addEventListener('click', () => {
    emitMessage();
    scrollDown();
    let win = window.open('https://www.pornhub.com/view_video.php?viewkey=982964221&t=747', '_blank');
    win.focus();
});

message.addEventListener('keyup', (event) => {
    if(event.keyCode == ARROW_UP) {
        if(positionInMessageHistory > 0) {
            positionInMessageHistory--;
        }
        message.value = myMessages[positionInMessageHistory];
        return;
    }
    if(event.keyCode == ARROW_DOWN) {
        if(positionInMessageHistory < myMessages.length - 1) {
            positionInMessageHistory++;
        }
        message.value = myMessages[positionInMessageHistory];
        return;
    }
    if(event.keyCode == ENTER) {
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