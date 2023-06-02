import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Picker } from "./components/Picker";
import Shoe from "./components/Shoe";

export default function App() {
  return (
    <>
      <Canvas>
        <Environment preset="city" /> 
        <Shoe />
      </Canvas>
      <Picker />
    </>
  )
}
