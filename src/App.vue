<template>
  <div class="main">
    <div class="title">
        <router-link to="/" custom v-slot="{ navigate, isActive }">
          <span :class="[isActive?'active':'','link']" @click="navigate">首页</span>
        </router-link>
        <router-link to="plane" custom v-slot="{   isActive }">
          <span :class="[isActive?'active':'','link']" @click="tunnelAll">隧道3D全景</span>
        </router-link>
        <router-link to="truck" custom v-slot="{  navigate, isActive }">
         <span :class="[isActive?'active':'','link']" @click="navigate">车辆模型加载</span>
        </router-link>
        <router-link to="blue" custom v-slot="{ navigate, isActive }">
          <span :class="[isActive?'active':'','link']" @click="navigate">背景</span>
        </router-link>
    </div>
   <div class="view">
        <router-view ></router-view>
   </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {
     
  },
  methods:{
    tunnelAll(e){
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scope>
@import './assets/scss.scss';
$titleHeight:50px;
.main {
  height: 100%;
  width: 100%;
  .title {
    width: 100%;
    display:flex;
    color:#fff;
    line-height: 50px;
    text-align: center;
    align-items: center;
    height: $titleHeight;
    justify-content: flex-end;
    background-image: linear-gradient(#001447,#00123C,#002665);
    .link {
      display:block;
      padding: 0px 20px;
      cursor: pointer;
    }
    .active {
        background-image: linear-gradient(#003385,#050E31,#003385);
    }
  }
  .view{
    height: calc(100% - 50px);
  }
}
</style>