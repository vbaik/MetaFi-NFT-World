/* eslint-disable */

import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
// import { Model } from './utils';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';

const Model = () => {
  const gltf = useLoader(
    GLTFLoader,
    'https://roomdesigner.blob.core.windows.net/coinexapp/room/scene.gltf'
  );
  return (
    <>
      <primitive object={gltf.scene} scale={0.3} />
    </>
  );
};

export default function Room() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model />
        <OrbitControls enableZoom={false} />
        <Environment preset='sunset' background />
      </Suspense>
    </Canvas>
  );

  //********************************
  // return (
  //   <Canvas camera={{ position: [-10, 10, 40], fov: 50 }}>
  //     <hemisphereLight color='white' groundColor='blue' intensity={0.75} />
  //     <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
  //     <group position={[0, -10, 0]}>
  //       <Model position={[0, 0.25, 0]} url='3d-models/room.glb' />
  //       <ContactShadows scale={20} blur={10} far={20} />
  //     </group>
  //     <OrbitControls />
  //   </Canvas>
  // );
  //********************************
}

// export function Model({ url, ...props }) {
//   const { scene } = useGLTF(url);
//   return <primitive object={scene} {...props} />;
// }

useGLTF.preload('3d-models/room.glb');
