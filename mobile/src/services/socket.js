import socketio from 'socket.io-client';

const socket = socketio('http://192.168.15.8:4200', {
    autoConnect: false,
});

function connect() {
    socket.connect();
}

function disconnect() {
    if (socket.disconnected) {
        socket.disconnect();
    }
}

export {
    connect, 
    disconnect,
}
//Necessario exporta-los para que os arquivos tenham acesso a essas funcoes