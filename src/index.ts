/* 实现Promise */

/* 常量枚举不生成多余代码 */
const enum STATUS {
    pending = 'PENDING',
    fulfilled = 'FULFILLED',
    rejected = 'REJECTED'
};

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        /* 同一个promise 报错 */
        return reject(new TypeError('出错了'));
    }

    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        let called = false;
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

function isPromise(val) {
    if (typeof val === 'object' && val !== null || typeof val === 'function') {
        if (typeof val.then === 'function') {
            return true;
        }
    }
    return false;
}

class Promise {
    static deferred;
    status: string;
    value: any;
    reason: any;
    onResolvedCallbacks: Function[];
    onRejectedCallbacks: Function[];
    constructor(executor) {
        this.status = STATUS.pending;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value?: any) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject);
            }
            if (this.status === STATUS.pending) {
                this.status = STATUS.fulfilled;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        const reject = (reason?: string) => {
            if (this.status === STATUS.pending) {
                this.status = STATUS.rejected;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }

    then(onFulFilled?: Function, onReject?: Function) {
        // 如果在使用的时候直接是.then().then() 会使用默认的方法

        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : val => val;
        onReject = typeof onReject === 'function' ? onReject : err => { throw err };
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === STATUS.fulfilled) {
                /* 为了获取到promise2 */
                setTimeout(() => {
                    try {
                        const x = onFulFilled(this.value);
                        // resolve(x);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 1000);
            }

            if (this.status === STATUS.rejected) {
                setTimeout(() => {
                    try {
                        const x = onReject(this.reason);
                        // resolve(x);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 1000);
            }

            if (this.status === STATUS.pending) {
                this.onResolvedCallbacks.push(() => {
                    /* 为了和onFilfilled异步函数保持一致 */
                    setTimeout(() => {
                        try {
                            const x = onFulFilled(this.value);
                            // resolve(x);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 1000);
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onReject(this.reason);
                            // resolve(x);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 1000);
                });
            }
        });
        return promise2;
    }

    catch(errFn) {
        return this.then(null, errFn);
    }

    static all(values) {

        return new Promise((resolve, reject) => {
            let arr = [];
            let times = 0;
            function collectResult(value, index) {
                arr[index] = value;

                if (++times === values.length) {
                    resolve(arr);
                }
            }
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                if (value && isPromise(value)) {
                    value.then((y) => {
                        collectResult(y, i);
                    }, reject)
                } else {
                    collectResult(value, i);
                }
            }
        });
    }

    finally(callback) {
        return this.then(data => {
            return Promise.resolve(callback()).then(() => data);
        }, (err) => {
            return Promise.resolve(callback()).then(() => { throw err });
        })
    }


    static resolve(value) {
        return new Promise((resolve) => {
            resolve(value);
        });
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }
}

Promise.deferred = function () {
    const dfd = {} as any;
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

export default Promise;