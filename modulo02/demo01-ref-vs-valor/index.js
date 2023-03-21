const { deepStrictEqual } = require('assert')
let counter = 0
let counter2 = counter
counter2++

// tipo primitivo gera uma cópia em memória
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

console.log({ counter, counter2 })
// counter = 0
// coutner2 = 1

const item = { counter: 0 }
const item2 = item
// tipo de referência copia o endereço de memória
// e aponta pro mesmo lugar

item2.counter++
deepStrictEqual(item, { counter: 1 })
item.counter++
deepStrictEqual(item, { counter: 2 })

console.log({ item, item2 })
// item: { counter: 2 }
// item2: { counter: 2 }