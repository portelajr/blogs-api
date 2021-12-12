const express = require('express');

const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const categorieController = require('./controller/categorieController');
const blogpostController = require('./controller/blogpostController');
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

app.post('/login', loginController.loginUser);
app.post('/user', userController.createUser);
app.post('/categories', authMiddleware, categorieController.createCategorie);
app.post('/post', authMiddleware, blogpostController.createPost);
app.get('/user/:id', authMiddleware, userController.getById);
app.get('/user', authMiddleware, userController.getAll);
app.get('/categories', authMiddleware, categorieController.getAll);
app.get('/post', authMiddleware, blogpostController.getAll);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));

// https://sequelize.org/master/manual/model-querying-basics.html#specifying-attributes-for-select-queries especificações no findAll
// https://sequelize.org/master/manual/model-querying-finders.html#-code-findbypk--code-  busca por id
// https://stackoverflow.com/questions/14653913/rename-node-js-sequelize-timestamp-columns renomear colunas de createdAt/updatedAt
