function GenID(data){

    if(data.length == 0){
        return 1;
    }

    let ids = data.map(function(e){
        return e.id;
    });

    let max = Math.max(...ids);

    return max + 1;
}

module.exports = { GenID };