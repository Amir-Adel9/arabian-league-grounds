'use client';
import React, { useEffect, useRef } from 'react';
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Object3D,
  Mesh,
  DirectionalLight,
  MeshStandardMaterial,
  CubeTextureLoader,
  Vector3,
  Raycaster,
  Vector2,
  CubeRefractionMapping,
  Euler,
} from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as TWEEN from '@tweenjs/tween.js';

export default function STLViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef<Vector2>(new Vector2());
  const raycasterRef = useRef<Raycaster>(new Raycaster());
  const isHoveredRef = useRef<boolean>(false);
  const rotationTweenRef = useRef<TWEEN.Tween<Euler> | null>(null);
  const scaleTweenRef = useRef<TWEEN.Tween<Vector3> | null>(null);

  useEffect(() => {
    let camera: PerspectiveCamera;

    const init = () => {
      // Create the scene
      const scene = new Scene();
      sceneRef.current = scene;

      // Create the camera
      camera = new PerspectiveCamera(
        45,
        containerRef.current!.clientWidth / containerRef.current!.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 30;
      camera.lookAt(new Vector3()); // Look at the center of the scene

      // Create the renderer
      const renderer = new WebGLRenderer({ antialias: true });
      renderer.setSize(
        containerRef.current!.clientWidth,
        containerRef.current!.clientHeight
      );
      rendererRef.current = renderer;
      containerRef.current?.appendChild(renderer.domElement);

      // Add a directional light
      const light = new DirectionalLight(0xffffff, 1);
      light.position.set(0, 1, 0);
      scene.add(light);

      // Load and add the STL file to the scene
      const loader = new STLLoader();
      loader.load('/al_logo.stl', (geometry) => {
        // Adjust the position and scale of the mesh
        const material = new MeshStandardMaterial({
          color: 0xffffff, // Set the material color to white
          metalness: 0.8,
          roughness: 0.2,
        });
        const mesh = new Mesh(geometry, material);
        mesh.position.set(0, 0, 0); // Adjust the position if necessary
        mesh.scale.set(0.13, 0.13, 0.13); // Adjust the initial scale to make it smaller

        scene.add(mesh);
        meshRef.current = mesh;

        // Load and set environment map for better reflection and illumination
        const cubeTextureLoader = new CubeTextureLoader();
        const environmentMap = cubeTextureLoader.load([
          '/path/to/environment_map_1.jpg',
          '/path/to/environment_map_2.jpg',
          '/path/to/environment_map_3.jpg',
          '/path/to/environment_map_4.jpg',
          '/path/to/environment_map_5.jpg',
          '/path/to/environment_map_6.jpg',
        ]);
        environmentMap.mapping = CubeRefractionMapping; // Use CubeRefractionMapping for more realistic reflections
        scene.background = environmentMap;

        // Add event listeners for mouse events
        containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
        containerRef.current?.addEventListener('mouseleave', handleMouseLeave);
        containerRef.current?.addEventListener('mousemove', handleMouseMove);

        // Start the animation loop
        animate();
      });
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;

      // Start the scale-up animation if not already running
      if (!scaleTweenRef.current && meshRef.current) {
        scaleTweenRef.current = new TWEEN.Tween(meshRef.current.scale)
          .to({ x: 0.16, y: 0.16, z: 0.16 }, 300)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;

      // Start the scale-down animation if not already running
      if (scaleTweenRef.current && meshRef.current) {
        scaleTweenRef.current.stop();
        scaleTweenRef.current = null;

        scaleTweenRef.current = new TWEEN.Tween(meshRef.current.scale)
          .to({ x: 0.13, y: 0.13, z: 0.13 }, 300) // Adjust the original scale as needed
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(() => {
            scaleTweenRef.current = null; // Reset the scaleTweenRef
          })
          .start();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate the mouse position relative to the container
      const rect = containerRef.current!.getBoundingClientRect();
      const containerX = event.clientX - rect.left;
      const containerY = event.clientY - rect.top;

      // Update the mouse position
      mouseRef.current.x =
        (containerX / containerRef.current!.clientWidth) * 2 - 1;
      mouseRef.current.y =
        -(containerY / containerRef.current!.clientHeight) * 2 + 1;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the mesh if hovered
      if (isHoveredRef.current && meshRef.current) {
        if (!rotationTweenRef.current) {
          rotationTweenRef.current = new TWEEN.Tween(meshRef.current.rotation)
            .to({ y: meshRef.current.rotation.y + Math.PI * 2 }, 2000)
            .repeat(Infinity)
            .start();
        }
      } else if (!isHoveredRef.current && meshRef.current) {
        // Reset the rotation
        if (rotationTweenRef.current) {
          rotationTweenRef.current.stop();
          rotationTweenRef.current = null;
          meshRef.current.rotation.set(0, 0, 0); // Reset the rotation to zero
        }
      }

      // Update the TWEEN animations
      TWEEN.update();

      // Render the scene
      if (sceneRef.current && camera && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
    };

    init();

    return () => {
      // Clean up Three.js objects
      sceneRef.current?.traverse((object: Object3D) => {
        if (object instanceof Mesh) {
          const mesh = object as Mesh;
          const materials =
            mesh.material instanceof Array ? mesh.material : [mesh.material];
          materials.forEach((material) => {
            material.dispose();
          });
          mesh.geometry.dispose();
        }
      });

      containerRef.current?.removeChild(rendererRef.current?.domElement!);
      rendererRef.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '400px', height: '300px', overflow: 'hidden' }}
    />
  );
}
