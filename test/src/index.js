
var expect = require('chai').expect;

var todoAction = require('./todoAction');
var formAction = require('./formAction');
var todoStore = require('./todoStore');
var formStore = require('./formStore');
var middleware = require('./middleware');

describe('Fluder process tests\n', function() {

  it('Action Store Middleware running currently', function(){
    function actionStoreMiddlewareRunning(){
      todoStore.addChangeListener(function(){
        //console.log(todoStore.getAll());
      })
      todoAction.addTodo({
        text: 'read',
        done: false
      });
    }
    expect(actionStoreMiddlewareRunning).to.not.throw(Error)
  });

  it('Action sending can\'t __invoke__ myself', function(){
    function invokeMyself(){
      todoStore.addChangeListener(function(){
        //console.log(todoStore.getAll());
        todoAction.addTodo({
          text: 'sleep',
          done: false
        });
      })
      // change invoke myself
      todoAction.addTodo({
        text: 'read',
        done: false
      });
    }
    expect(invokeMyself).to.throw(/__invoke__ myself/)
    todoStore.removeAllChangeListener();
  });

  it('Action sending can\'t __invoke__ circle', function(){
    function invokeMyself(){
      todoStore.addChangeListener(function(){
        //console.log(todoStore.getAll());
        formAction.pushValue('read');
      })
      formStore.addChangeListener(function(){
        //console.log(formStore.getAll());
        todoAction.addTodo({
          text: 'sleep',
          done: false
        });
      })
      // change invoke myself
      todoAction.addTodo({
        text: 'read',
        done: false
      });
    }
    expect(invokeMyself).to.throw(/__invoke__ to a circle/)
    todoStore.removeAllChangeListener()
    formStore.removeAllChangeListener()
  });

  it('Action type is required as action sending', function(){
    expect(function(){
      formAction.noTypeAction('notype')
    }).to.throw(/action type does not exist/)
  });

  it('Middleware should read storeId/store/payload', function(){
    middleware.applyMiddleware(function(data, next){
      expect(data).to.have.property('store')
      expect(data).to.have.property('storeId')
      expect(data).to.have.property('payload');
    });
    todoAction.addTodo({
      text: 'read',
      done: false
    });
  });


});
