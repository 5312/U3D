<template>
  <div class="blue">
    <canvas id="canvas1"></canvas>
  </div>
</template>
<script>
export default {
  name: 'Blue',
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
    
  },
  methods: {
    init() {
    // 挂载 
      this.$vthree.mount('.blue')
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