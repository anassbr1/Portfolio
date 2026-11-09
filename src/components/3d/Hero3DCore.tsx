import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';

export const Hero3DCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = usePortfolio();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D core elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Torus Knot Wireframe
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 24, 2, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x38BDF8 : 0x0284C7,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.35 : 0.28,
    });
    const torusMesh = new THREE.Mesh(torusKnotGeo, wireframeMat);
    coreGroup.add(torusMesh);

    // 2. Middle Polyhedral Cage (Icosahedron)
    const icoGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x6366F1 : 0x4F46E5,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.45 : 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    // 3. Inner Glowing Emissive Sphere (AI Neural Core)
    const sphereGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x38BDF8 : 0x0EA5E9,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    coreGroup.add(coreSphere);

    // 4. Orbiting Data Node Rings
    const ringGeo = new THREE.RingGeometry(1.9, 1.95, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x38BDF8 : 0x0284C7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 2;
    coreGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 3;
    coreGroup.add(ringMesh2);

    // Scroll & Mouse state
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = delta * 0.003;
      lastScrollY = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.8;
      targetRotationX = y * 0.8;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Idle continuous rotation + bidirectional scroll acceleration/reversal
      const baseRotationSpeed = 0.45;
      const activeSpeed = baseRotationSpeed + scrollVelocity * 10;

      torusMesh.rotation.x += activeSpeed * delta;
      torusMesh.rotation.y += activeSpeed * 0.7 * delta;

      icoMesh.rotation.x -= activeSpeed * 1.2 * delta;
      icoMesh.rotation.z += activeSpeed * 0.9 * delta;

      ringMesh1.rotation.z += activeSpeed * 0.3 * delta;
      ringMesh2.rotation.x += activeSpeed * 0.3 * delta;

      // Inner sphere pulse
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.5) * 0.08;
      coreSphere.scale.set(pulse, pulse, pulse);

      // Smooth mouse parallax tilt
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;

      // Damp scroll velocity back to zero
      scrollVelocity *= 0.92;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusKnotGeo.dispose();
      icoGeo.dispose();
      sphereGeo.dispose();
      ringGeo.dispose();
      wireframeMat.dispose();
      icoMat.dispose();
      sphereMat.dispose();
      ringMat.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340px] md:h-[460px] flex items-center justify-center pointer-events-none select-none"
    >
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent blur-2xl pointer-events-none" />
    </div>
  );
};
