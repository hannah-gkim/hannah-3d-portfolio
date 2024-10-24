"use client";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";

const RenderModel = ({ children, className }) => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");

    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Rendering paused.");
      // You can trigger a message, retry, or attempt a re-render here if needed
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored. Rendering resumed.");
      // You can reinitialize or refresh the scene here if necessary
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener(
      "webglcontextrestored",
      handleContextRestored,
      false
    );

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, []);

  return (
    <Canvas
      className={clsx("w-screen h-screen -z-10 relative", className)}
      shadows={false}
      dpr={[1, 2]}
      // dpr is the device pixel ratio. Here we are setting it to 1 and 2 for retina displays to prevent blurriness in the model rendering on high resolution screens.
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
};

export default RenderModel;
