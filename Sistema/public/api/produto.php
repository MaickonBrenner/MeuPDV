<?php 
    // include __DIR__ . '/db.php';
    include("db.php");
    $db = conectarBanco();

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST': // Cria ou adiciona produto
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $db->prepare("INSERT INTO produtos (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)");
            $stmt->bindValue(1, $data['nome']);
            $stmt->bindValue(2, $data['descricao']);
            $stmt->bindValue(3, $data['preco']);
            $stmt->bindValue(4, $data['categoria']);
            $stmt->execute();
            echo json_encode(["status" => "produto cadastrado"]);
            break;
        case 'PUT': // Atualizar
            parse_str(file_get_contents('php://input'), $data);
            $stmt = $db->prepare("UPDATE produtos SET descricao = ?, preco = ?, categoria = ? WHERE nome = ?");
            $stmt->bindValue(1, $data['nome']);
            $stmt->bindValue(2, $data['descricao']);
            $stmt->bindValue(3, $data['preco']);
            $stmt->bindValue(4, $data['categoria']);
            $stmt->execute();
            echo json_encode(["status" => "produto atualizado"]);
            break;
        case 'DELETE': // Excluir
            parse_str(file_get_contents('php://input'), $data);
            $stmt = $db->prepare("DELETE FROM produtos WHERE nome = ?");
            $stmt->bindValue(1, $data['nome']);
            $stmt->execute();
            echo json_encode(["status" => "produto excluído"]);
            break;
        case 'GET': // Listar com filtro de categoria
            if (isset($_GET['categoria']) && $_GET['categoria'] !== '') {
                // 👈 Tratamento para tela que envia 'categoria'
                $categoria = $_GET['categoria'];
                $stmt = $db->prepare("SELECT * FROM produtos WHERE categoria = ?");
                $stmt->bindValue(1, $categoria);
                $results = $stmt->execute();

                $produtos = [];
                while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
                    $produtos[] = $row;
                }

                echo json_encode($produtos);
                exit;
            } else {
                // 👈 Tratamento para tela que NÃO envia 'categoria'
                $stmt = $db->query("SELECT * FROM produtos");
                $produtos = [];

                while ($row = $stmt->fetchArray(SQLITE3_ASSOC)) {
                    $produtos[] = $row;
                }

                echo json_encode($produtos);
                exit;
                }
            break;
    }
?>
