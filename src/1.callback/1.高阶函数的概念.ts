type Callback = () => void;
type ReturnFn = (...args: any) => void;

declare global {
    interface Function {
        before(fn: Callback): ReturnFn
    }
}

Function.prototype.before = function (fn) {
    return (...args) => {
        fn();
        this(...args);
    }
}

function core(...args) {
    console.log('core', ...args);
}

const fn = core.before(() => {
    console.log('before core...');
})

fn();

export {};