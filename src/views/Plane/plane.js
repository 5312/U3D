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

    var curveObject2 = new THREE.Mesh(geometry, material);

    // 实现门围绕特定轴旋转
    const group = new THREE.Group(); // 外层对象
    group.name = 'roPo'
    group.position.set(-500, 0, 0); // 设置外层对象的中心为原本想要旋转的位置
    group.add(curveObject2); // 把'门'添加进外层对象中
    curveObject2.position.set(-500, 0, 0); // 调整门在外层对象中的相对位置
    group.rotation.set(0, Math.PI / 4, 0)

    const group2 = new THREE.Group(); // 外层对象
    group2.add(group)
    group2.add(curveObject)

    const geometry1 = new THREE.PlaneBufferGeometry(100, 400)
    const mesh = new THREE.Mesh(geometry1, material);

    let left = new THREE.Group();
    left.name = 'left'
    left.position.set(-1000, 0, 0)
    left.add(mesh)
    mesh.position.set(-50, -150, 0)
    group.add(left)
    left.rotation.set(0, -Math.PI / 4, 0)

    let g2 = group2.clone();
    g2.name = 'g2'
    g2.position.set(0, -300, 0)
    const rem = g2.getObjectByName('roPo')
    rem.remove(rem.getObjectByName('left'))


    this.scene.add(group2);
    this.scene.add(g2);





  }
}
export {
  Line
}