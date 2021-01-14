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
  constructor(scene, group) {
    this.scene = scene;
    this.data = group.data;
    this.position = group.position
    this.rotation = group.rotation
    this.group = new THREE.Group();
    this.group.name = group.name;
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
    this.face();
    // 物体位置
    this.scene.add(this.group);
    this.groupPosition();
  }
  /**
   * @description 组--两条为一组
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
      wireframe: true
    });

    let mesh = new THREE.Mesh(geometry, material);

    /** @type {边框} */
    let edges = new THREE.EdgesGeometry(geometry, 2);

    /** @type {边框材质} */
    let edgesLine = new THREE.LineBasicMaterial({ color: '#244780' });
    edgesLine.depthTest = true;//深度测试，开启则边框透明
    let meshLine = new THREE.LineSegments(edges, edgesLine);

    mesh.add(meshLine);
    mesh.position.set(data.position.x, data.position.y, data.position.z)
    mesh.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)
    // 添加物体
    this.group.add(mesh);

  }
  face() {
    let geometry = new THREE.PlaneBufferGeometry(2000000, 2000000, 32);

    let material = new THREE.MeshBasicMaterial({
      color: '#000'
    })

    let mesh = new THREE.Mesh(geometry, material)
    // 平移
    mesh.position.set(0, -50, 0);
    //旋转
    mesh.rotation.set(-1.6, 0, 0)

    this.group.add(mesh);


    let cude = new THREE.Mesh(geometry, material)
    // 平移
    cude.position.set(0, -1000, 0);
    //旋转
    cude.rotation.set(-1.16, 0, 0)
    this.group.add(cude);

  }
  /**
   * @description 
   * @author YF
   * @date 12/01/2021
   * @memberof Tunnel
   */
  groupPosition() {
    let group = this.scene.getObjectByName(this.group.name);
    if (!group) group = this.group
    group.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    group.position.set(this.position.x, this.position.y, this.position.z)
  }
}
export default Tunnel;
