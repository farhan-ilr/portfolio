import { ShaderMaterial } from 'three'

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Lighting-independent portrait: blends two neighbouring gaze frames, then a closed-eye
// frame for blinks, and feathers the cropped bottom/side edges into the page background.
const fragment = /* glsl */ `
  uniform sampler2D uA;
  uniform sampler2D uB;
  uniform sampler2D uBlink;
  uniform float uMix;
  uniform float uBlinkAmt;
  varying vec2 vUv;
  vec4 premul(vec4 c) { return vec4(c.rgb * c.a, c.a); }
  void main() {
    vec4 c = mix(premul(texture2D(uA, vUv)), premul(texture2D(uB, vUv)), uMix);
    c = mix(c, premul(texture2D(uBlink, vUv)), uBlinkAmt);
    float fadeBottom = smoothstep(0.0, 0.2, vUv.y);
    float fadeSide = smoothstep(0.0, 0.05, vUv.x) * smoothstep(0.0, 0.05, 1.0 - vUv.x);
    c *= fadeBottom * fadeSide;
    gl_FragColor = vec4(c.a > 0.0001 ? c.rgb / c.a : vec3(0.0), c.a);
    #include <colorspace_fragment>
  }
`

export function createCharacterMaterial() {
  const m = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uA: { value: null }, uB: { value: null }, uBlink: { value: null },
      uMix: { value: 0 }, uBlinkAmt: { value: 0 },
    },
  })
  m.visible = false // shown once the centre frame has loaded
  return m
}
