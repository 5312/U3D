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
      corner: ''
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
      this.data = res.group;
      // 拐角
      this.corner = res.group.corner;

      this.init();
      this.camera();
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    camera(){
      const vector = [1000,70,0];
      
    },
    init() { // 隧道-汽车-动画
      let vthree = this.$vthree;
      // 挂载 
      vthree.mount('.home');
      // 配置 
      vthree.config({
        axesHelper: true,
        gridHelper: true,
        ambientLight: true,
      });
      // 隧道
      let array = this.data.data;
      let association = new Association(vthree.scene, this.data);
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        association.planeBuffer(element);
      }
      // 拐角
      let corner = new Corner(vthree.scene, this.corner);
      corner.create();
      // 模型
      let TWEEN = this.$tween;
      const x = -1000, y = 70, z = -6000

      truck(vthree.scene).then(res => {
        // 位置
        res.scene.rotateY(Math.PI );
        res.scene.position.set(x, y, z);
        return res.scene
      }).then(res => { // 动画
        // 左段
        // 起点坐标
        var positionA = { x: x, y: y, z: z }
        // 结束点坐标
        var targetA = { x: x, y: y, z: -z }
        let tweenA = new TWEEN.Tween(positionA).to(targetA, 20000).onUpdate(function() {
          res.position.x = positionA.x
          res.position.y = positionA.y
          res.position.z = positionA.z
        }).easing(TWEEN.Easing.Linear.None)
        // 拐弯
        // 起点坐标
        var positionB = { x:-1000, y: y, z: 6000, r:0}
        // 结束点坐标
        var targetB = { x:-550, y: y, z:6800, r:-Math.PI/2}
        let tweenB = new TWEEN.Tween(positionB).to(targetB, 2000).onUpdate(function() {
          res.position.x = positionB.x
          res.position.y = positionB.y
          res.position.z = positionB.z
          res.rotation.y = positionB.r
        }).easing(TWEEN.Easing.Linear.None)

        // 右段
        // 起点坐标
        var positionC =  { x:-550, y: y, z:6800, r:-Math.PI/2}
        // 结束点坐标
        var targetC = { x:550, y: y, z:6800, r:-Math.PI/2}
        let tweenC = new TWEEN.Tween(positionC).to(targetC, 2000).onUpdate(function() {
          res.position.x = positionC.x
          res.position.y = positionC.y
          res.position.z = positionC.z
        }).easing(TWEEN.Easing.Quadratic.Out)

        // 右段
        // 起点坐标
        var positionD = { x:550, y: y, z:6800, r:-Math.PI/2}
        // 结束点坐标
        var targetD =  { x:1000, y: y, z: 6000, r:-Math.PI}
        let tweenD= new TWEEN.Tween(positionD).to(targetD, 2000).onUpdate(function() {
          res.position.x = positionD.x
          res.position.y = positionD.y
          res.position.z = positionD.z
           res.rotation.y = positionD.r
        }).easing(TWEEN.Easing.Quadratic.Out)

        // 起点坐标
        var positionE = { x:1000, y: y, z: 6000, r:-Math.PI}
        // 结束点坐标
        var targetE =  { x:1000, y: y, z: -6000, r:-Math.PI}
        let tweenE= new TWEEN.Tween(positionE).to(targetE, 20000).onUpdate(function() {
          res.position.x = positionE.x
          res.position.y = positionE.y
          res.position.z = positionE.z
        }).easing(TWEEN.Easing.Quadratic.Out)

        // 起点坐标
        var positionF = { x:1000, y: y, z:-6000, r:Math.PI}
        // 结束点坐标
        var targetF = { x:550, y: y, z: -6800, r:Math.PI/2}
        let tweenF= new TWEEN.Tween(positionF).to(targetF, 2000).onUpdate(function() {
          res.position.x = positionF.x
          res.position.y = positionF.y
          res.position.z = positionF.z
          res.rotation.y = positionF.r
        }).easing(TWEEN.Easing.Quadratic.Out)
        // 起点坐标
        var positionG = { x:550, y: y, z:-6800, r:Math.PI/2}
        // 结束点坐标
        var targetG = { x:-550, y: y, z: -6800, r:Math.PI/2}
        let tweenG= new TWEEN.Tween(positionG).to(targetG, 2000).onUpdate(function() {
          res.position.x = positionG.x
          res.position.y = positionG.y
          res.position.z = positionG.z
          res.rotation.y = positionG.r
        }).easing(TWEEN.Easing.Quadratic.Out)
        // 起点坐标
        var positionH = { x:-550, y: y, z: -6800, r:Math.PI/2}
        // 结束点坐标
        var targetH = { x:-1000, y: y, z: -6000, r:0}
        let tweenH= new TWEEN.Tween(positionH).to(targetH, 2000).onUpdate(function() {
          res.position.x = positionH.x
          res.position.y = positionH.y
          res.position.z = positionH.z
          res.rotation.y = positionH.r
        }).easing(TWEEN.Easing.Quadratic.Out)

        tweenA.start(2000).chain(tweenB)
        tweenB.chain(tweenC)
        tweenC.chain(tweenD)  
        tweenD.chain(tweenE)
        tweenE.chain(tweenF)
        tweenF.chain(tweenG)
        tweenG.chain(tweenH)
        tweenH.chain(tweenA)
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
