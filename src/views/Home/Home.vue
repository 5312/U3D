<template>
  <div class="blue">
  </div>
</template>
<script>
import { PlaneBufferGeometry } from 'three'
 import {
   Tunnel,
   Association
        } from './home.js'
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
   beforeCreate(){
   },
   created() {
        this.$api.home()
        .then( res => {
          // ajax data
          this.data = res.group
          // console.log(res.group)
          this.init();
        }).catch( err => {
          console.log(err)
        })
   },
   methods: {
     init() {
      let vthree = this.$vthree;
       // 挂载 
      vthree.mount('.blue');
      // 配置 
      vthree.config({
          axesHelper: false,
          gridHelper: true,
      }) 
      let association = new Association(vthree.scene,this.data);
      association.planeBuffer();
      association.planeBuffer();
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
