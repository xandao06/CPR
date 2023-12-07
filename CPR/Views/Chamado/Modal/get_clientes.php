<?php
$servername = "seu_servidor_mysql";
$username = "seu_usuario_mysql";
$password = "sua_senha_mysql";
$dbname = "seu_banco_de_dados";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$sql = "SELECT nome FROM clientes";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $clientes = array();
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row["nome"];
    }
    echo json_encode($clientes);
} else {
    echo "0 resultados";
}

$conn->close();
?>