
const fs = require('fs');
const state_geo_src = [
    {
        code: 0,
        name: "Test1",
        geo: [800.9676921915706, 350.55076327540195]
    },
    {
        code: 1,
        name: "Test2",
        geo: [434.06854580651395, 469.2518455385675],
    },
    {
        code: 2,
        name: "Test3",
        geo: [767.5613511637639, 516.027537256805],
    },
    {
        code: 3,
        name: "Test4",
        geo: [310.57759635964425, 393.3171506427589]
    },
    {
        code: 4,
        name: "Test5",
        geo: [802.5546421730927, 304.4436001004365]
    },
    {
        code: 4,
        name: "Test6",
        geo: [434.0617846610731, 238.84362029980593]
    },
    {
        code: 5,
        name: "Test7",
        geo: [226.72997290918303, 268.76486588959955]
    },
    {
        code: 6,
        name: "Test8",
        geo: [82.08615071239029, 288.14124547828123]
    },
    {
        code: 7,
        name: "Test9",
        geo: [102.46086873323198, 523.1944003303727]
    },
    {
        code: 8,
        name: "Test10",
        geo: [919.0358108845031, 93.61428430040085]
    },


];


let gender = ['male', 'female'];


function gen_age(start = 18, step = 5, end = 90) {
    let obj = [];
    let idx = 0;
    for (let i = start; i < end; i = i + step) {

        let e = {
            code: idx,
            desc: 'range_age ' + i + '_' + (i + step - 1),
        }
        idx++;
        obj.push(e);
    }
    return obj;
}
const beer_product = [
    {
        desc: 'Super Dry',
        code: '4901004006714'
    },
    {
        desc: 'Super Dry Premium',
        code: '4901004006725'
    },
    {
        desc: 'Super Dry Black',
        code: '4901004006736'
    }
]

function get_obj(obj_arr) {
    let max = obj_arr.length - 1;
    let idx = Math.round(Math.random() * max);
    return obj_arr[idx];
}


let get_state = () => {
    let n = state_geo_src.length;
    for (let i = 0; i < n; i++) {
        state_geo_src[i].code = i;
        state_geo_src[i].name = "State" + i;
    }
    return get_obj(state_geo_src);
}
let get_gender = () => {
    return get_obj(gender);
}
let get_beer_product = () => {
    return get_obj(beer_product);
}
let get_age_range = () => {
    let inp = gen_age();
    return get_obj(inp);
}


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
            gender: get_gender(),
            age_range: get_age_range(),
            scan: get_beer_product(),
            geo: get_state(),
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
    return str;
    //return arr_obj;
}

module.exports.gen_data =gen_data;








