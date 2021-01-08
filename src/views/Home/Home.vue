<template>
  <div class="blue">
    <canvas id="canvas1"></canvas>
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
   mounted() {
     this.$api.home()
         .then( res => {
           console.log(res)
           this.data = res.data
           this.init();
         }).catch( err => {
           console.log(err)
     })
   },
   methods: {
     init() {
       let e = this;
       let canvas = document.getElementById('canvas1')
       e.$main(canvas,  (scene,) => {
         /** @type { 创建隧道 }*/
         let tunnel = new Tunnel(scene,this.data);
         tunnel.init();//初始化
         tunnel.position();
       })
     },
   },
 }
</script>
<style lang="scss" scope>
.blue {
  width: 100%;
  height:100%;
  #canvas1 {
    width: 100%;
    height: 100%;
  }
}
</style>
