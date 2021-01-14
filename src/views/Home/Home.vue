<template>
  <div class="blue">
  </div>
</template>
<script>
 import Tunnel from './home.js'
 export default {
   name: 'Home',
   components: {},
   data() {
     return {
       data: '',
     }
   },
   setup(){
     return {}
   },
   created() {
     this.$api.home()
         .then( res => {
           this.data = res.group
           console.log(res.group)
           this.init();
         }).catch( err => {
           console.log(err)
     })
   },
   methods: {
     init() {
       // 挂载 
      this.$vthree.mount('.blue')
      /** @type { 创建隧道 }*/
      let tunnel = new Tunnel(this.$vthree.scene,this.data);
      //初始化
      tunnel.init();
     },
   },

 }
</script>
<style lang="scss" scope>
.blue {
  width: 100%;
  height:100%;

}
</style>
