
/**
 * actionStoreCreate test
 */

var actionStoreCreate = require('../src/actionStoreCreator');
var expect = require('chai').expect;

describe('actionStoreCreator tests', function() {

  var actionStoreArgs = [{
    "addTodo": function(){console.log('addTodo')}
  }, {'getAll': function(){console.log("getAll")}
  }, {'addTodo':function(){console.log("addTodo handler")}
  }];

  it('actionStoreCreator should return a object', function() {
    expect(actionStoreCreate.apply(null, actionStoreArgs)).to.be.an('object');
  });

  it('actionStoreCreator return a object should have actionor and storeor; \n      actionor should have a key contant storeId;\n      storeor should have a const storeId;\n      it can be not have storeId.', function() {
    var actionStore = actionStoreCreate.apply(null,actionStoreArgs)
    expect(actionStore).to.have.property('actionor');
    expect(actionStore).to.have.property('storeor');
    expect(actionStore.actionor).to.have.property('addTodo');
    expect(actionStoreCreate.bind(null,...actionStoreArgs)).to.not.throw(Error);
  });

});
