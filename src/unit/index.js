import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';

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

        // 后期
        this.bloomComposer = null;
        // 选中物体
        this.selectObject = null;
        // 创建视图控制器OrbitControls，鼠标控制
        this.controls = new OrbitControls(this.camera, this.element);

        // 配置
        this.data = {
            axesHelper: {
                visible: false,
            },
            gridHelper: {
                visible: false
            },
            ambientLight: {
                visible: false
            }
        }
        // 辅助元素
        this.helper();
    }
    /**
    * @description 创建时进行一些初始化
    */
    createInit() {
        // 相机设置
        this.camera.position.set(0, 5000, 10000);
        // 设置默认背景色
        this.renderer.setClearColor('#244780', 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        //开启阴影渲染
        this.renderer.shadowMap = true;
        //右键拖拽
        this.controls.enablePan = true;
        /**---------------------------------------------------------------------------- */
        // 适应浏览器大小
        window.addEventListener("resize", this.onResize.bind(this), { passive: true });
        window.addEventListener("click", this.mouseClick.bind(this), { passive: true });
        /**增加元素操作应放在这里 */
        // 渲染
        this.light()
        this.render();
        // 星星
        this.star();
        // 增加辅助元素
        this.setHelper();
        /**---------------------------------------------------------------------------- */
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
    // 高亮
    light() {
        let scene = this.scene;
        let camera = this.camera;
        let renderer = this.renderer
        // RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
        const renderScene = new RenderPass(scene, camera)
        // THREE.OutlinePass(resolution, scene, camera, selectedObjects)
        // resolution 分辨率
        // scene 场景
        // camera 相机
        // selectedObjects 需要选中的物体对象, 传入需要边界线进行高亮处理的对象
        const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
        outlinePass.renderToScreen = true;
        outlinePass.edgeStrength = 3 //粗
        outlinePass.edgeGlow = 2 //发光
        outlinePass.edgeThickness = 2 //光晕粗
        outlinePass.pulsePeriod = 1 //闪烁
        outlinePass.usePatternTexture = false //是否使用贴图
        outlinePass.visibleEdgeColor.set('yellow'); // 设置显示的颜色
        outlinePass.hiddenEdgeColor.set('white'); // 设置隐藏的颜色

        //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
        this.bloomComposer = new EffectComposer(renderer)
        this.bloomComposer.setSize(window.innerWidth, window.innerWidth);
        this.bloomComposer.addPass(renderScene);
        // 眩光通道bloomPass插入到composer
        this.bloomComposer.addPass(outlinePass)
        this.bloomComposer.render()
    }
    // 渲染函数
    render() {

        requestAnimationFrame(this.render.bind(this));

        this.controls.update();
        // 后期处理
        // this.bloomComposer.render();

        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }
    // 选中
    mouseClick(event) {
        var mouse = new THREE.Vector2();
        let scene = this.scene;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        var raycaster = new THREE.Raycaster();
        // console.log(mouse.x, mouse.y)
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
    // 配置
    config(options) {
        this.data.axesHelper.visible = options.axesHelper ? options.axesHelper : false;
        this.data.gridHelper.visible = options.gridHelper ? options.gridHelper : false;
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
    // 辅助元素
    helper() {
        // 复制坐标系
        var axesHelper = new THREE.AxesHelper(5000);
        this.data.axesHelper = axesHelper;

        // 辅助网格
        var size = 1000000;
        var divisions = 1000;
        var gridHelper = new THREE.GridHelper(size, divisions);
        gridHelper.position.set(0, -10000, 0)
        this.data.gridHelper = gridHelper;

        // 光源
        var ambientLight = new THREE.AmbientLight('#fff');
        this.data.ambientLight = ambientLight
    }
    // 辅助元素显示控制 shouled be add once 
    setHelper() {
        const config = this.data;
        for (const object3d in config) {
            if (Object.hasOwnProperty.call(config, object3d)) {
                const element = config[object3d];
                if (element.visible) this.scene.add(element);
            }
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
            beforeCreate() {
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
