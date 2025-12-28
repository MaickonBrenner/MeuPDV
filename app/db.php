<?php
    $db = new PDO('sqlite:/app_data/meupdv.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Produtos
    $db->exec("CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL,
        categoria TEXT
    )");

    // Pedidos
    $db->exec("CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mesa TEXT,
        itens TEXT,
        status TEXT
    )");

    // Vendas
    $db->exec("CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
        itens TEXT,
        total REAL,
        forma_pagamento TEXT,
        cliente TEXT
    )");
?>
