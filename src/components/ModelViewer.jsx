import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { toggleObjectSelection } from "../redux/store";
import * as THREE from "three";

const highlightMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const defaultMaterial = new THREE.MeshStandardMaterial({ color: "white" });

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const selectedObjects = useSelector((state) => state.selection.selectedObjects);
  const dispatch = useDispatch();
  const handleMeshClick = (event) => {
    event.stopPropagation();
    const objectName = event.object.name;
    dispatch(toggleObjectSelection({ objectName }));
  };

  // Clone the scene and update materials on the clone so we don't mutate the original GLTF
  const clonedScene = useMemo(() => {
    const copy = scene.clone(true);
    copy.traverse((child) => {
      if (child.isMesh) {
        if (selectedObjects.includes(child.name)) {
          child.material = highlightMaterial;
        } else {
          child.material = defaultMaterial;
        }
        // Ensure the mesh can receive pointer events
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return copy;
  }, [scene, selectedObjects]);

  // Recursively render the cloned scene so react-three-fiber can attach event handlers to meshes
  const renderObject = (obj) => {
    const children = obj.children || [];
    return (
      <primitive
        key={obj.uuid}
        object={obj}
        onClick={obj.isMesh ? handleMeshClick : undefined}
      >
        {children.map((c) => renderObject(c))}
      </primitive>
    );
  };

  return renderObject(clonedScene);
}

export default function ModelViewer({ modelPath }) {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model modelPath={modelPath} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
