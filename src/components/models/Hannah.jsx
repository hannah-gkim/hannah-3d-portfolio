"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const Hannah = React.memo(function Hannah(props) {
  const texture = useTexture("/models/hannah.png");
  const modelRef = useRef();

  useFrame((state) => {
    modelRef.current.position.y =
      -1.5 + Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <group {...props} dispose={null} ref={modelRef}>
      <mesh position={[0, 1.5, 0]}>
        <planeGeometry args={[2.8, 4.3]} />{" "}
        <meshBasicMaterial map={texture} transparent={true} alphaTest={0.5} />
      </mesh>
    </group>
  );
});

export default Hannah;
