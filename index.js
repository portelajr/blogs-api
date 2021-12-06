const express = require('express');

const app = express();
const bodyParser = require('body-parser').json();

const userRouter = require('./routers/userRouter');

const PORT = 3000;

app.use(bodyParser);
const router = express.Router();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

router.use('/user', userRouter);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));
