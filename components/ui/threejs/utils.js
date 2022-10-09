/* eslint-disable */
import { useGLTF } from '@react-three/drei';
import { useBounds } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds } from '@react-three/drei';

export function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}

export function SelectToZoom({ children }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
}

export function LoadNft3dObject({ url }) {
  return (
    <Canvas camera={{ position: [2, -3, 3], fov: 50 }}>
      <hemisphereLight color='white' groundColor='blue' intensity={0.75} />
      <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
      <Bounds fit clip observe margin={1.2}>
        <SelectToZoom>
          <Model position={[0, 0.25, 0]} url={url} />
        </SelectToZoom>
      </Bounds>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  );
}
