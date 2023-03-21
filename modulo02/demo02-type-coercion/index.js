9999999999999999 // 10000000000000000
true + 2 // 3
'21' + true // '21true'
'21' - true // 20
'21' - - 1 // 22
3 < 2 < 1 // false
0.1 + 0.2 === true // false
"B" + "a" + + "a" + "a" // BaNaNa
'1' == 1 // true
'1' === 1 // false

console.assert(String(123) === '123', 'explicit convertion to string')
console.assert(123 + '' === '123', 'implicit convertion to string')

console.assert(('hello' || 123) === 'hello', '|| returns the first element if both are true')
console.assert(('hello' && 123) === 123, '&& returns the last element if both are true')

const item = {
    name: 'Thiago',
    age: 24,
    // string: 1 se não for primitivo, chame o valueOf
    toString() {
        return `Name ${this.name}, age: ${this.age}`
    },
    // number: 1 se não for primitivo, chame o toString
    valueOf() {
        return 007
    },
    // prioridade maaaaaaaster!!!
    [Symbol.toPrimitive](coercionType) {
        console.log('trying to convert to', coercionType)

        const types = {
            string: JSON.stringify(this),
            number: '0007'
        }

        return types[coercionType] || types.string
    }
}

console.log('toString', String(item))
console.log('valueOf', Number(item))
console.log('Date', new Date(item))

console.assert(item + 0 === '{"name":"Thiago","age":24}0')
console.assert(!!item)
console.assert('Ae'.concat(item) === 'Ae{"name":"Thiago","age":24}')
console.log('implicit + explicit coercion (using ==)', item == String(item))

const item2 = { ...item, name: 'Tirone', age: 3 }
console.log({ item2 })