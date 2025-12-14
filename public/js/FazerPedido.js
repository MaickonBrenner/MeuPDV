let carrinho = [];

document.getElementById("categoria").addEventListener("change", async function () {
  const categoria = this.value;
  const produtoSelect = document.getElementById("produto");
  produtoSelect.innerHTML = "<option value=''>Carregando...</option>";

  const res = await fetch(`api/produto.php?categoria=${encodeURIComponent(categoria)}`);
  const produtos = await res.json();

  if (produtos.length === 0) {
    produtoSelect.innerHTML = "<option value=''>Nenhum produto encontrado</option>";
    return;
  }

  produtoSelect.innerHTML = "<option value=''>Selecione um produto</option>";
  produtos.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `#${p.id} - ${p.nome}`; /* Aqui pode-se mudar o que será retornado */
    produtoSelect.appendChild(opt);
  });
});

document.getElementById("produto").addEventListener("change", function () {
  const quantidadeRow = document.getElementById("quantidade-row");
  quantidadeRow.style.display = this.value ? "table-row" : "none";
});

function adicionarAoCarrinho() {
  const produtoSelect = document.getElementById("produto");
  const produtoId = produtoSelect.value;
  const produtoNome = produtoSelect.options[produtoSelect.selectedIndex].text;
  const quantidade = parseInt(document.getElementById("quantidade").value);

  if (!produtoId || isNaN(quantidade) || quantidade < 1) {
    alert("Selecione um produto e quantidade válida!");
    return;
  }

  carrinho.push({ id: produtoId, nome: produtoNome, quantidade });

  atualizarListaCarrinho();
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = 1;
  document.getElementById("quantidade-row").style.display = "none";
}

function atualizarListaCarrinho() {
  const ul = document.getElementById("lista-carrinho");
  ul.innerHTML = "";
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} x${item.quantidade}`;

    const btn = document.createElement("button");
    btn.textContent = "🗑️ Remover";
    btn.style.marginLeft = "10px";
    btn.onclick = () => {
      carrinho.splice(index, 1);
      atualizarListaCarrinho();
    };

    li.appendChild(btn);
    ul.appendChild(li);
  });
}

async function realizarPedido(event) {
  event.preventDefault();

  const mesa = document.getElementById("mesa").value;
  const categoria = document.getElementById("categoria").value;
  const produtoSelect = document.getElementById("produto");
  const produtoId = produtoSelect.value;
  const produtoNome = produtoSelect.options[produtoSelect.selectedIndex]?.text || "";
  const quantidade = parseInt(document.getElementById("quantidade").value);

  // 🚫 Sempre obrigar selecionar a mesa
  if (!mesa) {
    alert("Selecione a mesa!");
    return;
  }

  // 🛒 Se carrinho estiver vazio, validar campos e adicionar item
  if (carrinho.length === 0) {
    if (!categoria || !produtoId || isNaN(quantidade) || quantidade < 1) {
      alert("Adicione ao menos um produto ao carrinho!");
      return;
    }

    carrinho.push({ id: produtoId, nome: produtoNome, quantidade });
    atualizarListaCarrinho();
  }

  // ✅ Monta o pedido com todos os itens do carrinho
  const pedido = {
    mesa,
    itens: carrinho.map(item => `Produto ${item.id} x${item.quantidade}`),
    status: "Aberto"
  };

  try {
    const res = await fetch("api/pedido.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    const resultado = await res.json();
    if (resultado.status === "pedido criado") {
      alert("Pedido realizado com sucesso!");
      document.querySelector("form").reset();
      carrinho = [];
      atualizarListaCarrinho();
    } else {
      alert("Erro ao realizar o pedido.");
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    alert("Não foi possível enviar o pedido.");
  }
}

// async function realizarPedido(event) {
//   event.preventDefault();

//   const mesa = document.getElementById("mesa").value;
//   const categoria = document.getElementById("categoria").value;
//   const produtoId = document.getElementById("produto").value;
//   const quantidade = parseInt(document.getElementById("quantidade").value);

//   if (!mesa || !categoria || !produtoId || isNaN(quantidade) || quantidade < 1) {
//     alert("Selecione mesa, categoria, produto e informe a quantidade!");
//     return;
//   }

//   const pedido = {
//     mesa,
//     itens: [`Produto ${produtoId} x${quantidade}`],
//     status: "Aberto"
//   };

//   const res = await fetch("api/pedido.php", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(pedido)
//   });

//   const resultado = await res.json();
//   if (resultado.status === "pedido criado") {
//     alert("Pedido realizado com sucesso!");
//     document.querySelector("form").reset();
//   } else {
//     alert("Erro ao realizar o pedido.");
//   }
