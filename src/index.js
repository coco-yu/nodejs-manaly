"use strict";
/* 实现Promise */
exports.__esModule = true;
;
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        /* 同一个promise 报错 */
        return reject(new TypeError('出错了'));
    }
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        var called_1 = false;
        try {
            var then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (called_1)
                        return;
                    called_1 = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called_1)
                        return;
                    called_1 = true;
                    reject(r);
                });
            }
            else {
                resolve(x);
            }
        }
        catch (e) {
            if (called_1)
                return;
            called_1 = true;
            reject(e);
        }
    }
    else {
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
var Promise = /** @class */ (function () {
    function Promise(executor) {
        var _this = this;
        this.status = "PENDING" /* pending */;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        var resolve = function (value) {
            if (value instanceof Promise) {
                return value.then(resolve, reject);
            }
            if (_this.status === "PENDING" /* pending */) {
                _this.status = "FULFILLED" /* fulfilled */;
                _this.value = value;
                _this.onResolvedCallbacks.forEach(function (fn) { return fn(); });
            }
        };
        var reject = function (reason) {
            if (_this.status === "PENDING" /* pending */) {
                _this.status = "REJECTED" /* rejected */;
                _this.reason = reason;
                _this.onRejectedCallbacks.forEach(function (fn) { return fn(); });
            }
        };
        try {
            executor(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    }
    Promise.prototype.then = function (onFulFilled, onReject) {
        // 如果在使用的时候直接是.then().then() 会使用默认的方法
        var _this = this;
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : function (val) { return val; };
        onReject = typeof onReject === 'function' ? onReject : function (err) { throw err; };
        var promise2 = new Promise(function (resolve, reject) {
            if (_this.status === "FULFILLED" /* fulfilled */) {
                /* 为了获取到promise2 */
                setTimeout(function () {
                    try {
                        var x = onFulFilled(_this.value);
                        // resolve(x);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 1000);
            }
            if (_this.status === "REJECTED" /* rejected */) {
                setTimeout(function () {
                    try {
                        var x = onReject(_this.reason);
                        // resolve(x);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 1000);
            }
            if (_this.status === "PENDING" /* pending */) {
                _this.onResolvedCallbacks.push(function () {
                    /* 为了和onFilfilled异步函数保持一致 */
                    setTimeout(function () {
                        try {
                            var x = onFulFilled(_this.value);
                            // resolve(x);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 1000);
                });
                _this.onRejectedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onReject(_this.reason);
                            // resolve(x);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 1000);
                });
            }
        });
        return promise2;
    };
    Promise.prototype["catch"] = function (errFn) {
        return this.then(null, errFn);
    };
    Promise.all = function (values) {
        return new Promise(function (resolve, reject) {
            var arr = [];
            var times = 0;
            function collectResult(value, index) {
                arr[index] = value;
                if (++times === values.length) {
                    resolve(arr);
                }
            }
            var _loop_1 = function (i) {
                var value = values[i];
                if (value && isPromise(value)) {
                    value.then(function (y) {
                        collectResult(y, i);
                    }, reject);
                }
                else {
                    collectResult(value, i);
                }
            };
            for (var i = 0; i < values.length; i++) {
                _loop_1(i);
            }
        });
    };
    Promise.prototype["finally"] = function (callback) {
        return this.then(function (data) {
            return Promise.resolve(callback()).then(function () { return data; }, function () { });
        }, function (err) {
            return Promise.resolve(callback()).then(function () { return err; }, function () { });
        });
    };
    Promise.resolve = function (value) {
        return new Promise(function (resolve) {
            resolve(value);
        });
    };
    Promise.reject = function (reason) {
        return new Promise(function (resolve, reject) {
            reject(reason);
        });
    };
    return Promise;
}());
Promise.deferred = function () {
    var dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
exports["default"] = Promise;
