import { useEffect, useRef, useState } from "react";

const navItems = [["Home", "home"], ["Projects", "projects"], ["Approach", "approach"], ["Contact", "contact"]];
const capabilities = [
  ["01", "Architecture", "Defining boundaries, data flow, and system shape before implementation."],
  ["02", "Frontend systems", "Building readable interfaces that make complex work feel deliberate."],
  ["03", "Iteration", "Keeping decisions visible so a project can evolve without losing clarity."],
];
const projects = [
  {
    id: "001",
    title: "PPL Pinoy",
    status: "WIP",
    type: "WebApp",
    category: "Fitness / Nutrition",
    summary: "A Filipino-focused fitness and nutrition planner for building muscle, getting stronger, losing fat, or recomping.",
    details: "Combines Push Pull Legs workout programming with practical Filipino food logging and portion guidance, including rice and common carinderia meals.",
    technologies: ["Web app", "Nutrition planning", "Workout programming"],
    features: ["Push Pull Legs programming", "Filipino food logging", "Rice and carinderia portions"],
    mediaType: "image",
    media: "./assets/ppl-pinoy-fitness-landing-page.png",
    mediaAlt: "PPL Pinoy fitness and nutrition planner landing page.",
    mediaLabel: "PPL Pinoy web app / landing page",
  },
  {
    id: "002",
    title: "Hand Sign Recognition",
    status: "Prototype",
    type: "Computer Vision / AI",
    category: "Applied AI",
    summary: "A computer vision system that uses a webcam to detect and recognize hand signs in real time.",
    details: "Processes hand movements and landmarks to identify gestures, demonstrating image recognition and real-time visual tracking.",
    technologies: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    features: ["Real-time webcam input", "Hand landmark detection", "Gesture recognition"],
    mediaType: "video",
    media: "./assets/image-recognition.mp4",
    mediaLabel: "Hand sign recognition / looping demo",
  },
  {
    id: "003",
    title: "AI Legacy System",
    status: "Coming soon",
    type: "AI System",
    category: "Research / Development",
    summary: "A future project record currently reserved for an upcoming AI system.",
    details: "Project details, implementation notes, and evidence will be added when the system is ready to be documented.",
    technologies: ["To be documented"],
    features: ["Project announcement"],
    mediaLabel: "System preview / coming soon",
  },
];
const loveMessage = "I still miss and love you, I love you to the moon and back. Again and again.";

function BootSequence({ onComplete }) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);
  const messages = ["INITIALIZING DEVELOPER ENVIRONMENT", "LOADING PROJECT DATABASE", "CHECKING INTERFACE MODULES", "SYSTEM ONLINE"];
  useEffect(() => {
    if (closing) return undefined;
    const timer = window.setInterval(() => setStep((current) => Math.min(current + 1, messages.length)), 270);
    return () => window.clearInterval(timer);
  }, [messages.length]);
  useEffect(() => {
    if (step < messages.length || closing) return undefined;
    const timer = window.setTimeout(() => setClosing(true), 180);
    return () => window.clearTimeout(timer);
  }, [closing, messages.length, step]);
  useEffect(() => {
    if (!closing) return undefined;
    const timer = window.setTimeout(onComplete, 360);
    return () => window.clearTimeout(timer);
  }, [closing, onComplete]);
  return <div className={`boot-screen ${closing ? "boot-screen--closing" : ""}`} role="dialog" aria-label="System initialization">
    <div className="boot-screen__panel">
      <div className="boot-screen__mark" aria-hidden="true"><span>P</span><i /></div>
      <p className="eyebrow">POKEYE / DEV-LAB / BOOT</p>
      <h1 className="boot-screen__title">Developer&apos;s<br />Laboratory</h1>
      <div className="boot-screen__messages">{messages.slice(0, step).map((message) => <p key={message}><span>[ OK ]</span> {message}</p>)}</div>
      <div className="boot-screen__progress"><span style={{ width: `${Math.min(step / messages.length * 100, 100)}%` }} /></div>
      <div className="boot-screen__footer"><span>POKEYE_OS / v1.0</span><button className="text-link boot-screen__skip" type="button" onClick={onComplete}>Skip initialization</button></div>
    </div>
  </div>;
}

function ThemeToggle({ theme, onToggle }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}><span className="theme-toggle__label">{theme === "dark" ? "Light" : "Dark"}</span><span className="theme-toggle__track" aria-hidden="true"><span /></span></button>;
}

function InteractiveTerminal() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState(["POKEYE TERMINAL // type `help` or 'hello' to begin"]);
  const inputRef = useRef(null);
  const runCommand = (value) => {
    const normalized = value.trim().toLowerCase();
    const responses = {
      help: "AVAILABLE: about / projects / skills / contact / clear",
      about: "POKEYE // developer's laboratory // systems built with intent.",
      projects: "PROJECTS: PPL PINOY [WIP] / HAND SIGN RECOGNITION [PROTOTYPE] / AI LEGACY SYSTEM [COMING SOON]",
      skills: "FOCUS: FRONTEND SYSTEMS / APPLIED AI / COMPUTER VISION / ITERATION",
      contact: "EMAIL: justinleafar@gmail.com // DISCORD: POKE",
      hello: loveMessage,
    };
    if (normalized === "clear") {
      setOutput([]);
    } else {
      setOutput((current) => [...current, `> ${value}`, responses[normalized] || "UNKNOWN COMMAND // type `help` for available commands"]);
    }
    setCommand("");
  };
  return <section className="terminal section" aria-labelledby="terminal-title">
    <div className="terminal__header"><p className="eyebrow" id="terminal-title">05 / Direct interface</p><span>LOCAL / SAFE / READY</span></div>
    <div className="terminal__window" onClick={() => inputRef.current?.focus()}>
      <div className="terminal__output" aria-live="polite">{output.map((line, index) => line === loveMessage ? <p className="terminal__easter-egg" key={`${line}-${index}`}>{line}</p> : <p key={`${line}-${index}`}>{line}</p>)}</div>
      <form className="terminal__form" onSubmit={(event) => { event.preventDefault(); runCommand(command); }}>
        <label htmlFor="terminal-command">&gt;</label><input ref={inputRef} id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} aria-label="Terminal command" autoComplete="off" /><span className="terminal__cursor" aria-hidden="true" />
      </form>
    </div>
    <div className="terminal__suggestions">{["help", "projects", "contact"].map((item) => <button type="button" key={item} onClick={() => runCommand(item)}>{item}</button>)}</div>
  </section>;
}

function AmbientStatus() {
  const [statusIndex, setStatusIndex] = useState(0);
  const statuses = ["SYSTEM READY", "PROJECT INDEX STABLE", "AWAITING INPUT", "CHANNEL OPEN"];
  useEffect(() => {
    const timer = window.setInterval(() => setStatusIndex((current) => (current + 1) % statuses.length), 4200);
    return () => window.clearInterval(timer);
  }, [statuses.length]);
  return <span className="ambient-status" aria-label="Decorative system status"><i aria-hidden="true" /> {statuses[statusIndex]}</span>;
}

function AboutComms({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
  if (!open) return null;
  return <div className="comms-overlay" role="dialog" aria-modal="true" aria-labelledby="comms-title">
    <div className="comms-overlay__noise" aria-hidden="true" />
    <div className="comms-panel">
      <div className="comms-panel__scan" aria-hidden="true" />
      <div className="comms-panel__topline comms-reveal"><span>INCOMING PROFILE / 001</span><button type="button" onClick={onClose} aria-label="Close About panel">Close [ESC]</button></div>
      <div className="comms-panel__identity comms-reveal">
        <div className="comms-avatar" aria-hidden="true">P</div>
        <div><p className="eyebrow">COMMS / ABOUT</p><h2 id="comms-title">Pokeye</h2><p className="comms-role">Developer / systems builder</p></div>
      </div>
      <div className="comms-panel__grid comms-reveal">
        <div><span>Profile</span><p>A developer documenting software work, engineering decisions, and the next useful thing to learn.</p></div>
        <div><span>Focus</span><p>Software systems, frontend experiences, applied AI, and computer vision.</p></div>
        <div><span>Principles</span><p>Evidence over claims. Clear constraints. Maintainable decisions.</p></div>
        <div><span>Connection</span><p className="comms-links"><a href="mailto:justinleafar@gmail.com">Email</a><a href="https://discord.com/users/836045071598092339" target="_blank" rel="noreferrer">Discord</a><a href="https://www.instagram.com/juzt_bint/" target="_blank" rel="noreferrer">Instagram</a><a href="https://github.com/Pokeye" target="_blank" rel="noreferrer">GitHub</a></p></div>
      </div>
      <div className="comms-panel__footer comms-reveal"><span>STATUS / PROFILE CHANNEL OPEN</span><span className="comms-signal">● SIGNAL STABLE</span></div>
    </div>
  </div>;
}

function Header({ theme, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="Pokeye home"><span>POKEYE</span><small>Developer&apos;s Laboratory</small></a>
    <button className={`menu-button ${menuOpen ? "menu-button--open" : ""}`} type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}><span className="menu-button__signal" aria-hidden="true"><i /><i /><i /></span><span>{menuOpen ? "Close link" : "Open link"}</span></button>
    <nav className={menuOpen ? "site-nav site-nav--open" : "site-nav"} id="site-navigation" aria-label="Main navigation">
      {navItems.map(([label, id], index) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}
      <ThemeToggle theme={theme} onToggle={onToggle} />
    </nav>
  </header>;
}

export function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("pokeye-theme") || "dark");
  const [themeTransitioning, setThemeTransitioning] = useState(false);
  const [booting, setBooting] = useState(true);
  const [commsOpen, setCommsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("pokeye-theme", theme); }, [theme]);
  useEffect(() => {
    if (!booting) return undefined;
    const timer = window.setTimeout(() => setBooting(false), 1400);
    return () => window.clearTimeout(timer);
  }, [booting]);
  useEffect(() => {
    const updateScrollState = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0);
      const sections = ["home", "projects", "approach", "contact", "terminal"];
      const current = sections.reduce((found, id) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= window.innerHeight * .35 ? id : found;
      }, "home");
      setActiveSection(current);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => { window.removeEventListener("scroll", updateScrollState); window.removeEventListener("resize", updateScrollState); };
  }, []);
  const toggleTheme = () => {
    setThemeTransitioning(true);
    setTheme((current) => current === "dark" ? "light" : "dark");
    window.setTimeout(() => setThemeTransitioning(false), 520);
  };
  return <div className={`site-shell ${themeTransitioning ? "site-shell--theme-shift" : ""}`}>
    {booting && <BootSequence onComplete={() => setBooting(false)} />}
    <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    <Header theme={theme} onToggle={toggleTheme} />
    <div className="hud-status" aria-label={`Active section: ${activeSection}`}><AmbientStatus /> <b>LINK / {activeSection.toUpperCase()}</b> <span>●</span></div>
    <button className="comms-trigger" type="button" onClick={() => setCommsOpen(true)} aria-label="Open About profile">COMMS / ABOUT</button>
    <AboutComms open={commsOpen} onClose={() => setCommsOpen(false)} />
    <main>
      <section className="hero section" id="home" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">01 / Developer&apos;s laboratory</p>
          <h1 id="hero-title">Systems,<br />built with intent.</h1>
          <p className="lede">A developer portfolio for documenting software work, the engineering decisions behind it, and what still needs to be learned.</p>
          <div className="action-row"><a className="button button--primary" href="#projects">Explore projects</a><a className="button button--secondary" href="#contact">Contact</a></div>
          <dl className="hero__facts"><div><dt>Focus</dt><dd>Software systems</dd></div><div><dt>Method</dt><dd>Evidence over claims</dd></div><div><dt>Format</dt><dd>Open project records</dd></div></dl>
        </div>
        <div className="hero__visual" aria-hidden="true"><img src="./assets/hero-laboratory.png" alt="" /><p>System architecture<br />modular / scalable / maintainable</p></div>
      </section>
      <section className="feature section" id="projects" aria-labelledby="projects-title">
        <div className="section-heading"><p className="eyebrow">02 / Featured engineering work</p><a href="#contact">Request project details</a></div>
        <div className="project-list">
          {projects.map((project) => <article className="project-entry" key={project.id}>
            <div className="project-record">
              <p className="record-label">Project record / {project.id}</p>
              <div className="project-title-row"><h2>{project.title}</h2><span className={`status status--${project.status.toLowerCase().replace(" ", "-")}`}>{project.status}</span></div>
              <p className="project-type">{project.type} / {project.category}</p>
              <p>{project.summary}</p>
              <p>{project.details}</p>
              <div className="record-meta">
                <div><span>Status</span><strong>{project.status}</strong></div>
                <div><span>Type</span><strong>{project.type}</strong></div>
                <div><span>Technologies</span><strong>{project.technologies.join(", ")}</strong></div>
              </div>
              <div className="project-features"><span>Key features</span><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
            </div>
            <figure className={`project-visual ${project.mediaType ? "project-visual--media" : "project-visual--placeholder"}`}>
              {project.mediaType === "image" && <img src={project.media} alt={project.mediaAlt} />}
              {project.mediaType === "video" && <video src={project.media} autoPlay loop playsInline controls aria-label="Looping hand sign recognition demo" />}
              {!project.mediaType && <div className="project-visual__grid"><span>{project.id}</span><strong>COMING SOON</strong></div>}
              <figcaption>{project.mediaLabel}</figcaption>
            </figure>
          </article>)}
        </div>
      </section>
      <section className="capabilities section" id="approach" aria-labelledby="approach-title">
        <div className="capabilities__intro"><p className="eyebrow">03 / Operating approach</p><h2 id="approach-title">From an idea<br />to a lasting system.</h2><p>Tools change. Clear constraints, useful documentation, and maintainable decisions remain valuable.</p></div>
        <div className="capability-list">{capabilities.map(([number, title, description]) => <article key={title} className="capability"><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="contact section" id="contact" aria-labelledby="contact-title"><p className="eyebrow">04 / Contact</p><div className="contact__body"><h2 id="contact-title">Let&apos;s make the next useful thing.</h2><div><p>For project conversations, reach out through email or connect through the social links below.</p><div className="contact-links"><a className="button button--primary" href="mailto:justinleafar@gmail.com?subject=Project%20inquiry%20for%20Pokeye&body=Hi%20Justin%2C%0A%0AI%27d%20like%20to%20talk%20about%20a%20project.">Email me</a><a className="contact-link" href="https://discord.com/users/836045071598092339" target="_blank" rel="noreferrer">Discord / Poke</a><a className="contact-link" href="https://www.instagram.com/juzt_bint/" target="_blank" rel="noreferrer">Instagram / juzt_bint</a><a className="contact-link" href="https://github.com/Pokeye" target="_blank" rel="noreferrer">GitHub / Pokeye</a></div></div></div></section>
      <InteractiveTerminal />
    </main>
    <footer className="site-footer"><span>POKEYE / Developer&apos;s Laboratory</span><span>Built as an accessible, static portfolio foundation.</span></footer>
  </div>;
}
