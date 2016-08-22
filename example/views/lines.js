import React from 'react';
import todoAction from '../actions/todoAction';
export default class Lines extends React.Component{
    constructor(props){
        super(props);
    }
    editItem(e){
        this.currentText = e.target.textContent;
    	e.target.contentEditable=true;
    }
    editDone(i,e,editDone){
    	if(e.keyCode=='13'||editDone){
            let nextText = e.target.textContent;
            if(this.currentText != nextText){
    		  this.props.linesUpdateTodo(i,e.target.textContent);
            }
    		e.target.contentEditable=false;
    	}
    }
    delTodo(i){
        todoAction.delTodo(i)
    }
    prevTodo(i){
        if(i>0) todoAction.prevTodo(i)
    }
    render(){
        let items = this.props.items;
        let lines = [];
        for (let i = 0; i < items.length; i++) {
            lines.push(<li key={i} ref={'item'+i} >
                <span
                	tabIndex={i}
                	className='app-label'
                	onBlur={(e)=>{
						// e.persist();
                		// setTimeout(function(){
                			this.editDone.call(this,i,e,true)
                			// e.destructor();
                		// }.bind(this),0)
                	}}
                	onKeyUp={this.editDone.bind(this,i)}
                	onFocus={this.editItem.bind(this)}
                >{items[i].text}</span>
                <span className='app-del-icon' onClick={this.delTodo.bind(this,i)}>×</span>
                {
                    i>0&&
                    <span className='app-prev-icon' onClick={this.prevTodo.bind(this,i)}>↑</span>
                }
            </li>)
        }
        return(
            <ul className='app-items-ul'>
                {lines}
            </ul>
        )
    }
}