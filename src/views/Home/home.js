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
    // 组
    this.group = new THREE.Group();
    this.group.name = group.name;
  }

  /**
   * @description 初始化
   * @param {ajax-res}}
   */
  init() {
    let len = this.data.length;
    // 两条立方体
    // for (let i = 0; i < len; i++) {
    //   const miss = this.data[i];
    //   this.module(miss);
    // }
    // 位置
    this.groupPosition();

    // this.mountain();
    // 物体位置
    this.scene.add(this.group);

  }
  /**
   * @description 组--两条为一组两条立方体 
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
  // 山体背景
  mountain() {
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
   * @description 位置
   * @memberof Tunnel
   */
  groupPosition() {
    let group = this.scene.getObjectByName(this.group.name);
    if (!group) group = this.group
    group.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    group.position.set(this.position.x, this.position.y, this.position.z)
  }

}
class Association extends Tunnel {
  constructor(scene, group) {
    super(scene, group);

  }
  planeBuffer() {
    const width = 10000;
    const height = 300;
    const rlh = 200;
    // bottom
    var geometry = new THREE.PlaneBufferGeometry(width, height);
    var material = new THREE.MeshBasicMaterial({
      color: '#000',
      side: THREE.DoubleSide
    });
    var bottom = new THREE.Mesh(geometry, material);
    // left
    var geometry1 = new THREE.PlaneBufferGeometry(width, rlh);
    var material1 = new THREE.MeshBasicMaterial({
      color: '#2587e8',
      side: THREE.DoubleSide
    });
    var left = new THREE.Mesh(geometry1, material1);
    left.translateY(height / 2)
    left.translateZ(-(rlh / 2))
    left.rotateX(Math.PI / 2);

    // right
    var geometry1 = new THREE.PlaneBufferGeometry(width, rlh);
    var material1 = new THREE.MeshBasicMaterial({
      color: '#2587e8',
      side: THREE.DoubleSide
    });
    var right = new THREE.Mesh(geometry1, material1);
    right.translateY(-height / 2)
    right.translateZ(-(rlh / 2))
    right.rotateX(Math.PI / 2);

    // top shape

    var geometry2 = new THREE.CylinderBufferGeometry(height / 2, height / 2, width, 8, 8, true, 0, Math.PI);
    var material2 = new THREE.MeshBasicMaterial({
      transparent: true,//开启透明度
      opacity: 0.5,//设置透明度具体值
      color: '#1bdc56',//三角面颜色
      side: THREE.DoubleSide//两面可见
    });//材质对象
    var top = new THREE.Mesh(geometry2, material2);//网格模型对象

    top.translateZ(-rlh)
    top.rotateX(-Math.PI / 2)
    top.rotateZ(Math.PI / 2)
    // in to group
    this.pushGroup(bottom, right, left, top)//

  }
  pushGroup(...arg) {
    const group = new THREE.Group();
    group.name = Math.random(20)
    let array = [...arg];
    // 加入组
    for (let i = 0; i < array.length; i++) {
      const mesh = array[i];
      group.add(mesh);
    }
    // 当前组的位置
    this.groupPosition(group)
    this.scene.add(group)
  }
  groupPosition(group) {
    group.rotateY(Math.PI / 2)
    group.rotateX(Math.PI / 2)
  }
}
export {
  Tunnel,
  Association
};
