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
  setup() {
     
    return {

    }
  },
  data() {
    return {
      data: '',
    }
  },
  setup(){
    
    return {
     
    }
  },
  mounted() {
      let e = this;
      let canvas = document.getElementById('canvas1')
      e.$main(canvas,  (scene) => {
        let tunnel = new Tunnel(scene)
      })
  },
  methods: {
    init() {

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