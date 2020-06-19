let mysql = require('mysql');
/*
let connMysql = ()=>{
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'1234',
        database:'geo_localizacao'
    });
};        
*/
let connMysql = ()=>{
    return mysql.createPool({
        user:"bbd520cce4c7b9",
        password:"4c214972",
        host:"us-cdbr-east-05.cleardb.net",
        database: "heroku_a59834f1b36583c"
    });
};  

module.exports = ()=>{
    return connMysql;
};