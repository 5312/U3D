import * as THREE from 'three';

// 扫描成型
class Line {
  constructor(scene, data = []) {
    this.scene = scene;
    this.data = data;
  }
  /**
  * 创建扫描网格模型
  */
  create() {

    var geometry = new THREE.PlaneBufferGeometry(1000, 100)

    var material = new THREE.MeshBasicMaterial({
      color: '#000',
      side: THREE.DoubleSide
    });

    // Create the final object to add to the scene
    var curveObject = new THREE.Mesh(geometry, material);

    this.allGroup();

    this.groupOne();


    this.group.add(curveObject)
    this.helper()
  }
  allGroup() {
    this.group = new THREE.Group();
    this.group.name = 'allGroup';

    this.scene.add(this.group)
  }
  groupOne() {
    // 把外层对象的中心移动到，旋转中心，然会把目标移动会原点，然后旋转外层对象
    var geometry = new THREE.PlaneBufferGeometry(1000, 100)

    var material = new THREE.MeshBasicMaterial({
      color: '#000',
      side: THREE.DoubleSide
    });
    // Create the final object to add to the scene
    var curveObject = new THREE.Mesh(geometry, material);

    const group = new THREE.Group(); // 外层对象
    group.name = 'group1'
    group.position.set(-500, 0, 0); // 设置外层对象的中心为原本想要旋转的位置
    group.add(curveObject); // 把'门'添加进外层对象中
    curveObject.position.set(-500, 0, 0); // 调整门在外层对象中的相对位置
    group.rotation.set(0, Math.PI / 4, 0)

    this.group.add(group)
    this.groupTwo(group);
  }
  groupTwo(groupOne) {
    const geometry1 = new THREE.PlaneBufferGeometry(100, 400)
    const material = new THREE.MeshBasicMaterial({
      color: '#000',
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry1, material);

    let group2 = new THREE.Group();
    group2.name = 'group2'
    group2.position.set(-1000, 0, 0)
    group2.add(mesh)
    mesh.position.set(-50, -150, 0)

    group2.rotation.set(0, -Math.PI / 4, 0)

    groupOne.add(group2)
  }
  // 辅助元素
  helper() {
    // 复制坐标系
    var axesHelper = new THREE.AxesHelper(5000);
    this.scene.add(axesHelper)
    // 辅助网格 -- 一格一百
    var size = 100000;
    var divisions = 1000;

    var gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0, -1000, 0)
    gridHelper.rotation.set(Math.PI / 2, 0, 0)
    this.scene.add(gridHelper)
  }
}
export {
  Line
}