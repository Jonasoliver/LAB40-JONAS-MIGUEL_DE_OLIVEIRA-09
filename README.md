# LAB40 – Laboratório de Funcionalidades Web

Projeto-base para avaliação prática de Integração e Entrega Contínua (CI/CD).

## Requisitos
- Node.js 20 ou superior.
- npm.

## Executar localmente
```bash
npm install
npm start
```
Acesse http://localhost:3000. Para desenvolvimento com reinicialização automática: `npm run dev`.

## Endpoints
- `GET /health`: verificação de disponibilidade.
- `GET /api/features`: lista as 40 funcionalidades e seus estados.
- `POST /api/features/:id`: executa uma funcionalidade, recebendo JSON no corpo.

Exemplo:
```bash
curl -X POST http://localhost:3000/api/features/1 -H "Content-Type: application/json" -d '{"valor":200,"percentual":15}'
```

## Estrutura
```text
lab40/
├── public/
├── src/
│   ├── app.js
│   ├── server.js
│   └── features/
├── package.json
└── package-lock.json
```

## Contrato de cada módulo
Cada arquivo `src/features/featureNN.js` exporta `id`, `name`, `description`, `implemented` e `execute(input)`.

1. Implemente `execute(input)`.
2. Valide os dados recebidos.
3. Retorne um objeto serializável em JSON.
4. Trate entradas inválidas lançando `Error` com mensagem clara.
5. Depois de implementar e validar, altere `implemented` para `true`.
6. Não altere o contrato dos outros módulos nem a API central sem autorização.

Enquanto `implemented` for `false`, a API retorna HTTP 501 para aquele módulo.

## Importante
Este repositório é entregue intencionalmente sem testes automatizados, análise estática, workflow de CI, build ou configuração de deploy. O estudante deverá criar e justificar esses elementos durante a avaliação.

O servidor escuta `process.env.PORT` e `0.0.0.0`, e a aplicação não persiste dados em disco.

## Feature 09 - Contador de caracteres

Arquivo: `src/features/feature09.js`

Recebe `{ "texto": "FATEC" }` e retorna `{ "quantidade": 5 }`. Conta tudo, inclusive espaços e pontuação. Usei `Array.from` para contar acento e emoji como um caractere só. Se `texto` não for string dá erro e a API retorna 400.

### Rodar os testes

```bash
npm install
npm test              # testes da feature 09
npm run lint          # eslint
npm run format:check  # prettier
npm run test:smoke    # testa /health e /api/features/9
npm audit --audit-level=high
```

Os testes cobrem caso típico (FATEC = 5), limites (texto vazio, só espaços, acento e emoji) e entradas inválidas (número, null, array, sem o campo).

### Teste manual

1. `npm start`
2. abrir http://localhost:3000/health e ver `status: ok`
3. abrir http://localhost:3000 e ver o card 09 como Implementada
4. selecionar o card 09 e executar com `{"texto":"FATEC"}` -> `quantidade: 5`
5. executar com `{"texto":123}` -> erro 400 "O campo texto deve ser uma string."
6. abrir /health de novo, o servidor continua funcionando

### Auditoria

`npm audit --audit-level=high` retornou `found 0 vulnerabilities`. O projeto não tem dependências de produção, só eslint e prettier como devDependencies, que não vão para a imagem Docker.

### Docker

```bash
docker build -t lab40:feature09 .
docker run -d --name lab40 -p 3000:3000 lab40:feature09
curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/features/9 -H "Content-Type: application/json" -d '{"texto":"FATEC"}'
docker rm -f lab40
```

- imagem: o pacote gerado pelo Dockerfile (node + código da aplicação)
- container: a imagem rodando
- registry: onde as imagens ficam guardadas (Docker Hub, GHCR). Aqui o CD é simulado, então a imagem é salva como `imagem.tar` e fica como artefato do GitHub Actions
- CI: roda formatação, lint, testes, smoke, audit, build da imagem e teste do container
- CD: roda depois do merge na main e gera `imagem.tar` e `deployment-record.txt`
