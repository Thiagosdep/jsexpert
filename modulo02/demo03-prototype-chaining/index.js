const assert = require('assert')
const obj = {}
const arr = []
const fn = () => {}

// internamente, objetos literais viram funções explícitas
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referência do objeto que possui as propriedades nele
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object.prototype é null
console.log('obj.__proto__.__proto__', obj.__proto__.__proto__)

function Employee() {}
Employee.prototype.salary = () => 'salary**'

function Supervisor() {}
// herda a instância de Employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profitShare**'

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

console.log('Manager.prototype.salary()', Manager.prototype.salary())

// se não chamar o 'new', o primeiro __proto__ vai ser sempre
// a instância de Function, sem herdar nossas classes

console.log('Manager.prototype.__proto__ == Supervisor.prototype', Manager.prototype.__proto__ == Supervisor.prototype)

// quando usamos o new, o __proto__ recebe o prototype
console.log('new Manager().__proto__, new Manager().salary()', new Manager().__proto__, new Manager().salary())

const manager = new Manager()
console.log(manager.salary())
console.log(manager.profitShare())
console.log(manager.monthlyBonuses())

console.log(manager.__proto__)
console.log(manager.__proto__.__proto__)
console.log(manager.__proto__.__proto__.__proto__)
console.log(manager.__proto__.__proto__.__proto__.__proto__)
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__)

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

class T1 {
    ping() { return 'ping' }
}

class T2 extends T1 {
    pong() { return 'pong' }
}

class T3 extends T2 {
    shoot() { return 'shoot' }
}

const t3 = new T3()

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__)