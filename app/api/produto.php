<?php
include_once __DIR__ . '/../db.php';
header("Content-Type: application/json; charset=utf-8");

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST': // Criar produto
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare("INSERT INTO produtos (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['nome'], $data['descricao'], $data['preco'], $data['categoria']]);
            echo json_encode(["status" => "produto cadastrado"]);
            break;

        case 'PUT': // Atualizar produto
            $data = json_decode(file_get_contents('php://input'), true);
            if (empty($data['id'])) {
                http_response_code(400);
                echo json_encode(["erro" => "ID obrigatório"]);
                break;
            }
            $stmt = $db->prepare("UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ? WHERE id = ?");
            $stmt->execute([$data['nome'], $data['descricao'], $data['preco'], $data['categoria'], $data['id']]);
            echo json_encode(["status" => "produto atualizado"]);
            break;

        case 'DELETE': // Excluir produto
            $data = json_decode(file_get_contents('php://input'), true);
            if (empty($data['id'])) {
                http_response_code(400);
                echo json_encode(["erro" => "ID obrigatório"]);
                break;
            }
            $stmt = $db->prepare("DELETE FROM produtos WHERE id = ?");
            $stmt->execute([$data['id']]);
            echo json_encode(["status" => "produto excluído"]);
            break;

        case 'GET': // Listar produtos
            if (!empty($_GET['id'])) {
                $stmt = $db->prepare("SELECT * FROM produtos WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
            } elseif (!empty($_GET['categoria'])) {
                $stmt = $db->prepare("SELECT * FROM produtos WHERE categoria = ?");
                $stmt->execute([$_GET['categoria']]);
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            } else {
                $stmt = $db->query("SELECT * FROM produtos");
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
