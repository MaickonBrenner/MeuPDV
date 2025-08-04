const lista = document.getElementById("lista-pedidos");

async function carregarPedidos() {
  const res = await fetch('api/pedido.php');
  const pedidos = await res.json();
  renderizarPedidos(pedidos);
}

function renderizarPedidos(pedidos) {
  lista.innerHTML = "";

  pedidos.forEach(pedido => {
    let itensHtml = "";

    if (Array.isArray(pedido.itens)) {
      itensHtml = pedido.itens.map(item => `<li>${item}</li>`).join('');
    } else if (typeof pedido.itens === "string") {
      itensHtml = `<li>${pedido.itens}</li>`;
    } else {
      itensHtml = `<li>(Itens inválidos)</li>`;
    }

    const pedidoDiv = document.createElement("div");
    pedidoDiv.className = "pedido-card";
    pedidoDiv.innerHTML = `
      <h3>Mesa: ${pedido.mesa}</h3>
      <p>Status: <strong>${pedido.status}</strong></p>
      <p>Itens:</p>
      <ul>${itensHtml}</ul>
      <button onclick="finalizarPedido(${pedido.id})">Finalizar</button>
      <button onclick="excluirPedido(${pedido.id})">Excluir</button>
    `;
    lista.appendChild(pedidoDiv);
  });
}

async function excluirPedido(id) {
  await fetch('api/pedido.php', {
    method: 'DELETE',
    body: new URLSearchParams({ id })
  });
  carregarPedidos();
}

async function finalizarPedido(id) {
  await fetch('api/pedido.php', {
    method: 'PUT',
    body: new URLSearchParams({
      id,
      itens: JSON.stringify([]),
      status: "Finalizado"
    })
  });
  carregarPedidos();
}

function buscarPedido() {
  const termo = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".pedido-card");
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(termo) ? "block" : "none";
  });
}

async function limparPedidos() {
  if (!confirm("Tem certeza que deseja apagar todos os pedidos? Essa ação não pode ser desfeita.")) return;

  try {
    const res = await fetch("api/pedido.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: "limparTudo=true"
    });

    const result = await res.json();
    if (result.status === "pedidos apagados") {
      alert("Todos os pedidos foram apagados com sucesso!");
    } else {
      alert("Erro ao apagar os pedidos.");
    }
  } catch (erro) {
    console.error("Erro ao limpar pedidos:", erro);
    alert("Falha na requisição.");
  }
}

document.addEventListener("DOMContentLoaded", carregarPedidos);
window.limparPedidos = limparPedidos;