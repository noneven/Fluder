/**
 * Queue test
 */

var Queue = require('../src/queue')
var expect = require('chai').expect

describe('Queue tests', function () {
  it('Queue can have not a loop arguments', function () {
    expect(function () {
      new Queue()
    }).to.not.throw(Error)
    expect(new Queue()).to.be.an('object')
    expect(new Queue()).to.have.property('loop')
    expect(new Queue().loop).to.be.ok
  })
})
