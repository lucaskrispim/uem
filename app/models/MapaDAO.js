class MapaDAO{
    constructor(connection) {
        this.connection = connection;
    }
    getPoints(callback){
        this.connection.query("select * from localizacao order by data",callback);
    };

    salvarLocalizacao(localizacao,callback){
        this.connection.query('insert into localizacao set ?',localizacao,callback);
    }; 
}

module.exports = () => {
    return MapaDAO;
};