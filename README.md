# API Students

Uma API RESTful para gerenciamento de estudantes, construída com NestJS.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) (testes automatizados)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Thunder Client](https://www.thunderclient.com/) / [Postman](https://www.postman.com/)

---

## 📦 Como baixar o projeto

```bash
git clone git@github.com:Jaci-Xavier/api-students.git
cd api-students
```

---

## ⚙️ Configuração

1. **Instale as dependências:**

```bash
npm install
```

2. **Crie o arquivo `.env` com as variáveis necessárias** (exemplo abaixo):

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
PORT=3000
JWT_SECRET=seusegredojwt
```

> Se não utilizar `.env`, você pode configurar os valores diretamente no `main.ts` ou em arquivos de configuração do NestJS.

---

## ▶️ Como rodar a aplicação

```bash
# Em modo desenvolvimento
npm run start:dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testes automatizados

Execute os testes unitários e de integração com:

```bash
npm run test
```

Ou, para os testes end-to-end:

```bash
npm run test:e2e
```

Gere o relatório de cobertura com:

```bash
npm run test:cov
```

---

## 🔬 Testes com Thunder Client / Postman

1. Certifique-se de que a API está rodando (`npm run start:dev`).
2. Faça chamadas HTTP para os endpoints. Exemplos:

### `Post /login`

```json
{
  "email": "gabriel@example.com",
  "password": "123456"
}
```

Copie o token que é retornado pela api.

## `O token retornado deve ser passado para todas as proximas rotas`

Abra a aba `Auth` vá até a opção `Bearer token` e cole o token copiado no retorno do login

### `POST /students`

```json
{
  "name": "Gabriel",
  "grade": 8
}
```

### `GET /students`

Retorna a lista de estudantes, exemplo:

```json
[
  {
    "id": 3,
    "name": "Anna",
    "grade": 10,
    "firstUniqueLetter": "_"
  },
  {
    "id": 4,
    "name": "Antônia",
    "grade": 10,
    "firstUniqueLetter": "T"
  },
  {
    "id": 5,
    "name": "Celeste",
    "grade": 5,
    "firstUniqueLetter": "C"
  }
]
```

### `PATCH /students/:id`

```json
{
  "name": "Gabriel Atualizado"
}
```

### `DELETE /students/:id`

Remove um estudante por ID.

Você pode importar a coleção para o **Thunder Client** ou **Postman** com os endpoints da aplicação. Basta criar os requests conforme os exemplos acima.

---

## ✅ Convenções de código

- Código formatado com Prettier (`LF`, `singleQuote`, `trailingComma`).
- ESLint configurado para boas práticas com TypeScript e NestJS.
- Estrutura modular organizada por domínios (`/student`, `/auth`, etc).

---

## 📂 Estrutura de Pastas

```
src/
│
├── student/
│   ├── dto/
│   ├── student.controller.ts
│   ├── student.service.ts
│
├── auth/
│   ├── guards/
│
├── common/
│   ├── utils/
│
├── app.module.ts
├── main.ts
```

---

## 📄 Licença

MIT © [Jaci Xavier](https://github.com/Jaci-Xavier)
