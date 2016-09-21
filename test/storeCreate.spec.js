
/**
 * store create test
 */

var storeCreate = require('../src/storeCreator');
var expect = require('chai').expect;

function objectValues(o){
  var values = [];
  for(var k in o){
    if(o.hasOwnProperty(k)){
      values.push(o[k])
    }
  }
  return values;
}

describe('storeCreator tests', function() {

  it('storeCreator no storeId should throw error', function() {
    expect(function(){
      storeCreate()
    }).to.throw(/id is reauired as create a store, and the id is the same of store!/);
  });

  var store = storeCreate('storeId',{
    getAll: function(){
      console.log('getAll')
    }
  }, {
    "ADD_TODO": function(){
      console.log('ADD_TODO')
    }
  });

  it('storeCreator should return a object', function() {
    expect(store).to.be.an('object');
  });

  it('storeCreator should return a object which have added methods and emitter', function() {
    expect(store).to.have.property('getAll');
  });

});
