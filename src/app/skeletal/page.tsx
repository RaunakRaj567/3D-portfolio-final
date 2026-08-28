"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface SkeletalNode {
  id: number;
  position: THREE.Vector3;
  color: THREE.Color;
  mesh: THREE.Mesh;
  ringMesh: THREE.Mesh;
  targetScale: number;
  originalColor: THREE.Color;
  type: "node" | "back";
  label?: string;
}

export default function SkeletalPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // Slate 950 deep space color
    scene.fog = new THREE.FogExp2(0x020617, 0.08);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const defaultCamPos = new THREE.Vector3(0, 0, 8);
    const targetCameraPosition = defaultCamPos.clone();
    const tempCameraPosition = defaultCamPos.clone();
    camera.position.copy(defaultCamPos);

    const defaultLookAt = new THREE.Vector3(0, 0, 0);
    const targetLookAt = defaultLookAt.clone();
    const currentLookAt = defaultLookAt.clone();

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const centralLight = new THREE.PointLight(0xffffff, 1.5, 20);
    centralLight.position.set(0, 0, 0);
    scene.add(centralLight);

    const spotlight1 = new THREE.SpotLight(0x8b5cf6, 4, 15, Math.PI / 4, 0.5, 1);
    spotlight1.position.set(5, 5, 5);
    scene.add(spotlight1);

    const spotlight2 = new THREE.SpotLight(0x06b6d4, 4, 15, Math.PI / 4, 0.5, 1);
    spotlight2.position.set(-5, -5, 5);
    scene.add(spotlight2);

    // --- Groups for Rotation ---
    const skeletonGroup = new THREE.Group();
    scene.add(skeletonGroup);

    // --- Nodes Setup ---
    const nodes: SkeletalNode[] = [];
    const interactiveMeshes: THREE.Object3D[] = [];

    const nodePositions = [
      { id: 0, pos: new THREE.Vector3(0, 0, 0), color: 0x06b6d4 }, // Center: Cyan
      { id: 1, pos: new THREE.Vector3(2, 1.5, -1), color: 0xf43f5e }, // Top Right: Rose
      { id: 2, pos: new THREE.Vector3(-2, 1.5, 1), color: 0x8b5cf6 }, // Top Left: Purple
      { id: 3, pos: new THREE.Vector3(1.8, -1.8, 1), color: 0x10b981 }, // Bottom Right: Emerald
      { id: 4, pos: new THREE.Vector3(-1.8, -1.8, -1), color: 0xf59e0b }, // Bottom Left: Amber
      { id: 5, pos: new THREE.Vector3(0, 2.5, 0.5), color: 0x6366f1 }, // Top Spine: Indigo
    ];

    nodePositions.forEach((np) => {
      // 1. Core Sphere
      const sphereGeo = new THREE.SphereGeometry(0.28, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: np.color,
        emissive: np.color,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.position.copy(np.pos);
      skeletonGroup.add(mesh);
      interactiveMeshes.push(mesh);

      // 2. Rotating Outer Ring
      const ringGeo = new THREE.RingGeometry(0.38, 0.44, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: np.color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(np.pos);
      // Random initial rotations
      ringMesh.rotation.x = Math.random() * Math.PI;
      ringMesh.rotation.y = Math.random() * Math.PI;
      skeletonGroup.add(ringMesh);

      nodes.push({
        id: np.id,
        position: np.pos,
        color: new THREE.Color(np.color),
        mesh,
        ringMesh,
        targetScale: 1.0,
        originalColor: new THREE.Color(np.color),
        type: "node",
      });
    });

    // --- Bones (Connections) Setup ---
    const connections = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], // Center links
      [1, 5], [2, 5], // Top links
      [1, 3], [2, 4], // Side links
      [3, 4] // Bottom link
    ];

    const bones: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>[] = [];

    const createBone = (p1: THREE.Vector3, p2: THREE.Vector3, colorVal: number) => {
      const direction = new THREE.Vector3().subVectors(p2, p1);
      const length = direction.length();
      
      const cylinderGeo = new THREE.CylinderGeometry(0.035, 0.035, length, 8);
      const cylinderMat = new THREE.MeshStandardMaterial({
        color: colorVal,
        emissive: colorVal,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.35,
        roughness: 0.5,
      });
      const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);

      // Align cylinder to the connecting nodes vector
      const up = new THREE.Vector3(0, 1, 0);
      cylinderMesh.quaternion.setFromUnitVectors(up, direction.clone().normalize());
      cylinderMesh.position.copy(p1).add(direction.clone().multiplyScalar(0.5));

      skeletonGroup.add(cylinderMesh);
      bones.push(cylinderMesh);
    };

    connections.forEach(([n1Index, n2Index]) => {
      const n1 = nodes.find((n) => n.id === n1Index);
      const n2 = nodes.find((n) => n.id === n2Index);
      if (n1 && n2) {
        // Average connection color
        const avgColor = n1.color.clone().add(n2.color).multiplyScalar(0.5);
        createBone(n1.position, n2.position, avgColor.getHex());
      }
    });

    // --- 3D Back Button Setup (Rendered in WebGL) ---
    const backButtonPos = new THREE.Vector3(-3.5, 2.5, 0);
    const backBtnCoreGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const backBtnCoreMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Red
      emissive: 0xef4444,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0, // Hidden initially
    });
    const backBtnCore = new THREE.Mesh(backBtnCoreGeo, backBtnCoreMat);
    backBtnCore.position.copy(backButtonPos);
    scene.add(backBtnCore);
    interactiveMeshes.push(backBtnCore);

    const backBtnRingGeo = new THREE.RingGeometry(0.24, 0.3, 32);
    const backBtnRingMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0, // Hidden initially
      side: THREE.DoubleSide,
    });
    const backBtnRing = new THREE.Mesh(backBtnRingGeo, backBtnRingMat);
    backBtnRing.position.copy(backButtonPos);
    scene.add(backBtnRing);

    const backNode: SkeletalNode = {
      id: 99,
      position: backButtonPos,
      color: new THREE.Color(0xef4444),
      mesh: backBtnCore,
      ringMesh: backBtnRing,
      targetScale: 1.0,
      originalColor: new THREE.Color(0xef4444),
      type: "back",
    };
    nodes.push(backNode);

    // --- Dust Particles Background ---
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      speeds[i / 3] = 0.002 + Math.random() * 0.005;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- Click Burst Particles Setup ---
    const burstCount = 80;
    const burstGeometry = new THREE.BufferGeometry();
    const burstPositions = new Float32Array(burstCount * 3);
    const burstVelocities: THREE.Vector3[] = [];
    const burstColors = new Float32Array(burstCount * 3);

    for (let i = 0; i < burstCount; i++) {
      burstVelocities.push(new THREE.Vector3(0, 0, 0));
    }

    burstGeometry.setAttribute("position", new THREE.BufferAttribute(burstPositions, 3));
    burstGeometry.setAttribute("color", new THREE.BufferAttribute(burstColors, 3));
    
    const burstMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0,
    });
    const burstPoints = new THREE.Points(burstGeometry, burstMaterial);
    scene.add(burstPoints);

    let burstLife = 0;
    const triggerClickBurst = (position: THREE.Vector3, color: THREE.Color) => {
      burstLife = 1.0;
      burstMaterial.opacity = 1.0;
      
      const posArray = burstGeometry.attributes.position.array as Float32Array;
      const colorArray = burstGeometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < burstCount; i++) {
        const i3 = i * 3;
        // Position at clicked point
        posArray[i3] = position.x;
        posArray[i3 + 1] = position.y;
        posArray[i3 + 2] = position.z;
        
        // Random velocity outwards (spherical explosion)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = 0.05 + Math.random() * 0.08;

        burstVelocities[i].set(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        );

        // Particle color slightly randomized around node color
        const pColor = color.clone().offsetHSL(
          (Math.random() - 0.5) * 0.1,
          0,
          (Math.random() - 0.5) * 0.1
        );
        colorArray[i3] = pColor.r;
        colorArray[i3 + 1] = pColor.g;
        colorArray[i3 + 2] = pColor.b;
      }
      
      burstGeometry.attributes.position.needsUpdate = true;
      burstGeometry.attributes.color.needsUpdate = true;
    };

    // --- Interactive Hover & Zoom Logic ---
    let hoveredNode: SkeletalNode | null = null;
    let selectedNode: SkeletalNode | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const handleNodeHover = (node: SkeletalNode | null) => {
      if (node && node.type === "back" && !selectedNode) return; // Ignore back button when not zoomed

      if (hoveredNode !== node) {
        if (hoveredNode) {
          // Restore original state
          hoveredNode.targetScale = 1.0;
          if (hoveredNode.mesh.material instanceof THREE.MeshStandardMaterial) {
            hoveredNode.mesh.material.emissiveIntensity = 0.8;
          }
        }
        hoveredNode = node;
        if (node) {
          // Hover state
          node.targetScale = 1.35;
          if (node.mesh.material instanceof THREE.MeshStandardMaterial) {
            node.mesh.material.emissiveIntensity = 1.5;
          }
          document.body.style.cursor = "pointer";
        } else {
          document.body.style.cursor = "grab";
        }
      }
    };

    const handleNodeClick = (node: SkeletalNode) => {
      if (node.type === "back") {
        // --- Fly Back to Overview ---
        selectedNode = null;
        targetCameraPosition.copy(defaultCamPos);
        targetLookAt.copy(defaultLookAt);

        // Animate nodes back
        nodes.forEach((n) => {
          n.targetScale = 1.0;
          if (n.mesh.material instanceof THREE.MeshStandardMaterial) {
            n.mesh.material.opacity = 0.9;
          }
          if (n.ringMesh.material instanceof THREE.MeshBasicMaterial) {
            n.ringMesh.material.opacity = 0.5;
          }
        });

        // Restore bones
        bones.forEach((b) => {
          b.material.opacity = 0.35;
        });

        // Hide back button
        backBtnCoreMat.opacity = 0;
        backBtnRingMat.opacity = 0;

        triggerClickBurst(node.position, node.color);
      } else {
        // --- Zoom Into Node ---
        selectedNode = node;
        // Target camera position offset relative to node
        targetCameraPosition.set(node.position.x, node.position.y, node.position.z + 2.2);
        targetLookAt.copy(node.position);

        // Highlight clicked node
        node.targetScale = 1.6;
        if (node.mesh.material instanceof THREE.MeshStandardMaterial) {
          node.mesh.material.opacity = 1.0;
        }
        if (node.ringMesh.material instanceof THREE.MeshBasicMaterial) {
          node.ringMesh.material.opacity = 0.8;
        }

        // Dim all other nodes
        nodes.forEach((n) => {
          if (n.id !== node.id && n.type !== "back") {
            n.targetScale = 0.25;
            if (n.mesh.material instanceof THREE.MeshStandardMaterial) {
              n.mesh.material.opacity = 0.12;
            }
            if (n.ringMesh.material instanceof THREE.MeshBasicMaterial) {
              n.ringMesh.material.opacity = 0.05;
            }
          }
        });

        // Fade bones
        bones.forEach((b) => {
          b.material.opacity = 0.02;
        });

        // Align and show back button relative to camera zoom
        backButtonPos.set(node.position.x - 0.9, node.position.y + 0.6, node.position.z + 0.5);
        backBtnCore.position.copy(backButtonPos);
        backBtnRing.position.copy(backButtonPos);
        backBtnCoreMat.opacity = 0.8;
        backBtnRingMat.opacity = 0.5;

        triggerClickBurst(node.position, node.color);
      }
    };

    // --- Event Listeners ---
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      // Normalize mouse coords (-1 to +1)
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseVector.set(mouseX, mouseY);
      raycaster.setFromCamera(mouseVector, camera);

      // Filter interactive meshes: only check back button if zoomed in
      const activeTargets = interactiveMeshes.filter(
        (m) => m !== backBtnCore || selectedNode !== null
      );

      const intersects = raycaster.intersectObjects(activeTargets);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matchingNode = nodes.find((n) => n.mesh === hit || n.ringMesh === hit);
        if (matchingNode) {
          handleNodeHover(matchingNode);
          return;
        }
      }
      handleNodeHover(null);
    };

    const onPointerDown = (e: MouseEvent) => {
      mouseVector.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouseVector, camera);

      const activeTargets = interactiveMeshes.filter(
        (m) => m !== backBtnCore || selectedNode !== null
      );
      const intersects = raycaster.intersectObjects(activeTargets);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matchingNode = nodes.find((n) => n.mesh === hit || n.ringMesh === hit);
        if (matchingNode) {
          handleNodeClick(matchingNode);
        }
      }
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("resize", onWindowResize);

    // --- Animation Loop ---
    let animationFrameId: number;

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // 1. Slow background rotation of overall skeleton skeleton (only when not zoomed in)
      if (!selectedNode) {
        skeletonGroup.rotation.y = elapsedTime * 0.12;
        skeletonGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;
      } else {
        // Gentle float rotation when zoomed
        skeletonGroup.rotation.y += delta * 0.03;
      }

      // 2. Individual node animations (spinning rings + scaling)
      nodes.forEach((n) => {
        // Rotate outer rings on different axes
        if (n.type === "back") {
          n.ringMesh.rotation.z += delta * 1.5;
        } else {
          n.ringMesh.rotation.y += delta * 1.2;
          n.ringMesh.rotation.x += delta * 0.6;
        }

        // Interpolate scale smoothly
        const scaleLerp = THREE.MathUtils.lerp(n.mesh.scale.x, n.targetScale, 0.1);
        n.mesh.scale.set(scaleLerp, scaleLerp, scaleLerp);
        n.ringMesh.scale.set(scaleLerp, scaleLerp, scaleLerp);

        // Breathing neon animation
        if (n.type !== "back" && n !== hoveredNode && n !== selectedNode) {
          const breathe = 1.0 + Math.sin(elapsedTime * 3 + n.id) * 0.06;
          n.mesh.scale.multiplyScalar(breathe);
        }
      });

      // 3. Mouse Parallax for deep 3D immersion
      const parallaxX = mouseX * 0.8;
      const parallaxY = mouseY * 0.8;

      tempCameraPosition.copy(targetCameraPosition);
      if (!selectedNode) {
        tempCameraPosition.x += parallaxX;
        tempCameraPosition.y += parallaxY;
      }

      // Smooth camera interpolation
      camera.position.lerp(tempCameraPosition, 0.07);
      currentLookAt.lerp(targetLookAt, 0.07);
      camera.lookAt(currentLookAt);

      // 4. Update dust particles position (slow drift)
      const particlePos = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        particlePos[i] -= speeds[Math.floor(i / 3)]; // Drift down
        if (particlePos[i] < -7) {
          particlePos[i] = 7; // Wrap back to top
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // 5. Update click explosion particles
      if (burstLife > 0) {
        burstLife -= delta * 0.8;
        burstMaterial.opacity = Math.max(0, burstLife);
        
        const burstPosArray = burstGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < burstCount; i++) {
          const i3 = i * 3;
          burstPosArray[i3] += burstVelocities[i].x;
          burstPosArray[i3 + 1] += burstVelocities[i].y;
          burstPosArray[i3 + 2] += burstVelocities[i].z;
          
          // Drag friction
          burstVelocities[i].multiplyScalar(0.96);
        }
        burstGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("resize", onWindowResize);

      // Dispose geometries & materials
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen block outline-none cursor-grab active:cursor-grabbing bg-slate-950 z-[999]"
    />
  );
}
