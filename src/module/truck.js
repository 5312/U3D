
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
const PATH = './src/module/OBJ/'
//创建MTL加载器//纹理文件
var mtlLoader = new MTLLoader();

function truck(scene) {
  return new Promise((resolve, reject) => {
    //加载mtl文件
    mtlLoader.load(PATH + 'Isuzu.mtl', function (mtl) {
      //创建OBJ加载器
      // material.preload();
      var objLoader = new OBJLoader();

      objLoader.setMaterials(mtl);

      objLoader.load(PATH + "Isuzu.obj", function (object) {
        //object.children[0].material = material
        //设置模型缩放比例
        object.scale.set(40, 40, 40);
        //设置模型的坐标
        object.position.set(850, 0, 0);
        //PI属性就是π,还表示了弧度π = 180°,Math.PI = 3.14 = 180°
        var Y90 = -Math.PI * 0.5;
        var X90 = Math.PI * 0.5;
        object.rotation.set(X90, Y90, 0);//旋转角度

        scene.add(object)

        resolve(object)
      });

    });
  })
};
export default truck;