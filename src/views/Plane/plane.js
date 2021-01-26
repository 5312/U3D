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


    this.allGroup();

    this.bottom();

    this.groupOne();

    this.helper();

  }
  bottom() {
    let height = 100,
      width = 1000
    var geometry = new THREE.PlaneBufferGeometry(width, height)

    var material = new THREE.MeshBasicMaterial({
      color: '#000',
      side: THREE.DoubleSide
    });

    // Create the final object to add to the scene
    var curveObject = new THREE.Mesh(geometry, material);
    this.group.add(curveObject)

    // 两侧
    /**--------------------------------------------- */
    var material1 = new THREE.MeshBasicMaterial({
      color: '#0546BE',
      side: THREE.DoubleSide
    });
    var left = new THREE.Mesh(geometry, material1);
    left.name = 'left'
    left.position.set(0, -50, 50)
    left.rotation.set(Math.PI / 2, 0, 0)
    this.group.add(left)
    /**--------------------------------------------- */
    var material1 = new THREE.MeshBasicMaterial({
      color: '#0546BE',
      side: THREE.DoubleSide
    });
    var right = new THREE.Mesh(geometry, material1);
    right.name = 'right'
    right.position.set(0, 50, 50)
    right.rotation.set(Math.PI / 2, 0, 0)
    this.group.add(right)
    /**--top shape------------------------------------------- */
    var geometry2 = new THREE.CylinderBufferGeometry(height / 2, height / 2, width, 3, 3, true, 0, Math.PI);
    var material2 = new THREE.MeshBasicMaterial({
      transparent: true,//开启透明度
      opacity: 0.5,//设置透明度具体值
      color: '#0546BE',//三角面颜色
      side: THREE.DoubleSide//两面可见
    });//材质对象
    var top = new THREE.Mesh(geometry2, material2);//网格模型对象
    top.name = 'top'
    top.position.set(0, 0, 100)
    top.rotation.set(Math.PI / 2, 0, Math.PI / 2)
    /**--------------------------------------------- */
    this.group.add(top)
  }
  allGroup() {
    this.group = new THREE.Group();
    this.group.name = 'allGroup';

    this.scene.add(this.group)
  }
  groupOne() {
    let height = 100,
      width = 1000
    // 把外层对象的中心移动到，旋转中心，然会把目标移动会原点，然后旋转外层对象
    var geometry = new THREE.PlaneBufferGeometry(width, height)

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
    // 两侧
    /**-------------------left-------------------------- */
    var material1 = new THREE.MeshBasicMaterial({
      color: '#0546BE',
      side: THREE.DoubleSide
    });
    var left = new THREE.Mesh(geometry, material1);
    left.name = 'left'
    left.position.set(-500, -50, 50)
    left.rotation.set(Math.PI / 2, 0, 0)
    group.add(left)
    /**--------------------------------------------- */
    /**---------------------right------------------------ */
    var material1 = new THREE.MeshBasicMaterial({
      color: '#0546BE',
      side: THREE.DoubleSide
    });
    var left = new THREE.Mesh(geometry, material1);
    left.name = 'right'
    left.position.set(-500, 50, 50)
    left.rotation.set(Math.PI / 2, 0, 0)
    group.add(left)
    /**--------------------------------------------- */
    /**--top shape------------------------------------------- */
    var geometry2 = new THREE.CylinderBufferGeometry(height / 2, height / 2, width, 3, 3, true, 0, Math.PI);
    var material2 = new THREE.MeshBasicMaterial({
      transparent: true,//开启透明度
      opacity: 0.5,//设置透明度具体值
      color: '#0546BE',//三角面颜色
      side: THREE.DoubleSide//两面可见
    });//材质对象
    var top = new THREE.Mesh(geometry2, material2);//网格模型对象
    top.name = 'top'
    top.position.set(-500, 0, 100)
    top.rotation.set(Math.PI / 2, 0, Math.PI / 2)
    group.add(top)
    /**--------------------------------------------- */
    this.group.add(group)
    this.groupTwo(group);
  }
  wall() {

  }
  groupTwo(groupOne) {
    const geometry = new THREE.PlaneBufferGeometry(100, 400)
    const material = new THREE.MeshBasicMaterial({
      color: '#000',
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    /** ----------------------------------------------- */
    let group2 = new THREE.Group();
    group2.name = 'group2'
    group2.position.set(-1000, 0, 0)
    group2.add(mesh)
    mesh.position.set(-50, -150, 0)
    group2.rotation.set(0, -Math.PI / 4, 0)
    /** ----------------------------------------------- */
    /**-------------------left-------------------------- */
    var material1 = new THREE.MeshBasicMaterial({
      color: '#0546BE',
      side: THREE.DoubleSide
    });
    var left = new THREE.Mesh(geometry, material1);
    left.name = 'left'
    left.position.set(0, -150, 0)
    left.rotation.set(Math.PI / 2, 0, 0)
    group2.add(left)
    /**--------------------------------------------- */
    // 加入组
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