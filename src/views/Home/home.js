//threejs
import * as THREE from 'three';
//坐标算法
import { Vector3 } from 'three';
//隧道类
class Tunnel {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'tunnel'
  }
  //
  init(whd) {
    // whd--- 长宽高
    //物体
    let geometry = new THREE.PlaneBufferGeometry(whd.deep, whd.width, whd.height)
    //材质
    let material = new THREE.MeshBasicMaterial({
      color: '#000',
    })

  }
}
export default Tunnel