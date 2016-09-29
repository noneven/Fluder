# 10秒了解Fluder

<table>
<tr>
<td>
actionCreator
<pre>
export actionCreate({
    addTodo:(item)=>({
      type: constants.ADD_TODO,
      value: item
    })
})
</pre>
</td>
<td>
storeCreator
<pre>
let items = [];
export storeCreate(todoAction, {
  getAll: function(){
    return items
  }
},{
  [constants.ADD_TODO]: function(payload){
    push(payload.value)
    return items
  }
})
function push(item){
  items.push(item)
}
</pre>
</td>
<td>
React Component
<pre>
componentDidMount(){
  todoStore.addChangeListener(()=>{
    this.setState({
      items: todoStore.getAll()
    })
  })
}
addTodo(e){
  todoAction.addTodo({
    text: e.target.value,
    done: false
  });
}
</pre>
</td>

<td>
Vue Component
<pre>
methods:{
  addTodo(e){
    todoAction.addTodo({
      text: e.target.value,
      done: false
    });
  }
},
created (){
  todoStore.addChangeListener(()=>{
    this.setState({
      items: todoStore.getAll()
    })
  })
}
</pre>
</td>
</tr>

</table>
