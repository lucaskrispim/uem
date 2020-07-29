let app = require('./config/server'); // Requisição feita para o arquivo de configurações

let server = require('http').createServer(app) // Criar um servidor http para fazer a comunicação com socket
io = require('socket.io').listen(server) // instancia o módulo do socket escutando na mesma porta do servidor

server.listen(process.env.PORT || 3002,()=>{
    console.log('Servidor On!')
}); // Aqui é feita a escolha de porta de escuta

app.set('io',io); // aqui estamos empacotando a variável io para ser usada dentro do app
  
io.on('connection',(socket)=>{ // comunicação com socket
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


// Esse trecho é a comunicação com a porta serial
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('/dev/pts/3', { baudRate: 9600 });

// Analisador sintático - Leitura de dados 
const parser_port = new Readline();
port.pipe(parser_port);
port.write('Porta COM Funcionando\n');
let connection = app.config.dbConnection(); // conexão com banco de dados

parser_port.on('data', (line) => {
    var temp = line.trim().split(',')
    var obj = {
        'placa':temp[0],
        'latitude':parseFloat(temp[1]),
        'longitude':parseFloat(temp[2])
    };
    var val = new app.app.utils.ValidatorFields();
    val.hasMinLen(obj, 3, "Existem dados faltantes na mensagem!");
    val.isRequired(obj.placa,"O campo placa do veículo é requerido!");
    val.isRequired(obj.latitude,"O campo latitude é requerido!");
    val.isRequired(obj.longitude,"O campo longitude é requerido!");
    val.isNumber(obj.latitude,"O campo latitude deve ser um número!");
    val.isNumber(obj.longitude,"O campo longitude deve ser um número!");

    if(!val.isValid()){
        console.log(val.errors);
    }else{
        app.get('io').emit('msgParaCliente',[obj]);
        
        //console.log(obj);
        //console.log(typeof obj);
        //console.log(obj.placa)
        
        let mapaModel = new app.app.models.MapaDAO(connection); // instanciando a classe com métodos referentes ao banco de dados  
        mapaModel.salvarLocalizacao(obj,(error,result)=>{
            if (!error) {
                console.log(result);
                app.get('io').emit('msgParaCliente',[obj]);    
                console.log('deu certo!');
            }else{
                console.log(error);
            }
        });
    }
});

