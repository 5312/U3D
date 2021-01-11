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
  }

  /**
   * @description 初始化
   * @param {ajax-res}}
   * @memberof Tunnel
   */
  init() {
    let len = this.data.length;
    for (let i = 0; i < len; i++) {
      const miss = this.data[i];
      this.module(miss);
    }
  }
  /**
   * @description 组
   * @author YF
   * @date 09/01/2021
   * @param {*} data
   * @memberof Tunnel
   */
  module(data) {
    let deep = data.deep;
    let width = data.width;
    let height = data.height;
    /** @type {*盒子缓存模型} */
    let geometry = new THREE.BoxBufferGeometry(deep, width, height, 2, 2, 2);

    /** @type {*材质} */
    let material = new THREE.MeshBasicMaterial({
      color: '#244780',
      // wireframe: true
    });

    let mesh = new THREE.Mesh(geometry, material);

    /** @type {边框} */
    let edges = new THREE.EdgesGeometry(geometry, 2);

    /** @type {边框材质} */
    let edgesLine = new THREE.LineBasicMaterial({ color: '#fff' });
    // edgesLine.depthTest = true;//深度测试，开启则边框透明
    let meshLine = new THREE.LineSegments(edges, edgesLine);

    mesh.add(meshLine);
    // 创建组

    // 添加物体
    this.group.add(mesh);
    // 物体位置
    this.scene.add(this.group);
    // 物体位置
    this.position(data.name, data.axis, data.tran, data.position);
  }

  /**
   * @description 位置
   * @author YF
   * @date 08/01/2021
   * @memberof Tunnel
   */
  position(name, rota, tran, position) {
    var axis = new THREE.Vector3(rota.x, rota.y, rota.z); // 旋转向量
    var trans = new THREE.Vector3(tran.x, tran.y, tran.z); // 平移向量
    let group = this.scene.getObjectByName(name);
    if (!group) {
      group = this.group
    }
    group.translateOnAxis(trans, position.translate); //沿平移
    group.rotateOnAxis(axis, position.rotate); //旋转45'
  }
}
export default Tunnel;
