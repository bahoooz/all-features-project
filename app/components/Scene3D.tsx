"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0x0077ff,
      metalness: 0.6,
      roughness: 0.4,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    camera.position.z = 5; // Position initiale un peu plus éloignée

    const animate = () => {
      requestAnimationFrame(animate);

      // Animation rotation
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Calcul de la distance entre la souris et le cube pour ajuster le zoom
      const distX = mousePos.current.x - 0;
      const distY = mousePos.current.y - 0;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Ajustement du zoom basé sur la proximité avec le centre de la scène
      const targetZ = 4 + distance * 4; // Plus le distance est grande, plus la caméra s'éloigne
      camera.position.z += (targetZ - camera.position.z) * 0.1;

      camera.lookAt(cube.position); // Regarde toujours le cube
      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeScene;
