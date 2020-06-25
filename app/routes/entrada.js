// rota de entrada na aplicação. basicamente ela renderiza a página inicial da aplicação
module.exports = (app) =>{
    app.post('/salvar',(req,res)=>{
        app.app.controllers.entrada.salvar(app,req,res);
    });
}