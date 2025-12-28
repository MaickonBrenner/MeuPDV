<?php
include_once __DIR__ . '/../db.php';
header("Content-Type: application/json");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': // Criar pedido
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("INSERT INTO pedidos (mesa, itens, status) VALUES (?, ?, ?)");
        $stmt->execute([$data['mesa'], $data['itens'], $data['status']]);
        echo json_encode(["status" => "pedido criado"]);
        break;

    case 'PUT': // Atualizar pedido
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("UPDATE pedidos SET mesa = ?, itens = ?, status = ? WHERE id = ?");
        $stmt->execute([$data['mesa'], $data['itens'], $data['status'], $data['id']]);
        echo json_encode(["status" => "pedido atualizado"]);
        break;

    case 'DELETE': // Excluir pedido
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("DELETE FROM pedidos WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(["status" => "pedido excluído"]);
        break;

    case 'GET': // Listar pedidos
        $stmt = $db->query("SELECT * FROM pedidos");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
}
?>
