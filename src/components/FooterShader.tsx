import {useEffect, useRef} from 'react';
import * as THREE from 'three';

type ShaderRefs = {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  mesh: THREE.Mesh | null;
  uniforms: {
    resolution: {value: THREE.Vector2};
    time: {value: number};
    xScale: {value: number};
    yScale: {value: number};
    distortion: {value: number};
    colorA: {value: THREE.Vector3};
    colorB: {value: THREE.Vector3};
    colorC: {value: THREE.Vector3};
    colorD: {value: THREE.Vector3};
  } | null;
  animationId: number | null;
  resizeObserver: ResizeObserver | null;
};

const INITIAL_REFS: ShaderRefs = {
  scene: null,
  camera: null,
  renderer: null,
  mesh: null,
  uniforms: null,
  animationId: null,
  resizeObserver: null,
};

function hexToVec3(hex: string): THREE.Vector3 {
  const color = new THREE.Color(hex);
  return new THREE.Vector3(color.r, color.g, color.b);
}

const FooterShader = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const refs = useRef<ShaderRefs>({...INITIAL_REFS});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return () => undefined;
    }

    const current = refs.current;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform vec3 colorC;
      uniform vec3 colorD;

      vec3 blendColors(vec3 a, vec3 b, float t) {
        return mix(a, b, clamp(t, 0.0, 1.0));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float waveBase = sin((p.x + time * 0.6) * xScale) * yScale;
        float r = 0.04 / abs(p.y + waveBase + sin((rx + time) * xScale) * yScale);
        float g = 0.04 / abs(p.y + waveBase + sin((gx + time * 1.1) * xScale) * yScale);
        float b = 0.04 / abs(p.y + waveBase + sin((bx + time * 0.9) * xScale) * yScale);

        vec3 filament = clamp(vec3(r, g, b), 0.0, 1.0);

        float horizontalMix = smoothstep(-1.0, 1.0, p.x);
        float verticalMix = smoothstep(-0.8, 0.6, p.y);
        float pulse = 0.5 + 0.5 * sin(time * 0.2 + p.x * 1.3);

        vec3 gradient = blendColors(colorA, colorB, horizontalMix);
        gradient = blendColors(gradient, colorC, verticalMix);
        gradient = blendColors(gradient, colorD, pulse * 0.6);

        vec3 finalColor = gradient + filament * 0.32;
        finalColor = clamp(finalColor, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: false});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(0x000000), 0);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

    const uniforms = {
      resolution: {value: new THREE.Vector2(1, 1)},
      time: {value: 0},
      xScale: {value: 1.0},
      yScale: {value: 0.55},
      distortion: {value: 0.06},
      colorA: {value: hexToVec3('#fdced3')},
      colorB: {value: hexToVec3('#fadedd')},
      colorC: {value: hexToVec3('#c8c8d3')},
      colorD: {value: hexToVec3('#9a98b1')},
    };

    const positions = new Float32Array([
      -1, -1, 0,
       1, -1, 0,
      -1,  1, 0,
       1, -1, 0,
      -1,  1, 0,
       1,  1, 0,
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    current.scene = scene;
    current.renderer = renderer;
    current.camera = camera;
    current.mesh = mesh;
    current.uniforms = uniforms;

    const resize = () => {
      if (!canvas.parentElement) {
        return;
      }
      const {clientWidth, clientHeight} = canvas.parentElement;
      const width = clientWidth || window.innerWidth || 1;
      const height = clientHeight || window.innerHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.resolution.value.set(width, height);
    };

    const render = () => {
      uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      current.animationId = requestAnimationFrame(render);
    };

    resize();
    render();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement ?? canvas);
    current.resizeObserver = resizeObserver;

    const onWindowResize = () => resize();
    window.addEventListener('resize', onWindowResize);

    return () => {
      if (current.animationId) {
        cancelAnimationFrame(current.animationId);
      }
      window.removeEventListener('resize', onWindowResize);
      resizeObserver.disconnect();

      if (current.mesh) {
        scene.remove(current.mesh);
        current.mesh.geometry.dispose();
        const materialRef = current.mesh.material;
        if (materialRef instanceof THREE.Material) {
          materialRef.dispose();
        }
      }

      renderer.dispose();
      current.scene = null;
      current.camera = null;
      current.renderer = null;
      current.mesh = null;
      current.uniforms = null;
      current.animationId = null;
      current.resizeObserver = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="awa-footer-shader" />;
};

export default FooterShader;
