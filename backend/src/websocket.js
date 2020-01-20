const parseStringAsArray = require('./utils/parseStringAsArray');   
const socketio = require('socket.io');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];


let io;
exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;
        console.log(socket.id);
        console.log(socket.handshake.query);

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        })
        //Armazena os dados das conexoes feitas do mobile ao backend

        setTimeout(() => {
            socket.emit('message', 'Salut!');
        }, 3000);
        //Emite uma mensagem ao frontend sem ele fazer uma requisição ao backend
    });
    //Recebe as conexões e dados do mobile
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(techItem => techs.includes(techItem))
    })
}
/* Retorna as conexoes dos devs que estao no maximo a 10km das coordenadas recebidas e 
   que sabem usar as tecnologias filtradas. As coordenadas recebidas por 
   findConnections() sao aquelas em que o usuario atualmente esta com a tela aberta em 
   cima de determinada regiao. A funcao calculateDistance e um calculo naval que se 
   chama , baixamos ele na internet. */

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}
/* Envia a mensagem ao dev que acabou de ser cadastrado e esta de acordo
   com as condicoes de filtro. */