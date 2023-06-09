'use strict';

const { watch, promises: { readFile } } = require('fs')

watch(__filename, async (event, filename) => {
    console.log((await readFile(filename)).toString())
})

class File {
    watch(filename, event) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent() {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()
// dessa forma ele ignora o this da classe File e herde do watch
// watch(__filename, file.watch)

// alternativas para não herdar o this da função
// arrow function
// watch(__filename, (event, filename) => file.watch(event, filename))
// o bind retorna uma função com o this que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('apply: hey sinon!') }, [null, __filename])