//threejs
import {
  Mesh,
  TorusBufferGeometry,
  LineBasicMaterial,
  EdgesGeometry,
  LineSegments,
  RingBufferGeometry,
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
    if (this.data.radius)
      this.model(this.data)
    else
      this.data.forEach(element => {
        this.model(element)
      });
  }
  model(options) {
    const {
      radius,
      rlh,
      height,
      segments,// 分段数
      thetaLength, // 这个拐角的角度 Math.PI
      thetaStart,
      name,
      position,
      rotation,
    } = options;
    this.position = position;
    this.rotation = rotation;
    // bottom
    // var geometry = new CircleBufferGeometry(radius, segments, thetaStart, thetaLength);
    var geometry = new RingBufferGeometry(radius, radius - height, segments, segments, thetaStart, thetaLength);
    var material = new MeshBasicMaterial({
      color: '#000',
      side: DoubleSide
    });
    var bottom = new Mesh(geometry, material);
    bottom.rotateX(Math.PI / 2)
    bottom.name = 'bottom'

    // out-slider /圆柱的顶部半径 /圆柱的底部半径 /圆柱的高度 / 圆柱侧面周围的分段数/ 圆柱侧面沿着其高度的分段数/闭合/起始角度/ 圆柱底面圆扇区的中心角
    var geometry2 = new CylinderBufferGeometry(radius, radius, rlh, segments, segments, true, thetaStart, thetaLength);
    var material2 = new MeshBasicMaterial({
      color: '#0546BE',//三角面颜色
      side: DoubleSide//两面可见
    });//材质对象
    var slider = new Mesh(geometry2, material2);//网格模型对象
    slider.name = 'slider'
    slider.translateY(rlh / 2)
    slider.rotateX(Math.PI)
    slider.rotateY(Math.PI / 2)

    var geometry3 = new CylinderBufferGeometry(radius - 300, radius - 300, rlh, segments, segments, true, thetaStart, thetaLength);

    var inslider = new Mesh(geometry3, material2);//网格模型对象
    inslider.name = 'inslider'
    inslider.translateY(rlh / 2)
    inslider.rotateX(Math.PI)
    inslider.rotateY(Math.PI / 2)
    // in-slider 
    // 圆环
    var geometry4 = new TorusBufferGeometry((radius - height / 2), height / 2, 6, segments, thetaLength);//圆环的圆心角
    var material4 = new MeshBasicMaterial({
      transparent: true,//开启透明度
      opacity: 0.5,//设置透明度具体值
      color: '#0546BE',//三角面颜色
      side: FrontSide,//两面可见
    });
    var top = new Mesh(geometry4, material4);
    top.name = 'top'
    top.translateY(height - 100)
    top.rotateX(Math.PI / 2)

    /** @type {边框} */
    let edges = new EdgesGeometry(geometry4, 2);

    /** @type {边框材质} */
    let edgesLine = new LineBasicMaterial({ color: '#00C0FF' });//'#244780'
    edgesLine.transparent = true;//深度测试，开启则边框透明
    let meshLine = new LineSegments(edges, edgesLine);
    meshLine.name = 'meshLine'
    top.add(meshLine)

    // put into group
    this.pushGroup(bottom, slider, inslider, top);
    this.group.name = name;
    // 当前组位置
    this.setPosition();
  }
}
export default Corner;