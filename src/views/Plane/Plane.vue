<template>
  <div class="wrap">
   
  </div>
</template>
<script>
import curve from '../../module/curve'
import {  Line } from './plane.js'
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'Plane',
  components: {},
  setup() {
    return {}
  },
  data() {
    return {
      data: '',
    }
  },
  mounted() {
    this.$api
      .plane1()
      .then((res) => {
        this.data = res.data
        console.log(res.data)
        this.init()
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    init() {
      let app = this.$vthree;
      // 挂载 
      app.mount('.wrap')
      app.config({
        axesHelper: false,
        gridHelper: false,
      })
      app.camera.position.set(0,0,1000)
      let line = new Line(app.scene)
      line.create();
      // curve(app.scene)
    },
  },
}
</script>
<style lang="scss" scope>
.wrap {
  width: 100%;
  height: 100%;
  #canvas {
    width: 100%;
    height: 100%;
  }
}
</style>