"use client";

import { useRef } from "react";
import * as THREE from "three";
import { gsap, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";
import {
  IDENTITY3,
  lerpMat3,
  det3,
  TRANSFORMS3,
  type Mat3,
} from "@/lib/math";

/**
 * The hero centerpiece: a live linear-algebra space that *reveals its third
 * dimension*. It opens face-on — a flat deforming grid that reads as the old
 * 2×2 plane — then the camera orbits out, k̂ rises into view, and the readout
 * grows from 2×2 to a full 3×3 matrix. From there it walks through a sequence
 * of real 3D maps (rotation, shear, scale, an off-axis spin) and finishes on a
 * *singular* projection where space collapses onto a plane and the volume
 * readout (det) drops to 0.00.
 *
 * Rendered with three.js but kept deliberately brutalist: flat MeshBasicMaterial
 * + wireframe lines, no lighting, no PBR — line-art that deforms in 3D. The
 * morph and the camera choreography are GSAP tweens; under reduced motion it
 * renders a single static 3/4 view of the identity.
 */
export default function MatrixField() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const nameEl = useRef<HTMLSpanElement>(null);
  const detEl = useRef<HTMLSpanElement>(null);
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      let C = readThemeTokens();

      // ---- renderer / scene / camera -----------------------------------
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.current!,
        alpha: true,
        antialias: true,
      });
      renderer.setClearColor(0x000000, 0); // transparent — page bg shows through

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

      // ---- the linear map (everything inside deforms by M) -------------
      const mapGroup = new THREE.Group();
      mapGroup.matrixAutoUpdate = false;
      scene.add(mapGroup);

      // deforming 3D lattice: lines along x, y, z over [-2,2]³ on a unit step.
      // Seen face-on it collapses into the familiar flat grid; orbit out and it
      // becomes a volume of space that shears/rotates with the matrix.
      const LAT = 2;
      const latPts: number[] = [];
      for (let a = -LAT; a <= LAT; a++) {
        for (let b = -LAT; b <= LAT; b++) {
          latPts.push(-LAT, a, b, LAT, a, b); // ∥ x
          latPts.push(a, -LAT, b, a, LAT, b); // ∥ y
          latPts.push(a, b, -LAT, a, b, LAT); // ∥ z
        }
      }
      const latGeo = new THREE.BufferGeometry();
      latGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(latPts, 3)
      );
      const latMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(C.grid),
        transparent: true,
        opacity: 0.55,
      });
      mapGroup.add(new THREE.LineSegments(latGeo, latMat));

      // the unit cube [0,1]³ — its (signed) volume IS the determinant
      const cubeBox = new THREE.BoxGeometry(1, 1, 1).translate(0.5, 0.5, 0.5);
      const cubeEdgeGeo = new THREE.EdgesGeometry(cubeBox);
      const cubeEdgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(C.fg),
      });
      mapGroup.add(new THREE.LineSegments(cubeEdgeGeo, cubeEdgeMat));

      const cubeFillMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(C.accent),
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cubeFill = new THREE.Mesh(cubeBox, cubeFillMat);
      cubeFill.renderOrder = -1;
      mapGroup.add(cubeFill);

      // origin marker (fixed — M·0 = 0)
      const originGeo = new THREE.SphereGeometry(0.05, 16, 12);
      const originMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(C.fg),
      });
      scene.add(new THREE.Mesh(originGeo, originMat));

      // ---- basis arrows î ĵ k̂ (drawn in world space at the columns of M, so
      //      the arrowheads stay clean instead of being sheared by M) --------
      const HEAD = 0.18;
      const makeArrow = (hex: string) => {
        const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(hex) });
        const shaftGeo = new THREE.CylinderGeometry(0.022, 0.022, 1, 10);
        const headGeo = new THREE.ConeGeometry(0.07, HEAD, 16);
        const shaft = new THREE.Mesh(shaftGeo, mat);
        const head = new THREE.Mesh(headGeo, mat);
        const g = new THREE.Group();
        g.add(shaft, head);
        scene.add(g);
        const up = new THREE.Vector3(0, 1, 0);
        const q = new THREE.Quaternion();
        const dir = new THREE.Vector3();
        const update = (end: THREE.Vector3) => {
          const len = end.length();
          if (len < 1e-3) {
            g.visible = false;
            return;
          }
          g.visible = true;
          dir.copy(end).normalize();
          q.setFromUnitVectors(up, dir);
          const shaftLen = Math.max(len - HEAD, 0.001);
          shaft.scale.set(1, shaftLen, 1);
          shaft.quaternion.copy(q);
          shaft.position.copy(dir).multiplyScalar(shaftLen / 2);
          head.quaternion.copy(q);
          head.position.copy(dir).multiplyScalar(len - HEAD / 2);
        };
        return { mat, shaftGeo, headGeo, update };
      };
      const aI = makeArrow(C.vecI);
      const aJ = makeArrow(C.vecJ);
      const aK = makeArrow(C.vecK);

      // ---- state: current matrix + its name ----------------------------
      const view = { m: IDENTITY3 as Mat3, name: "IDENTITY" };
      const M4 = new THREE.Matrix4();
      const eI = new THREE.Vector3();
      const eJ = new THREE.Vector3();
      const eK = new THREE.Vector3();

      const applyMatrix = () => {
        const m = view.m;
        // row-major Mat3 → Matrix4 (column-major .set takes row-major args)
        M4.set(
          m[0], m[1], m[2], 0,
          m[3], m[4], m[5], 0,
          m[6], m[7], m[8], 0,
          0, 0, 0, 1
        );
        mapGroup.matrix.copy(M4);
        mapGroup.matrixWorldNeedsUpdate = true;
        // basis vectors are the columns of M
        aI.update(eI.set(m[0], m[3], m[6]));
        aJ.update(eJ.set(m[1], m[4], m[7]));
        aK.update(eK.set(m[2], m[5], m[8]));
      };

      const writeReadout = () => {
        const m = view.m;
        for (let i = 0; i < 9; i++) {
          const el = cellRefs.current[i];
          if (el) el.textContent = m[i].toFixed(2);
        }
        if (detEl.current) detEl.current.textContent = det3(m).toFixed(2);
        if (nameEl.current) nameEl.current.textContent = view.name;
      };

      // ---- colours (re-applied on theme flip) --------------------------
      const applyColors = () => {
        latMat.color.set(C.grid);
        cubeEdgeMat.color.set(C.fg);
        cubeFillMat.color.set(C.accent);
        originMat.color.set(C.fg);
        aI.mat.color.set(C.vecI);
        aJ.mat.color.set(C.vecJ);
        aK.mat.color.set(C.vecK);
      };

      // ---- camera (spherical orbit) ------------------------------------
      const cam = { az: 0, el: 0, radius: 9 };
      const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
      const placeCam = () => {
        const az = cam.az + ptr.tx * 0.22;
        const el = Math.max(-1.2, Math.min(1.2, cam.el + ptr.ty * 0.16));
        const ce = Math.cos(el);
        camera.position.set(
          cam.radius * ce * Math.sin(az),
          cam.radius * Math.sin(el),
          cam.radius * ce * Math.cos(az)
        );
        camera.lookAt(0, 0, 0);
      };

      const resize = () => {
        const r = host.current!.getBoundingClientRect();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(r.width, r.height, true);
        camera.aspect = r.width / Math.max(r.height, 1);
        camera.updateProjectionMatrix();
        if (reduced) {
          placeCam();
          renderer.render(scene, camera);
        }
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host.current!);

      applyColors();
      applyMatrix();
      writeReadout();

      const onTheme = () => {
        C = readThemeTokens();
        applyColors();
        if (reduced) renderer.render(scene, camera);
      };
      document.addEventListener("themechange", onTheme);

      // ---- reduced motion: one static 3/4 view, no animation -----------
      if (reduced) {
        cam.az = -0.62;
        cam.el = 0.4;
        placeCam();
        gsap.set(".z-cell", { opacity: 1 });
        renderer.render(scene, camera);
        return () => {
          ro.disconnect();
          document.removeEventListener("themechange", onTheme);
          renderer.dispose();
          [latGeo, cubeEdgeGeo, cubeBox, originGeo, aI.shaftGeo, aI.headGeo, aJ.shaftGeo, aJ.headGeo, aK.shaftGeo, aK.headGeo].forEach((g) => g.dispose());
          [latMat, cubeEdgeMat, cubeFillMat, originMat, aI.mat, aJ.mat, aK.mat].forEach((m) => m.dispose());
        };
      }

      // ---- pointer parallax --------------------------------------------
      const onMove = (e: PointerEvent) => {
        const r = host.current!.getBoundingClientRect();
        ptr.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ptr.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      host.current!.addEventListener("pointermove", onMove);

      // ---- render loop --------------------------------------------------
      let orbiting = false;
      let raf = 0;
      const loop = () => {
        if (orbiting) cam.az -= 0.0016; // slow continuous orbit
        ptr.tx += (ptr.x - ptr.tx) * 0.05;
        ptr.ty += (ptr.y - ptr.ty) * 0.05;
        placeCam();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // ---- morph: walk a scalar through the 3D transform list ----------
      const prog = { t: 0 };
      const N = TRANSFORMS3.length;
      const recompute = () => {
        const f = Math.floor(prog.t) % N;
        const c = (f + 1) % N;
        const frac = prog.t - Math.floor(prog.t);
        view.m = lerpMat3(TRANSFORMS3[f].m, TRANSFORMS3[c].m, frac);
        view.name = frac < 0.5 ? TRANSFORMS3[f].name : TRANSFORMS3[c].name;
        applyMatrix();
        writeReadout();
      };

      const morph = gsap.timeline({ repeat: -1, paused: true });
      for (let i = 0; i < N; i++) {
        morph
          .to(prog, {
            t: i + 1,
            duration: 2.6,
            ease: "power2.inOut",
            onUpdate: recompute,
          })
          .to({}, { duration: 0.9 }); // hold on each transform
      }

      // ---- the 2D → 3D reveal ------------------------------------------
      gsap.set(".z-cell", { opacity: 0 });
      const reveal = gsap.timeline({ delay: 0.4 });
      reveal
        .to(cam, { el: 0.4, az: -0.62, duration: 2.6, ease: "power3.inOut" })
        .to(".z-cell", { opacity: 1, duration: 0.9, stagger: 0.05 }, "-=1.5")
        .add(() => {
          orbiting = true;
          morph.play(0);
        });

      return () => {
        cancelAnimationFrame(raf);
        reveal.kill();
        morph.kill();
        ro.disconnect();
        document.removeEventListener("themechange", onTheme);
        host.current?.removeEventListener("pointermove", onMove);
        renderer.dispose();
        [latGeo, cubeEdgeGeo, cubeBox, originGeo, aI.shaftGeo, aI.headGeo, aJ.shaftGeo, aJ.headGeo, aK.shaftGeo, aK.headGeo].forEach((g) => g.dispose());
        [latMat, cubeEdgeMat, cubeFillMat, originMat, aI.mat, aJ.mat, aK.mat].forEach((m) => m.dispose());
      };
    },
    { scope: host }
  );

  // column → basis-vector colour (î / ĵ / k̂); 3rd row & col fade in on reveal
  const colColor = ["--color-vec-i", "--color-vec-j", "--color-vec-k"];
  const isZ = (i: number) => i % 3 === 2 || i >= 6; // 3rd column or 3rd row

  return (
    <div ref={host} className="absolute inset-0">
      <canvas ref={canvas} className="block h-full w-full" />

      {/* live matrix readout */}
      <div className="pointer-events-none absolute bottom-5 right-5 select-none md:bottom-7 md:right-7">
        <div className="label mb-2 text-right">
          TRANSFORM ={" "}
          <span ref={nameEl} className="label-bright">
            IDENTITY
          </span>
        </div>
        <div className="flex items-stretch gap-2">
          <span className="w-[2px] bg-[var(--color-line-bright)]" />
          <div className="mono grid grid-cols-3 gap-x-4 gap-y-1 text-sm tabular-nums md:text-base">
            {Array.from({ length: 9 }, (_, i) => (
              <span
                key={i}
                ref={(el) => {
                  cellRefs.current[i] = el;
                }}
                className={isZ(i) ? "z-cell" : undefined}
                style={{ color: `var(${colColor[i % 3]})` }}
              >
                {i === 0 || i === 4 || i === 8 ? "1.00" : "0.00"}
              </span>
            ))}
          </div>
          <span className="w-[2px] bg-[var(--color-line-bright)]" />
        </div>
        <div className="label mt-2 text-right">
          det <span className="text-[color:var(--color-muted-fg)]">(vol)</span> ={" "}
          <span ref={detEl} className="label-bright">
            1.00
          </span>
        </div>
      </div>
    </div>
  );
}
