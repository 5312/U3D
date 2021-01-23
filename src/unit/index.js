import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

import TWEEN from '@tweenjs/tween.js';
/**
 * @description 基类
 * @author YF
 * @date 14/01/2021
 * @class Vthree 
 */
class Vthree {
    constructor() { // 创建
        this.element = null;
        this.wrap = null //this.element.parentNode;
        // 创建虚拟dom
        this.createsNode();
        // 参数
        let width = this.wrap ? this.wrap.clientWidth : window.innerWidth;
        let height = this.wrap ? this.wrap.clientHeight : window.innerHeight;
        // 场景
        this.scene = new THREE.Scene();
        // 创建相机Camera
        this.camera = new THREE.PerspectiveCamera(70, width / height, 10, 20000);
        // 创建渲染器Rendere
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, // 是否执行抗锯齿
            canvas: this.element,
            preserveDrawingBuffer: true,
        });
        //
        this.clock = new THREE.Clock();
        // 性能监视器
        this.stats = new Stats();
        // 
        this.gui = null;
        // 后期
        this.composer = null;

        // 点击选中物体
        this.selectObject = null;

        // 创建视图控制器OrbitControls，鼠标控制
        this.controls = new OrbitControls(this.camera, this.element);

    }
    /** @description 创建画布  */
    createsNode() {
        let canvas = document.createElement('canvas')
        this.element = canvas;
    }
    /**
    * @description 创建时进行一些初始化--添加
    */
    createInit() {
        // 相机设置
        this.camera.position.set(0, 5000, 10000);
        this.camera.lookAt(0, 0, 0);
        // 设置默认背景色
        this.renderer.setClearColor('#244780', 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        // 开启阴影渲染
        this.renderer.shadowMap = true;
        // 此代码一定要加上，必不可少
        // this.renderer.autoClear = false
        // 右键拖拽
        this.controls.enablePan = true;
        /**---------------------------------------------------------------------------- */
        // 适应浏览器大小
        window.addEventListener("resize", this.onResize.bind(this), { passive: true });
        window.addEventListener("click", this.mouseClick.bind(this), { passive: true });
        /**增加元素操作应放在这里 */
        // 添加性能监视器
        this.wrap.appendChild(this.stats.dom);
        // 渲染 
        this.effect();
        // 星星
        this.star();

        // 光源
        this.light();

        // 执行render
        this.render();

        /**---------------------------------------------------------------------------- */
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
        this.scene.fog = new THREE.Fog(0xaaaaaa, 1, 300000000);
        // 形状データを作成
        const geometry = new THREE.Geometry();
        for (let i = 0; i < 10000; i++) {
            const star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(30000);
            star.y = THREE.Math.randFloatSpread(30000);
            star.z = THREE.Math.randFloatSpread(30000);

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
        // this.scene.add(starField);
    }
    // 光源管理
    light() {
        // 平行光
        const ambientLight = new THREE.AmbientLight('#fff');
        // 点光源
        const pointLight = new THREE.PointLight(0xffffff, 1);

        this.scene.add(ambientLight);

        this.camera.add(pointLight)
    }
    // 高亮
    effect() {
        const params = {
            exposure: 2,
            bloomThreshold: 0,
            bloomStrength: 3,
            bloomRadius: 1
        };
        this.composer = new EffectComposer(this.renderer);
        this.composer.renderToScreen = true;

        const renderScene = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderScene);

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0, 0);
        bloomPass.renderToScreen = true;
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;

        // this.composer.addPass(bloomPass);
    }
    // 渲染函数
    render() {

        var delta = this.clock.getDelta();
        // 后期处理
        this.composer.render(delta);

        // 鼠标控制
        this.controls.update(delta);

        // 性能监视器
        this.stats.update(delta);
        // 动画
        TWEEN.update();

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));

    }
    // 选中
    mouseClick(event) {
        var mouse = new THREE.Vector2();
        let scene = this.scene;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        // 计算物体和射线的焦点
        var intersects = raycaster.intersectObjects(scene.children, true);
        let obj = null;
        if (intersects.length > 0) {
            if (intersects[0].object.select) {

                intersects[0].object.select = false;
            } else {
                intersects[0].object.select = true;
            }
            // 选中物体
            obj = intersects[0].object;
            // intersects[0].object.material.color.set(0xff0000)
        }
        if (this.onClick) this.onClick(obj);
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

    // 清空场景
    clear() {
        while (this.scene.children.length > 0) {
            const mesh = this.scene.children[0];
            if (mesh.type == 'Group') {
                mesh.traverse(function (obj) {
                    if (obj.type === 'Mesh') {
                        if (obj.geometry) obj.geometry.dispose();
                        if (obj.material) obj.material.dispose();
                        if (obj.texture) obj.texture.dispose();
                    }
                })
            } else {
                if (mesh.geometry) mesh.geometry.dispose();
                if (mesh.material) mesh.material.dispose();
                if (mesh.texture) mesh.texture.dispose();

            }
            this.scene.remove(this.scene.children[0]);
        }
    }

}
export default {
    install: (app, options) => {
        const vthree = new Vthree();
        app.config.globalProperties.$vthree = vthree
        app.config.globalProperties.$tween = TWEEN;
        // app.directive('click', {
        //     // 当被绑定的元素插入到 DOM 中时……
        //     beforeMount: function (el) {
        //         console.log(el)
        //     }
        // })
        // 混入生命周期
        app.mixin({
            // clear before Create 
            unmounted() {
                // clear THREE.scene
                vthree.clear();
            },
            beforeUnmount() {
                window.removeEventListener('click', vthree.mouseClick)
                window.removeEventListener('resize', vthree.onResize)
            },
        })
    }
}
