/**
 * applyMiddleware test
 */

var applyMiddleware = require('../src/applyMiddleware')
var expect = require('chai').expect;

describe('applyMiddleware tests', function () {
  it('applyMiddleware should return a object', function () {
    expect(applyMiddleware(function (data, next) {
      console.log('applyMiddleware')
    })).to.be.an('object')
  })

  it('applyMiddleware return a object should have a chain', function () {
    expect(applyMiddleware(function (data, next) {
      console.log('applyMiddleware')
    })).to.have.property('applyMiddleware')

    expect(applyMiddleware(function (data, next) {
      console.log('applyMiddleware')
    }).applyMiddleware).to.be.an('function')
  })

  it('applyMiddleware\'s arguments can be an array', function () {
    expect(function () {
      applyMiddleware([
        function () {
          console.log('applyMiddleware 1')
        },
        function () {
          console.log('applyMiddleware 2')
        }
      ])
    }).to.not.throw(Error)
  })
})
