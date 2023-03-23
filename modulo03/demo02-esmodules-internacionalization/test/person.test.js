import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'

describe('Person', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '1 Bike,Carro 200000 2020-01-01 2020-02-01'
        )
        const expected = {
            from: '2020-01-01',
            to: '2020-02-01',
            vehicles: ['Bike', 'Carro'],
            kmTraveled: '200000',
            id: '1'
        }

        expect(person).to.be.deep.equal(expected)
    })
})