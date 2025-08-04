<?php 
function conectarBanco() {
    // $dbPath = realpath(__DIR__ . "/../../data/meupdv.db");
    // $dbPath = __DIR__ . "/../../data/meupdv.db";
    $dbPath = "/var/www/html/data/meupdv.db";

    try {
        $db = new SQLite3($dbPath);
        if (!$db) {
            throw new Exception("Erro ao conectar com o banco.");
        }
        return $db;
    } catch (Exception $e) {
        http_response_code(500);
        header("Content-Type: application/json");
        echo json_encode(["erro" => "Falha ao conectar com o banco", "detalhes" => $e->getMessage()]);
        exit;
    }
}
?>
