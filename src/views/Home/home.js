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
    let deep = this.data[0].deep;
    let width = this.data[0].width;
    let height = this.data[0].height;
    /** @type {*盒子缓存模型} */
    let geometry = new THREE.BoxBufferGeometry(deep, width, height, 2, 2, 2);

    /** @type {*材质} */
    let material = new THREE.MeshBasicMaterial({
      color: '#244780',
      wireframe: true
    });

    let mesh = new THREE.Mesh(geometry, material);

    /** @type {边框} */
    let edges = new THREE.EdgesGeometry(geometry, 2);

    /** @type {边框材质} */
    let edgesLine = new THREE.LineBasicMaterial({ color: '#fff' })
    // edgesLine.depthTest = true;//深度测试，开启则边框透明
    let meshLine = new THREE.LineSegments(edges, edgesLine);

    mesh.add(meshLine);
    this.group.add(mesh);

    this.scene.add(this.group)
  }
  // 位置
  position() {
    var axis = new THREE.Vector3(-2, 0, 1); // 旋转向量
    var trans = new THREE.Vector3(-2, 0, -1); // 平移向量

    this.group.translateOnAxis(trans, this.data[0].width + 100); //沿平移

    this.group.rotateOnAxis(axis, Math.PI / 4); //旋转45'
  }
}
export default Tunnel;
