<template>
  <div class="blue">
    
  </div>
</template>
<script>
import {
  Tunnel
} from '../Home/home.js';
export default {
  name: 'Blue',
  components: {},
  setup() {},
  data() {
    return {
      data: '',
    }
  },
  mounted() {
    this.$api.home().then(res => {
      // ajax data
      this.data = res.group;
      this.init();
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    init() {
       let vthree = this.$vthree;
      // 挂载 
      vthree.mount('.blue');
      
      let tunnel = new Tunnel(vthree.scene,this.data);
      tunnel.init();
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