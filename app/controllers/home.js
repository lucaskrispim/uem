// Módulo que contém o controller da rota home. basicamente ele só renderiza a página inicial
class home{
    static index(app,req,res){ 
        app.get('io').on('connection',(socket)=>{ // comunicação com socket
            console.log('usuário conectou!');
            socket.on('disconnect', ()=>{
                console.log('usuário desconectou');
            });
            socket.on('msgParaServidor',(data)=>{ // mensagem recebida do frontend
                let connection = app.config.dbConnection(); // conexão com banco de dados
                let mapaModel = new app.app.models.MapaDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
                mapaModel.getPoints((error,result)=>{ // Aqui usamos o método da classe para trazer todos os registros no banco de dados
                    socket.emit('msgParaCliente',result);   // emitimos esse dados para o cliente
                });        
            });   
        });
        res.render("home/index");
    }
}

module.exports = () => {
    return home;
}