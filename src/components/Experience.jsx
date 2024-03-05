import { Center, ContactShadows, OrbitControls } from "@react-three/drei";
import { Table } from "./Table";
import { useConfig } from "../contexts/Configurator";

export const Experience = () => {
  const { legsType } = useConfig();

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight intensity={4} position={[2, 1, 1]} />
      <Center top>
        <Table />
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
