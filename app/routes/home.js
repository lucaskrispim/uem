module.exports = (app) =>{ // rota da inserção externa de dados na aplicação
    app.get('/',(req,res)=>{
        app.app.controllers.home.index(app,req,res);
    });
};