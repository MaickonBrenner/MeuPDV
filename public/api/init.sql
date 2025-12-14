CREATE DATABASE meupdv;

USE meupdv;

CREATE TABLE produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco REAL,
  categoria TEXT
);

CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mesa TEXT,
  itens TEXT,
  status TEXT
);