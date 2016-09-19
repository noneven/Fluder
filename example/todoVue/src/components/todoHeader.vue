<template>
  <div class="header">
    <img class='logo' src="../assets/logo.png">
    <h1>todos</h1>
    <input placeholder="What needs to be done?"
      @keyup.enter='addTodo'
     />
 </div>
</template>

<script>
import todoAction from '../actions/todoAction';
export default {
  props:["items"],
  data () {
    return {

    }
  },
  methods:{
    addTodo(e){
      todoAction.addTodo({
        text: e.target.value,
        done: false
      });
      // this.items.push({
      //   text: e.target.value,
      //   done: false
      // });
      e.target.value = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header h1{
  font-weight: 500;
}
.header .logo{
  height: 100px;
}
.header input{
  width: 140px
}
</style>
