<template>
  <div class="wrap">
    <canvas id="canvas"  width="500" height="500"></canvas>
  </div>
</template>
<script>
import curve from '../../module/curve'
import planeBlack from '../../module/planeBlack.js'
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
      let e = this
      let canvas = document.getElementById('canvas')
     
      e.$main(canvas, async (scene) => {
        planeBlack(e.data, scene) //管道
        console.log(scene)
      })
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