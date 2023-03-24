const assert = require('assert')

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal objects:', user.userName)
// console.log('getting symbol objects:', user[Symbol('userName')])
// console.log('getting symbol objects:', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal objects')
// sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

console.log('symbols', Object.getOwnPropertySymbols(user))

// byPass - má prática!
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// Well Known Symbols

const obj = {
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')

class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw new TypeError()

        const itens = this[kItems]
            .map(item =>
                new Intl
                    .DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
                    .format(item))

        return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(itens)
    }

    get [Symbol.toStringTag]() {
        return 'WHAT?'
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 02]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02)
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

assert.deepStrictEqual([...myDate], expectedDates)