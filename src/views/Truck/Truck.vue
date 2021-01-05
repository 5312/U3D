<template>
  <div class="wrap">
    <canvas id="canvas"  width="500" height="500"></canvas>
  </div>
</template>
<script>
import truck from '../../module/truck.js'
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
        const obj = await truck(scene).catch((err) => {
          console.log(err)
        })
        var position = { x: 850 }
        var target = { x: -850 }
        var tween = new TWEEN.Tween(position).to(target, 20000)
        tween
          .onUpdate(function () {
            obj.position.x = position.x
          })
          .easing(TWEEN.Easing.Quadratic.Out)
          .start()
          .repeat(Infinity)
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