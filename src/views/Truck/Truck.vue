<template>
  <div class="wrap"></div>
</template>
<script>
import load from '../../unit/glbload.js'


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
      const res = await load({ url: 'Glb/laoya/laoya.glb', light: false })
      vthree.scene.add(res.scene)
      // res.scene.position.set(0, 0, 0)
      res.scene.scale.set(500, 500, 500)
      console.log(res)


    },
  },
}
</script>
<style lang="scss" scope>
.wrap {
  width: 100%;
  height: 100%;
}
</style>