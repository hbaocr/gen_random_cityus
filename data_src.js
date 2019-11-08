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


        name: "Test5",
        geo: [434.0617846610731, 238.84362029980593]
    },
    {
        code: 4,


        name: "Test5",
        geo: [226.72997290918303, 268.76486588959955]
    },
    {
        code: 4,


        name: "Test5",
        geo: [82.08615071239029, 288.14124547828123]
    },
    {
        code: 4,


        name: "Test5",
        geo: [102.46086873323198, 523.1944003303727]
    },
    {
        code: 4,


        name: "Test5",
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

module.exports.get_state = () => {
    let n = state_geo_src.length;
    for (let i = 0; i < n; i++) {
        state_geo_src[i].code = i;
        state_geo_src[i].name = "State" + i;
    }
    return get_obj(state_geo_src);
}
module.exports.get_gender = () => {
    return get_obj(gender);
}
module.exports.get_beer_product = () => {
    return get_obj(beer_product);
}
module.exports.get_age_range = () => {
    let inp = gen_age();
    return get_obj(inp);
}
