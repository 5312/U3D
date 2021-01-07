//threejs
import * as THREE from 'three';
//坐标算法
import { Vector3 } from 'three';

/**
 * @description v隧道构建类
 * @author YF
 * @date 06/01/2021
 * @class Tunnel
 */
class Tunnel {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.group = new THREE.Group();
    this.group.name = 'tunnel'
  }

  /**
   * @description 初始化
   * @param {whd}
   * @memberof Tunnel
   */
  init() {
    let deep = this.data.deep;
    let width = this.data.width;
    let height = this.data.height;
    /** @type {*物体} */
    let geometry = new THREE.PlaneBufferGeometry(deep, width, height);

    /** @type {*材质} */
    let material = new THREE.MeshBasicMaterial({
      color: '#000',
    });

    let mesh = new THREE.Mesh(geometry, material);

    this.group.add(mesh);



    this.scene.add(this.group)
  }
}
export default Tunnel;
