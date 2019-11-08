
let fs = require('fs');
let gen_src = require('./data_src');

function gen_data(number_data=100,file_name="test_dat.json"){
    let arr_obj=[];
    for(let i=0;i<number_data;i++){
        let obj ={
            gender: gen_src.get_gender(),
            age_range: gen_src.get_age_range(),
            scan: gen_src.get_beer_product(),
            geo: gen_src.get_state(),
        }
        arr_obj.push(obj);
    }
    let str = JSON.stringify(arr_obj);
    fs.writeFileSync(file_name,str,'utf8');
    //return arr_obj;
}

gen_data()






// let kk = gen_data();
// console.log(kk);