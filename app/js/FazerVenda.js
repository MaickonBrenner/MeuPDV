let produtosConfirmados = [];
let total = 0;
let produtoAtual = null;

// Buscar produto pelo ID
async function buscarProduto(id) {
  const resposta = await fetch("produto.php?id=" + id);
  return await resposta.json();
}

// Evento de busca
document.getElementById("buscaProdutoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const codigo = document.getElementById("codigo").value;
  const produto = await buscarProduto(codigo);

  if (produto && produto.id) {
    produtoAtual = produto;
    document.getElementById("produtoInfo").innerHTML = `
      <p><strong>Nome:</strong> ${produto.nome}</p>
      <p><strong>Descrição:</strong> ${produto.descricao}</p>
      <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
    `;
    document.getElementById("confirmarProduto").style.display = "inline-block";
  } else {
    document.getElementById("produtoInfo").innerHTML = "<p style='color:red;'>Produto não encontrado.</p>";
    document.getElementById("confirmarProduto").style.display = "none";
  }
});

// Confirmar produto e adicionar à lista
document.getElementById("confirmarProduto").addEventListener("click", () => {
  if (produtoAtual) {
    produtosConfirmados.push(produtoAtual);
    total += parseFloat(produtoAtual.preco);

    const tbody = document.querySelector("#listaProdutos tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produtoAtual.nome}</td>
      <td>R$ ${parseFloat(produtoAtual.preco).toFixed(2)}</td>
    `;
    tbody.appendChild(tr);

    document.getElementById("total").textContent = total.toFixed(2);

    // Reset
    produtoAtual = null;
    document.getElementById("produtoInfo").innerHTML = "";
    document.getElementById("confirmarProduto").style.display = "none";
    document.getElementById("codigo").value = "";
  }
});

// Finalizar venda
document.getElementById("finalizarVenda").addEventListener("click", async () => {
  if (produtosConfirmados.length === 0) {
    alert("Nenhum produto adicionado.");
    return;
  }

  const itens = JSON.stringify(produtosConfirmados);
  const forma_pagamento = "dinheiro"; // pode evoluir para selecionar
  const cliente = "";

  await fetch("vendas.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itens, total, forma_pagamento, cliente })
  });

  alert("Venda registrada com sucesso!");
  // Resetar lista
  produtosConfirmados = [];
  total = 0;
  document.querySelector("#listaProdutos tbody").innerHTML = "";
  document.getElementById("total").textContent = "0.00";
});
