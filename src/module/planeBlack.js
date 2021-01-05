import * as THREE from 'three';
import { Vector3 } from 'three';
class Plane {
    constructor(obj, scene) {
        this.obj = '';
        this.scene = scene;

    }
    bottom(whd) {
        //PI属性就是π,还表示了弧度π = 180°,Math.PI = 3.14 = 180°
        //将模型z轴旋转90度,三种写法都可以
        //黑色底盘
        var geometry = new THREE.PlaneBufferGeometry(whd.deep, whd.width, whd.height);
        var material = new THREE.MeshBasicMaterial({
            color: '#000',
        })
        var plan = new THREE.Mesh(geometry, material);
        var trans = new THREE.Vector3(whd.axis.x, whd.axis.y, whd.axis.z) //向量
        var axis = new THREE.Vector3(0, 0, 0) //0.3); // 旋转向量
        plan.translateOnAxis(trans, whd.width) //平移
        plan.rotateOnAxis(axis, Math.PI / 4); //旋转45'
        this.group.add(plan);
    }
    slider(whd) {
        // 物体  
        var geometry = new THREE.PlaneBufferGeometry(whd.deep, whd.width, whd.height); // 创建一个长方体，用来定义物体的形状
        var material = new THREE.MeshBasicMaterial({
            color: '#339BA0',
            transparent: true,
            opacity: 0.4
        });
        var plan = new THREE.Mesh(geometry, material);
        var axis = new THREE.Vector3(whd.axis.x, whd.axis.y, whd.axis.z); //平移向量
        var trans = new THREE.Vector3(whd.axis.d, 0, 0); // 旋转向量
        plan.translateOnAxis(axis, whd.width / 2); //沿平移
        plan.rotateOnAxis(trans, whd.rotate); //旋转45'
        this.group.add(plan);
    }
    main(data) {
        this.obj = data;
        this.group = new THREE.Group();
        this.group.name = this.obj.name;
        let obj = this.obj;
        for (let i = 0; i < obj.bottom.length; i++) {
            const whd = obj.bottom[i];
            this.bottom(whd);
        }
        for (let i = 0; i < obj.slider.length; i++) {
            const whd = obj.slider[i];
            this.slider(whd);
        }

        this.scene.add(this.group)
    }
    roset(name, x, y, z) {
        let axis = new Vector3(x, y, z);
        let group = this.scene.getObjectByName(name);
        group.rotateOnAxis(axis, Math.PI / 2); //误差较大180 / 4;
    }
    trset(name, x, y, z) {
        let trans = new Vector3(x, y, z);
        let group = this.scene.getObjectByName(name);
        group.translateOnAxis(trans, 20);

    }
}
export default function (obj, scene) { //需要传入场景
    let plane = new Plane(obj, scene);
    for (let i = 0; i < obj.length; i++) {
        plane.main(obj[i]);
    }
    plane.roset(obj[1].name, 0, 0, 1)
    plane.trset(obj[1].name, 5, -5, 0)
}