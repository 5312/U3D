

import * as THREE from '//techbrood.com/threejs/build/three.module.js';

import Stats from '//techbrood.com/threejs/examples/jsm/libs/stats.module.js';
import { GUI } from '//techbrood.com/threejs/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from '//techbrood.com/threejs/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from '//techbrood.com/threejs/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer } from '//techbrood.com/threejs/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '//techbrood.com/threejs/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '//techbrood.com/threejs/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from '//techbrood.com/threejs/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from '//techbrood.com/threejs/examples/jsm/shaders/FXAAShader.js';

var container, stats;
var camera, scene, renderer, controls;
var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();
var selectedObjects = [];

var composer, effectFXAA, outlinePass;
var obj3d = new THREE.Object3D();

var group = new THREE.Group();

var params = {
  edgeStrength: 3.0,
  edgeGlow: 0.0,
  edgeThickness: 1.0,
  pulsePeriod: 0,
  rotate: false,
  usePatternTexture: false
};

// Init gui

var gui = new GUI({ width: 300 });

gui.add(params, 'edgeStrength', 0.01, 10).onChange(function (value) {

  outlinePass.edgeStrength = Number(value);

});

gui.add(params, 'edgeGlow', 0.0, 1).onChange(function (value) {

  outlinePass.edgeGlow = Number(value);

});

gui.add(params, 'edgeThickness', 1, 4).onChange(function (value) {

  outlinePass.edgeThickness = Number(value);

});

gui.add(params, 'pulsePeriod', 0.0, 5).onChange(function (value) {

  outlinePass.pulsePeriod = Number(value);

});

gui.add(params, 'rotate');

gui.add(params, 'usePatternTexture').onChange(function (value) {

  outlinePass.usePatternTexture = value;

});

var Configuration = function () {

  this.visibleEdgeColor = '#ffffff';
  this.hiddenEdgeColor = '#190a05';

};

var conf = new Configuration();

gui.addColor(conf, 'visibleEdgeColor').onChange(function (value) {

  outlinePass.visibleEdgeColor.set(value);

});

gui.addColor(conf, 'hiddenEdgeColor').onChange(function (value) {

  outlinePass.hiddenEdgeColor.set(value);

});

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  var width = window.innerWidth;
  var height = window.innerHeight;

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  // todo - support pixelRatio in this demo
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 8);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 20;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  //

  scene.add(new THREE.AmbientLight(0xaaaaaa, 0.2));

  var light = new THREE.DirectionalLight(0xddffdd, 0.6);
  light.position.set(1, 1, 1);

  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  var d = 10;

  light.shadow.camera.left = - d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = - d;

  light.shadow.camera.far = 1000;

  scene.add(light);

  // model

  var manager = new THREE.LoadingManager();

  manager.onProgress = function (item, loaded, total) {

    console.log(item, loaded, total);

  };

  var loader = new OBJLoader(manager);
  loader.load('//techbrood.com/threejs/examples/models/obj/tree.obj', function (object) {

    var scale = 1.0;

    object.traverse(function (child) {

      if (child instanceof THREE.Mesh) {

        child.geometry.center();
        child.geometry.computeBoundingSphere();
        scale = 0.2 * child.geometry.boundingSphere.radius;

        var phongMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, shininess: 5 });
        child.material = phongMaterial;
        child.receiveShadow = true;
        child.castShadow = true;

      }

    });

    object.position.y = 1;
    object.scale.divideScalar(scale);
    obj3d.add(object);

  });

  scene.add(group);

  group.add(obj3d);

  //

  var geometry = new THREE.SphereBufferGeometry(3, 48, 24);

  for (var i = 0; i < 20; i++) {

    var material = new THREE.MeshLambertMaterial();
    material.color.setHSL(Math.random(), 1.0, 0.3);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 4 - 2;
    mesh.position.y = Math.random() * 4 - 2;
    mesh.position.z = Math.random() * 4 - 2;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.scale.multiplyScalar(Math.random() * 0.3 + 0.1);
    group.add(mesh);

  }

  var floorMaterial = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });

  var floorGeometry = new THREE.PlaneBufferGeometry(12, 12);
  var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.rotation.x -= Math.PI * 0.5;
  floorMesh.position.y -= 1.5;
  group.add(floorMesh);
  floorMesh.receiveShadow = true;

  var geometry = new THREE.TorusBufferGeometry(1, 0.3, 16, 100);
  var material = new THREE.MeshPhongMaterial({ color: 0xffaaff });
  var torus = new THREE.Mesh(geometry, material);
  torus.position.z = - 4;
  group.add(torus);
  torus.receiveShadow = true;
  torus.castShadow = true;

  //

  stats = new Stats();
  container.appendChild(stats.dom);

  // postprocessing

  composer = new EffectComposer(renderer);

  var renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
  composer.addPass(outlinePass);

  var onLoad = function (texture) {

    outlinePass.patternTexture = texture;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

  };

  var loader = new THREE.TextureLoader();

  loader.load('//techbrood.com/threejs/examples/textures/tri_pattern.jpg', onLoad);

  effectFXAA = new ShaderPass(FXAAShader);
  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  composer.addPass(effectFXAA);

  window.addEventListener('resize', onWindowResize, false);

  renderer.domElement.addEventListener('mousedown', onTouchMove);
  window.addEventListener('touchmove', onTouchMove);

  function onTouchMove(event) {

    var x, y;

    if (event.changedTouches) {

      x = event.changedTouches[0].pageX;
      y = event.changedTouches[0].pageY;

    } else {

      x = event.clientX;
      y = event.clientY;

    }

    mouse.x = (x / window.innerWidth) * 2 - 1;
    mouse.y = - (y / window.innerHeight) * 2 + 1;

    checkIntersection();

  }

  function addSelectedObject(object) {

    selectedObjects = [];
    selectedObjects.push(object);

  }

  function checkIntersection() {

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects([scene], true);

    if (intersects.length > 0) {

      var selectedObject = intersects[0].object;
      addSelectedObject(selectedObject);
      outlinePass.selectedObjects = selectedObjects;

    } else {

      // outlinePass.selectedObjects = [];

    }

  }

}

function onWindowResize() {

  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width, height);

  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);

  stats.begin();

  var timer = performance.now();

  if (params.rotate) {

    group.rotation.y = timer * 0.0001;

  }

  controls.update();

  composer.render();

  stats.end();

}

