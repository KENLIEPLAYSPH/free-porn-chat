from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = '8=========Э'
socketio = SocketIO(app)


@app.route('/')
def session():
    return render_template('template.html')


@socketio.on('chat')
def handle_message(json, method=['GET', 'POST']):
    print('event received:', json)
    socketio.emit('response', json)


@socketio.on('typing')
def handle_typing(json, method=['GET', 'POST']):
    socketio.emit('typing', json)


if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')


# TODO
# - add commands:
#   help
#   settings
#   styling (font-size, color)
#   spam (repeat message)
#   history
#   change topic, background
#   iframes, links
#   show random porn video
# - add porn sites support (iframes)
# - fix emit event 'typing'
# - add feature: paste image from clipboard, drag and drop image to send it

