
# Sistema de Gerenciamento de Usuários

Uma aplicação full-stack para gerenciar dados de usuários, com frontend em React e backend em Node.js/Express conectado a um banco de dados MySQL.

## Pré-requisitos

- Node.js (versão 12.0.0 ou superior)  
- Banco de dados MySQL  
- npm (Gerenciador de Pacotes do Node)

## Estrutura do Projeto

- `frontend/` - Aplicação React  
- `backend/` - Servidor API Express

## Primeiros Passos

### Configuração do Banco de Dados

1. Importe o arquivo SQL no seu banco de dados MySQL:
   - Abra sua ferramenta de gerenciamento do MySQL (phpMyAdmin, MySQL Workbench, etc.)
   - Crie um novo banco de dados chamado `exp_criativa` (ou escolha outro nome)
   - Importe o arquivo `.sql` fornecido

### Configuração do Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Abra o arquivo `.env`
   - Atualize as seguintes variáveis com suas credenciais do MySQL:
     ```
     DB_HOST=localhost
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_NAME=nome_do_seu_banco
     DB_PORT=3306
     ```

4. Inicie o servidor backend:
   ```bash
   npm start
   ```
   O servidor backend será iniciado na porta 5000.

### Configuração do Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend/reactproject
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do frontend:
   ```bash
   npm start
   ```
   A aplicação frontend será iniciada na porta 3000 e abrirá no seu navegador padrão.

## Endpoints da API

- `GET /` - Buscar todos os usuários  
- `GET /users/:id` - Buscar um usuário específico  
- `POST /users` - Criar um novo usuário  
- `PUT /users/:id` - Atualizar um usuário  
- `DELETE /users/:id` - Deletar um usuário  
- `GET /test-db` - Testar conexão com o banco de dados

## Funcionalidades

- Exibir uma lista de usuários  
- Ver informações detalhadas de um usuário  
- Adicionar novos usuários  
- Atualizar usuários existentes  
- Remover usuários

## Tecnologias Utilizadas

- **Frontend**:
  - React  
  - Axios para chamadas à API  
  - CSS para estilização

- **Backend**:
  - Node.js  
  - Express  
  - MySQL2 para conexão com o banco de dados  
  - CORS para requisições entre origens diferentes

## Solução de Problemas

- Se você encontrar problemas com CORS, verifique se o backend está em execução e se o frontend está se conectando à porta correta  
- Verifique suas credenciais do banco de dados em caso de erros de conexão  
- Certifique-se de que tanto o frontend quanto o backend estejam rodando simultaneamente
