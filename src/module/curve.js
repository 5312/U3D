import * as THREE from 'three';
import { Vector3 } from 'three';
class Curve {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'line'
  }
  // 圆弧线ArcCurve
  arrCurve() {//创建一个弧
    let geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
    //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
    var arc = new THREE.ArcCurve(0, 0, 100, Math.PI / 2, Math.PI * 1.5, true);
    //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
    var points = arc.getPoints(50);//分段数50，返回51个顶点
    // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    geometry.setFromPoints(points);
    //材质对象
    var material = new THREE.LineBasicMaterial({
      opacity: 0.5, //设置透明度
      linewidth: 10, //设置线的宽度
      color: '#339BA0' //设置这个可以给每个顶点指定一种颜色
    });
    //线条模型对象
    var line = new THREE.Line(geometry, material);
    line.computeLineDistances()
    this.group.add(line); //线条对象添加到场景中
    this.scene.add(this.group)
  }
  // 曲线
  setTrans(x, y, z) {
    let trans = new Vector3(x, y, z);
    let group = this.scene.getObjectByName('line');
    console.log(group)
    group.translateOnAxis(trans, 100);

  }
}


export default function curve(scene) {
  let curve = new Curve(scene);
  curve.arrCurve();
  curve.setTrans(9, 1, 0)
}