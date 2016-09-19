<template>
  <div id="app">
    <todo-app></todo-app>
  </div>
</template>

<script>
import todoApp from './components/todoApp'

export default {
  components: {
    todoApp
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  width: 300px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}
</style>
