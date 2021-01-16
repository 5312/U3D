<template>
  <div class="home"></div>
</template>
<script>

import {
  Tunnel,
  Association
} from './home.js';
import Corner from './corner.js';
// 模型加载
import truck from '../Truck/Truck.js'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      data: '',
      corner:''
    }
  },
  setup(props, context) {
    return {}
  },
  beforeCreate() {
  },
  created() {
    this.$api.tunnel().then(res => {
      // ajax data
      this.data = res.group
      this.corner = res.group.corner;
      console.log(res)
      this.init();
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    init() {
      let vthree = this.$vthree;
      // 挂载 
      vthree.mount('.home');
      // 配置 
      vthree.config({
        axesHelper: true,
        gridHelper: true,
        ambientLight:true,
      });
      // 隧道
      let array = this.data.data;
      let association = new Association(vthree.scene, this.data);
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        association.planeBuffer(element);
      }
      // 拐角
      console.log(this.corner)
      let corner  = new Corner(vthree.scene,this.corner);
      corner.create();
      // 模型
      truck(vthree.scene).then(res=>{
        res.scene.rotateY(Math.PI)
        res.scene.translateY(70)
        res.scene.translateX(1000)
      })

    },
  },

}
</script>
<style lang="scss" scope>
.home {
  width: 100%;
  height: 100%;
}
</style>
