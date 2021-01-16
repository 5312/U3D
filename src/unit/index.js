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
        // 坐标格辅助
        this.helper();
    }
    /**
    * @description 创建时进行一些初始化
    */
    createInit() {
        // 相机设置
        this.camera.position.set(0, 500, 9000);
        // 设置默认背景色
        this.renderer.setClearColor('#244780', 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        //开启阴影渲染
        this.renderer.shadowMap = true;
        //右键拖拽
        this.controls.enablePan = true;
        /**---------------------------------------------------------------------------- */
        window.addEventListener('click', this.onMouseClick.bind(this), false);
        // 适应浏览器大小
        window.addEventListener("resize", this.onResize.bind(this), { passive: true });
        /**增加元素操作应放在这里 */
        // 渲染
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
    // 渲染函数
    render() {
        requestAnimationFrame(this.render.bind(this));

        this.controls.update();

        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }
    onMouseClick(event) {
        var mouse = new THREE.Vector2();
        let scene = this.scene;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


        var raycaster = new THREE.Raycaster();


        raycaster.setFromCamera(mouse, this.camera);


        // 计算物体和射线的焦点
        var intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            // for (var i = 0; i < intersects.length; i++) {
            var sceneChildren = scene.children
            // for (var i = 0; i < sceneChildren.length; i++) {
            //     sceneChildren[i].material.color.set(0x0000ff)
            // }
            // intersects[0].object.material.color.set(0xff0000)
            // // }
            // intersects[0].object.material.color.set(0xff0000);
            console.log(intersects[0].object.name, intersects[0].object.parent.name)
        } else {
            var intersects = scene.children
            for (var i = 0; i < intersects.length; i++) {
                // intersects[i].material.color.set(0x0000ff)
            }
        }
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
                        obj.geometry.dispose();
                        obj.material.dispose();
                        if (obj.texture) obj.texture.dispose();
                    }
                })
            } else {
                mesh.geometry.dispose();
                mesh.material.dispose();
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
    // 增加辅助元素 shouled be add once 
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
        // 混入生命周期
        app.mixin({
            // clear before Create 
            beforeCreate() {
                // clear THREE.scene
                vthree.clear();
            },

        })
    }
}
