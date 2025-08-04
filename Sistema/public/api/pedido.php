<?php
include 'db.php';
$db = conectarBanco();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': // Criar pedido
        $data = json_decode(file_get_contents('php://input'), true);

        // Garante que 'itens' seja um array
        $itens = $data['itens'];
        if (!is_array($itens)) {
            if (is_string($itens)) {
                $decoded = json_decode($itens, true);
                $itens = is_array($decoded) ? $decoded : [$itens];
            } else {
                $itens = [$itens];
            }
        }

        $stmt = $db->prepare("INSERT INTO pedidos (mesa, itens, status) VALUES (?, ?, ?)");
        $stmt->bindValue(1, $data['mesa']);
        $stmt->bindValue(2, json_encode($itens)); // Armazena como JSON de array
        $stmt->bindValue(3, 'Aberto');
        $stmt->execute();
        echo json_encode(["status" => "pedido criado"]);
        break;

    case 'PUT': // Atualizar pedido
        parse_str(file_get_contents('php://input'), $data);

        // Garante que 'itens' seja um array
        $itens = $data['itens'];
        if (!is_array($itens)) {
            if (is_string($itens)) {
                $decoded = json_decode($itens, true);
                $itens = is_array($decoded) ? $decoded : [$itens];
            } else {
                $itens = [$itens];
            }
        }

        $stmt = $db->prepare("UPDATE pedidos SET itens = ?, status = ? WHERE id = ?");
        $stmt->bindValue(1, json_encode($itens));
        $stmt->bindValue(2, $data['status']);
        $stmt->bindValue(3, $data['id']);
        $stmt->execute();
        echo json_encode(["status" => "pedido atualizado"]);
        break;

    case 'DELETE': // Excluir pedido
        parse_str(file_get_contents('php://input'), $data);
        if (isset($data['limparTudo']) && $data['limparTudo'] == 'true') {
            $stmt = $db->prepare("DELETE FROM pedidos");
            $stmt->execute();
            echo json_encode(["status" => "pedidos apagados"]);
        } elseif (isset($data['id'])) {
            $stmt = $db->prepare("DELETE FROM pedidos WHERE id = ?");
            $stmt->bindValue(1, $data['id']);
            $stmt->execute();
            echo json_encode(["status" => "pedido excluído"]);
        } else {
            echo json_encode(["erro" => "Parâmetros inválidos"]);
        }
        break;

    case 'GET': // Listar pedidos
        $results = $db->query("SELECT * FROM pedidos");
        $pedidos = [];
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $row['itens'] = json_decode($row['itens'], true);
            $pedidos[] = $row;
        }
        echo json_encode($pedidos);
        break;
}
?>
