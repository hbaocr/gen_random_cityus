const city_set = require('./city_src');
for(i=0;i<10;i++){
    let city=city_set.get_random_city_in_us();
    console.log(city);
}