// Carregar produtos
async function carregarProdutos() {
  const res = await fetch("api/produto.php");
  const produtos = await res.json();
  const tbody = document.getElementById("lista-produtos");
  tbody.innerHTML = "";

  if (!Array.isArray(produtos) || produtos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; font-style:italic;">Nenhum produto cadastrado</td></tr>`;
    return;
  }

  produtos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${p.descricao || ""}</td>
      <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
      <td>${p.categoria}</td>
      <td>
        <button class="botao" onclick='editarProduto(${p.id}, ${JSON.stringify(p.nome)}, ${JSON.stringify(p.descricao)}, ${p.preco}, ${JSON.stringify(p.categoria)})'>✏️ Editar</button>
        <button class="botao" style="background-color: rgb(177, 0, 0);" onclick="excluirProduto(${p.id})">🗑️ Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editarProduto(id, nome, descricao, preco, categoria) {
  document.getElementById("id-produto").value = id;
  document.getElementById("nome-produto").value = nome;
  document.getElementById("descricao-produto").value = descricao;
  document.getElementById("preco-produto").value = preco;
  document.getElementById("categoria-produto").value = categoria;

  document.getElementById("modal-edicao").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal-edicao").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("modal-edicao");
  if (event.target === modal) {
    fecharModal();
  }
}

// Salvar alterações (PUT)
async function salvarProduto(event) {
  event.preventDefault();
  const id = document.getElementById("id-produto").value;
  const nome = document.getElementById("nome-produto").value;
  const descricao = document.getElementById("descricao-produto").value;
  const preco = document.getElementById("preco-produto").value;
  const categoria = document.getElementById("categoria-produto").value;

  const res = await fetch("api/produto.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nome, descricao, preco, categoria })
  });

  const resposta = await res.json();
  alert(resposta.status || resposta.erro);

  fecharModal();
  carregarProdutos();
}

// Excluir produto (DELETE)
async function excluirProduto(id) {
  if (!confirm("Tem certeza que deseja excluir este produto?")) return;

  const res = await fetch("api/produto.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  const resposta = await res.json();
  alert(resposta.status || resposta.erro);

  carregarProdutos();
}

// Inicializar
document.addEventListener("DOMContentLoaded", carregarProdutos);
