const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async filtrarDevs(request, response) {
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);

        console.log(request.query);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
                /* $in é um operador do MongoDB que filtra itens salvos,
                   com as características passadas. Neste caso, o que 
                   houver em techsArray é o que será procurado nos itens. 
                   Os outros com $ abaixo também são operadores de filtro
                   do MongoDB
                */
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 100000,
                }
            }
        });

        return response.json({ devs });
    }
}