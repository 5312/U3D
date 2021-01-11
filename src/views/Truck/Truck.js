import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const PATH = './src/assets/'
function truck(scene) {
  return new Promise((resolve, reject) => {
    // glb模型
    const loader = new GLTFLoader();
    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(PATH);
    loader.setDRACOLoader(dracoLoader);

    loader.load(

      // resource URL
      PATH + 'Glb/car/car.glb',
      // 加载后
      function (gltf) {
        let arr = gltf.scene.children.splice(1, 2);// 下标0 为汽车
        // 设置模型缩放比例
        gltf.scene.children[0].scale.set(1, 1, 1);
        scene.add(gltf.scene);// 加入场景
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        resolve(gltf)
      },
      // 加载正在进行时调用
      function (xhr) {
        let num = Math.round((xhr.loaded / 26547596 * 100));
        console.log(num + '% loaded');

      },
      // 加载失败
      function (error) {
        console.log(error)
        console.log('An error happened');

      }
    );
  })
}
export default truck;