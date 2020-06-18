let app = require('./config/server');


/* parametrizar a porta de escuta */
var port_number = server.listen(process.env.PORT || 3000);
let server = app.listen(port_number,()=>{
    console.log("Servidor On");
});
   
let io = require('socket.io').listen(server);


app.set('io',io);
 /*  
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
*/


