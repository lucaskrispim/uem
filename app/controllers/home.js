class home{
    static index(app,req,res){ 
        res.render("home/index");
        //res.send('oi');
    }
}

module.exports = () => {
    return home;
}