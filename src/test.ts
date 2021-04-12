// import Promise from './index';

// const promise = new Promise((resolve, reject) => {
//     resolve('ok');
// });

// promise.then((data) => {
//     console.log('success fulfilled', data);
// }, (err) => {
//     console.log('failed rejected', err);
// });

// promise.then((data) => {
//     console.log('success fulfilled', data);
// }, (err) => {
//     console.log('failed rejected', err);
// });

// Promise.all([new Promise((resolve) => {
//     setTimeout(() => { resolve(3) }, 1000);
// }), 2]).then(data => {
//     console.log(data, 'promise all');
// }, () => { })

// Promise.resolve(1).then(data => {
//     console.log(data, 'resolve');
// }, () => { })

// Promise.reject(new Error('reject')).then(() => { }, err => {
//     console.log(err, 'err');
// })

// Promise.reject('reject').finally(() => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject('no');
//         }, 1000);
//     })
// }).then((data) => {
//     console.log(data, 'success');
// }, (err) => {
//     console.log('fail', err);
// });

// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('ok')
//     }, 3000);
// })

// function wrap(p) {
//     let abort;
//     let p2 = new Promise((resolve, reject) => {
//         abort = reject; 
//     });

//     const p3 = Promise.race([p, p2]);
//     p3.abort = abort;
//     return p3;
// }

// let p = wrap(promise);
// setTimeout(() => {
//     p.abort('超时');
// }, 2000);
// p.then((data) => {
//     console.log(data);
// }).catch(err => {
//     console.log('fail', err);
// })

// Promise.resolve(1)
// .then(x => x+1)
// .then(x => {
//     throw new Error('my error')
// })
// .catch(() => 1)
// .then(x => x+1)
// .then(x => console.log(x))
// .catch(err => console.log(err));

// Promise.resolve().then(() => {
//     console.log('Promise1');
//     setTimeout(() => {
//         console.log('settimeout2');
//     }, 0);
// });

// setTimeout(() => {  
//     console.log('setTimeout1');
//     Promise.resolve().then(() => {
//         console.log('Promise2');
//     });
// }, 0);


console.log(1);
async function async() {
    console.log(2);
    await console.log(3);
    console.log(4);
}

setTimeout(() => {
    console.log(5);
}, 0);

const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7);
});
promise.then(res => {
    console.log(res);
});

async();
console.log(8);