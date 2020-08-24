let app = require('./config/server'); // Requisição feita para o arquivo de configurações

let server = require('http').createServer(app) // Criar um servidor http para fazer a comunicação com socket
io = require('socket.io').listen(server) // instancia o módulo do socket escutando na mesma porta do servidor

server.listen(process.env.PORT || 3002, () => {
    console.log('Servidor On!')
}); // Aqui é feita a escolha de porta de escuta

app.set('io', io); // aqui estamos empacotando a variável io para ser usada dentro do app

// Esse trecho é a comunicação com a porta serial
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('/dev/pts/5', { baudRate: 9600 });

// Analisador sintático - Leitura de dados 
const parser_port = new Readline();
port.pipe(parser_port);
port.write('Porta COM Funcionando\n');

let connection = app.config.dbConnection(); // conexão com banco de dados
let mapaModel = new app.app.models.MapaDAO(connection); // instanciando a classe com métodos referentes ao banco de dados

// Carol essa parte do código é que faz o cálculo do dt. o cálculo está feito no na classe DeltaTime (está dentro na pasta utils) 

mapaModel.getPoints((error, result) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados  
    let p = app.app.utils.DeltaTime.filterBoard(result);
    app.app.utils.DeltaTime.statistic(p);
    //console.log(p);
    //p.statistics();
});
// até aqui fazemos o cálculo do dt

parser_port.on('data', (line) => {
    var temp = line.trim().split(',')
    var obj = {
        'placa': temp[0],
        'latitude': parseFloat(temp[1]),
        'longitude': parseFloat(temp[2])
    };
    
    var val = new app.app.utils.ValidatorFields();
    val.hasMinLen(obj, 3, "Existem dados faltantes na mensagem!");
    val.isRequired(obj.placa, "O campo placa do veículo é requerido!");
    val.isRequired(obj.latitude, "O campo latitude é requerido!");
    val.isRequired(obj.longitude, "O campo longitude é requerido!");
    val.isNumber(obj.latitude, "O campo latitude deve ser um número!");
    val.isNumber(obj.longitude, "O campo longitude deve ser um número!");

    if (!val.isValid()) {
        console.log(val.errors);
    } else {
        mapaModel.salvarLocalizacao(obj,(error,result)=>{
            if (!error) {
                //console.log(result);
                app.get('io').emit('msgParaCliente',[obj]);    
                //console.log('deu certo!');
            }else{
                console.log(error);
            }
        });
    }
});
