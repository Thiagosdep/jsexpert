import TerminalController from './terminalController.js'
import Person from './person.js'
import database from './../database.json'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
    try {
        const answer = await terminalController.question('Input: ')

        if (answer === STOP_TERMINAL) {
            terminalController.closeTerminal(database)
            console.log('process finished!')
            return
        }
        const person = Person.generateInstanceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
        await save(person)
        return mainLoop()
    } catch (error) {
        console.error('Deu ruim!!', error)
        return mainLoop()
    }
}

await mainLoop()
