// import Promise from './index';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function async() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(2);
                    return [4 /*yield*/, console.log(3)];
                case 1:
                    _a.sent();
                    console.log(4);
                    return [2 /*return*/];
            }
        });
    });
}
setTimeout(function () {
    console.log(5);
}, 0);
var promise = new Promise(function (resolve, reject) {
    console.log(6);
    resolve(7);
});
promise.then(function (res) {
    console.log(res);
});
async();
console.log(8);
