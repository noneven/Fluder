<template>
  <div>
    <todo-header :items.sync='items'></todo-header>
    <todo-main :items.sync='items'></todo-main>
    <todo-footer :items='items'></todo-footer>
  </div>
</template>

<script>

import todoHeader from './todoHeader';
import todoFooter from './todoFooter';
import todoMain from './todoMain';
import todoStore from '../stores/todoStore';
import todoAction from '../actions/todoAction';

let items = todoStore.getAll();

export default {
  data () {
    return {
      items
    }
  },
  watch:{
    items: {
      handler(){
        todoAction.localStorage(this.items)
      },
      deep: true
    }
  },
  components:{
    todoHeader,
    todoFooter,
    todoMain
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
