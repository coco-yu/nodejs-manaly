/**
 * 发布订阅模式实现
 */

 class Subject {
    name: string
    observers: Observer[]
    state: string
    constructor(name: string) {
        this.name = name;
        this.state = '不开心';
        this.observers = [];
    }

    attach(o: Observer) {
        this.observers.push(o);
    }

    setState(newState) {
        this.state = newState;
        this.observers.forEach(o=>o.update(this));
    }
}

class Observer {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }

    update(baby) {
        console.log(baby.name + '对' + this.name + '说' + baby.state);
    }
}

const baby = new Subject('小宝宝');

const o1 = new Observer('爸爸');
const o2 = new Observer('妈妈');



/* 观察者与被观察者之间建立联系 */

baby.attach(o1);
baby.attach(o2);



/* 发布事件 */

baby.setState('开心');

baby.setState('忧伤');