const express = require('express');

const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const categoryController = require('./controller/categoryController');
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

app.get('/user/:id', authMiddleware, userController.getById);
app.post('/user', userController.createUser);
app.get('/user', authMiddleware, userController.getAll);
app.post('/login', loginController.loginUser);
app.get('/categories', authMiddleware, categoryController.getAll);
app.post('/categories', authMiddleware, categoryController.createCategorie);
app.get('/post/:id', authMiddleware, blogpostController.getById);
app.put('/post/:id', authMiddleware, blogpostController.updatePost);
app.post('/post', authMiddleware, blogpostController.createPost);
app.get('/post', authMiddleware, blogpostController.getAll);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));

// https://sequelize.org/master/manual/model-querying-basics.html#specifying-attributes-for-select-queries especificações no findAll
// https://sequelize.org/master/manual/model-querying-finders.html#-code-findbypk--code-  busca por id
// https://stackoverflow.com/questions/14653913/rename-node-js-sequelize-timestamp-columns renomear colunas de createdAt/updatedAt
// https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries updates simples
