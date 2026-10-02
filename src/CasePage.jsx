import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { studies, pathForStudy } from "./case-studies.js";
import "./case-pages.css";

export function CasePage({ study }) {
  const [active, setActive] = useState(study.sections[0].id);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - innerHeight;
      setProgress(height > 0 ? Math.min(100, Math.max(0, scrollY / height * 100)) : 0);
      const current = study.sections.filter(section => document.getElementById(section.id)?.getBoundingClientRect().top < innerHeight * .4).at(-1);
      setActive(current?.id || study.sections[0].id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [study]);
  const next = studies[(studies.indexOf(study) + 1) % studies.length];
  return <main id="main" className="case-page">
    <div className="reading-progress" aria-hidden="true" style={{ transform: `scaleX(${progress / 100})` }} />
    <header className="case-hero page-shell" id="top">
      <a className="back-link" href="/work/"><ArrowLeft size={18} aria-hidden="true" /> All product work</a>
      <p className="section-label">{study.number} / {study.category}</p>
      <h1>{study.title}</h1><p className="case-deck">{study.description}</p>
      <dl className="case-meta"><div><dt>My role</dt><dd>{study.role}</dd></div><div><dt>Contribution</dt><dd>{study.focus}</dd></div><div><dt>Delivery stage</dt><dd>{study.stage}</dd></div></dl>
    </header>
    <div className="case-intro page-shell"><p className="case-intro__insight">{study.summary}</p><div><span className="evidence-label">Account & evidence</span><p>{study.boundary}</p></div></div>
    <div className="case-layout page-shell">
      <aside className="case-toc"><nav aria-label="Case study chapters"><p className="eyebrow">Inside this case</p>{study.sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}><span>{String(index + 1).padStart(2,"0")}</span>{section.label}</a>)}</nav><p className="case-source">Prepared from<br />{study.sourceVersion}<br /><span>Customer details anonymised.</span></p></aside>
      <article className="case-article">{study.sections.map((section,index) => <section className="case-chapter reveal" id={section.id} key={section.id}>
        <p className="section-label">{String(index + 1).padStart(2,"0")} / {section.label}</p><h2>{section.title}</h2>
        {section.paragraphs.map((paragraph,i) => <p key={i}>{paragraph}</p>)}
        {section.facts && <dl className="case-facts">{section.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
        {section.table && <div className="case-table-wrap" role="region" aria-label={section.table.caption} tabIndex={0}><table><caption>{section.table.caption}</caption><thead><tr>{section.table.heads.map(head=><th key={head} scope="col">{head}</th>)}</tr></thead><tbody>{section.table.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th key={j} scope="row">{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
        {section.flow && <ol className="case-flow">{section.flow.map((step,i)=><li key={step.title}><span className="case-flow__number">{String(i+1).padStart(2,"0")}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>}
        {section.note && <p className="case-note"><span>Evidence note</span>{section.note}</p>}
        {section.quote && <blockquote>{section.quote}</blockquote>}
        {section.artifacts && <div className="case-artifacts"><h3>Explanatory artifacts on this page</h3><ul>{section.artifacts.map(item=><li key={item}>{item}</li>)}</ul><p>These are public editorial reconstructions, not downloads of original internal project records.</p></div>}
      </section>)}</article>
    </div>
    <section className="next-case page-shell"><div><p className="section-label">Keep exploring</p><a href={pathForStudy(next)}><h2>{next.shortTitle}</h2><ArrowUpRight size={40} aria-hidden="true" /></a></div><a className="text-link" href="/work/">All product work <ArrowRight size={20} aria-hidden="true" /></a></section>
  </main>;
}
