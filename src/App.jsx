
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";

const programs = [
  { icon: "🏋️", title: "Strength Training", text: "Build strength and improve your performance.", tag: "01", image: "photo-1583454110551-21f2fa2afe61" },
  { icon: "🔥", title: "Fat Loss", text: "Build sustainable habits with guided workouts.", tag: "02", image: "photo-1534438327276-14e5300c3a48" },
  { icon: "⚡", title: "Functional Fitness", text: "Move better, feel stronger every day.", tag: "03", image: "photo-1571019613454-1cb2f99b2d8b" },
  { icon: "🧘", title: "Yoga & Mobility", text: "Improve flexibility, balance and recovery.", tag: "04", image: "photo-1544367567-0f2fcb009e0b" },
  { icon: "🥊", title: "Boxing Fitness", text: "Train coordination, stamina and confidence.", tag: "05", image: "photo-1549719386-74dfcbf7dbed" },
  { icon: "🚴", title: "Cardio Training", text: "Make endurance a part of your routine.", tag: "06", image: "photo-1538805060514-97d9cc17730c" },
];

const trainers = [
  { name: "Rahul Sharma", role: "Strength Coach", icon: "🏋️" },
  { name: "Priya Singh", role: "Yoga Specialist", icon: "🧘" },
  { name: "Aman Verma", role: "Fitness Trainer", icon: "💪" },
  { name: "Neha Kapoor", role: "Nutrition Coach", icon: "🥗" },
];

const plans = [
  { name: "Basic", price: "1,999", features: ["Gym access", "Basic support", "Locker facility"] },
  { name: "Premium", price: "2,999", features: ["All basic features", "Personal training", "Nutrition guidance", "Group classes"], popular: true },
  { name: "Elite", price: "4,999", features: ["All premium features", "Unlimited training", "Advanced assessment", "Priority support"] },
];

const faqs = [
  ["How do I join A+ Gym?", "Choose a membership plan and contact our team to discuss joining."],
  ["Are personal trainers available?", "Yes, personal training options are available depending on your chosen plan."],
  ["Can beginners join?", "Absolutely. Our programs can be adapted to your current experience level."],
  ["Can I change my membership?", "Contact the gym team to discuss available membership changes."],
];

function Photo({ id, alt, className = "" }) {
  return (
    <img
      className={className}
      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`}
      alt={alt}
      loading="lazy"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const links = [
    ["/", "Home"],
    ["/about", "About"],
    ["/programs", "Programs"],
    ["/trainers", "Trainers"],
    ["/membership", "Membership"],
    ["/gallery", "Gallery"],
    ["/contact", "Contact"],
  ];

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={() => setOpen(false)}>
        <span>A<span className="logo-plus">+</span></span> GYM
      </Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? "✕" : "☰"}
      </button>
      <nav className={open ? "nav open" : "nav"}>
        {links.map(([path, label]) => (
          <NavLink key={path} to={path} end={path === "/"} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
        <Link className="btn btn-gradient nav-cta" to="/membership" onClick={() => setOpen(false)}>
          Join Now ↗
        </Link>
      </nav>
    </header>
  );
}

function Button({ to = "/contact", children, secondary = false }) {
  return <Link className={secondary ? "btn btn-outline" : "btn btn-gradient"} to={to}>{children}</Link>;
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Stats() {
  const stats = [["5+", "Years of excellence"], ["10K+", "Fitness community"], ["50+", "Expert trainers"], ["100+", "Training sessions"]];
  return (
    <div className="stats">
      {stats.map(([num, label]) => (
        <div className="stat" key={label}>
          <strong>{num}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function ProgramCards({ limit }) {
  return (
    <div className="program-grid">
      {programs.slice(0, limit || programs.length).map((item) => (
        <article className="program-card" key={item.title}>
          <div className="program-image">
            <Photo id={item.image} alt={item.title} />
            <span className="program-number">{item.tag}</span>
          </div>
          <div className="program-content">
            <span className="card-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link to="/contact" className="arrow-link">Explore program <span>↗</span></Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function PlanCards() {
  return (
    <div className="plans-grid">
      {plans.map((plan) => (
        <article className={`plan-card ${plan.popular ? "featured" : ""}`} key={plan.name}>
          {plan.popular && <span className="popular-tag">MOST POPULAR</span>}
          <span className="plan-label">{plan.name} membership</span>
          <h3>₹{plan.price}<small> / month</small></h3>
          <p className="plan-desc">Everything you need to keep moving forward.</p>
          <ul>{plan.features.map((feature) => <li key={feature}>✓ <span>{feature}</span></li>)}</ul>
          <Button to="/contact">{`Choose ${plan.name}` } ↗</Button>
        </article>
      ))}
    </div>
  );
}

function TrainerCards() {
  return (
    <div className="trainer-grid">
      {trainers.map((trainer, i) => (
        <article className="trainer-card" key={trainer.name}>
          <div className={`trainer-art trainer-art-${i + 1}`}>
            <span>{trainer.icon}</span>
            <small>COACH / 0{i + 1}</small>
          </div>
          <div className="trainer-info">
            <div><h3>{trainer.name}</h3><p>{trainer.role}</p></div>
            <Link to="/contact" aria-label={`Contact ${trainer.name}`}>↗</Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <div className="cta-copy">
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>YOUR FITNESS JOURNEY<br />STARTS <span>TODAY.</span></h2>
        <p>Show up for yourself. We'll help you build the rest.</p>
        <Button to="/contact">Start your journey ↗</Button>
      </div>
      <div className="cta-mark">A<span>+</span></div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function subscribe(e) {
    e.preventDefault();
    setMessage(email.includes("@") ? "Thanks! Your email is ready for our team." : "Please enter a valid email.");
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo"><span>A<span className="logo-plus">+</span></span> GYM</Link>
          <p>Stronger every day.<br />Better in every way.</p>
          <div className="socials">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">IG</a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer">FB</a>
            <a href="https://youtube.com/" target="_blank" rel="noreferrer">YT</a>
          </div>
        </div>
        <div className="footer-col"><h4>Explore</h4><Link to="/about">About us</Link><Link to="/programs">Programs</Link><Link to="/trainers">Our trainers</Link><Link to="/gallery">Gallery</Link></div>
        <div className="footer-col"><h4>Membership</h4><Link to="/membership">All plans</Link><Link to="/contact">Personal training</Link><Link to="/contact">Get in touch</Link><Link to="/contact">FAQs</Link></div>
        <div className="footer-col"><h4>Find us</h4><p>Main Market, Kurukshetra</p><a href="mailto:hello@aplusgym.example">hello@aplusgym.example</a><p>Mon – Sat · Ask us for timings</p></div>
        <div className="footer-news">
          <h4>Join the A+ community</h4>
          <p>Fitness tips, updates and fresh motivation.</p>
          <form onSubmit={subscribe}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" required />
            <button type="submit" aria-label="Subscribe">↗</button>
          </form>
          {message && <small className="form-message">{message}</small>}
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} A+ Gym. All rights reserved.</span><div><Link to="/contact">Privacy</Link><Link to="/contact">Terms</Link><a href="#top">Back to top ↑</a></div></div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85">
          <source src="https://videos.pexels.com/video-files/5319759/5319759-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow"><i /> STRONGER · HEALTHIER · HAPPIER</span>
          <h1>BUILD A<br />BETTER <span>YOU.</span></h1>
          <p>More than just a gym. Your next chapter starts with movement, expert guidance and a community that keeps you going.</p>
          <div className="hero-actions"><Button to="/membership">Start your journey ↗</Button><Button to="/about" secondary>Discover A+ →</Button></div>
          <div className="hero-note"><span className="pulse-dot" /> YOUR GOALS. YOUR PACE. YOUR PLACE.</div>
        </div>
        <div className="hero-side-label">A+ PERFORMANCE CLUB / EST. FOR YOUR NEXT LEVEL</div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE ↓</span><span>01 — 07 / TRAIN DIFFERENT</span></div>
      </section>
      <div className="stats-wrap"><Stats /></div>
      <section className="section facility-section">
        <div className="facility-copy"><span className="eyebrow">01 / THE A+ EXPERIENCE</span><h2>NOT JUST A GYM.<br /><span>A NEW STANDARD.</span></h2><p>Great training is more than equipment. It's expert support, purposeful programming and a space that makes you want to show up.</p><Button to="/about" secondary>Discover our approach ↗</Button></div>
        <div className="facility-visual"><Photo id="photo-1534438327276-14e5300c3a48" alt="Modern gym facility" /><div className="facility-stamp"><strong>A+</strong><span>TRAIN WITH PURPOSE</span></div></div>
      </section>
      <section className="section programs-section"><SectionTitle eyebrow="02 / FIND YOUR FOCUS" title={<>TRAIN WITH <span>INTENTION.</span></>} text="Different goals. Thoughtful coaching. Find the program that fits your next move." /><ProgramCards limit={4} /><div className="center-action"><Button to="/programs" secondary>Explore all programs ↗</Button></div></section>
      <section className="section membership-section"><SectionTitle eyebrow="03 / YOUR MEMBERSHIP" title={<>INVEST IN <span>YOURSELF.</span></>} text="Straightforward options to help you get started. Ask our team about availability and inclusions." /><PlanCards /></section>
      <section className="section trainers-section"><SectionTitle eyebrow="04 / PEOPLE WHO GET IT" title={<>MEET YOUR <span>TEAM.</span></>} text="Supportive coaches, practical guidance and encouragement at every stage." /><TrainerCards /><div className="center-action"><Button to="/trainers" secondary>Meet the team ↗</Button></div></section>
      <CTA />
    </>
  );
}

function PageHero({ eyebrow, title, text }) {
  return <section className="page-hero"><div className="page-hero-bg" /><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>;
}

function About() {
  return <><PageHero eyebrow="THE STORY BEHIND A+" title={<>BUILT ON PASSION.<br /><span>DRIVEN BY PROGRESS.</span></>} text="A welcoming training space for people ready to make movement part of everyday life." /><section className="section about-layout"><div className="about-image"><Photo id="photo-1571902943202-507ec2618e8f" alt="Gym training space" /></div><div className="about-copy"><span className="eyebrow">OUR PHILOSOPHY</span><h2>PROGRESS LOOKS DIFFERENT ON EVERYONE.</h2><p>We believe good fitness starts with the person, not the numbers. Build consistency, learn from experienced coaches and celebrate the progress that matters to you.</p><div className="value-list"><p>✳ Expert guidance without the guesswork</p><p>✳ Training that meets you where you are</p><p>✳ A community that celebrates every milestone</p></div><Button to="/contact">Come say hello ↗</Button></div></section><div className="stats-wrap"><Stats /></div><CTA /></>;
}

function Programs() {
  return <><PageHero eyebrow="FIND YOUR FOCUS" title={<>YOUR GOALS.<br /><span>YOUR PROGRAM.</span></>} text="Explore training options designed to support strength, mobility, endurance and everyday confidence." /><section className="section"><ProgramCards /><div className="program-note"><strong>Not sure where to begin?</strong><p>Talk to our team and find a starting point that suits your experience and goals.</p><Button to="/contact">Find your fit ↗</Button></div></section></>;
}

function Trainers() {
  return <><PageHero eyebrow="YOUR PEOPLE. YOUR PROGRESS." title={<>GOOD COACHES.<br /><span>BETTER DAYS.</span></>} text="Meet the team ready to support your training, answer questions and help you stay consistent." /><section className="section"><TrainerCards /><div className="program-note"><strong>Let's find the right support.</strong><p>Ask about trainer availability and coaching options.</p><Button to="/contact">Contact the team ↗</Button></div></section></>;
}

function Membership() {
  return <><PageHero eyebrow="SIMPLE OPTIONS. REAL COMMITMENT." title={<>PICK YOUR<br /><span>NEXT LEVEL.</span></>} text="Explore our sample monthly membership options and contact the team to confirm current pricing and inclusions." /><section className="section"><PlanCards /><p className="pricing-note">Prices shown are sample design content. Confirm actual fees and membership terms with the gym before publishing.</p></section><CTA /></>;
}

function Gallery() {
  const photos = [
    ["photo-1534438327276-14e5300c3a48", "Training floor"],
    ["photo-1583454110551-21f2fa2afe61", "Strength training"],
    ["photo-1571019613454-1cb2f99b2d8b", "Functional workout"],
    ["photo-1544367567-0f2fcb009e0b", "Mobility session"],
    ["photo-1538805060514-97d9cc17730c", "Cardio session"],
    ["photo-1549719386-74dfcbf7dbed", "Boxing workout"],
  ];
  return <><PageHero eyebrow="INSIDE A+" title={<>SPACE TO MOVE.<br /><span>ROOM TO GROW.</span></>} text="A glimpse of the training energy and activities that make every session count." /><section className="section gallery-grid">{photos.map(([id, alt], i) => <div className={`gallery-item gallery-${i + 1}`} key={id}><Photo id={id} alt={alt} /><span>{alt} ↗</span></div>)}</section></>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e) { e.preventDefault(); setSent(true); }
  return <><PageHero eyebrow="YOUR NEXT STEP STARTS HERE" title={<>LET'S GET<br /><span>YOU MOVING.</span></>} text="Ask about membership, programs, training options or visiting the gym." /><section className="section contact-layout"><div className="contact-copy"><span className="eyebrow">SAY HELLO</span><h2>HAVE A GOAL IN MIND?</h2><p>Share a few details and we'll help you figure out the next step.</p><div className="contact-detail"><span>01</span><div><strong>Visit us</strong><p>Main Market, Kurukshetra</p></div></div><div className="contact-detail"><span>02</span><div><strong>Email us</strong><p>hello@aplusgym.example</p></div></div><div className="contact-detail"><span>03</span><div><strong>Opening hours</strong><p>Contact us to confirm current timings.</p></div></div></div><form className="contact-form" onSubmit={submit}><span className="eyebrow">SEND AN ENQUIRY</span><h3>LET'S TALK FITNESS.</h3><label>Your name<input required placeholder="Enter your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>What are you interested in?<select defaultValue="Membership"><option>Membership</option><option>Personal training</option><option>Group classes</option><option>Gym visit</option><option>Other enquiry</option></select></label><label>Your message<textarea required rows="4" placeholder="Tell us what you're looking for..." /></label><button className="btn btn-gradient" type="submit">Send enquiry ↗</button>{sent && <p className="form-message">Form checked successfully. Connect an email service to deliver enquiries to your team.</p>}</form></section><section className="section faq-section"><SectionTitle eyebrow="GOOD TO KNOW" title={<>YOUR QUESTIONS, <span>ANSWERED.</span></>} /><div className="faq-list"><FAQ /></div></section></>;
}

function FAQ() {
  const [active, setActive] = useState(0);
  return <>{faqs.map(([q, a], i) => <div className={`faq-item ${active === i ? "active" : ""}`} key={q}><button onClick={() => setActive(active === i ? -1 : i)} aria-expanded={active === i}><span>{q}</span><b>{active === i ? "−" : "+"}</b></button>{active === i && <p>{a}</p>}</div>)}</>;
}

function NotFound() {
  return <PageHero eyebrow="404 / WRONG TURN" title={<>THIS PAGE<br /><span>ISN'T HERE.</span></>} text="Let's get you back on track." />;
}

function Layout() {
  const location = useLocation();
  return <><Header /><main key={location.pathname}>{/* routes render below */}<Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/programs" element={<Programs />} /><Route path="/trainers" element={<Trainers />} /><Route path="/membership" element={<Membership />} /><Route path="/gallery" element={<Gallery />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>;
}

export default function App() {
  return <BrowserRouter><Layout /></BrowserRouter>;
}