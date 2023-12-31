 

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc2/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 2.2 : 2}
        position={isMobile ? [-6, -5.1, -2.2] : [-2, -3, -1.5]}
        rotation={[0, 0.7, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
 
    const mediaQuery = window.matchMedia("(max-width: 767px)");
 
    setIsMobile(mediaQuery.matches);

   
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
 
    mediaQuery.addEventListener("change", handleMediaQueryChange);
 
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
      {!isMobile &&
      <OrbitControls
  enableZoom={false }
  maxPolarAngle={ Math.PI / 2}
  minPolarAngle={  Math.PI / 2}
/>
      }
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
