# TaskFlow API

Backend desenvolvido em Node.js com TypeScript utilizando arquitetura modular, autenticação JWT e banco de dados relacional com Prisma.

## Descrição

A TaskFlow API é uma aplicação backend para gerenciamento de tarefas em equipes (teams), com controle de acesso baseado em roles.

O projeto foi estruturado com foco em boas práticas de desenvolvimento backend, incluindo separação de camadas, validação de dados, tratamento de erros e tipagem forte.

---

## Tecnologias

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* PostgreSQL
* JWT
* Zod
* Bcrypt

---

## Estrutura do Projeto

```
src/
  app.ts
  server.ts

  modules/
    auth/
    users/
    teams/
    tasks/

  shared/
    errors/
    middlewares/
    plugins/

  utils/
```

---

##  Configuração do Ambiente

### 1. Clonar o projeto

```
git clone <repo-url>
cd taskflow-api
```

---

### 2. Instalar dependências

```
npm install
```

---

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env`:

```
DATABASE_URL="seu_banco"
JWT_SECRET="seu_segredo"
```

---

### 4. Rodar o Prisma

```
npx prisma migrate dev
```

---

### 5. Rodar o projeto

```
npm run dev
```

---

## Autenticação

A API utiliza autenticação baseada em JWT.

### Fluxo:

1. Criar usuário
2. Realizar login
3. Receber token JWT
4. Enviar token no header

---

## Funcionalidades

### Usuários

* Criar usuário

### Autenticação

* Login com geração de token JWT

### Teams

* Criar team (usuário vira ADMIN)
* Adicionar membros (apenas ADMIN)

### Tasks

* Criar task (apenas membros do team)
* Listar tasks por team
* Atualizar status da task

---

## Regras de Negócio

* Apenas membros podem acessar recursos do team
* Apenas ADMIN pode adicionar novos membros
* Tasks pertencem a um team
* Status das tasks é controlado por enum:

  * PENDING
  * IN_PROGRESS
  * DONE

---

## Validação de Dados

A validação é feita utilizando Zod:

* Entrada validada nos controllers
* Tipos inferidos automaticamente
* Erros padronizados

---

## Tratamento de Erros

A aplicação possui um handler global que trata:

* Erros de domínio (`AppError`)
* Erros de validação (Zod)
* Erros internos (500)

---

## Segurança

* Senhas criptografadas com bcrypt
* JWT para autenticação
* Middleware de proteção de rotas

---

## Arquitetura

O projeto segue uma arquitetura em camadas:

* Controller → entrada da requisição
* Service → regras de negócio
* Repository → acesso ao banco

---

## Exemplos de Rotas

### Criar usuário

```
POST /users
```

```json
{
  "name": "Marcos",
  "email": "email@email.com",
  "password": "123456"
}
```

---

### Login

```
POST /login
```

---

### Criar team

```
POST /teams
```

---

### Criar task

```
POST /tasks
```

---

## 🚀 Possíveis Melhorias

* Refresh Token
* Testes automatizados (Vitest)
* Paginação e filtros


---

