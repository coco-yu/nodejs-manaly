const fs = require('fs');

const events = {
    arr: [],
    on(fn) {
        this.arr.push(fn);
    },
    emit() {
        this.arr.forEach(fn => fn());
    }
}

type Person = {
    age: number,
    name: string
} 

let person = {} as Person;
events.on(() => {
    if(Object.keys(person).length === 2){
        console.log(person);
    }
});

events.on(() => {
    console.log('触发一次');
})

fs.readFile('age.txt', 'utf8', (err, data) => {
    if(err) console.log(err);
    person.age = data;
    events.emit();
});

fs.readFile('name.txt', 'utf8', (err, data) => {
    if(err) console.log(err);
    person.name = data;
    events.emit();
});

export {}