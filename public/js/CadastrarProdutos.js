async function cadastrarProduto(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const preco = parseFloat(document.getElementById("preco").value);
  const categoria = document.getElementById("categoria").value;

  if (!nome || isNaN(preco) || categoria === "item0") {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const produto = { nome, descricao, preco, categoria };

  const res = await fetch("../api/produto.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto)
  });

  const resultado = await res.json();
  console.log(resultado);

  if (resultado.status === "produto cadastrado") {
    alert("Produto cadastrado com sucesso!");
    document.querySelector("form").reset();
  } else {
    alert("Erro ao cadastrar produto.");
  }
}
