import React from 'react';

import todoStore from '../stores/todoStore';
import todoAction from '../actions/todoAction';

import Lines from './lines';

export default class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: todoStore.getAll()||[]
        };
    }
    componentDidMount(){
        todoStore.addChangeListener(this.onChange.bind(this));
    }
    onChange(){
        let items = todoStore.getAll();
        this.setState({
            items: items
        });
    }
    handleKeyup(e){
        if(e.keyCode == "13"){
            this.addTodo()
        }
    }
    delAll(){
        todoAction.delAll();
    }
    addTodo(){
        let addTodoV = this.refs['app-val'].value;
        todoAction.addTodo(addTodoV);
        this.refs['app-val'].value = '';
    }
    linesUpdateTodo(i,updateTodoV){
        todoAction.updateTodo(updateTodoV,i)
    }
    render(){
        let items = this.state.items;
        return (
            <div className='app-main'>
                <div className='app-input'>
                    <input ref='app-val' placeholder='What needs to be done?' autoFocus onKeyUp={this.handleKeyup.bind(this)} />
                    <button onClick={this.addTodo.bind(this)}>增加</button>
                </div>
                <div className='app-items'>
                    <Lines linesUpdateTodo={this.linesUpdateTodo.bind(this)} items={items} />
                </div>
                {
                    items.length>0&&
                    <div className='app-counter'>
                        <span className='counter'>{items.length+' items added'}</span>
                        <span className='clear' onClick={this.delAll.bind(this)}>Clear All</span>
                    </div>
                }
            </div>
        )
    }
}