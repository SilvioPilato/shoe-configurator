import { Canvas } from "@react-three/fiber";
import { Picker } from "./components/Picker";
import Shoe from "./components/Shoe";
import { ContactShadows, Environment } from "@react-three/drei";

export default function App() {
  return (
    <>
      <Canvas shadows>
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <ambientLight intensity={0.1} />
          <Environment near={1} far={1000} resolution={256} files={"environment.hdr"} />
          <Shoe />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2} far={3} /> 
      </Canvas>
      <Picker />
    </>
  )
}
