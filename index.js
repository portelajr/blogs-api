const express = require('express');

const bodyParser = require('body-parser');
const userController = require('./controller/userController');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
//

// app.get('/meudeus', userController.teste);
app.post('/user', userController.createUser);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));
