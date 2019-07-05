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
    conexao.query("SELECT * FROM categoria;", function(error, rows) {
    if (error) {
        response.status(500).send(error);
    }
        response.status(200).send(rows);
    });
});

app.get("/:id", function(request, response) {
    conexao.query(
        "SELECT * FROM categoria where id = " + parseInt(request.params.idcategoria),
        function(error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            if (rows.length > 0) {
                response.status(200).send(rows);
            } else {
                response.status(404).send("Not Found");
            }
        });
});

app.post("/", function(request, response) {
    conexao.query( `insert into categoria (nome) values( '` + request.body.descricao + `' );`, function (err, rows){
        if (err) {
            response.status(500).send(err);
        }
            response.status(201).send("");
    });
});

app.put("/:id", function(request, response) {
    let sql = `UPDATE categoria SET nome = ?  WHERE idcategoria = ?`;
    let data = [request.body.nome, parseInt(request.params.idcategoria)];
 
    conexao.query(sql, data, (error, results, fields) => {
    if (error){
        response.status(500).send(error);
    }
        response.status(204).send("");
    });
});

app.delete("/:id", function(request, response) {
    conexao.query(
        "DELETE from categoria where idcategoria = '" + parseInt(request.params.idcategoria)+ "';",
    function(error, rows) {
        if (error) {
            response.status(500).send(error);
        }
            response.status(204).send("");
    });
});


module.exports = app;