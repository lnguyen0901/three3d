import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
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
    const objectName = event.object?.name;
    console.log("clicked:", objectName);
    if (objectName) dispatch(toggleObjectSelection({ objectName }));
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
      <Canvas gl={{ alpha: false }} camera={{ position: [-45, 2.5, -5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight color={0xaaaaaa} position={[5, 10, 5]} intensity={2} />
        <directionalLight color={0xaaaaaa} position={[30, 45, 30]} intensity={10} />
        <directionalLight color={0xaaaaaa} position={[30, 45, 30]} intensity={2} />
        {/* Set three.js scene background to black */}
        <color attach="background" args={[0, 0, 0]} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} /> */}
        <Model modelPath={modelPath} />
        <OrbitControls />

        {/* Viewport gizmo: shows orientation in the corner and allows quick reorientation */}
        <GizmoHelper alignment="top-right" margin={[80, 80]}>
          <GizmoViewport labelColor="black">
            {/* Custom axis arrows: X (red), Y (green), Z (blue) */}
            <group position={[0, 0, 0]} scale={0.6}>
              {/* X axis arrow */}
              <group position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <mesh>
                  <cylinderBufferGeometry args={[0.02, 0.02, 0.5, 8]} />
                  <meshBasicMaterial color="red" />
                </mesh>
                <mesh position={[0.3, 0, 0]}>
                  <coneBufferGeometry args={[0.06, 0.12, 8]} />
                  <meshBasicMaterial color="red" />
                </mesh>
              </group>

              {/* Y axis arrow */}
              <group position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
                <mesh>
                  <cylinderBufferGeometry args={[0.02, 0.02, 0.5, 8]} />
                  <meshBasicMaterial color="green" />
                </mesh>
                <mesh position={[0, 0.3, 0]}>
                  <coneBufferGeometry args={[0.06, 0.12, 8]} />
                  <meshBasicMaterial color="green" />
                </mesh>
              </group>

              {/* Z axis arrow */}
              <group position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh>
                  <cylinderBufferGeometry args={[0.02, 0.02, 0.5, 8]} />
                  <meshBasicMaterial color="blue" />
                </mesh>
                <mesh position={[0, 0, 0.3]}>
                  <coneBufferGeometry args={[0.06, 0.12, 8]} />
                  <meshBasicMaterial color="blue" />
                </mesh>
              </group>
            </group>
          </GizmoViewport>
        </GizmoHelper>
      </Canvas>
    </div>
  );
}
