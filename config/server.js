let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let load = require('express-load');

let app = express();
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.set('views','./app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended:true}));

/*
consign().include('./config/dbConnection.js')    
            .then('./app/models')   
            .then('./app/controllers') 
            .then('./app/routes')
            .into(app);
*/

load('./config/dbConnection.js')
                .then('./app/models')   
                .then('./app/controllers') 
                .then('./app/routes')
                .into(app);

module.exports = app;