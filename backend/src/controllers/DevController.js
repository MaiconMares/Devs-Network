const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('./../websocket');

//É a mesma ideia da view do Django
//Ela só trabalha com um listener para fazer get por controller
module.exports = { 
    async mostrarDevs(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async salvarDev(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
                
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        let dev = await Dev.findOne({ github_username });
        //let permite que a variável seja sobreposta

        if(!dev) {
            console.log(apiResponse.data);
            let { name, avatar_url, bio, login } = apiResponse.data; /* name = login define um valor 
            padrao para name se ele nao tiver valor */

            if(!name) {
                name = login; //Se name for nulo ele receberá o valor de login
            }

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            /* Repare que nao inserimos os valores que os campos da model receberao,
            pois em JS quando a variavel alvo e a variavel por meio da qual sera 
            passado o valor tem mesmo nome, o JS interpreta automaticamente sem precisar 
            repetir os dois nomes */

            const sendSocketMessageTo = findConnections(
                { latitude, longitude }, techsArray
            );

            console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
            /* Envia a mensagem ao novo dev cadastrado que esta de acordo 
               com as condicoes de filtro (coordenadas e tecnologias) */
        }
        return response.json({ message: 'Réquisition réussi!' });
    },
    async atualizarDev(request, response) {
        const userId = parseInt(request.params.id);
    }
};