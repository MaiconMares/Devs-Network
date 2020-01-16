const express = require('express'); //require() busca o pacote express em /node_modules
const mongoose = require('mongoose'); //require() busca o pacote express em /node_modules
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.get('/users', (request, response) => {
    console.log(request.query);
    return response.json({ message: "Bonjour!" });
});


mongoose.connect('mongodb+srv://MaiconMares:QNPJEPOSF4580@omnistack-ozlai.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true
});


app.delete('/users/:id', (request, response) => {
    console.log(request.params);
    return response.json({ message: "Salut monde!" });
});

app.post('/users', (request, response) => {
    console.log(request.body);
    return response.json({ message: "Très bien, bravo bravo!" });
});

app.listen(3333);