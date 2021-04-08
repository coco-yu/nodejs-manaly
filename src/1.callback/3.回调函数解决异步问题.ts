const fs = require('fs');

function after(times, callback) {
    const obj = {} as any;
    return function(key, value) {
        obj[key] = value
        --times === 0 && callback(obj);
    }
}

const fn = after(2, (obj) => {
    console.log(obj, 'obj');
});


fs.readFile('age.txt', 'utf8', (err, data) => {
    if(err) console.log(err);
    fn('age', data);
});

fs.readFile('name.txt', 'utf8', (err, data) => {
    if(err) console.log(err);
    fn('name', data);
})