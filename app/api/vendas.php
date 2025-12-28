<?php
include_once __DIR__ . '/../db.php';
header("Content-Type: application/json");

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': // Registrar nova venda
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $db->prepare("INSERT INTO vendas (itens, total, forma_pagamento, cliente) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['itens'],
            $data['total'],
            $data['forma_pagamento'],
            $data['cliente']
        ]);

        echo json_encode(["status" => "venda registrada"]);
        break;

    case 'PUT': // Atualizar venda
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $db->prepare("UPDATE vendas SET itens = ?, total = ?, forma_pagamento = ?, cliente = ? WHERE id = ?");
        $stmt->execute([
            $data['itens'],
            $data['total'],
            $data['forma_pagamento'],
            $data['cliente'],
            $data['id']
        ]);

        echo json_encode(["status" => "venda atualizada"]);
        break;

    case 'DELETE': // Excluir venda
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $db->prepare("DELETE FROM vendas WHERE id = ?");
        $stmt->execute([$data['id']]);

        echo json_encode(["status" => "venda excluída"]);
        break;

    case 'GET': // Listar vendas
        if (!empty($_GET['id'])) {
            // Buscar venda específica
            $stmt = $db->prepare("SELECT * FROM vendas WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($row);
        } else {
            // Listar todas
            $stmt = $db->query("SELECT * FROM vendas ORDER BY data_venda DESC");
            $vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($vendas);
        }
        break;
}
?>
