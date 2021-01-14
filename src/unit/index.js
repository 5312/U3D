import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
/**
 * @description 基类
 * @author YF
 * @date 14/01/2021
 * @class Vthree
 */
class Vthree {
    constructor() {
        this.element = null;
        this.wrap = null //this.element.parentNode;

        this.before();
        // 创建相机Camera
        // 场景
        this.scene = new THREE.Scene();
        // 相机
        let width = this.wrap ? this.wrap.clientWidth : window.innerWidth;
        let height = this.wrap ? this.wrap.clientHeight : window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(70, width / height, 10, 20000);
        // 创建渲染器Rendere
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, // 是否执行抗锯齿
            canvas: this.element,
            preserveDrawingBuffer: true,
        });
        // 创建视图控制器OrbitControls，鼠标控制
        this.controls = new OrbitControls(this.camera, this.element);
    }
    /**
 * @description 创建时进行一些初始化
 */
    createInit() {
        // 相机设置
        this.camera.position.set(0, 0, 900);
        // 设置默认背景色
        this.renderer.setClearColor('#244780', 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        //开启阴影渲染
        this.renderer.shadowMap = true;
        //右键拖拽
        this.controls.enablePan = true;

        // 适应浏览器大小
        window.addEventListener("resize", this.onResize.bind(this));

        this.star();
        this.render();
    }
    /** @description 创建画布  */
    before() {
        let canvas = document.createElement('canvas')
        this.element = canvas;
    }
    mount(wrap) {
        // 挂载元素
        let div = document.querySelectorAll(wrap)[0];
        div.appendChild(this.element)
        // wrap 设置画布大小
        this.wrap = div;
        this.element.width = div.clientWidth;
        this.element.height = div.clientHeight;
        // 初始化 - 自适应
        this.createInit();
        this.onResize();
    }
    //星空
    star() {
        // フォグを作成
        this.scene.fog = new THREE.Fog(0xaaaaaa, 1, 30000);
        // 形状データを作成
        const geometry = new THREE.Geometry();
        for (let i = 0; i < 10000; i++) {
            const star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(2000);
            star.y = THREE.Math.randFloatSpread(2000);
            star.z = THREE.Math.randFloatSpread(2000);

            geometry.vertices.push(star)
        }
        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,//使材质透明
            blending: THREE.AdditiveBlending,
            depthTest: false,//深度测试关闭，不消去场景的不可见面
            // map: createLightMateria()//刚刚创建的粒子贴图就在这里用上
        });
        const starField = new THREE.Points(geometry, material);
        this.scene.add(starField);
    }
    // 渲染函数
    render() {
        requestAnimationFrame(this.render.bind(this));

        this.controls.update();

        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }
    // 适应函数
    onResize() {
        // 相机   
        let width = this.wrap ? this.wrap.clientWidth : window.innertWidth;
        let height = this.wrap ? this.wrap.clientHeight : window.innerHeight;

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
    add() {

    }
}
export default {
    install: (app, options) => {

        app.config.globalProperties.$vthree = new Vthree;
    }
}
