let app = require('./config/server');

let server = require('http').createServer(app)
io = require('socket.io').listen(server)

server.listen(process.env.PORT || 3001);

app.set('io',io);
  
io.on('connection',(socket)=>{
    console.log('usuário conectou!');

    socket.on('disconnect', ()=>{
        console.log('usuário desconectou');
    });

    socket.on('msgParaServidor',(data)=>{
        let connection = app.config.dbConnection();
        let mapaModel = new app.app.models.MapaDAO(connection);
        mapaModel.getPoints((error,result)=>{
            socket.emit('msgParaCliente',result);
        });        
        
    });   
});



