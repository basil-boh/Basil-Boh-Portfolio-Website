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
