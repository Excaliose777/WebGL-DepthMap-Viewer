export const fragment = `
precision mediump float;
#include <packing>


uniform float cameraNear;
uniform float cameraFar;
uniform sampler2D u_texture;
uniform sampler2D u_depthTexture;
varying vec2 vUv;

// float LinearizeDepth(float depth) 
// {
//     float z = depth * 2.0 - 1.0;
//     return (2.0 * near * far) / (far + near - z * (far - near));	
// }

void main(){
  // float depth = LinearizeDepth(gl_FragCoord.z) / far;
  float depth = texture2D(u_texture, vUv).x;
  gl_FragColor = vec4(vec3(depth),1.0);
}

`;
