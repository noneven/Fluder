<template>
  <footer id="footer">
    <p>
      <span v-show='total!==0'>
        {{total}} created
      </span>
      <span v-show='unaccomplished!==0'>
        =>
      </span>
      <span v-show='unaccomplished!==0' class="doing">
        * {{unaccomplished}} unaccomplished
      </span>
    </p>
    <span>created with Vue</span>
  </footer>
</template>

<script>
export default {
  props:['items'],
  data () {
    return {

    }
  },
  computed:{
    total(){
      return this.items.length
    },
    unaccomplished(){
      let k = 0;
      this.items.forEach((item)=>{
        if(item.done==false)k++
      })
      return k
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer span{
  color: #ddd
}
#footer p{
  color: #ddd
}
#footer .doing{
  color: red
}
#footer .connect{
  color: #000;
}
</style>
