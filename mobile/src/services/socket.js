import socketio from 'socket.io-client';

const socket = socketio('http://192.168.15.8:4200', {
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    };
    socket.connect();

    socket.on('message', text => {
        console.log(text);
    });
    /* Exibe a mensagem que o backend envia a ele (mobile),
       sem que ele faca uma requisicao ao backend. Apenas apos uma conexao
       ele retorna a mesagem */
}

function disconnect() {
    if (socket.disconnected) {
        socket.disconnect();
    }
}

export {
    connect, 
    disconnect,
    subscribeToNewDevs,
}
//Necessario exporta-los para que os arquivos tenham acesso a essas funcoes