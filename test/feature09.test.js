const test = require("node:test");
const assert = require("node:assert/strict");
const feature = require("../src/features/feature09");

// caso tipico
test("FATEC tem 5 caracteres", () => {
  assert.deepEqual(feature.execute({ texto: "FATEC" }), { quantidade: 5 });
});

test("conta espacos e pontuacao", () => {
  assert.equal(feature.execute({ texto: "Olá, mundo!" }).quantidade, 11);
});

// limites
test("texto vazio retorna 0", () => {
  assert.equal(feature.execute({ texto: "" }).quantidade, 0);
});

test("so espacos tambem conta", () => {
  assert.equal(feature.execute({ texto: "  " }).quantidade, 2);
});

test("acento e emoji contam 1 cada", () => {
  assert.equal(feature.execute({ texto: "ação" }).quantidade, 4);
  assert.equal(feature.execute({ texto: "🙂" }).quantidade, 1);
});

// entradas invalidas
test("da erro quando texto nao e string", () => {
  const invalidos = [{ texto: 123 }, { texto: null }, { texto: ["a"] }, {}, undefined];
  for (const entrada of invalidos) {
    assert.throws(() => feature.execute(entrada), Error);
  }
});

test("nao altera o objeto de entrada", () => {
  const entrada = { texto: "FATEC" };
  feature.execute(entrada);
  assert.deepEqual(entrada, { texto: "FATEC" });
});
