/**
 * fluder test
 */

var Fluder = require('../src/fluder')
var expect = require('chai').expect

describe('Fluder tests', function () {
  it('Fluder should be new correctly: \n      should have register/enqueue/dispatch" prototype methods;\n      should have "_registers/_middleware/_dispatchStack" constructor property.', function () {
    expect(Fluder).to.be.an('object')

    var __proto__Arr = ['register', 'enqueue', 'dispatch'];
    var constructorArr = ['_registers', '_middleware', '_dispatchStack'];

    __proto__Arr.forEach(function (item) {
      expect(Fluder.__proto__).to.have.property(item)
    })
    constructorArr.forEach(function (item) {
      expect(Fluder).to.have.property(item)
    })
  })

  it('Fluder enqueue method can be invoke correctly', function () {
    expect(function () {
      Fluder.enqueue(() => {})
    }).to.not.throw(Error)
  })

  it('Fluder register method can be invoke correctly', function () {
    expect(function () {
      Fluder.register('storeId', {})
    }).to.not.throw(Error)
  })
})
