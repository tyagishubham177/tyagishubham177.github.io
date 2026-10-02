import { createContext, useContext, useEffect, useRef, useState } from 'react';
import './product-sculpture.css';

const MotionContext = createContext({ enabled: true, reducedMotion: true, toggle: () => {} });
export const useSculptureMotion = () => useContext(MotionContext);

export function SculptureMotionProvider({ children }) {
  const [enabled, setEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem('portfolio-motion');
      if (saved === 'on' || saved === 'off') setEnabled(saved === 'on');
    } catch { /* Storage may be blocked; the in-memory toggle remains usable. */ }
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media?.matches ?? false);
    update();
    if (media?.addEventListener) media.addEventListener('change', update);
    else media?.addListener?.(update);
    return () => {
      if (media?.removeEventListener) media.removeEventListener('change', update);
      else media?.removeListener?.(update);
    };
  }, []);
  const toggle = () => setEnabled(value => {
    const next = !value;
    try { window.sessionStorage.setItem('portfolio-motion', next ? 'on' : 'off'); }
    catch { /* Private browsing and storage policies must not block the toggle. */ }
    return next;
  });
  return <MotionContext.Provider value={{ enabled, reducedMotion, toggle }}>
    {children}
  </MotionContext.Provider>;
}

// Conceptual geometry only: these objects make no claims about shipped products.
function buildSculpture(T, variant, resources) {
  const group = new T.Group();
  const keep = resource => { resources.add(resource); return resource; };
  const cream = keep(new T.MeshStandardMaterial({ color: 0xece0c9, roughness: 1, metalness: 0 }));
  const ink = keep(new T.LineBasicMaterial({ color: 0x302e29 }));
  const red = keep(new T.MeshStandardMaterial({ color: 0xc94031, roughness: 0.8 }));
  const add = (geometry, position, rotation = [0, 0, 0], material = cream, outlined = true) => {
    keep(geometry);
    const mesh = new T.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    if (outlined) mesh.add(new T.LineSegments(keep(new T.EdgesGeometry(geometry, 30)), ink));
    group.add(mesh);
    return mesh;
  };
  const slab = (size, position, rotation) => add(new T.BoxGeometry(...size), position, rotation);
  const ring = (radius, position, rotation) => add(new T.TorusGeometry(radius, 0.035, 8, 72), position, rotation, cream, false);
  let ball = [1.2, 0.85, 0.5];
  if (variant === 'hospital') {
    for (let i = 0; i < 4; i++) slab([0.85, 0.12, 1.15], [-1.35 + i * 0.88, -0.6 + i * 0.4, 0], [0, 0.12 * i, 0]);
    ball = [1.3, 1.02, 0];
  } else if (variant === 'platform') {
    slab([1.6, 0.2, 1.7], [0, 0, 0]);
    for (let i = 0; i < 5; i++) slab([0.09, 0.65, 1.2], [-0.6 + i * 0.3, -0.42, 0]);
    for (let i = 0; i < 3; i++) {
      const angle = i * Math.PI * 2 / 3;
      slab([0.65, 0.12, 0.65], [Math.cos(angle) * 1.6, 0.38, Math.sin(angle) * 1.6]);
    }
    ball = [0.2, 0.6, 0.1];
  } else if (variant === 'engagement') {
    ring(1.25, [0, 0, 0], [Math.PI / 2, 0, 0]);
    slab([1.1, 0.1, 0.7], [-0.45, -0.18, 0.15], [0, -0.3, 0]);
    ball = [1.1, 0.3, 0.6];
  } else {
    ring(1.45, [0, 0, 0], [0.6, 0.2, 0.3]);
    ring(1.15, [0, 0, 0], [1.3, 0.6, -0.4]);
    slab([1.7, 0.12, 0.85], [0, -0.35, 0], [0, 0.45, -0.15]);
    slab([0.75, 0.1, 1.15], [-0.65, 0.5, -0.2], [0.25, -0.25, 0.2]);
  }
  add(new T.SphereGeometry(variant === 'hero' ? 0.38 : 0.32, 24, 16), ball, undefined, red, false);
  return group;
}

export function ProductSculpture({ variant = 'hero', className = '' }) {
  const kind = ['hero', 'hospital', 'platform', 'engagement'].includes(variant) ? variant : 'hero';
  const wrapper = useRef(null);
  const { enabled, reducedMotion } = useSculptureMotion();
  const [rendererType, setRendererType] = useState('fallback');

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const baseExtent = kind === 'platform' ? 2.2 : kind === 'hospital' ? 2 : 1.75;
    // A new variant or global motion setting must immediately restore the fallback.
    setRendererType('fallback');
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let disposed = false, near = false, visible = false, failed = false;
    let renderer, scene, camera, sculpture, canvas, frame = 0, generation = 0, pending = false;
    let pointer = [0, 0];
    const resources = new Set();
    const allowed = () => enabled && !reducedMotion && !media?.matches && !document.hidden && !failed;
    const cancel = () => { cancelAnimationFrame(frame); frame = 0; };
    const release = () => {
      generation++;
      pending = false;
      cancel();
      canvas?.removeEventListener('webglcontextlost', onLoss);
      for (const resource of resources) resource.dispose();
      resources.clear();
      renderer?.dispose();
      renderer?.forceContextLoss();
      canvas?.remove();
      renderer = scene = camera = sculpture = canvas = undefined;
      if (!disposed) setRendererType('fallback');
    };
    const fail = () => { failed = true; release(); };
    function onLoss(event) { event.preventDefault(); fail(); }
    const draw = () => {
      frame = 0;
      if (!renderer || !allowed() || !visible || disposed) return;
      try {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight));
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(rect.width, rect.height, false);
        const aspect = rect.width / rect.height;
        const extent = Math.max(baseExtent, baseExtent / aspect);
        camera.left = -extent * aspect; camera.right = extent * aspect;
        camera.top = extent; camera.bottom = -extent;
        camera.updateProjectionMatrix();
        sculpture.rotation.set(0.2 + pointer[1] * 0.1, -0.35 + progress * 0.45 + pointer[0] * 0.12, -0.08);
        sculpture.position.y = progress * 0.16;
        renderer.render(scene, camera);
        setRendererType('webgl');
      } catch { fail(); }
    };
    const schedule = () => {
      if (!frame && renderer && visible && allowed()) frame = requestAnimationFrame(draw);
    };
    const initialize = async () => {
      if (pending || renderer || !near || !allowed() || disposed) return;
      pending = true;
      const token = ++generation;
      try {
        const T = await import('three');
        if (disposed || token !== generation || !near || !allowed()) return;
        canvas = document.createElement('canvas');
        canvas.className = 'product-sculpture__canvas';
        canvas.setAttribute('aria-hidden', 'true');
        canvas.addEventListener('webglcontextlost', onLoss);
        renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0);
        scene = new T.Scene();
        camera = new T.OrthographicCamera(-baseExtent, baseExtent, baseExtent, -baseExtent, 0.1, 40);
        camera.position.set(4, 3.5, 6); camera.lookAt(0, 0, 0);
        scene.add(new T.HemisphereLight(0xfff7e9, 0x8a7b65, 2.6));
        const light = new T.DirectionalLight(0xffffff, 3);
        light.position.set(-3, 6, 5); scene.add(light);
        sculpture = buildSculpture(T, kind, resources); scene.add(sculpture);
        element.appendChild(canvas);
        schedule();
      } catch { if (!disposed && token === generation) fail(); }
      finally { if (token === generation) pending = false; }
    };
    const reconcile = () => {
      if (!near || !allowed()) { if (renderer || pending || canvas) release(); return; }
      initialize(); schedule();
    };
    const measure = () => {
      const rect = element.getBoundingClientRect();
      near = rect.bottom > -100 && rect.top < window.innerHeight + 100 && rect.right > -100 && rect.left < window.innerWidth + 100;
      visible = rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
      if (!visible) cancel();
      reconcile();
    };
    const move = event => {
      const rect = element.getBoundingClientRect();
      pointer = [Math.max(-1, Math.min(1, (event.clientX - rect.left) / (rect.width || 1) * 2 - 1)),
        Math.max(-1, Math.min(1, (event.clientY - rect.top) / (rect.height || 1) * 2 - 1))];
      schedule();
    };
    const leave = () => { pointer = [0, 0]; schedule(); };
    // Bounding checks also cover browsers without IntersectionObserver.
    const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(measure, { rootMargin: '100px' }) : null;
    observer?.observe(element);
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    resize?.observe(element);
    window.addEventListener('scroll', measure, { passive: true, capture: true });
    window.addEventListener('resize', measure, { passive: true });
    document.addEventListener('visibilitychange', measure);
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', leave);
    if (media?.addEventListener) media.addEventListener('change', measure);
    else media?.addListener?.(measure);
    measure();
    return () => {
      disposed = true;
      observer?.disconnect(); resize?.disconnect();
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', measure);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      if (media?.removeEventListener) media.removeEventListener('change', measure);
      else media?.removeListener?.(measure);
      release();
    };
  }, [kind, enabled, reducedMotion]);

  return <div ref={wrapper} className={`product-sculpture ${className}`} data-variant={kind}
    data-renderer={rendererType} aria-hidden="true">
    <div className="product-sculpture__fallback">
      <span className="product-sculpture__orbit product-sculpture__orbit--one" />
      <span className="product-sculpture__orbit product-sculpture__orbit--two" />
      {[0, 1, 2, 3, 4].map(index => <span key={index} className={`product-sculpture__plane product-sculpture__plane--${index}`} />)}
      <span className="product-sculpture__ball" />
    </div>
  </div>;
}
