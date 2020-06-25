// Módulo que contém o controller da rota home. basicamente ele só renderiza a página inicial
class home{
    static index(app,req,res){ 
        res.render("home/index");
    }
}

module.exports = () => {
    return home;
}