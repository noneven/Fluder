/**
 * store create test
 */

var storeCreate = require('../src/storeCreator')
var expect = require('chai').expect

describe('storeCreator tests', function () {
  it('storeCreator no storeId should throw error', function () {
    expect(function () {
      storeCreate()
    }).to.throw(/id is reauired as create a store, and the id is the same of store!/)
  })

  var store = storeCreate('storeId', {
    getAll: function () {
      console.log('getAll')
    }
  }, {
    'ADD_TODO': function () {
      console.log('ADD_TODO')
    }
  })
  var store1 = storeCreate({
    addTodo: function(){
      console.log("action")
    }
  }, {
    getAll: function () {
      console.log('getAll')
    }
  }, {
    'ADD_TODO': function () {
      console.log('ADD_TODO')
    }
  })


  it('storeCreator should return a object', function () {
    expect(store).to.be.an('object')
    expect(store1).to.be.an('object')
  })

  it('storeCreator should return a object which have added methods and emitter', function () {
    expect(store).to.have.property('getAll')
    expect(store1).to.have.property('getAll')
  })
})
