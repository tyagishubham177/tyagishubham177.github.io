import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo, ShoppingCartSimple, Spade, X, List } from "@phosphor-icons/react";

const email = "tyagi.shubham177@gmail.com";
const linkedin = "https://www.linkedin.com/in/tyagishubham2803/";

const cases = [
  { id: "hospital-intake", title: "Hospital intake workflows", label: "Healthcare · Real work", image: "/assets/healthcare-architecture.png", alt: "Architectural study in warm terracotta and pale blue", summary: "Making a fragmented patient-intake process clearer for care teams while keeping essential controls in view." },
  { id: "workforce-platform", title: "Enterprise workforce workflows", label: "Enterprise platform · Real work", image: "/assets/enterprise-architecture.png", alt: "Modern architectural planes in charcoal and warm light", summary: "Improving how distributed teams see capacity, match people to work, and navigate a complex allocation platform." },
];

function Label({ children }) { return <p className="section-label">{children}<span aria-hidden="true" /></p>; }

function CaseCard({ study }) {
  return <article className="case-card reveal">
    <img className="case-card__image" src={study.image} alt={study.alt} loading="lazy" />
    <div className="case-card__body">
      <h3>{study.title}</h3>
      <p className="eyebrow case-card__label">{study.label}</p>
      <p>{study.summary}</p>
      <a className="text-link" href={`#${study.id}`}>Read story <ArrowRight aria-hidden="true" size={19} /></a>
    </div>
  </article>;
}

function BuildProject({ name, description, href, icon: Icon }) {
  return <a className="build-project" href={href} target="_blank" rel="noopener noreferrer">
    <span className="build-project__icon"><Icon aria-hidden="true" size={27} /></span>
    <span className="build-project__copy"><strong>{name}</strong><span>{description}</span></span>
    <ArrowUpRight aria-hidden="true" className="build-project__arrow" size={22} />
  </a>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="site-header__inner">
      <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>Shubham Tyagi</a>
      <nav aria-label="Primary navigation" className={menuOpen ? "nav nav--open" : "nav"}>
        <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#build-lab" onClick={() => setMenuOpen(false)}>Build Lab</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <a className="button button--header" href={`mailto:${email}`}>Let’s talk <ArrowUpRight aria-hidden="true" size={16} /></a>
      <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={25} aria-hidden="true" /> : <List size={25} aria-hidden="true" />}</button>
    </div></header>

    <main id="main">
      <section className="hero page-shell" id="top" aria-labelledby="hero-title">
        <div className="hero__copy">
          <Label>Product · People · Progress</Label>
          <h1 id="hero-title">Hi, I’m Shubham<span className="period">.</span><br />I make complex products easier to use<span className="period">.</span></h1>
          <p className="hero__role">From technical leadership to product management</p>
          <p className="hero__summary">I connect customer problems, technical constraints, and the teams that turn ideas into working products.</p>
          <div className="hero__actions"><a className="button" href="#work">See my work <ArrowRight aria-hidden="true" size={21} /></a><a className="underlined-link" href="#about">More about me</a></div>
        </div>
        <img className="hero__illustration" src="/assets/hero-illustration.png" alt="Hand-drawn notes about curiosity, people, ideas, technology and impact" />
      </section>

      <section className="featured page-shell" id="work" aria-labelledby="featured-title">
        <div className="featured__main"><Label>Featured work</Label><h2 className="visually-hidden" id="featured-title">Featured work</h2><div className="case-grid">{cases.map((study) => <CaseCard key={study.id} study={study} />)}</div></div>
        <aside className="featured__aside" id="build-lab" aria-labelledby="build-title"><Label>Build Lab</Label><h2 className="visually-hidden" id="build-title">Build Lab</h2>
          <BuildProject name="PolyCart" description="Exploring resilient commerce systems and service design." href="https://github.com/tyagishubham177/PolyCart" icon={ShoppingCartSimple} />
          <BuildProject name="PokerPreflopStrategy" description="A tool for practicing decisions and learning by playing." href="https://github.com/tyagishubham177/PokerPreflopStrategy" icon={Spade} />
          <a className="all-projects-link" href="https://github.com/tyagishubham177" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
        </aside>
      </section>

      <section className="case-details page-shell" aria-label="Selected case studies">
        <article className="story reveal" id="hospital-intake">
          <div className="story__heading"><Label>01 / Healthcare</Label><h2>Less friction in patient intake.</h2><p className="story__lead">A hospital workflow has to be usable for the people doing the work and dependable for the people relying on it.</p></div>
          <div className="story__detail"><div><h3>The problem</h3><p>Patient-intake forms and handoffs created repeated work and gaps in visibility for nurses and administrators.</p></div><div><h3>My contribution</h3><p>In a Technical Lead role, I worked on user journeys, spoke with care teams, and helped prioritize the workflows and controls needed for a pilot.</p></div><div><h3>The product decision</h3><p>Focus the first release on frequent tasks and compliance-critical steps; keep lower-priority complexity out of the initial flow.</p></div><p className="story__note">Based on my résumé. Detailed artifacts and quantified outcomes will be added after review.</p></div>
        </article>
        <article className="story reveal" id="workforce-platform">
          <div className="story__heading"><Label>02 / Enterprise</Label><h2>Clearer workforce allocation.</h2><p className="story__lead">When capacity and matching decisions span teams and regions, the underlying workflow has to make the right information visible.</p></div>
          <div className="story__detail"><div><h3>The problem</h3><p>Distributed teams needed a clearer way to understand bench capacity and connect people with available work.</p></div><div><h3>My contribution</h3><p>As a Senior Software Engineer, I contributed to allocation journeys and regional user discovery across several markets.</p></div><div><h3>The product lens</h3><p>Make the workflow and its data more consistent while adapting the experience to the needs of different regions.</p></div><p className="story__note">Based on my résumé. The specific decisions, launch sequence and outcomes need a fuller case-study review.</p></div>
        </article>
      </section>

      <section className="experiment" aria-labelledby="experiment-title"><div className="page-shell experiment__inner reveal"><div><Label>In progress / AI product project</Label><h2 id="experiment-title">A better first pass for document triage.</h2></div><div><p>I’m exploring how operations teams can use AI assistance to review and route documents while keeping exceptions, human judgment and auditability visible.</p><p className="experiment__status">Current status: concept and validation plan. No outcome claim yet.</p></div></div></section>

      <section className="about page-shell reveal" id="about" aria-labelledby="about-title"><Label>About me</Label><div className="about__grid"><h2 id="about-title">I like the space where people, systems, and decisions meet.</h2><div><p>My background spans software engineering and technical leadership in healthcare and enterprise products. I’ve worked on mobile, cloud and platform challenges, and I’m bringing that experience into product management.</p><p>I’m especially interested in products that make complex workflows easier to understand, choose from and improve. I’m pursuing the IPMX Executive MBA at IIM Lucknow.</p><a className="text-link" href={linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight size={19} aria-hidden="true" /></a></div></div></section>

      <section className="contact page-shell reveal" id="contact" aria-labelledby="contact-title"><Label>Let’s connect</Label><h2 id="contact-title">Have a complex problem worth untangling?</h2><p>I’d love to talk about product roles, enterprise workflows, healthcare technology or a useful idea you’re building.</p><div className="contact__links"><a className="button" href={`mailto:${email}`}><EnvelopeSimple size={21} aria-hidden="true" /> Email me</a><a className="contact__social" href={linkedin} target="_blank" rel="noopener noreferrer"><LinkedinLogo size={21} aria-hidden="true" /> LinkedIn</a><a className="contact__social" href="https://github.com/tyagishubham177" target="_blank" rel="noopener noreferrer"><GithubLogo size={21} aria-hidden="true" /> GitHub</a></div></section>
    </main>
    <footer className="footer page-shell"><span>© {new Date().getFullYear()} Shubham Tyagi</span><span>Built with curiosity and care.</span><a href="#top">Back to top</a></footer>
  </>;
}
