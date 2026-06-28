/**
 * 2x2 linear-algebra helpers for the hero "linear transformation" canvas.
 * Matrices are row-major: [a, b, c, d] === [[a, b], [c, d]].
 */

export type Mat2 = [number, number, number, number];
export type Vec2 = [number, number];

export const IDENTITY: Mat2 = [1, 0, 0, 1];

export function applyMat(m: Mat2, v: Vec2): Vec2 {
  return [m[0] * v[0] + m[1] * v[1], m[2] * v[0] + m[3] * v[1]];
}

export function multiplyMat(a: Mat2, b: Mat2): Mat2 {
  return [
    a[0] * b[0] + a[1] * b[2],
    a[0] * b[1] + a[1] * b[3],
    a[2] * b[0] + a[3] * b[2],
    a[2] * b[1] + a[3] * b[3],
  ];
}

export function lerpMat(a: Mat2, b: Mat2, t: number): Mat2 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
    a[3] + (b[3] - a[3]) * t,
  ];
}

export function determinant(m: Mat2): number {
  return m[0] * m[3] - m[1] * m[2];
}

export function rotation(theta: number): Mat2 {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return [c, -s, s, c];
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/**
 * The named transformations the hero morphs through as you scroll.
 * Each is a recognisable linear map, shown with its live matrix readout.
 */
export const TRANSFORMS: { name: string; m: Mat2 }[] = [
  { name: "IDENTITY", m: [1, 0, 0, 1] },
  { name: "ROTATION", m: rotation(Math.PI / 5) },
  { name: "SHEAR", m: [1, 0.75, 0, 1] },
  { name: "SCALE", m: [1.4, 0, 0, 0.65] },
  { name: "REFLECTION", m: [0, 1, 1, 0] },
  { name: "SHEAR+ROTATE", m: multiplyMat(rotation(-Math.PI / 6), [1, 0.5, 0.2, 1]) },
];

/* ============================================================
   3D helpers — for the hero's 2D→3D reveal. Matrices are
   row-major: [a,b,c, d,e,f, g,h,i] === rows (a,b,c)/(d,e,f)/(g,h,i).
   ============================================================ */

export type Vec3 = [number, number, number];
// prettier-ignore
export type Mat3 = [
  number, number, number,
  number, number, number,
  number, number, number,
];

// prettier-ignore
export const IDENTITY3: Mat3 = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
];

export function lerpMat3(a: Mat3, b: Mat3, t: number): Mat3 {
  return a.map((v, i) => v + (b[i] - v) * t) as Mat3;
}

/** Row-major 3×3 product (a then b applied as b·a? no — returns a·b). */
export function multiplyMat3(a: Mat3, b: Mat3): Mat3 {
  const r = new Array(9) as number[];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      r[row * 3 + col] =
        a[row * 3 + 0] * b[0 * 3 + col] +
        a[row * 3 + 1] * b[1 * 3 + col] +
        a[row * 3 + 2] * b[2 * 3 + col];
    }
  }
  return r as Mat3;
}

/** Signed volume scaling factor of the map (rule of Sarrus). */
export function det3(m: Mat3): number {
  return (
    m[0] * (m[4] * m[8] - m[5] * m[7]) -
    m[1] * (m[3] * m[8] - m[5] * m[6]) +
    m[2] * (m[3] * m[7] - m[4] * m[6])
  );
}

export function rotX3(t: number): Mat3 {
  const c = Math.cos(t), s = Math.sin(t);
  // prettier-ignore
  return [1, 0, 0,  0, c, -s,  0, s, c];
}
export function rotY3(t: number): Mat3 {
  const c = Math.cos(t), s = Math.sin(t);
  // prettier-ignore
  return [c, 0, s,  0, 1, 0,  -s, 0, c];
}
export function rotZ3(t: number): Mat3 {
  const c = Math.cos(t), s = Math.sin(t);
  // prettier-ignore
  return [c, -s, 0,  s, c, 0,  0, 0, 1];
}

/**
 * The 3D maps the hero walks through after the reveal. Each is a recognisable
 * linear transformation; the last one is *singular* (det = 0) so space collapses
 * onto a plane — the dramatic "rank drop" the volume readout makes visible.
 */
export const TRANSFORMS3: { name: string; m: Mat3 }[] = [
  { name: "IDENTITY", m: IDENTITY3 },
  { name: "ROTATE Y", m: rotY3(Math.PI / 4) },
  // prettier-ignore
  { name: "SHEAR XZ", m: [1, 0, 0.7,  0, 1, 0,  0, 0, 1] },
  // prettier-ignore
  { name: "SCALE", m: [1.45, 0, 0,  0, 0.6, 0,  0, 0, 1.25] },
  // a tilt about X composed with a yaw about Y — an off-axis spin
  { name: "ROTATE XYZ", m: multiplyMat3(rotX3(Math.PI / 6), rotY3(Math.PI / 4)) },
  // prettier-ignore
  { name: "PROJECT → PLANE (det 0)", m: [1, 0, 0,  0, 1, 0,  0, 0, 0] },
];
