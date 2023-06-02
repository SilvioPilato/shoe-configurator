import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, ThreeEvent, useThree } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { useSnapshot } from "valtio"
import state, { ShowItemType } from "../store";
import componentMap, { ShoeComponent } from "../utils/componentMap";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    shoe: THREE.Mesh
    shoe_1: THREE.Mesh
    shoe_2: THREE.Mesh
    shoe_3: THREE.Mesh
    shoe_4: THREE.Mesh
    shoe_5: THREE.Mesh
    shoe_6: THREE.Mesh
    shoe_7: THREE.Mesh
  }
  materials: {
    laces: THREE.MeshStandardMaterial
    mesh: THREE.MeshStandardMaterial
    caps: THREE.MeshStandardMaterial
    inner: THREE.MeshStandardMaterial
    sole: THREE.MeshStandardMaterial
    stripes: THREE.MeshStandardMaterial
    band: THREE.MeshStandardMaterial
    patch: THREE.MeshStandardMaterial
  }
}

export default function Shoe() {
    const object = useGLTF("/shoe-draco.glb") as GLTFResult;
    const ref = useRef<THREE.Group>(null);
    const {nodes} = object;
    const meshes = Object.values(nodes).filter(node => node.type === "Mesh");
    const snap = useSnapshot(state);
    useThree(({camera}) => {
      camera.position.set(0,0,5);
    });
    useFrame((state) => {
      if (!ref.current) return;
      const t = state.clock.getElapsedTime();
      ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20);
      ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    })
    const onSelection = useCallback((name: ShowItemType) => {
      return (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        state.selected = name;
        state.showPicker = true;
      }
    },[])
    const onClickElsewhere = useCallback(() => {
      state.showPicker = false;
    },[])
    return (
      <group
        ref={ref}
        scale={[2,2,2]}
        onPointerMissed={onClickElsewhere}
      >
        <OrbitControls enableZoom={false} enablePan={false} />
        {
          meshes.map((props, index: number) => {
            const name = props.name as ShoeComponent;
            const componentName: ShowItemType = componentMap[name];
            return (
              <mesh
                onClick={onSelection(componentName)}
                key={index}
                geometry = {props.geometry}
                material = {props.material}
                material-color={snap.items[componentName]}
                castShadow
                receiveShadow
              />
            )
          })
        }
      </group>
    )
}