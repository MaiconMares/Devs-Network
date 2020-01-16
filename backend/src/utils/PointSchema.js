const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});
//É um tipo de dado personalizado que criamos de acordo com a documentação do MongoDB

module.exports = PointSchema;