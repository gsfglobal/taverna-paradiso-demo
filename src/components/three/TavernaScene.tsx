"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Hero 3D — "La tavola della taverna"
 * Tavolo rustico, piatto in ceramica con orecchiette, mollica e peperoni cruschi,
 * peperoni cruschi interi, calice di vino rosso, bottiglia senza etichetta inventata,
 * candela e muro in pietra con i tre archi del logo. Tutto procedurale: nessun file esterno.
 */

/* ------------------------------------------------------------------ */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTexture(w: number, h: number, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, srgb = true) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  draw(cv.getContext("2d")!, w, h);
  const tex = new THREE.CanvasTexture(cv);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* ---------------------------- Texture ----------------------------- */
function useWoodTextures() {
  return useMemo(() => {
    const r = rng(7);
    const draw = (bump: boolean) => (c: CanvasRenderingContext2D, w: number, h: number) => {
      c.fillStyle = bump ? "#808080" : "#5b3c26";
      c.fillRect(0, 0, w, h);
      // assi
      const planks = 5;
      for (let p = 0; p < planks; p++) {
        const y0 = (p * h) / planks;
        const tone = r() * 0.25 - 0.12;
        if (!bump) {
          c.fillStyle = `rgba(${tone > 0 ? "255,220,180" : "20,10,4"},${Math.abs(tone) * 0.6})`;
          c.fillRect(0, y0, w, h / planks);
        }
        // venature
        for (let i = 0; i < 70; i++) {
          const yy = y0 + r() * (h / planks);
          const amp = 2 + r() * 6;
          const freq = 0.004 + r() * 0.01;
          const ph = r() * 10;
          c.beginPath();
          for (let x = 0; x <= w; x += 8) {
            const y = yy + Math.sin(x * freq + ph) * amp + Math.sin(x * freq * 3.1 + ph) * amp * 0.3;
            if (x === 0) c.moveTo(x, y);
            else c.lineTo(x, y);
          }
          const dark = r() > 0.35;
          c.strokeStyle = bump
            ? dark ? "rgba(40,40,40,.35)" : "rgba(200,200,200,.25)"
            : dark ? `rgba(28,14,6,${0.15 + r() * 0.25})` : `rgba(160,110,70,${0.1 + r() * 0.15})`;
          c.lineWidth = 0.6 + r() * 1.8;
          c.stroke();
        }
        // nodi
        for (let k = 0; k < 2; k++) {
          const kx = r() * w;
          const ky = y0 + r() * (h / planks);
          for (let ring = 10; ring > 0; ring--) {
            c.beginPath();
            c.ellipse(kx, ky, ring * 4, ring * 1.6, 0, 0, Math.PI * 2);
            c.strokeStyle = bump ? "rgba(30,30,30,.25)" : "rgba(30,15,6,.18)";
            c.stroke();
          }
        }
        // fughe tra le assi
        c.fillStyle = bump ? "#101010" : "rgba(15,8,3,.85)";
        c.fillRect(0, y0, w, 3);
      }
    };
    const map = canvasTexture(1024, 1024, draw(false));
    const bump = canvasTexture(1024, 1024, draw(true), false);
    [map, bump].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(1.4, 1);
    });
    return { map, bump };
  }, []);
}

function useStoneTexture() {
  return useMemo(() => {
    const r = rng(42);
    const map = canvasTexture(1024, 512, (c, w, h) => {
      c.fillStyle = "#6e5f4f";
      c.fillRect(0, 0, w, h);
      let y = 0;
      while (y < h) {
        const bh = 34 + r() * 30;
        let x = -r() * 60;
        while (x < w) {
          const bw = 60 + r() * 90;
          const l = 150 + r() * 50;
          c.fillStyle = `rgb(${l},${l * 0.88},${l * 0.72})`;
          c.beginPath();
          const rr = 6;
          c.roundRect(x + 3, y + 3, bw - 6, bh - 6, rr);
          c.fill();
          // macchie
          for (let i = 0; i < 18; i++) {
            c.fillStyle = `rgba(${r() > 0.5 ? "60,45,30" : "240,225,200"},${r() * 0.12})`;
            c.beginPath();
            c.arc(x + r() * bw, y + r() * bh, 2 + r() * 9, 0, Math.PI * 2);
            c.fill();
          }
          x += bw;
        }
        y += bh;
      }
    });
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(2.2, 1.6);
    return map;
  }, []);
}

/* ---------------------------- Oggetti ----------------------------- */
function Table({ compact }: { compact: boolean }) {
  const { map, bump } = useWoodTextures();
  return (
    <mesh position={[0.6, -0.12, 0]} receiveShadow={!compact}>
      <boxGeometry args={[9, 0.24, 4.6]} />
      <meshStandardMaterial map={map} bumpMap={bump} bumpScale={0.6} roughness={0.78} metalness={0} color="#c9a684" />
    </mesh>
  );
}

function Wall() {
  const stone = useStoneTexture();
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-8, -1);
    s.lineTo(9, -1);
    s.lineTo(9, 6);
    s.lineTo(-8, 6);
    s.lineTo(-8, -1);
    [-1.6, 0.9, 3.4].forEach((cx) => {
      const hole = new THREE.Path();
      const w = 0.95;
      hole.moveTo(cx - w, -1);
      hole.lineTo(cx - w, 1.7);
      hole.absarc(cx, 1.7, w, Math.PI, 0, true);
      hole.lineTo(cx + w, -1);
      hole.lineTo(cx - w, -1);
      s.holes.push(hole);
    });
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.5, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 2, curveSegments: 24 });
    // UV planari per la texture in pietra
    const pos = g.attributes.position;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uv[i * 2] = pos.getX(i) / 8;
      uv[i * 2 + 1] = (pos.getY(i) + pos.getZ(i) * 0.6) / 5;
    }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    return g;
  }, []);

  const glow = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: `varying vec2 vUv; uniform float uTime;
          void main(){
            float y = vUv.y;
            vec3 low = vec3(1.0, 0.62, 0.32);
            vec3 high = vec3(0.16, 0.10, 0.08);
            vec3 col = mix(low, high, smoothstep(0.0, 0.85, y));
            float flick = 0.94 + 0.06*sin(uTime*1.7)*sin(uTime*2.9);
            gl_FragColor = vec4(col*flick*0.85, 1.0);
          }`,
      }),
    [],
  );
  useFrame((s) => {
    glow.uniforms.uTime.value = s.clock.elapsedTime;
  });

  return (
    <group position={[0, 0, -3.4]}>
      <mesh geometry={geo}>
        <meshStandardMaterial map={stone} roughness={0.95} color="#8a7a66" />
      </mesh>
      <mesh position={[0.9, 1.6, -0.6]} material={glow}>
        <planeGeometry args={[9, 5.5]} />
      </mesh>
    </group>
  );
}

function Plate({ compact }: { compact: boolean }) {
  const geo = useMemo(() => {
    const pts = [
      [0, 0.012], [0.38, 0.014], [0.47, 0.024], [0.55, 0.055], [0.66, 0.072], [0.72, 0.074], [0.735, 0.066],
      [0.72, 0.058], [0.62, 0.05], [0.5, 0.012], [0.32, 0.0], [0.0, 0.0],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 96);
  }, []);
  return (
    <group position={[1.05, 0.002, 0.25]}>
      <mesh geometry={geo} castShadow={!compact} receiveShadow={!compact}>
        <meshPhysicalMaterial color="#efe5d3" roughness={0.32} clearcoat={1} clearcoatRoughness={0.18} />
      </mesh>
      {/* bordi decorati in terracotta e oliva, come nella ceramica artigianale */}
      <mesh position={[0, 0.0745, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.676, 0.692, 96]} />
        <meshStandardMaterial color="#ad674a" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.0712, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.648, 0.656, 96]} />
        <meshStandardMaterial color="#596148" roughness={0.5} />
      </mesh>
      <Pasta compact={compact} />
    </group>
  );
}

function Pasta({ compact }: { compact: boolean }) {
  const r = useMemo(() => rng(11), []);
  const count = compact ? 80 : 130;
  const pastaRef = useRef<THREE.InstancedMesh>(null);
  const cruschiRef = useRef<THREE.InstancedMesh>(null);
  const crumbRef = useRef<THREE.InstancedMesh>(null);

  const pastaGeo = useMemo(() => {
    const g = new THREE.SphereGeometry(0.058, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.45);
    g.scale(1, 0.55, 1);
    return g;
  }, []);
  const cruscoGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.09, 0.04, 8, 4);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      p.setZ(i, Math.sin(x * 45) * 0.006 + y * y * 9 + x * x * 2);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const s = new THREE.Vector3();
    const v = new THREE.Vector3();
    const R = 0.4;
    const heightAt = (x: number, z: number) => 0.03 + Math.max(0, 1 - (x * x + z * z) / (R * R)) * 0.17;
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * R;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      v.set(x, heightAt(x, z) + r() * 0.035, z);
      e.set((r() - 0.5) * 2.2, r() * Math.PI * 2, (r() - 0.5) * 2.2);
      q.setFromEuler(e);
      const k = 0.85 + r() * 0.35;
      s.set(k, k, k);
      m.compose(v, q, s);
      pastaRef.current!.setMatrixAt(i, m);
    }
    pastaRef.current!.instanceMatrix.needsUpdate = true;

    const nc = compact ? 22 : 34;
    for (let i = 0; i < nc; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * R * 0.85;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      v.set(x, heightAt(x, z) + 0.04 + r() * 0.02, z);
      e.set(-Math.PI / 2 + (r() - 0.5) * 1.2, r() * Math.PI * 2, (r() - 0.5) * 0.8);
      q.setFromEuler(e);
      const k = 0.6 + r() * 0.8;
      s.set(k, k, k);
      m.compose(v, q, s);
      cruschiRef.current!.setMatrixAt(i, m);
    }
    cruschiRef.current!.instanceMatrix.needsUpdate = true;

    const nb = compact ? 160 : 260;
    for (let i = 0; i < nb; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * R * 0.95;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      v.set(x, heightAt(x, z) + 0.03 + r() * 0.025, z);
      e.set(r() * 3, r() * 3, r() * 3);
      q.setFromEuler(e);
      const k = 0.5 + r() * 1.2;
      s.set(k, k * 0.7, k);
      m.compose(v, q, s);
      crumbRef.current!.setMatrixAt(i, m);
    }
    crumbRef.current!.instanceMatrix.needsUpdate = true;
  }, [count, compact, r]);

  return (
    <group>
      <instancedMesh ref={pastaRef} args={[pastaGeo, undefined, count]} castShadow={!compact}>
        <meshStandardMaterial color="#e2c07c" roughness={0.58} side={THREE.DoubleSide} />
      </instancedMesh>
      <instancedMesh ref={cruschiRef} args={[cruscoGeo, undefined, compact ? 22 : 34]}>
        <meshPhysicalMaterial color="#a31d10" roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} side={THREE.DoubleSide} />
      </instancedMesh>
      <instancedMesh ref={crumbRef} args={[undefined, undefined, compact ? 160 : 260]}>
        <icosahedronGeometry args={[0.0065, 0]} />
        <meshStandardMaterial color="#c4913f" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}

/** Peperone crusco intero: profilo affusolato, curvo e lucido */
function Pepper({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number }) {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const L = 0.62;
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const rad = 0.052 * Math.pow(Math.sin(Math.min(1, t * 1.15) * Math.PI * 0.5), 0.5) * (1 - Math.pow(t, 2.4));
      pts.push(new THREE.Vector2(Math.max(rad, 0.001), t * L));
    }
    const g = new THREE.LatheGeometry(pts, 20);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      // curvatura e grinze dell'essiccazione
      const ang = Math.atan2(p.getZ(i), p.getX(i));
      const wr = 1 + Math.sin(ang * 5 + y * 30) * 0.14 + Math.sin(ang * 11 - y * 55) * 0.06;
      p.setX(i, p.getX(i) * wr + y * y * 0.6);
      p.setZ(i, p.getZ(i) * wr * 0.45);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geo} castShadow>
        <meshPhysicalMaterial color="#6a0d0a" roughness={0.3} clearcoat={1} clearcoatRoughness={0.2} sheen={0.5} sheenColor="#c2361f" />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.022, 0.03, 0.05, 10]} />
        <meshStandardMaterial color="#4a4a24" roughness={0.8} />
      </mesh>
      <mesh position={[0.01, -0.07, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.007, 0.009, 0.09, 6]} />
        <meshStandardMaterial color="#5c5a2c" roughness={0.8} />
      </mesh>
    </group>
  );
}

function WineGlass({ compact }: { compact: boolean }) {
  const { glassGeo, wineGeo, wineTop } = useMemo(() => {
    const outer = [
      [0.0, 0.0], [0.17, 0.0], [0.172, 0.008], [0.03, 0.02], [0.013, 0.05], [0.012, 0.36], [0.03, 0.4],
      [0.12, 0.46], [0.19, 0.56], [0.205, 0.66], [0.19, 0.78], [0.165, 0.88],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const glassGeo = new THREE.LatheGeometry(outer, 64);
    const w = [[0, 0.405], [0.03, 0.41], [0.115, 0.465], [0.18, 0.56], [0.19, 0.6]].map(([x, y]) => new THREE.Vector2(x, y));
    const wineGeo = new THREE.LatheGeometry(w, 64);
    const wineTop = new THREE.CircleGeometry(0.19, 64);
    return { glassGeo, wineGeo, wineTop };
  }, []);
  return (
    <group position={[2.05, 0.0, -0.45]}>
      <mesh geometry={glassGeo} castShadow={!compact}>
        {compact ? (
          <meshPhysicalMaterial color="#ffffff" roughness={0.04} metalness={0} transparent opacity={0.22} clearcoat={1} side={THREE.DoubleSide} />
        ) : (
          <meshPhysicalMaterial color="#ffffff" roughness={0.03} transmission={1} thickness={0.04} ior={1.5} clearcoat={1} side={THREE.DoubleSide} />
        )}
      </mesh>
      <mesh geometry={wineGeo}>
        <meshPhysicalMaterial color="#4d0c16" roughness={0.12} clearcoat={1} transparent opacity={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={wineTop} position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial color="#3a0811" roughness={0.05} clearcoat={1} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Bottle({ compact }: { compact: boolean }) {
  const geo = useMemo(() => {
    const pts = [
      [0, 0], [0.16, 0], [0.165, 0.02], [0.165, 0.78], [0.15, 0.86], [0.08, 0.98], [0.055, 1.05], [0.05, 1.32], [0.058, 1.34], [0.058, 1.4], [0, 1.4],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  return (
    <group position={[2.85, 0, -1.35]}>
      <mesh geometry={geo} castShadow={!compact}>
        <meshPhysicalMaterial color="#14201a" roughness={0.12} clearcoat={1} metalness={0.2} />
      </mesh>
      {/* etichetta neutra: nessuna etichetta reale della cantina è stata inventata */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.168, 0.168, 0.34, 48, 1, true, -1.2, 2.4]} />
        <meshStandardMaterial color="#e9dfcc" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1685, 0.1685, 0.012, 48, 1, true, -1.2, 2.4]} />
        <meshStandardMaterial color="#ba945c" metalness={0.6} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Candle({ lightRef }: { lightRef: React.RefObject<THREE.PointLight | null> }) {
  const flame = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const f = 0.85 + Math.sin(t * 7.3) * 0.06 + Math.sin(t * 13.1) * 0.05 + Math.sin(t * 2.1) * 0.04;
    if (flame.current) {
      flame.current.scale.set(1, f, 1);
      flame.current.position.x = Math.sin(t * 3.3) * 0.004;
    }
    if (lightRef.current) lightRef.current.intensity = 2.6 * f;
  });
  return (
    <group position={[0.1, 0, -1.75]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.075, 0.4, 32]} />
        <meshPhysicalMaterial color="#f3ead7" roughness={0.5} transmission={0.15} thickness={0.2} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.06, 32]} />
        <meshStandardMaterial color="#6a4b2e" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh ref={flame} position={[0, 0.47, 0]}>
        <sphereGeometry args={[0.022, 16, 12]} />
        <meshBasicMaterial color="#ffd38a" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.47, 0]} scale={[1, 1.6, 1]}>
        <sphereGeometry args={[0.06, 16, 12]} />
        <meshBasicMaterial color="#ff9a3c" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Napkin() {
  const { geo, tex } = useMemo(() => {
    const g = new THREE.PlaneGeometry(1.7, 1.2, 30, 20);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      p.setZ(i, Math.sin(x * 5 + y * 2) * 0.006 + Math.max(0, x - 0.6) * 0.05);
    }
    g.computeVertexNormals();
    const tex = canvasTexture(512, 512, (c, w, h) => {
      c.fillStyle = "#e8dcc6";
      c.fillRect(0, 0, w, h);
      for (let i = 0; i < w; i += 3) {
        c.fillStyle = `rgba(120,100,70,${0.05 + Math.random() * 0.05})`;
        c.fillRect(i, 0, 1, h);
        c.fillRect(0, i, w, 1);
      }
      c.fillStyle = "#596148";
      c.fillRect(0, h * 0.12, w, 10);
      c.fillRect(0, h * 0.12 + 16, w, 4);
      c.fillStyle = "#ad674a";
      c.fillRect(0, h * 0.86, w, 6);
    });
    return { geo: g, tex };
  }, []);
  return (
    <mesh geometry={geo} position={[0.95, 0.001, 0.3]} rotation={[-Math.PI / 2, 0, 0.12]} receiveShadow>
      <meshStandardMaterial map={tex} roughness={0.95} />
    </mesh>
  );
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { geo, speeds } = useMemo(() => {
    const r = rng(3);
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = -1.5 + r() * 5;
      pos[i * 3 + 1] = r() * 2.6;
      pos[i * 3 + 2] = -2.5 + r() * 3.5;
      speeds[i] = 0.02 + r() * 0.05;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo: g, speeds };
  }, [count]);
  useFrame((s, d) => {
    const p = geo.attributes.position as THREE.BufferAttribute;
    const t = s.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      let y = p.getY(i) + speeds[i] * d;
      if (y > 2.6) y = 0;
      p.setY(i, y);
      p.setX(i, p.getX(i) + Math.sin(t * 0.3 + i) * 0.0008);
    }
    p.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.012} color="#ffd9a0" transparent opacity={0.45} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Lights({ compact, candle }: { compact: boolean; candle: React.RefObject<THREE.PointLight | null> }) {
  const key = useRef<THREE.SpotLight>(null);
  const { scene } = useThree();
  useEffect(() => {
    if (key.current) {
      key.current.target.position.set(1.1, 0, 0);
      scene.add(key.current.target);
    }
  }, [scene]);
  return (
    <>
      <ambientLight intensity={0.16} color="#ffe6c8" />
      <hemisphereLight args={["#ffd9b0", "#2a1a10", 0.25]} />
      <spotLight
        ref={key}
        position={[-1.6, 4.2, 2.2]}
        angle={0.55}
        penumbra={0.9}
        intensity={42}
        decay={2}
        color="#ffd7a8"
        castShadow={!compact}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
        shadow-radius={6}
      />
      <pointLight ref={candle} position={[0.1, 0.62, -1.75]} color="#ff9c4a" intensity={2.6} distance={4} decay={1.6} />
      <directionalLight position={[4, 2, -3]} intensity={0.6} color="#9fb4d6" />
    </>
  );
}

function EnvMap() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.35;
    return () => {
      env.dispose();
      pm.dispose();
    };
  }, [gl, scene]);
  return null;
}

function CameraRig({ compact }: { compact: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
    if (compact) {
      target.set(1.3 + Math.sin(t * 0.08) * 0.12, 2.5 - p * 0.4, 3.6 - p * 0.8);
      look.set(1.3, -0.75, 0.2);
    } else {
      target.set(
        -0.35 + Math.sin(t * 0.07) * 0.2 + mouse.current.x * 0.2,
        1.7 - mouse.current.y * 0.1 - p * 0.4,
        3.9 - p * 1.1,
      );
      look.set(0.2 + mouse.current.x * 0.05, 0.05 - p * 0.05, -0.25);
    }
    camera.position.lerp(target, 1 - Math.pow(0.03, delta));
    camera.lookAt(look);
  });
  return null;
}

/** Ferma il rendering quando la hero non è visibile (risparmio GPU e batteria) */
function PauseWhenHidden({ visible }: { visible: React.MutableRefObject<boolean> }) {
  const { set } = useThree();
  useFrame(() => {
    if (!visible.current) set({ frameloop: "demand" });
  });
  useEffect(() => {
    const id = window.setInterval(() => {
      if (visible.current) set({ frameloop: "always" });
    }, 300);
    return () => window.clearInterval(id);
  }, [set, visible]);
  return null;
}

export default function TavernaScene({ compact = false, onReady }: { compact?: boolean; onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const candle = useRef<THREE.PointLight>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={compact ? [1, 1.5] : [1, 1.75]}
        shadows={!compact}
        camera={{ position: compact ? [1.3, 2.5, 3.6] : [-0.35, 1.7, 3.9], fov: compact ? 50 : 34, near: 0.05, far: 30 }}
        gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
        onCreated={({ gl, scene }) => {
          scene.background = new THREE.Color("#1f1914");
          scene.fog = new THREE.Fog("#1f1914", 4.5, 11);
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          onReady?.();
        }}
      >
        <PauseWhenHidden visible={visible} />
        <EnvMap />
        <Lights compact={compact} candle={candle} />
        <Wall />
        <Table compact={compact} />
        <Napkin />
        <Plate compact={compact} />
        <Pepper position={[0.55, 0.04, 1.15]} rotation={[Math.PI / 2, 0, 1.2]} />
        <Pepper position={[0.35, 0.04, 1.3]} rotation={[Math.PI / 2, 0, 1.6]} scale={0.9} />
        <Pepper position={[0.8, 0.04, 1.4]} rotation={[Math.PI / 2, 0, 0.8]} scale={0.85} />
        <WineGlass compact={compact} />
        <Bottle compact={compact} />
        <Candle lightRef={candle} />
        <Dust count={compact ? 80 : 180} />
        <CameraRig compact={compact} />
      </Canvas>
    </div>
  );
}
