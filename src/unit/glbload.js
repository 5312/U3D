import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const PATH = './src/assets/';

// 模型的颜色 在无光线有时是黑色
function lights(gltf) {
  // 设置纹理，颜色,, 在无光线环境下
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.material.emissive = child.material.color;
      child.material.emissiveMap = child.material.map;
    }
  });
}
async function load({ url, light = true }) {
  // glb模型
  const loader = new GLTFLoader();
  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(PATH);
  loader.setDRACOLoader(dracoLoader);

  return new Promise((resolve, reject) => {
    loader.load(PATH + url,
      function (gltf) {
        if (light) lights(gltf);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        resolve(gltf)
        // scene.add(gltf.scene);// 加入场景
      },
      // 加载正在进行时调用
      function (xhr) {
        let num = Math.round((xhr.loaded / 26547596 * 100));
        console.log(num + '% loaded');
      },
      // 加载失败
      function (error) {
        reject(error)
        console.log(error)
        console.log('An error happened');
      }
    );
  })

}
export default load;