# MeuPDV
Repositório oficial do **Sistema MeuPDV**.

## 📌 Sobre o Sistema
O **MeuPDV** é um sistema de gerenciamento de vendas desenvolvido para facilitar o controle de produtos, categorias e operações de um ponto de venda. Além disso, também conta com uma seção dedicada para controle de mesas e pedidos para lanchonetes e restaurantes. 
Ele foi projetado para ser simples, rápido e eficiente, atendendo pequenos e médios estabelecimentos. 

---

## ⚙️ Instruções para Instalação

Para instalar e rodar o **MeuPDV**, siga os passos abaixo:

### 1. Clonar o repositório
```bash
git clone https://github.com/MaickonBrenner/MeuPDV.git
cd MeuPDV
```
### 2. Rodar com Docker Compose
Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
Em seguida, execute:

```bash
docker compose up -d
```
Isso irá:
- Criar os containers necessários (PHP, servidor web, banco SQLite).
- Subir o sistema automaticamente na porta configurada (por padrão http://localhost:8070).

### 3. Acessar o sistema
Abra o navegador e acesse:

```bash
http://localhost:8070
```
---

## 🛠️ Tecnologias Utilizadas
O sistema foi construído utilizando as seguintes tecnologias:

- **Docker**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" width="150" height="150"/>

- **SQLite**  
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original-wordmark.svg" width="150" height="150"/>

- **PHP**  
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Webysther_20160423_-_Elephpant.svg" width="150" height="150"/>

---

## 🚨 Alerta sobre o Google Chrome  
Foi identificada uma instabilidade no Google Chrome relacionada ao funcionamento do modal de edição de produtos:

Em alguns cenários, o modal pode não ser exibido corretamente ou o efeito de fundo borrado não é aplicado.

No Firefox e DuckDuckGo, o modal funciona normalmente.

Esse comportamento está ligado ao suporte parcial do Chrome ao CSS backdrop-filter.

Recomendação: até que o problema seja corrigido pelo navegador, utilize o Firefox ou DuckDuckGo para garantir a melhor experiência.
