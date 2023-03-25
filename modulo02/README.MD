### CallStack x Memory Heap
*https://levelup.gitconnected.com/understanding-call-stack-and-heap-memory-in-js-e34bf8d3c3a4*

```
let number1 = 1 
let number2 = number1

number1 = number1 + 1
// number1 = 2, number2 = 1
```
Isso acontece pois ao alterar o valor de number1 somando + 1, o JS alocou um novo endereço de memória para essa variável.

Os tipos primitivos são imutáveis
 - *(string, number, bigint, boolean, undefined. null e symbol)*
 - os dados primitivos são armazenados na `Call Stack` no modelo *FILO* (first in, last out)

Os dados não primitivos são armazenados na `memory heap`.
 - Array, objetos...

A definição `const` não perimte que o endereço de memória seja atualizado, porém, quando se trata de array ou objetos, o JS cria um indentificador para esses dados, armazena o endereço de memória na `Call Stack` de um valor na `Heap`. Assim, quando há uma uma mudança nesses obejtos a refenrência na `Call Stack` se mantém e o valor na Heap é alterado :)!

```Identifiers ---------------- Call Stack ---------------- Heap
                         Address -- Value          Address -- Value
number1       ---------   A003   --   2
number2       ---------   A001   --   1
names         ---------   A004   --  B001  --------- B001  --  []
```

*https://medium.com/@allansendagi/javascript-fundamentals-call-stack-and-memory-heap-401eb8713204*

O JS tem, por padrão, um algorítmo de marcação e varredura que identifica "lixo" e o remove. Por exemplo, quando uma referência à uma variável é removida, ela é deletada. De todo modo, mesmo que o JS possua inteligência para limpar dados que não serão mais utilizados no nosso algorítmo, temos que ter o devido cuidado com vazamento de memória.

Alguns exemplos comuns de vazamento: 
 - Variáveis globais
 - Listeners de eventos
 - setInterval

https://www.mattzeunert.com/2017/03/29/v8-object-size.html

*https://developer.mozilla.org/en-US/docs/Glossary/Primitive*

Valores primitivos não são representados através de objetos, portanto, não possui métodos. 

Alguns deles, como: string, number, boolean e symbol possum wrappers que possuem algumas propriedades e adicionam funcionalidades.

Por exemplo: 
 - "foo".includes("f") => String.prototype.includes("f")

### Tipo de valor vs tipo de referência 
https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0

### Coerção de Tipos & Objects lifecycle
https://dorey.github.io/JavaScript-Equality-Table/
https://freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839