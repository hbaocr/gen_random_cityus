
let fs = require('fs');
let gen_src = require('./data_src');


function get_json_obj(obj) {
    let prop_e='';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            prop_e = prop_e+ `"${key}":${obj[key]},`;
        }
        else {
            console.log(key); // toString or something else
        }
    }
    prop_e = prop_e.slice(0,prop_e.length-1);
    prop_e =`{${prop_e}}`;
    return JSON.parse(prop_e);
}

function analyse_gender(obj, store) {
    if (store[obj.gender] == undefined) {
        store[obj.gender] = 1;
    } else {
        store[obj.gender] = store[obj.gender] + 1;
    }
    return store;
}

function analyse_age(obj, store) {
    let field = obj.age_range.desc;
    if (store[field] == undefined) {
        store[field] = 1;
    } else {
        store[field] = store[field] + 1;
    }
    return store;
}

function analyse_product(obj, store) {
    let field = obj.scan.desc;
    if (store[field] == undefined) {
        store[field] = 1;
    } else {
        store[field] = store[field] + 1;
    }
    return store;
}

function analyse_state(obj, store) {
    let field = obj.geo.name;
    if (store[field] == undefined) {
        store[field] = 1;
    } else {
        store[field] = store[field] + 1;
    }
    return store;
}

let arr_obj = [];
let gender_inf = [];
let age_range_inf = [];
let product_inf = [];
let state_inf=[];

function gen_data(number_data = 10, file_name = "test-dat.json") {

    for (let i = 0; i < number_data; i++) {
        let obj = {
            gender: gen_src.get_gender(),
            age_range: gen_src.get_age_range(),
            scan: gen_src.get_beer_product(),
            geo: gen_src.get_state(),
        }
        gender_inf = analyse_gender(obj, gender_inf);
        age_range_inf = analyse_age(obj, age_range_inf);
        product_inf = analyse_product(obj, product_inf);
        state_inf = analyse_state(obj,state_inf);
        arr_obj.push(obj);
    }

    let ret = {
        data: arr_obj,
        total: arr_obj.length,
        gender_scan_info: get_json_obj(gender_inf),
        age_range_scan_info: get_json_obj(age_range_inf),
        product_scan_info: get_json_obj(product_inf),
        state_scan_info:get_json_obj(state_inf)
    }
    let str = JSON.stringify(ret);
  
    fs.writeFileSync(file_name, str, 'utf8');
    //return arr_obj;
}

gen_data()






// let kk = gen_data();
// console.log(kk);