import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
const main = function (element, callback) {
    // 场景
    var scene = new THREE.Scene();
    // 创建相机Camera
    let wrap = element.parentNode;
    var camera = new THREE.PerspectiveCamera(75, wrap.clientWidth / wrap.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 900);

    // 创建渲染器Renderer
    var renderer = new THREE.WebGLRenderer({
        antialias: true, // 是否执行抗锯齿
        canvas: element,
        preserveDrawingBuffer: true,
    }); // 创建渲染器
    renderer.setSize(wrap.clientWidth, wrap.clientHeight); // 设置画布大小
    renderer.setClearColor('#244780', 1); // 设置默认背景色
    callback(scene) //需要将物品添加入场景
    //角度
    let rot = 0;
    //星空
    function init() {
        // フォグを作成
        scene.fog = new THREE.Fog(0xaaaaaa, 1, 3000);
        // 形状データを作成
        const geometry = new THREE.Geometry();
        console.log(geometry)
        for (let i = 0; i < 10000; i++) {
            const star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(2000);
            star.y = THREE.Math.randFloatSpread(2000);
            star.z = THREE.Math.randFloatSpread(2000);

            geometry.vertices.push(star)
        }

        // マテリアルを作成
        const material = new THREE.PointsMaterial({
            color: 0xffffff
        });
        const starField = new THREE.Points(geometry, material);
        scene.add(starField);
    }
    init();
    // 渲染函数
    function render() {

        TWEEN.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render()

    window.addEventListener("resize", onResize);

    function onResize() {

        const width = wrap.clientWidth;
        const height = wrap.clientHeight;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    onResize();
    // 创建视图控制器OrbitControls，鼠标控制
    var controls = new OrbitControls(camera, element);
    controls.addEventListener('change', render);
    controls.enablePan = true; //右键拖拽
}
export default main;
