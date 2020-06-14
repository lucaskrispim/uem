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