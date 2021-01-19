<template>
  <div class="wrap">
  </div>
</template>
<script>
import truck from './Truck.js'
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'Truck',
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
    async init() {
      let vthree = this.$vthree;
      // 挂载 
      vthree.mount('.wrap')
      truck(vthree.scene)
      const obj = await truck(this.$vthree.scene).catch((err) => {
          console.log(err)
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