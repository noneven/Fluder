<template>
  <ul class="todo-main">
    <li v-for='item in items'>
      <span
        @click='toggleState($index)'
        class={{item.done?"done":''}}
        >{{item.text}}
      </span>
      <button @click='delTodo($index)'>X</button>
    </li>
  </ul>
</template>

<script>
import todoStore from '../stores/todoStore';
import todoAction from '../actions/todoAction';
export default {
  props:['items'],
  data () {
    return {

    }
  },
  methods:{
    delTodo(i){
      todoAction.delTodo(i)
      // this.items.splice(i,1)
    },
    toggleState(i){
      todoAction.toggleState(i, "done")
      // this.items[i].done = !this.items[i].done;
    },
    _onTodoChange(payload, result){
      this.items = todoStore.getAll();
    }
  },
  created (){
    todoStore.addChangeListener(this._onTodoChange)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,li{
  list-style: none;
  padding: 0;
}
.todo-main{
  margin: 20;
}
.done{
  color: #aaa;
  text-decoration:line-through;
}
</style>
