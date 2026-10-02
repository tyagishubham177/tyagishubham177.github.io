import { useEffect, useId, useRef, useState } from 'react';
import './scroll-story.css';
import { useSculptureMotion } from './ProductSculpture.jsx';

const stages = [
  ['Understand the workflow', 'Start with the people, the context, and the friction. Find the problem worth solving before choosing a solution.'],
  ['Make the trade-off', 'Bring the constraints into focus. Choose what matters most, and be explicit about what can wait.'],
  ['Build the useful thing', 'Turn a clear decision into something people can use. Learn from the response, then make it better.'],
];
const clamp = (value) => Math.max(0, Math.min(1, value));
const mix = (a, b, t) => a + (b - a) * t;

export function ScrollStory() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const hostRef = useRef(null);
  const id = useId();
  // Start static on the server and during hydration; never flash unwanted motion.
  const {reducedMotion,enabled:motionEnabled,toggle} = useSculptureMotion();
  const [rendererUnavailable, setRendererUnavailable] = useState(false);
  const [rendererState, setRendererState] = useState('fallback');
  const [fallbackReason, setFallbackReason] = useState('Static illustration. All three ideas are below.');
  const animate = motionEnabled && !reducedMotion && !rendererUnavailable;

  useEffect(() => {
    const host = hostRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!host || !track || !section) return undefined;
    setRendererState('fallback');
    host.dataset.progress = '0.000';
    section.dataset.progress = '0.000';
    if (!animate) {
      if (!rendererUnavailable) setFallbackReason(reducedMotion
        ? 'Reduced motion is on. All three ideas remain available below.'
        : 'Motion is off. All three ideas remain available below.');
      return undefined;
    }

    let stopped = false;
    let frame = 0;
    let visible = false;
    let renderer;
    let intersectionObserver;
    let resizeObserver;
    const resources = new Set();
    const removers = [];
    const own = (resource) => { resources.add(resource); return resource; };
    const listen = (target, event, listener, options) => {
      target.addEventListener(event, listener, options);
      removers.push(() => target.removeEventListener(event, listener, options));
    };
    const release = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(frame);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      removers.forEach((remove) => remove());
      resources.forEach((resource) => resource.dispose());
      resources.clear();
      if (renderer) {
        renderer.domElement.dataset.state = 'disposed';
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      }
    };
    const fallback = (reason) => {
      if (stopped) return;
      release();
      setRendererState('fallback');
      setRendererUnavailable(true);
      setFallbackReason(reason);
    };

    // The renderer is intentionally isolated in a lazy chunk, never evaluated in SSR.
    import('three').then((THREE) => {
      if (stopped) return;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0xf7f4ed, 0);
        const canvas = renderer.domElement;
        canvas.setAttribute('aria-hidden', 'true');
        canvas.setAttribute('tabindex', '-1');
        canvas.dataset.state = 'ready';
        host.appendChild(canvas);
        listen(canvas, 'webglcontextlost', (event) => {
          event.preventDefault();
          fallback('The 3D view is unavailable. The illustration and all three ideas remain available.');
        });

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
        camera.position.set(0, 0.2, 10);
        camera.lookAt(0, 0, 0);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x817260, 2.6));
        const key = new THREE.DirectionalLight(0xffffff, 3.2);
        key.position.set(-3, 6, 5);
        scene.add(key);
        const sculpture = new THREE.Group();
        scene.add(sculpture);
        const paperGeometry = own(new THREE.BoxGeometry(2.5, 1.65, 0.045));
        const paper = own(new THREE.MeshStandardMaterial({ color: 0xfffcf3, roughness: 0.92 }));
        const warmPaper = own(new THREE.MeshStandardMaterial({ color: 0xe7dfcf, roughness: 0.94 }));
        const lineGeometry = own(new THREE.EdgesGeometry(paperGeometry));
        const lineMaterial = own(new THREE.LineBasicMaterial({ color: 0x17202b, transparent: true, opacity: 0.28 }));
        const sheets = Array.from({ length: 5 }, (_, i) => {
          const sheet = new THREE.Mesh(paperGeometry, i % 2 ? warmPaper : paper);
          sheet.add(new THREE.LineSegments(lineGeometry, lineMaterial));
          sculpture.add(sheet);
          return sheet;
        });
        const sphere = new THREE.Mesh(
          own(new THREE.SphereGeometry(0.49, 32, 24)),
          own(new THREE.MeshStandardMaterial({ color: 0xc94031, roughness: 0.42, metalness: 0.06 })),
        );
        sculpture.add(sphere);

        // Three authored poses: scattered findings, ranked planes, a coherent stack.
        const scattered = [
          [-1.45, 1.4, -0.4, 0.5, -0.65, -0.5],
          [1.45, 0.9, -0.7, -0.55, 0.45, 0.45],
          [-1.1, -0.55, 0.2, 0.65, 0.4, -0.2],
          [1.3, -1.2, -0.15, -0.35, -0.55, 0.65],
          [0.1, 0.2, -1.2, 0.25, 0.6, -0.65],
        ];
        const aligned = sheets.map((_, i) => [(i - 2) * 0.22, (2 - i) * 0.57, -i * 0.25, -0.55, 0.25, -0.12]);
        const delivered = sheets.map((_, i) => [0, (2 - i) * 0.16 - 0.3, -i * 0.15, -0.95, 0.12, 0]);
        let lastWidth = 0;
        let lastHeight = 0;
        const render = () => {
          frame = 0;
          if (stopped || !visible || document.hidden) return;
          try {
            const rect = track.getBoundingClientRect();
            const progress = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
            host.dataset.progress = progress.toFixed(3);
            section.dataset.progress = progress.toFixed(3);
            section.dataset.stage = String(Math.min(2, Math.floor(progress * 3)) + 1);
            const width = host.clientWidth;
            const height = host.clientHeight;
            if (!width || !height) return;
            if (width !== lastWidth || height !== lastHeight) {
              renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
              renderer.setSize(width, height, false);
              camera.aspect = width / height;
              // Fit the scattered pose on portrait screens without cropping.
              camera.position.z = Math.max(10, 7 / camera.aspect);
              camera.updateProjectionMatrix();
              lastWidth = width;
              lastHeight = height;
            }
            const from = progress < 0.5 ? scattered : aligned;
            const to = progress < 0.5 ? aligned : delivered;
            const raw = progress < 0.5 ? progress * 2 : (progress - 0.5) * 2;
            const t = raw * raw * (3 - 2 * raw);
            sheets.forEach((sheet, i) => {
              sheet.position.set(...from[i].slice(0, 3).map((value, axis) => mix(value, to[i][axis], t)));
              sheet.rotation.set(...from[i].slice(3).map((value, axis) => mix(value, to[i][axis + 3], t)));
            });
            sphere.position.set(mix(1.7, 0.65, progress), mix(1.55, 0.45, progress), mix(0.8, 1.1, progress));
            sculpture.rotation.y = mix(-0.18, 0.22, progress);
            renderer.render(scene, camera);
            if (canvas.dataset.state !== 'webgl') {
              canvas.dataset.state = 'webgl';
              setRendererState('webgl');
            }
          } catch {
            fallback('The 3D view could not be drawn. The illustration and all three ideas remain available.');
          }
        };
        const schedule = () => {
          if (!stopped && visible && !document.hidden && !frame) frame = requestAnimationFrame(render);
        };
        const cancel = () => { cancelAnimationFrame(frame); frame = 0; };
        listen(window, 'scroll', schedule, { passive: true });
        listen(window, 'resize', schedule, { passive: true });
        listen(document, 'visibilitychange', () => document.hidden ? cancel() : schedule());
        if ('ResizeObserver' in window) {
          resizeObserver = new ResizeObserver(schedule);
          resizeObserver.observe(host);
          resizeObserver.observe(track);
        }
        if ('IntersectionObserver' in window) {
          intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) schedule(); else cancel();
          });
          intersectionObserver.observe(host);
        } else {
          const checkVisibility = () => {
            const rect = host.getBoundingClientRect();
            visible = rect.bottom > 0 && rect.top < window.innerHeight;
            if (visible) schedule(); else cancel();
          };
          listen(window, 'scroll', checkVisibility, { passive: true });
          listen(window, 'resize', checkVisibility, { passive: true });
          checkVisibility();
        }
      } catch {
        fallback('3D is not supported here. The illustration and all three ideas remain available.');
      }
    }).catch(() => fallback('The 3D view could not load. The illustration and all three ideas remain available.'));
    return release;
  }, [animate, reducedMotion, rendererUnavailable]);

  return (
    <section className="scroll-story" ref={sectionRef} data-testid="scroll-story"
      data-motion={animate ? 'on' : 'off'} data-stage="1" aria-labelledby={`${id}-title`}>
      <header className="scroll-story__header">
        <div>
          <p className="scroll-story__eyebrow">A way of working</p>
          <h2 id={`${id}-title`}>From possibility<br />to something useful<span>.</span></h2>
          <p className="scroll-story__intro">A product philosophy in three moves. A concept, not a project result.</p>
        </div>
        <div className="scroll-story__control">
          <button type="button" aria-pressed={animate} disabled={reducedMotion || rendererUnavailable}
            aria-describedby={`${id}-motion`} onClick={toggle}>
            {animate ? 'Turn motion off' : 'Turn motion on'}
          </button>
          <p id={`${id}-motion`}>{reducedMotion ? 'Your reduced-motion preference is respected.' : 'Shared across all scenes. Scroll at your own pace.'}</p>
        </div>
      </header>
      <div className="scroll-story__track" ref={trackRef}>
        <figure className="scroll-story__visual">
          <div className="scroll-story__canvas" ref={hostRef} data-renderer={rendererState} data-progress="0.000">
            <img className="scroll-story__fallback" src="/assets/hero-illustration.png" alt=""
              width="800" height="800" loading="lazy" />
          </div>
          <figcaption>{rendererState === 'webgl'
            ? 'Discovery → alignment → delivery. A conceptual sculpture.'
            : fallbackReason}</figcaption>
        </figure>
        <ol className="scroll-story__stages">
          {stages.map(([title, description], index) => (
            <li className="scroll-story__stage" key={title}>
              <span className="scroll-story__number" aria-hidden="true">0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ScrollStory;
