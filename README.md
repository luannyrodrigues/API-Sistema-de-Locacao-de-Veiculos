# API de Locação de Veículos

Este projeto consiste em uma API RESTful desenvolvida para a disciplina de Serviços Web, simulando o backend de um sistema de locação de veículos. A aplicação gerencia o fluxo completo de aluguel, desde a autenticação do usuário até a devolução do automóvel.


## Ferramentas Utilizadas

* **Node.js & Express:** Ambiente de execução e framework para a construção da API e gerenciamento de rotas.
* **PostgreSQL:** Banco de dados relacional para persistência de dados.
* **Sequelize:** ORM (Object-Relational Mapping) para abstração das consultas SQL e gestão de modelos.
* **JWT (JSON Web Token):** Mecanismo de autenticação stateless para proteção de rotas sensíveis.
* **Swagger (OpenAPI):** Geração automática de documentação e interface de testes das rotas.
* **Dotenv:** Gerenciamento de variáveis de ambiente (segurança de chaves e portas).


## Organização das Pastas

O projeto segue o padrão **MVC** (Model-View-Controller) adaptado para API:

```
src/          
├── controllers/        # Lógica de recebimento de requisições e resposta HTTP
├── middlewares/        # Validação de Token JWT
├── models/             # Definição das tabelas e esquemas do banco (Sequelize)
├── routes/             # Definição dos endpoints e verbos HTTP
├── services/           # Regras de negócio
├── db.js               # Instância de conexão com o banco
└── index.js            # Servidor
swagger/                # Script de configuração do Swagger
.env                    # Chaves de segurança e credenciais
```

## Como executar

1. Na pasta do projeto no Visual Studio Code, execute no terminal:

``` npm install ```

2. Crie um arquivo .env na raiz do projeto com suas credenciais:

``` PORT=3000
DB_NAME=locadora_db
DB_USER=postgres
DB_PASS=sua_senha
DB_HOST=localhost
JWT_SECRET=sua_chave_secreta 
```
3. Criar o banco de dados na máquina local com o mesmo nome que foi definido na variável DB_NAME.

4. Iniciar servidor e gerar documentação:

``` npm run dev ```

## Documentação da API

Disponível em:

http://localhost:3000/docs

## Testes das rotas - Postman

1. Importar: Abra o Postman e importe o arquivo `Aluguel_Carros.postman_collection.json`.
2. Ambiente: Certifique-se de criar uma variável global para armazenar a url base ([http//localhost/3000/api](http://localhost:3000/api))
