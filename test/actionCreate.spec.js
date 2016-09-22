
/**
 * action create test
 */

var actionCreate = require('../src/actionCreator');
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

describe('actionCreator tests', function() {

  it('actionCreator no storeId should throw error', function() {
    expect(function(){
      actionCreate()
    }).to.throw(/id is reauired as creating a action!/);
  });

  it('actionCreator no actionCreatorMap should not throw error,but return a empty object', function() {
    expect(actionCreate('storeId')).to.be.empty;
  });

  var actionMap = {
    "addTodo": function(){
      console.log('addTodo')
    }
  };
  it('actionCreator should return a object', function() {
    expect(actionCreate('storeId',actionMap)).to.be.an('object');
  });

  it('actionCreator should return a object contact enter object', function() {
    expect(actionCreate('storeId',actionMap)).to.have.property('addTodo');
  });

  it('actionCreator return a object, it\'s values should function allways', function() {
    var values = objectValues(actionCreate('storeId',actionMap));

    for (var i = 0; i < values.length; i++) {
      expect(values[i]).to.be.an("function");
    }
  });

});
