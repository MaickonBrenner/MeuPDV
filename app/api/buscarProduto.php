<?php
    include_once __DIR__ . '/../db.php';
    header("Content-Type: application/json");

    $categoria = $_GET['categoria'] ?? '';
    $stmt = $pdo->prepare("SELECT id, nome FROM produtos WHERE categoria = ?");
    $stmt->execute([$categoria]);
    $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");
    echo json_encode($produtos);
?>
