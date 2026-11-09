import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  DoorOpen,
  Droplets,
  Hammer,
  Home as HomeIcon,
  Lightbulb,
  Paintbrush,
  PanelsTopLeft,
  ParkingCircle,
  ShieldCheck,
  Sofa,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import logo from "./assets/vero-logo.webp";
import { categories, ui } from "./content.js";

const ICONS = {
  apartments: HomeIcon,
  construction: Building2,
  walls: PanelsTopLeft,
  cladding: Sparkles,
  plumbing: Droplets,
  electrical: Lightbulb,
  security: ShieldCheck,
  infrastructure: Sun,
  woodwork: DoorOpen,
  interiors: Sofa,
  painting: Paintbrush,
  aluminum: Waves,
  kitchens: Hammer,
  amenities: ParkingCircle,
};

const CONTACT = "mailto:info@veroresidence.com";

// The inline script in index.html has already put the right language on <html>.
const initialLanguage = () => (document.documentElement.lang === "ar" ? "ar" : "en");

function Category({ number, id, text, isOpen, onToggle }) {
  const Icon = ICONS[id];
  const panelId = `panel-${id}`;
  return (
    <li className={`cat${isOpen ? " open" : ""}`}>
      <button type="button" className="cat-head" onClick={onToggle} aria-expanded={isOpen} aria-controls={panelId}>
        <span className="cat-number">{number}</span>
        <Icon className="cat-icon" size={18} strokeWidth={1.6} aria-hidden="true" />
        <span className="cat-title">
          <span className="cat-label">{text.label}</span>
          <span className="cat-tagline">{text.tagline}</span>
        </span>
        <ChevronDown className="cat-chevron" size={17} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="cat-panel" id={panelId}>
          <p className="cat-intro">{text.intro}</p>
          {text.stats && (
            <div className="stats">
              {text.stats.map((stat) => (
                <div className="stat" key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          <ul className="checks">
            {text.items.map((item) => (
              <li key={item}>
                <span className="check" aria-hidden="true">
                  <Check size={13} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function App() {
  const [lang, setLang] = useState(initialLanguage);
  const [openId, setOpenId] = useState("apartments");
  const t = ui[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem("vero-lang", lang);
    } catch {
      // Private windows can refuse storage: the language is then chosen again next time.
    }
  }, [lang]);

  return (
    <div className="shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Vero Residence">
          <img src={logo} alt="Vero Residence" width={523} height={640} />
        </a>
        <div className="topbar-actions">
          <button
            type="button"
            className="lang"
            lang={lang === "ar" ? "en" : "ar"}
            aria-label={t.switchAria}
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          >
            {t.switchLabel}
          </button>
          <a className="pill" href={CONTACT}>
            {t.contactShort} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">
              <span aria-hidden="true" />
              {t.kicker}
            </p>
            <h1 dir="ltr">
              Vero
              <br />
              <em>Residence</em>
            </h1>
            <p className="subtitle">{t.subtitle}</p>
            <p className="description">{t.description}</p>
            <a className="hero-link" href="#explore">
              {t.explore} <ChevronDown size={16} aria-hidden="true" />
            </a>
          </div>

          <aside className="facts" aria-label={t.factsTitle}>
            <p className="facts-title">{t.factsTitle}</p>
            <dl>
              {t.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section className="explore" id="explore">
          <div className="section-intro">
            <p className="eyebrow">{t.sectionEyebrow}</p>
            <h2>
              {t.sectionTitle[0]}
              <br />
              <em>{t.sectionTitle[1]}</em>
            </h2>
            <p>{t.sectionText}</p>
          </div>

          <ul className="cats">
            {categories.map((category, index) => (
              <Category
                key={category.id}
                id={category.id}
                number={String(index + 1).padStart(2, "0")}
                text={category[lang]}
                isOpen={openId === category.id}
                onToggle={() => setOpenId(openId === category.id ? null : category.id)}
              />
            ))}
          </ul>
        </section>

        <section className="contact">
          <div>
            <p className="eyebrow">{t.contactEyebrow}</p>
            <h2>
              {t.contactTitle[0]}
              <br />
              <em>{t.contactTitle[1]}</em>
            </h2>
          </div>
          <a className="pill light" href={CONTACT}>
            {t.contactShort} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>
      </main>

      <footer>
        <span dir="ltr">{t.footerLeft}</span>
        <span>{t.footerRight}</span>
      </footer>
    </div>
  );
}
