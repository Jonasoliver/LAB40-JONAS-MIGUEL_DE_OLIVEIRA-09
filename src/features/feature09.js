// Funcionalidade 09: Contador de caracteres.
// Objetivo: Conta caracteres de uma string.
// Exemplo de entrada: { texto: 'FATEC' }
// Implemente conforme as regras e critérios do enunciado fornecido pelo professor.

const implemented = true;

// Desenvolva a regra de negócio e valide todos os dados de entrada.
function execute(input) {
  const texto = input ? input.texto : undefined;

  if (typeof texto !== "string") {
    throw new Error("O campo texto deve ser uma string.");
  }

  // Array.from separa por caractere unicode, assim acento e emoji contam como 1
  return { quantidade: Array.from(texto).length };
}

// Mantém o contrato de integração utilizado pela API central.
module.exports = {
  id: 9,
  name: "Contador de caracteres",
  description: "Conta caracteres de uma string.",
  implemented,
  execute,
};
