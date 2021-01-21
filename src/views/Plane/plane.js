import * as THREE from 'three';

// 扫描成型
class Line {
  constructor(scene, data = []) {
    this.scene = scene;
    this.data = data;

  }
  create() {
    /**
    * 创建扫描网格模型
    */
    var shape = new THREE.Shape();
    /**四条直线绘制一个矩形轮廓*/
    shape.moveTo(0, 0);//起点
    shape.lineTo(0, 10);//第2点
    shape.lineTo(10, 10);//第3点
    shape.lineTo(10, 0);//第4点
    shape.lineTo(0, 0);//第5点

    /**创建轮廓的扫描轨迹(3D样条曲线)*/
    var curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, -50, -50),
      new THREE.Vector3(10, 0, 0),
      new THREE.Vector3(8, 50, 50),
      new THREE.Vector3(-5, 0, 100)
    ]);
    var geometry = new THREE.ExtrudeGeometry(//拉伸造型
      shape,//二维轮廓
      //拉伸参数
      {
        bevelEnabled: false,//无倒角
        extrudePath: curve,//选择扫描轨迹
        steps: 50//扫描方向细分数
      }
    );
    let material = new THREE.MeshPhongMaterial({
      color: '#fff'
    });
    var mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }
}
export {
  Line
}