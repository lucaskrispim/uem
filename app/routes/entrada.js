
module.exports = (app) =>{
    app.post('/salvar',(req,res)=>{
        app.app.controllers.entrada.salvar(app,req,res);
    });
}