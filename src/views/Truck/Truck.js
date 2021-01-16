import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const PATH = './src/assets/';

const dele = (scene, node, name) => {
  for (let i = 0; i < node.length; i++) {
    const element = node[i];
    // 父元素对象
    const parentNode = scene.getObjectByName(element);

    for (let i = 0; i < name.length; i++) {
      const element1 = name[i];

      // 删除无用对象
      let obj = parentNode.getObjectByName(element1);
      if (!obj) continue;
      obj.geometry.dispose();
      obj.material.dispose();
      parentNode.remove(obj);
    }
  }


}

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
        // 设置模型缩放比例
        const Aston = gltf.scene.getObjectByName("Aston_Martin_Vantage")
        Aston.scale.set(0.5, 0.5, 0.5)
        // 父元素
        const parent = ["Tires", "Disc_Brake"]
        const name = ["ID103", 'gum94001', 'gum34001', 'gum34002', 'silver2002', 'silver2001', 'gum94002', 'silver04001', 'gum95002', 'gum35002', 'gum35001', 'gum95001', 'silver3002', 'silver3001', "silver04002", 'gum170002', 'gum170001', 'chrome03001', 'chrome03002']

        dele(gltf.scene, parent, name)


        let obj = gltf.scene.getObjectByName('Plane');
        obj.geometry.dispose();
        obj.material.dispose();
        gltf.scene.remove(obj)

        //设置纹理，颜色,,在无光线环境下
        // gltf.scene.traverse(function (child) {
        //   if (child.isMesh) {
        //     child.material.emissive = child.material.color;
        //     child.material.emissiveMap = child.material.map;
        //   }
        // });
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        scene.add(gltf.scene);// 加入场景
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