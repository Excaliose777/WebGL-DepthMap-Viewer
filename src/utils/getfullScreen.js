import { BufferGeometry, Float32BufferAttribute, BufferAttribute } from "three";

const getFullscreen = () => {
  const geometry = new BufferGeometry();

  const positions = new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0]);

  const uvs = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

  const indices = new Uint16Array([0, 2, 1, 1, 2, 3]);

  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(new BufferAttribute(indices, 1));

  return geometry;
};

export default getFullscreen;
