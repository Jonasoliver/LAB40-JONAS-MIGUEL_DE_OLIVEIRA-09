// smoke test: sobe o servidor numa porta livre e testa as rotas principais
const { createServer } = require("node:http");
const assert = require("node:assert/strict");
const app = require("../src/app");

async function main() {
  const server = createServer(app);
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  const url = `http://127.0.0.1:${server.address().port}`;

  try {
    const health = await fetch(`${url}/health`);
    assert.equal(health.status, 200);
    console.log("ok /health");

    const lista = await (await fetch(`${url}/api/features`)).json();
    const f9 = lista.items.find((f) => f.id === 9);
    assert.equal(f9.implemented, true);
    console.log("ok /api/features (feature 9 implementada)");

    const res = await fetch(`${url}/api/features/9`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: "FATEC" }),
    });
    const corpo = await res.json();
    assert.equal(res.status, 200);
    assert.equal(corpo.result.quantidade, 5);
    console.log("ok POST /api/features/9 ->", JSON.stringify(corpo.result));

    const erro = await fetch(`${url}/api/features/9`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: 123 }),
    });
    assert.equal(erro.status, 400);
    console.log("ok entrada invalida -> 400");
  } finally {
    server.close();
  }
}

main().catch((e) => {
  console.error("smoke test falhou:", e.message);
  process.exit(1);
});
