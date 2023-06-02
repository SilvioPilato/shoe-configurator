import { OrbitControls, useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame, ThreeEvent } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { useSnapshot } from "valtio"
import state, { ShowItemType } from "../store";
import componentMap, { ShoeComponent } from "../utils/componentMap";

export default function Shoe() {
    const object = useGLTF("/shoe-draco.glb");
    const ref = useRef<ThreeElements["group"]>();
    const {nodes} = object;
    const meshes = Object.values(nodes).filter(node => node.type === "Mesh");
    const snap = useSnapshot(state);
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
        rotation={[0, -Math.PI / 4,0]}
        scale={[2,2,2]}
        onPointerMissed={onClickElsewhere}
      >
        <OrbitControls enableZoom={false} enablePan={false} />
        {
          meshes.map((props: any, index: number) => {
            const name = props.name as ShoeComponent;
            const componentName: ShowItemType = componentMap[name];
            return (
              <mesh
                onClick={onSelection(props.name)}
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