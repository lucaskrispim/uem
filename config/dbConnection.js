let mysql = require('mysql');

let connMysql = ()=>{
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'1234',
        database:'geo_localizacao'
    });
};        

module.exports = ()=>{
    return connMysql;
};