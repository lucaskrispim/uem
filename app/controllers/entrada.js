// Esse módulo exporta o controller que faz a recepção de de dados via post, guarda no banco e emite uma mensagem com os dados para o frontend 

class admin{
    static salvar(app,req,res){
        let connection = app.config.dbConnection();
        var mapaModel = new app.app.models.MapaDAO(connection);
        mapaModel.salvarLocalizacao(req.body,(error,result)=>{
            if (!error) {
                console.log(req.body);
                app.get('io').emit('msgParaCliente',[req.body]);    
                res.status(200).json(req.body);
            }
        }); 
    }; 
}

module.exports = () => {
    return admin;
};