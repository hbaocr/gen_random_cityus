
let fs = require('fs');
let gen_src = require('./data_src');

function json_obj(prop, val){
     this.prop=val;
}


function analyse_gender(obj,store){
    if(store[obj.gender]==undefined){
        store[obj.gender]=1;
    }else{
        store[obj.gender]= store[obj.gender]+1;
    }
    return store;
}

function analyse_age(obj,store){
    let field=obj.age_range.desc;
    if(store[field]==undefined){
        store[field]=1;
    }else{
        store[field]= store[field]+1;
    }
    return store;
}

function analyse_product(obj,store){
    let field=obj.scan.desc;
    if(store[field]==undefined){
        store[field]=1;
    }else{
        store[field]= store[field]+1;
    }
    return store;
}

let arr_obj=[];
let gender_inf=[];
let age_range_inf=[];
let product_inf=[];


function gen_data(number_data=10,file_name="test-dat.json"){
 
  

    for(let i=0;i<number_data;i++){
        let obj ={
            gender: gen_src.get_gender(),
            age_range: gen_src.get_age_range(),
            scan: gen_src.get_beer_product(),
            geo: gen_src.get_state(),
        }
        gender_inf=analyse_gender(obj,gender_inf);
        age_range_inf= analyse_age(obj,age_range_inf);
        product_inf = analyse_product(obj,product_inf);
        arr_obj.push(obj);
    }

    let ret ={
        data: arr_obj,
        total:arr_obj.length,
        gender_inf: gender_inf,
        age_range_inf: age_range_inf,
        product_inf:product_inf
    }
    let str = JSON.stringify(ret);

    fs.writeFileSync(file_name,str,'utf8');
    //return arr_obj;
}

gen_data()






// let kk = gen_data();
// console.log(kk);