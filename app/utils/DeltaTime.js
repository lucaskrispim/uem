class DeltaTime {
    static filterBoard(result) {
        let p = new Array();
        result.forEach( (item)=> {
            var i = p.findIndex(x => x.placa == item.placa);
            if (i <= -1) {
                p.push({ placa: item.placa });
            }
        });
        for(let i=0; i<p.length; i++){
            p[i].datas = new Array();

            for(let j=0; j< result.length; j++){
                if(p[i].placa == result[j].placa){
                    p[i].datas.push(result[j].data);
                }
            }

            if(p[i].datas.length>1){
                p[i].dt = new Array();
                for(let k=0; k< p[i].datas.length-1; k++){
                    p[i].dt.push(( p[i].datas[k+1]-p[i].datas[k])/1000);
                }
            }
            
        }
        return p;
    }
    static statistic(p){
        p.forEach((item)=>{
            if(item.hasOwnProperty('dt')){
                item.totalDelay = (item.dt.filter(x => x>3).length)
                item.total = (item.dt.length) 
            }
        });
    }
}

module.exports = () => {
    return DeltaTime;
}