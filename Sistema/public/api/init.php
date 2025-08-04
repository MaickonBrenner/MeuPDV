<?php
    include_once __DIR__ . '/db.php';
    // include("db.php");
    $db = conectarBanco();

    $db->exec("CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL,
        categoria TEXT
    )");

    $db->exec("CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mesa TEXT,
        itens TEXT,
        status TEXT
    )");

    echo "Banco inicializado.";
?>
