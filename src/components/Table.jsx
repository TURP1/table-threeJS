import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';
import { useConfig } from '../contexts/Configurator';
import { useSnapshot } from 'valtio';

const ANIM_SPEED = 12;

export const Table = ({state, ...props}) => {
  const { nodes } = useGLTF('./models/Table.gltf');
  const { legsType, tableWidth } = useConfig();
  const snap = useSnapshot(state)

  const [hovered, set] = useState(null)

  const plateGeometry = new THREE.BoxGeometry(3, 0.1, 3);
  const plateMaterial = new THREE.MeshStandardMaterial({ metalness: 0.5, roughness: 0, name: 'plate' });
  const legsMaterial = new THREE.MeshStandardMaterial({ metalness: 1, roughness: 1, name: 'legs', opacity: 1 });

  const ref = useRef();
  const plate = useRef();
  const leftLegs = useRef();
  const rightLegs = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10; //levitating

    const targetScale = new THREE.Vector3(tableWidthScale, 1, 1);

    plate.current.scale.lerp(targetScale, delta * ANIM_SPEED);

    const targetLeftPosition = new THREE.Vector3(-1.5 * tableWidthScale, 0, 0);
    leftLegs.current.position.lerp(targetLeftPosition, delta * ANIM_SPEED);


    const targetRightPosition = new THREE.Vector3(1.5 * tableWidthScale, 0, 0);
    rightLegs.current.position.lerp(targetRightPosition, delta * ANIM_SPEED);
  })


  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  const tableWidthScale = tableWidth / 100;

  return (
    <group
      ref={ref}
      position={[0, -0.5, 0]}
      castShadow {...props}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
    >
      <mesh castShadow geometry={plateGeometry} material={plateMaterial} material-color={snap.items.plate} ref={plate} />
      {legsType === 0 && (
        <>
          <mesh castShadow geometry={nodes.Legs01Left.geometry} material={legsMaterial} material-color={snap.items.legs} position={[-1.5, 0, 0]} ref={leftLegs} />
          <mesh castShadow geometry={nodes.Legs01Right.geometry} material={legsMaterial} material-color={snap.items.legs} position={[1.5, 0, 0]} ref={rightLegs} />
        </>
      )}

      {legsType === 1 && (
        <>
          <mesh castShadow geometry={nodes.Legs02Left.geometry} material={legsMaterial} material-color={snap.items.legs} position={[-1.5, 0, 0]} ref={leftLegs} />
          <mesh castShadow geometry={nodes.Legs02Right.geometry} material={legsMaterial} material-color={snap.items.legs} position={[1.5, 0, 0]} ref={rightLegs} />
        </>
      )}

      {legsType === 2 && (
        <>
          <mesh castShadow geometry={nodes.Legs03Left.geometry} material={legsMaterial} material-color={snap.items.legs} position={[-1.5, 0, 0]} ref={leftLegs} />
          <mesh castShadow geometry={nodes.Legs03Right.geometry} material={legsMaterial} material-color={snap.items.legs} position={[1.5, 0, 0]} ref={rightLegs} />
        </>
      )}
    </group>
  )
}

useGLTF.preload('./models/Table.gltf')