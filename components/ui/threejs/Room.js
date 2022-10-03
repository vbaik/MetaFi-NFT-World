import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei';

export default function Room() {
  return (
    <Canvas camera={{ position: [-10, 10, 40], fov: 50 }}>
      <hemisphereLight color='white' groundColor='blue' intensity={0.75} />
      <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
      <group position={[0, -10, 0]}>
        <Model position={[0, 0.25, 0]} url='3d-models/room.glb' />
        <ContactShadows scale={20} blur={10} far={20} />
      </group>
      <OrbitControls />
    </Canvas>
  );
}

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}

useGLTF.preload('3d-models/room.glb');
