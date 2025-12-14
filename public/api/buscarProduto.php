<?php
    include("db.php");

    $categoria = $_GET['categoria'] ?? '';
    $stmt = $pdo->prepare("SELECT id, nome FROM produtos WHERE categoria = ?");
    $stmt->execute([$categoria]);
    $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");
    echo json_encode($produtos);
?>
