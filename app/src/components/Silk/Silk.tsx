import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

// Vertex Shader
const vert = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}
`;

// Fragment Shader
const frag = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;

varying vec2 vUv;

void main() {
    float mr = min(uResolution.x, uResolution.y);
    vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

float time = mod(uTime, 100.0);

float d = -time * 1.2;
float a = 0.0;
for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
}
d += time * 1.0;

    vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);

    // Convert to grayscale
    float gray = dot(col, vec3(0.299, 0.587, 0.114));

    // Map [0.0, 1.0] → [0.231, 0.878] (darkest to lightest desired tone)
    float minGray = 0.231;
    float maxGray = 0.878;
    gray = mix(minGray, maxGray, gray); // Remap brightness range

    // Warm tint
    vec3 warmTint = vec3(1.0, 0.95, 0.9);
    col = mix(vec3(gray), warmTint * gray, 0.2); // 20% warmth

    gl_FragColor = vec4(col, 1.0);
}
`;

interface NovatrixProps {}

export const Novatrix: React.FC<NovatrixProps> = () => {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctnDom.current) {
      return;
    }

    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
    }
    window.addEventListener("resize", resize, false);
    resize();

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
        uResolution: {
          value: [
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ],
        },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animateId: number;

    animateId = requestAnimationFrame(update);

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.0003;
      renderer.render({ scene: mesh });
    }

    ctn.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={ctnDom} className="gradient-canvas h-full w-full"></div>;
};

const Silk = () => {
  return (
    <div className="h-screen w-screen">
      <Novatrix />
    </div>
  );
};

export default Silk;
