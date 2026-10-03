import { studies, pathForStudy } from './case-studies.js';
import { useEffect, useRef } from 'react';

export function PageOrientation({ kind, study, path }) {
  const bar = useRef(null);
  useEffect(() => {
    const element = bar.current;
    if (!element) return;
    const frame = element.closest('.page-frame');
    const header = frame.querySelector('.site-header');
    const measure = () => {
      frame.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
      frame.style.setProperty('--orientation-height', `${element.getBoundingClientRect().height}px`);
    };
    measure();
    if (!window.ResizeObserver) return;
    const observer = new ResizeObserver(measure);
    observer.observe(element); observer.observe(header);
    return () => observer.disconnect();
  }, [kind]);
  if (kind === 'home' || kind === 'not-found') return null;
  const name = study?.shortTitle || { work: 'Work', lab: 'Build Lab', about: 'About' }[kind];
  return <div className="page-orientation" ref={bar}><div className="page-orientation__inner page-shell">
    <nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>{study && <><a href="/work/">Work</a><span aria-hidden="true">/</span></>}<span aria-current="page">{name}</span></nav>
    {study ? <details className="case-switcher"><summary>Switch case</summary><div className="case-switcher__links">{studies.map(item => <a key={item.slug} href={pathForStudy(item)} aria-current={path === pathForStudy(item) ? 'page' : undefined}><span>{item.number}</span>{item.shortTitle}</a>)}</div></details> : <span className="page-orientation__type">{{ work: 'Product collection', lab: 'Public code / explorations', about: 'Profile' }[kind]}</span>}
  </div></div>;
}
