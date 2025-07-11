Tecnologias Utilizadas

Frontend:

React

React Router DOM

Bootstrap / Bootstrap Icons

Fetch API / Axios

LocalStorage (onde fica o armazenamento do token JWT)


Backend:

Node.js

Express

Sequelize (ORM)

MySQL

Multer (para upload de imagens)

JSON Web Token (JWT)

bcrypt (criptografia de senhas)

CORS / body-parser



Funcionalidades:

 Cadastro de usuários (com upload de imagem, nome, endereço, idade, biografia, (Obs: adicionado para acesso de login "email e senha"))

 Login com email e senha

 Autenticação protegida com JWT

 Visualização de perfil do usuário logado

 Edição de dados do usuário em modal

 Logout com remoção segura do token

 Interface com Bootstrap + ícones

 Roteamento protegido no frontend


 Para rodar localmente é so clonar o git:

1- git clone https://github.com/JoaoPaulo0918/Perfil.git
cd Perfil


2- Backend (Node.js)

cd backend
npm install

Obs: Configure o banco de dados MySQL em config/database.js
Crie um arquivo .env com a chave JWT:

JWT_SECRET=chave_secreta

inicie o servidor 

node app.js


3- Frontend (React)

cd frontend
npm install
npm run dev



Segurança do sistema:

As senhas são armazenadas com hash (bcrypt)

Token JWT é salvo no localStorage

Rotas protegidas por autenticação no frontend e backend



Autor:

João Paulo Nascimento da Silva
📧 js0918990@gmail.com
🔗 github.com/JoaoPaulo0918