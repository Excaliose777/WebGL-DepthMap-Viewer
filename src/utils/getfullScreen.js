import { BufferGeometry, Float32BufferAttribute } from "three";

const getFullscreenTriangle = () => {
  const geometry = new BufferGeometry();

  const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
  const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

  geometry.setAttribute("position", new Float32BufferAttribute(positions, 2));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));

  return geometry;
};

export default getFullscreenTriangle;
