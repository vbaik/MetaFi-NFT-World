/* eslint-disable */
import { useOwnedNfts } from 'components/hooks/web3';
import * as THREE from 'three';
import { MathUtils } from 'three';

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
  const gltf = useLoader(GLTFLoader, '/3d-models/tropical_island.glb');
  return (
    <>
      <primitive object={gltf.scene} scale={0.9} position={[0, -1.3, 0]} />
    </>
  );
};
const url2 =
  'https://gateway.pinata.cloud/ipfs/QmWxY6RwZtrs2ErxrMG71DFLqciozgJsWSxRrxoq5Fhs3U';

export const Model2 = ({ url, position, rotation }) => {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <>
      <primitive
        object={gltf.scene}
        scale={0.45}
        position={position}
        rotation={rotation}
      />
    </>
  );
};

export default function Room() {
  const { nfts } = useOwnedNfts();
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model />
        {nfts.data.length > 0 ? (
          nfts.data.map((nft) => {
            return nft.meta.image !== undefined ? (
              <Model2
                key={nft.meta.image}
                position={[
                  MathUtils.randFloat(-5, 3),
                  -0.7,
                  MathUtils.randFloat(-2, 2),
                ]}
                rotation={[0, MathUtils.randFloat(-2, 2), 0]}
                url={nft.meta.image}
              />
            ) : (
              <></>
            );
          })
        ) : (
          <></>
        )}
        <OrbitControls enableZoom={false} />
        <Environment preset='dawn' background />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('3d-models/room.glb');
