# Blogs-API
API de gerenciamento de BlogPosts desenvolvida atendendo requisitos prospostos durante formação técnica na [Trybe](https://www.betrybe.com/?utm_source=trybe.com.br).

##  Sobre a aplicação:

Aplicação Back-end consiste em uma API de gerenciamento de requisições/respostas a um cliente, simulando regras de negócio de
um blog de conteúdo escrito.

## Especificações técnicas:

- Aplicação desenvolvida em Node.JS / Express
- Arquitetura MSC - model, service e controller.
- Banco de dados MySQL: tabelas Users, BlogPosts, Categories, PostCategories (relacionamento N:N)
- Sequelize (ORM) - integração da model com o banco de dados relacional
- Autenticação de login com JWT

## Rodando Localmente:  
> Certifique-se que possui MySQL instalado.  
> Certifique-se que possui Postman instalado ou a extensão ThunderClient em seu VSCode.

Depois de clonado o repositório:

- Instalar as dependencias do projeto:  `$ npḿ install`

- Criar um arquivo .env com 4 variáveis locais:

    HOSTNAME= - seu host mysql -  
    MYSQL_USER= - seu usuário mysql -  
    MYSQL_PASSWORD= - senha de acesso mysql -  
    JWT_SECRET= - uma senha de criptografia-  

- Execute os comandos ORM para criar e popular as tabelas:  
`$ npx sequelize db:migrate`  
`$ npx sequelize db:seed:all`
