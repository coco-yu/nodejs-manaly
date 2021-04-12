/* generator的实现 */

class Context {
    constructor(props) {
        super(props);
        this.value = undefined;
        this.done = false;
    }

    stop() {
        this.done = true;
    }
}
let regeneratorRuntime = {
    mark(genFunc) {
        return genFunc;
    },
    wrap(innerFunc, outerFunc) {
        let it = {};
        let context = new Context();
        it.next = function (v) {
            context.sent = v;
            let value = innerFunc(context);
            return { value, done: context.done };
        }
        return it;
    }
}