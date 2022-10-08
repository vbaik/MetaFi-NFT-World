import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function RoomThreeJs() {
  const scene = new THREE.Scene();
  var scene3d = document.getElementById('scene3d');
  var WIDTH = document.getElementById('scene3d').clientWidth;
  var HEIGHT = document.getElementById('scene3d').clientHeight;

  //   const skyBoxLoader = new THREE.TextureLoader();
  //   const bgTexture = skyBoxLoader.load('https://i.stack.imgur.com/BkeKM.jpg');
  //   scene.background = bgTexture;

  const loader = new GLTFLoader();
  loader.load(
    'https://roomdesigner.blob.core.windows.net/coinexapp/room/scene.gltf',
    function (gltf) {
      const room = gltf.scene.children[0];
      room.traverse((n) => {
        if (n instanceof THREE.Mesh && n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = true;
          if (n.material.map) n.material.map.anisotropy = 16;
        }
      });

      room.userData.ground = true;

      scene.add(room);
      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  loader.load(
    'https://gateway.pinata.cloud/ipfs/QmZvRz38c1WiuSuawN7xsi3ztR2GCqptNhXyTPaKKhYQLd',
    function (gltf) {
      const car = gltf.scene.children[0];
      car.position.z = 0;
      car.position.y = -4;
      car.position.x = 0;
      car.scale.set(0.04, 0.04, 0.04);
      car.userData.draggable = true;
      car.castShadow = true;
      car.userData.name = 'winter-girl';

      car.traverse((n) => {
        if (n instanceof THREE.Mesh && n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = true;
          if (n.material.map) n.material.map.anisotropy = 16;
        }
      });

      scene.add(car);
      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const light = new THREE.SpotLight(0xffa95c, 4);
  light.position.set(-50, 50, 50);
  light.castShadow = true;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024 * 4;
  light.shadow.mapSize.height = 1024 * 4;
  scene.add(light);

  const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
  scene.add(hemiLight);

  const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 2.3;
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  camera.position.z = 20;
  camera.position.y = 5;
  camera.position.x = 2;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;

  const raycaster = new THREE.Raycaster();
  const clickMouse = new THREE.Vector2();
  const moveMouse = new THREE.Vector2();

  let draggable;
  let moveHorizontal = false;
  let moveVertical = false;
  window.addEventListener('click', (event) => {
    if (draggable) {
      draggable = null;
      return;
    }

    clickMouse.x = (event.clientX / WIDTH) * 2 - 1;
    clickMouse.y = -(event.clientY / HEIGHT) * 2 + 1;

    raycaster.setFromCamera(clickMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    found.every((element) => {
      var draggableObject = getDraggable(element.object);
      if (draggableObject !== undefined && draggableObject != null) {
        draggable = draggableObject;
        moveHorizontal = true;
        moveVertical = false;
        console.log('found draggable ' + draggableObject.userData.name);
        return false;
      }
      return true;
    });
  });

  window.addEventListener('contextmenu', (event) => {
    if (draggable) {
      draggable = null;
      moveHorizontal = false;
      moveVertical = false;
      return;
    }

    clickMouse.x = (event.clientX / WIDTH) * 2 - 1;
    clickMouse.y = -(event.clientY / HEIGHT) * 2 + 1;

    raycaster.setFromCamera(clickMouse, camera);
    const found = raycaster.intersectObjects(scene.children);
    found.every((element) => {
      var draggableObject = getDraggable(element.object);
      if (draggableObject !== undefined && draggableObject != null) {
        draggable = draggableObject;
        moveHorizontal = false;
        moveVertical = true;
        console.log('found draggable ' + draggableObject.userData.name);
        return false;
      }
      return true;
    });
  });

  window.addEventListener('mousemove', (event) => {
    moveMouse.x = (event.clientX / WIDTH) * 2 - 1;
    moveMouse.y = -(event.clientY / HEIGHT) * 2 + 1;
  });

  function dragObject() {
    if (draggable != null) {
      raycaster.setFromCamera(moveMouse, camera);
      const found = raycaster.intersectObjects(scene.children);
      found.every((element) => {
        let groundObject = getGround(element.object);
        if (groundObject !== undefined && groundObject != null) {
          console.log('found ground');

          if (moveHorizontal) {
            draggable.position.x = element.point.x;
            draggable.position.z = element.point.z;
          } else {
            draggable.position.y = element.point.y;
          }

          return false;
        }
        return true;
      });
    }
  }

  function getDraggable(sceneObject) {
    if (sceneObject.userData && sceneObject.userData.draggable)
      return sceneObject;

    let temp = sceneObject;
    while (temp.parent != null) {
      temp = temp.parent;

      if (temp.userData && temp.userData.draggable) return temp;
    }

    return null;
  }

  function getGround(sceneObject) {
    if (sceneObject.userData && sceneObject.userData.ground) return sceneObject;

    let temp = sceneObject;
    while (temp.parent != null) {
      temp = temp.parent;

      if (temp.userData && temp.userData.ground) return temp;
    }

    return null;
  }

  function animate() {
    dragObject();

    scene3d.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(animate);
  }

  animate();
}
