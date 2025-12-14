// Função para carregar os produtos e preencher a tabela
async function carregarProdutos() {
  const categoria = document.getElementById("filtro-categoria")?.value || "";

  const res = await fetch(`api/produto.php?categoria=${encodeURIComponent(categoria)}`);
  const produtos = await res.json();
  const tbody = document.getElementById("lista-produtos");
  tbody.innerHTML = "";

  if (produtos.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="4" style="text-align:center; font-style:italic;">
        Nenhum produto cadastrado
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }

  produtos.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td data-label="ID">${p.id}</td>
      <td data-label="Nome">${p.nome}</td>
      <td data-label="Categoria">${p.categoria}</td>
      <td data-label="Ações">
        <button class="botao" onclick='editarProduto(${p.id}, ${JSON.stringify(p.nome)}, ${JSON.stringify(p.categoria)})'>✏️ Editar</button>
        <button class="botao" style="background-color: rgb(177, 0, 0);" onclick="excluirProduto(${p.id})">🗑️ Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Função para preencher o formulário com dados do produto
function editarProduto(id, nome, categoria) {
  document.getElementById("id-produto").value = id;
  document.getElementById("nome-produto").value = nome;
  document.getElementById("categoria-produto").value = categoria;
}

// Função para salvar novo produto ou editar existente
async function salvarProduto(event) {
  event.preventDefault();
  const id = document.getElementById("id-produto").value;
  const nome = document.getElementById("nome-produto").value;
  const categoria = document.getElementById("categoria-produto").value;

  const dados = { nome, categoria };

  if (id) {
    dados.id = id;
    await fetch('api/produto.php', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
  } else {
    await fetch('api/produto.php', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
  }

  document.getElementById("form-produto").reset();
  carregarProdutos();
}

// Função para excluir um produto
async function excluirProduto(id) {
  if (!confirm("Tem certeza que deseja excluir este produto?")) return;

  await fetch('api/produto.php', {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  carregarProdutos();
}

// Carregar produtos ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
