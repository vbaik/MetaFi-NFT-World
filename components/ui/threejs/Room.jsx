/* eslint-disable */
import { useOwnedNfts } from 'components/hooks/web3';
import * as THREE from 'three';
import { useEffect, useContext } from 'react';
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
import { SpawnedItemContext } from 'pages/profile';

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
const url2 =
  'https://gateway.pinata.cloud/ipfs/QmWxY6RwZtrs2ErxrMG71DFLqciozgJsWSxRrxoq5Fhs3U';

export const Model2 = ({ url }) => {
  // const url = useContext(SpawnedItemContext);
  console.log('******', url);
  const gltf = useLoader(GLTFLoader, url);

  return (
    <>
      <primitive object={gltf.scene} scale={0.3} position={[3.2, 0, 2]} />
    </>
  );
};

export default function Room() {
  const { nfts } = useOwnedNfts();
  console.log(':)', nfts);
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model />
        {nfts.data.length > 0 ? (
          nfts.data.map((nft) =>
            nft.meta.image !== undefined ? (
              <Model2 key={nft.meta.image} url={nft.meta.image} />
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
        {/* <Model2 /> */}
        <OrbitControls enableZoom={false} />
        <Environment preset='dawn' background />
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
