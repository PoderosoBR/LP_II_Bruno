var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var app = express();

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'bancobruno'
});

conexao.connect();



app.get("/", function(request, response) {
    conexao.query("SELECT * FROM produto", function(error, rows) {
    if (error) {
        response.status(500).send(error);
    }
        response.status(200).send(rows);
        console.log(rows);

    });
});

app.post("/", function(request, response) {
    conexao.query(
        "INSERT INTO produto (nome,idcat) values ('" +
        request.body.nome + "', '" + parseInt(request.body.idcat)+ "' )",
    function(error, rows) {
        if (error) {
            response.status(500).send(error);
        }
            response.status(201).send("");
    });
});

app.put("/:id", function(request, response) {
    let sql = `UPDATE produto
           SET nome = ? , idcategoria = ?
           WHERE idProduto = ?`;
    let data = [request.body.nome, parseInt(request.body.idcat), parseInt(request.params.idProduto)];
 
    conexao.query(sql, data, (error, results, fields) => {
    if (error){
        response.status(500).send(error);
    }
        response.status(204).send("");
    });
});

app.delete("/:id", function(request, response) {
    conexao.query(
        "DELETE from produto where idproduto = " + parseInt(request.params.idProduto),
    function(error, rows) {
        if (error) {
            response.status(500).send(error);
        }
            response.status(204).send("");
    });
});


module.exports = app;