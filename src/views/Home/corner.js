//threejs
import {
  Mesh,
  TorusBufferGeometry,
  CircleBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
  CylinderBufferGeometry,
  FrontSide,
} from 'three';
import { Tunnel } from './home.js';

/** 
 * @description 拐角
 * @author YF
 * @date 16/01/2021
 * @class Corner
 * @extends {Tunnel}
 */
class Corner extends Tunnel {
  constructor(scene, group) {
    super(scene, group)
  }
  create() {

    this.model()
  }
  model() {
    const {
      width,
      height,
      segments,// 分段数
      thetaLength, // 这个拐角的角度 Math.PI
      thetaStart,
      name,
    } = this.data;
    // bottom
    var geometry = new CircleBufferGeometry(height, segments, thetaStart, thetaLength);
    var material = new MeshBasicMaterial({
      color: '#000',
      side: DoubleSide
    });
    var bottom = new Mesh(geometry, material);
    bottom.rotateX(Math.PI / 2)

    // slider /圆柱的顶部半径 /圆柱的底部半径 /圆柱的高度 / 圆柱侧面周围的分段数/ 圆柱侧面沿着其高度的分段数/闭合/起始角度/ 圆柱底面圆扇区的中心角
    var geometry2 = new CylinderBufferGeometry(height, height, height - 100, segments, segments, true, thetaStart, thetaLength);
    var material2 = new MeshBasicMaterial({
      color: '#2587e8',//三角面颜色
      side: DoubleSide//两面可见
    });//材质对象
    var slider = new Mesh(geometry2, material2);//网格模型对象
    slider.translateY(100)
    slider.rotateX(Math.PI)
    slider.rotateY(Math.PI / 2)

    // 圆环
    var geometry3 = new TorusBufferGeometry(height / 2, height / 2, segments, segments, thetaLength);//圆环的圆心角
    var material3 = new MeshBasicMaterial({
      transparent: true,//开启透明度
      opacity: 0.5,//设置透明度具体值
      color: '#1bdc56',//三角面颜色
      side: FrontSide,//两面可见
    });
    var top = new Mesh(geometry3, material3);
    top.translateY(height - 100)
    top.rotateX(Math.PI / 2)
    // put into group
    this.pushGroup(bottom, slider, top);
    this.group.name = name;
    // 当前组位置
    this.setPosition();
  }
}
export default Corner;