import { Canvas } from "@react-three/fiber";
import { Interface } from "./components/Interface";
import { Center, ContactShadows, OrbitControls } from "@react-three/drei";
import { useConfig } from "./contexts/Configurator";

import { proxy } from "valtio";
import { button, useControls } from "leva";
import { Table } from "./components/Table";
import { Picker } from "./components/Picker";

const state = proxy({
  current: null,
  items: { plate: "grey", legs: "black" },
});

function Experience() {
  const { legsType, legsColor } = useConfig();

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight intensity={4} position={[2, 1, 1]} />
      <Center top>
        <Table state={state} />
      </Center>
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.65}
        scale={40}
        blur={1}
        far={9} />
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2} />
    </>
  );
};


function App() {
  useControls({
    screenshot: button(() => {
      const link = document.createElement('a')
      link.setAttribute('download', 'canvas.png')
      link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
      link.click()
    })
  })
  return (
    <>
      <Picker state={state}/>
      <Canvas gl={{ antialias: false, preserveDrawingBuffer: true }} shadows camera={{ position: [8, 4, 12], fov: 35 }}>
        <Experience />
      </Canvas>
      <Interface />
    </>
  );
}



export default App;
