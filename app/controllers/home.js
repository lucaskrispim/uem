class home{
    static index(app,req,res){ 
        res.render("home/index");
    }
}

module.exports = () => {
    return home;
}