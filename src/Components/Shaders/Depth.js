import * as THREE from "three";

const depthFragmentShader = `
precision mediump float;
#include <packing>


uniform float cameraNear;
uniform float cameraFar;
uniform sampler2D uTexture;
uniform sampler2D u_depthTexture;
varying vec2 vUv;

float LinearizeDepth(float depth) 
{
    float z = depth * 2.0 - 1.0;
    return (2.0 * cameraNear * cameraFar) / (cameraFar + cameraNear - z * (cameraFar - cameraNear));	
}

void main(){
  float depth = LinearizeDepth(gl_FragCoord.z) / cameraFar;
  // float depth = texture2D(u_texture, vUv).x;
  gl_FragColor = vec4(vec3(depth),1.0);
}

`;

const depthVertexShader = `
varying vec2 vUv;


void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

class DepthMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTexture: {
          value: null,
        },
        u_depthTexture: { value: new THREE.DepthTexture() },
        cameraNear: { value: null },
        cameraFar: { value: null },
        winResolution: {
          value: new THREE.Vector2(
            window.innerWidth,
            window.innerHeight
          ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
        },
      },
      vertexShader: depthVertexShader,
      fragmentShader: depthFragmentShader,
      blending: THREE.NoBlending,
      depthWrite: false,
      depthTest: false,
    });
  }
}

export default DepthMaterial;
