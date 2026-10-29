import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./components/BlurText.jsx";
import Atmosphere from "./components/Atmosphere.jsx";
import Icon from "./components/Icon.jsx";
import { contact, areas, faqs, whatsappUrl } from "./content.js";

const nav = [
  ["#atuacao", "Atuação"],
  ["#fernanda", "A advogada"],
  ["#caminho", "Como funciona"],
  ["#contato", "Contato"],
];
function Brand({ footer = false }) {
  return (
    <a
      href="#inicio"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="Fernanda Jardim — voltar ao início"
    >
      <span className="brand-mark" aria-hidden="true">
        <img src="/assets/logo.webp" alt="" width="164" height="96" />
      </span>
      <span className="brand-words">
        Fernanda Jardim<small>ADVOGADA E CONSULTORA JURÍDICA</small>
      </span>
    </a>
  );
}
function ContactLink({
  children = "Fale com a advogada",
  className = "button",
  icon = "diagonal",
}) {
  return (
    <a
      className={className}
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Icon name={icon} />
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
function Portrait({ name, alt, className = "", eager = false }) {
  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={`/assets/${name}-640.avif 640w, /assets/${name}-1080.avif 1080w`}
        sizes="(max-width: 700px) 90vw, 45vw"
      />
      <img
        src={`/assets/${name}-1080.webp`}
        srcSet={`/assets/${name}-640.webp 640w, /assets/${name}-1080.webp 1080w`}
        sizes="(max-width: 700px) 90vw, 45vw"
        alt={alt}
        width="1080"
        height={name === "portrait" ? "1443" : "1350"}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const dialog = useRef(null);
  const menuButton = useRef(null);
  const root = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        if (paused) return;
        gsap.from(".hero-portrait", {
          clipPath: "inset(14% 12% 14% 12% round 46% 46% 2% 2%)",
          scale: 0.96,
          duration: 1.6,
          ease: "power3.out",
        });
        gsap.from(
          ".hero-meta, .hero-copy > .eyebrow, .hero-actions, .hero-description",
          {
            y: 18,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          },
        );
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 38,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          });
        });
        gsap.utils.toArray(".section-line").forEach((el) =>
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: 1,
            },
          }),
        );
        gsap.to(".hero-orbit", {
          rotate: 22,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".hero-portrait img", {
          yPercent: 5,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.from(".manifesto h2 > span", {
          display: "inline-block",
          x: -45,
          clipPath: "inset(0 100% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top 85%",
            end: "top 30%",
            scrub: 0.7,
          },
        });
        gsap.from(".manifesto h2 > em", {
          display: "inline-block",
          x: 45,
          clipPath: "inset(0 0 0 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top 80%",
            end: "top 25%",
            scrub: 0.7,
          },
        });
        gsap.to(".manifesto-decoration", {
          rotate: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.utils.toArray(".journey-step").forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 65%",
            end: "bottom 35%",
            onToggle: ({ isActive }) => {
              el.classList.toggle("is-active", isActive);
              if (isActive)
                document.querySelector(".journey-count").textContent =
                  `0${i + 1}`;
            },
          });
          gsap.from(el.querySelector(".journey-line"), {
            scaleY: 0,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 65%",
              end: "bottom 45%",
              scrub: 0.5,
            },
          });
        });
      },
      root,
    );
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    return () => {
      media.revert();
    };
  }, [paused]);
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
    return () => document.documentElement.classList.remove("motion-paused");
  }, [paused]);
  useEffect(() => {
    if (!menu) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menu]);
  useEffect(() => {
    if (privacy) dialog.current?.showModal();
    else dialog.current?.close();
  }, [privacy]);
  return (
    <div ref={root}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header">
        <div className="header-inner">
          <Brand />
          <nav
            className={`nav ${menu ? "is-open" : ""}`}
            id="main-nav"
            aria-label="Navegação principal"
          >
            {nav.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <ContactLink className="header-contact">Vamos conversar</ContactLink>
          <button
            ref={menuButton}
            type="button"
            className={`menu-toggle ${menu ? "is-open" : ""}`}
            aria-expanded={menu}
            aria-controls="main-nav"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenu(!menu)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <Atmosphere paused={paused} />
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-inner wrap">
            <div className="hero-copy">
              <p className="eyebrow">
                <span />
                DIREITO PENAL & PROCESSO PENAL
              </p>
              <h1 id="hero-title">
                <span className="sr-only">
                  Uma defesa firme. Um olhar humano.
                </span>
                <span aria-hidden="true">
                  <BlurText
                    text="Uma defesa"
                    trigger="load"
                    delay={90}
                    distance={20}
                    blur={5}
                    stepDuration={0.55}
                    className="hero-title-line"
                  />
                  <BlurText
                    text="firme. Um olhar"
                    trigger="load"
                    delay={100}
                    distance={20}
                    blur={5}
                    stepDuration={0.6}
                    className="hero-title-line"
                  />
                  <BlurText
                    text="humano."
                    trigger="load"
                    delay={100}
                    distance={20}
                    blur={5}
                    stepDuration={0.65}
                    className="hero-title-line title-italic"
                  />
                </span>
              </h1>
              <p className="hero-description">
                O Direito começa com a sua história.
                <br />
                Atuação dedicada à sua defesa, com escuta,
                <br className="desktop-break" /> clareza e atenção a cada
                detalhe.
              </p>
              <div className="hero-actions">
                <ContactLink />
                <a className="text-link" href="#atuacao">
                  Conheça a atuação
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-frame">
                <Portrait
                  name="portrait"
                  className="hero-portrait"
                  alt="Fernanda Jardim, advogada e consultora jurídica, em retrato com blazer preto"
                  eager
                />
                <div className="portrait-shade" />
                <span className="frame-corner top" />
                <span className="frame-corner bottom" />
              </div>
              <div className="portrait-caption">
                <span>Fernanda Jardim</span>
                <small>ADVOGADA E CONSULTORA JURÍDICA</small>
              </div>
              <div className="orbit-label" aria-hidden="true">
                <span>ESCUTA</span>
                <i />
                <span>ESTRATÉGIA</span>
                <i />
                <span>DEDICAÇÃO</span>
              </div>
            </div>
          </div>
          <div className="hero-meta wrap">
            <span>
              <Icon name="pin" />
              Comodoro, Mato Grosso
            </span>
            <a href="#atuacao" className="scroll-cue">
              CONTINUE A DESCOBERTA
              <span>
                <Icon name="arrow" />
              </span>
            </a>
            <button
              className="motion-toggle"
              onClick={() => setPaused(!paused)}
              type="button"
              aria-pressed={paused}
            >
              <Icon name={paused ? "play" : "pause"} />
              {paused ? "Ativar movimento" : "Pausar movimento"}
            </button>
          </div>
        </section>
        <section
          id="atuacao"
          className="practice section-pad"
          aria-labelledby="practice-title"
        >
          <div className="wrap">
            <div className="section-top">
              <p className="eyebrow dark">01 / ÁREAS DE ATUAÇÃO</p>
              <span className="small-note">
                TÉCNICA JURÍDICA. ATENÇÃO HUMANA.
              </span>
            </div>
            <div className="section-line" />
            <div className="section-heading" data-reveal>
              <h2 id="practice-title">
                Caminhos diferentes.
                <br />
                <em>A mesma dedicação.</em>
              </h2>
              <p>
                Uma atuação jurídica que considera
                <br className="desktop-break" /> as particularidades de cada
                caso
                <br className="desktop-break" /> e o que importa para você.
              </p>
            </div>
            <div className="practice-grid">
              {areas.map((area, i) => (
                <article
                  className={`practice-card ${i === 0 ? "practice-primary" : ""}`}
                  key={area.number}
                  data-reveal
                >
                  <div className="card-top">
                    <span>{area.number}</span>
                    <Icon name={area.icon} />
                  </div>
                  <div className="card-content">
                    <p className="eyebrow">{area.label}</p>
                    <h3>
                      {area.title}
                      {area.subtitle && (
                        <>
                          <br />
                          <em>{area.subtitle}</em>
                        </>
                      )}
                    </h3>
                    <p className="card-description">{area.description}</p>
                  </div>
                  <details className="area-details">
                    <summary>
                      Entenda a atuação
                      <Icon name="plus" />
                    </summary>
                    <div>
                      <p>{area.detail}</p>
                      <ContactLink className="area-contact">
                        Conversar sobre meu caso
                      </ContactLink>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="fernanda"
          className="about section-pad"
          aria-labelledby="about-title"
        >
          <div className="wrap about-grid">
            <div className="about-art" data-reveal>
              <span className="image-caption-side">
                PRESENÇA QUE ACOLHE. ATUAÇÃO QUE ORIENTA.
              </span>
              <Portrait
                name="about"
                className="about-photo"
                alt="Fernanda Jardim sorrindo, sentada à mesa de trabalho"
              />
              <div className="about-seal">
                <Icon name="scales" />
                <span>
                  Direito com
                  <br />
                  <em>propósito.</em>
                </span>
              </div>
            </div>
            <div className="about-copy" data-reveal>
              <p className="eyebrow dark">02 / A ADVOGADA</p>
              <h2 id="about-title">
                Por trás de cada
                <br />
                processo, existe
                <br />
                <em>uma história.</em>
              </h2>
              <div className="signature-rule" />
              <h3>Fernanda Jardim</h3>
              <p className="about-role">ADVOGADA E CONSULTORA JURÍDICA</p>
              <p>
                Advogada criminalista, com atuação especializada em{" "}
                <strong>Direito Penal e Processo Penal</strong>, Fernanda Jardim
                também atende demandas nas áreas de Direito Cível e Trabalhista.
              </p>
              <p>
                Em Comodoro, Mato Grosso, oferece soluções jurídicas
                personalizadas, com atendimento dedicado às necessidades de cada
                cliente.
              </p>
              <ContactLink className="text-link dark-link">
                Vamos conversar sobre o seu caso
              </ContactLink>
              {contact.oab && <small>{contact.oab}</small>}
            </div>
          </div>
        </section>
        <section className="manifesto" aria-label="Nossa essência">
          <div className="manifesto-decoration" aria-hidden="true" />
          <div className="wrap">
            <p className="eyebrow">A ESSÊNCIA DA ATUAÇÃO</p>
            <h2>
              <span>Soluções jurídicas</span>
              <br />
              <em>eficazes e personalizadas.</em>
            </h2>
            <div className="manifesto-bottom">
              <span>FERNANDA JARDIM</span>
              <Icon name="scales" />
              <span>CADA HISTÓRIA É ÚNICA</span>
            </div>
          </div>
        </section>
        <section
          id="caminho"
          className="journey section-pad"
          aria-labelledby="journey-title"
        >
          <div className="wrap journey-grid">
            <div className="journey-intro">
              <p className="eyebrow dark">03 / O PRÓXIMO PASSO</p>
              <h2 id="journey-title">
                Clareza em
                <br />
                <em>cada etapa.</em>
              </h2>
              <p>
                Da primeira conversa à definição dos próximos passos, o ponto de
                partida é entender você.
              </p>
              <span className="journey-count" aria-hidden="true">
                01
              </span>
            </div>
            <div className="journey-steps">
              {[
                [
                  "Acolher a sua história.",
                  "O primeiro passo é o contato. Compartilhe brevemente o que está acontecendo e o tipo de orientação que procura.",
                  "Escuta",
                ],
                [
                  "Compreender o cenário.",
                  "A análise jurídica considera as informações e os documentos pertinentes, respeitando as particularidades da sua situação.",
                  "Análise",
                ],
                [
                  "Orientar o caminho.",
                  "Com a avaliação do caso, os caminhos possíveis e as condições de atuação são esclarecidos para uma decisão informada.",
                  "Direção",
                ],
              ].map(([title, text, label], i) => (
                <article className="journey-step" key={title}>
                  <span className="journey-line" />
                  <span className="step-number">0{i + 1}</span>
                  <p className="eyebrow dark">{label}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="faq section-pad" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div data-reveal>
              <p className="eyebrow dark">04 / INFORMAÇÃO É O PRIMEIRO PASSO</p>
              <h2 id="faq-title">
                Antes de
                <br />
                <em>conversarmos.</em>
              </h2>
              <p>
                Respostas para tornar
                <br />o primeiro contato mais simples.
              </p>
              <ContactLink className="text-link dark-link">
                Tenho outra dúvida
              </ContactLink>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <Icon name="plus" />
                  </summary>
                  <div>
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section
          id="contato"
          className="contact section-pad"
          aria-labelledby="contact-title"
        >
          <div className="wrap">
            <div className="section-top">
              <p className="eyebrow">05 / VAMOS CONVERSAR</p>
              <span className="small-note">COMODORO · MATO GROSSO</span>
            </div>
            <div className="section-line" />
            <div className="contact-grid">
              <div data-reveal>
                <h2 id="contact-title">
                  O próximo passo
                  <br />
                  começa com
                  <br />
                  <em>uma conversa.</em>
                </h2>
                <p>
                  Precisa resolver questões judiciais
                  <br className="desktop-break" /> e/ou extrajudiciais? Fale
                  comigo.
                </p>
              </div>
              <div className="contact-options" data-reveal>
                <ContactLink className="contact-main" icon="diagonal">
                  <span className="contact-icon">
                    <Icon name="whatsapp" />
                  </span>
                  <span>
                    <small>ATENDIMENTO PELO WHATSAPP</small>
                    <strong>
                      Vamos falar
                      <br />
                      sobre o seu caso?
                    </strong>
                    <span className="phone-number">{contact.phoneLabel}</span>
                  </span>
                </ContactLink>
                <a
                  className="social-link"
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <small>ACOMPANHE NO INSTAGRAM</small>
                    @fernandajardim.advogada
                  </span>
                  <Icon name="diagonal" />
                  <span className="sr-only"> (nova aba)</span>
                </a>
                <p className="contact-note">
                  Para sua privacidade, compartilhe documentos e informações
                  sensíveis somente após orientação da advogada.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <Brand footer />
            <p>
              Advocacia com técnica.
              <br />
              Relações com respeito.
            </p>
            <a
              className="back-top"
              href="#inicio"
              aria-label="Voltar ao início"
            >
              <Icon name="arrow" />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Fernanda Jardim. Todos os direitos reservados.</span>
            <a
              href="/privacidade.html"
              onClick={(e) => {
                e.preventDefault();
                setPrivacy(true);
              }}
            >
              Privacidade
            </a>
            <span>Advocacia e consultoria jurídica</span>
          </div>
          <p className="legal-note">
            Conteúdo informativo. A análise de cada caso depende de avaliação
            individual e não implica garantia de resultado.
          </p>
        </div>
      </footer>
      <dialog
        className="privacy-dialog"
        ref={dialog}
        onCancel={() => setPrivacy(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setPrivacy(false);
        }}
        aria-labelledby="privacy-title"
      >
        <button
          type="button"
          className="dialog-close"
          onClick={() => setPrivacy(false)}
          aria-label="Fechar política de privacidade"
        >
          <Icon name="close" />
        </button>
        <p className="eyebrow dark">TRANSPARÊNCIA</p>
        <h2 id="privacy-title">Sua privacidade.</h2>
        <p>
          Este site é informativo. Não utiliza formulários de coleta de dados,
          cookies de publicidade, ferramentas de análise de visitantes ou
          armazenamento local para rastreamento.
        </p>
        <h3>Ao entrar em contato</h3>
        <p>
          Os links para WhatsApp e Instagram levam a serviços de terceiros,
          sujeitos às respectivas políticas de privacidade. Envie apenas as
          informações necessárias ao primeiro contato e aguarde orientação para
          compartilhar documentos sensíveis.
        </p>
        <h3>Hospedagem e dados técnicos</h3>
        <p>
          O provedor de hospedagem pode registrar dados técnicos de acesso, como
          endereço IP, data, navegador e páginas solicitadas, para operação e
          segurança do serviço. Este site não define o prazo de retenção desses
          registros.
        </p>
        <h3>Dúvidas sobre privacidade</h3>
        <p>
          Entre em contato com Fernanda Jardim pelo WhatsApp{" "}
          {contact.phoneLabel} para tratar de informações compartilhadas no
          atendimento ou solicitar esclarecimentos.
        </p>
        <button
          type="button"
          className="button button-dark"
          onClick={() => setPrivacy(false)}
        >
          Entendi
          <Icon name="arrow" />
        </button>
      </dialog>
    </div>
  );
}
