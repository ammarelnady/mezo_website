import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  Award,
  Building2,
  Check,
  ClipboardCheck,
  Facebook,
  HardHat,
  Instagram,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

import {
  COMPANY,
  SERVICES,
  PROJECTS,
  NAV_ITEMS,
  PROJECT_TYPES,
  GOVERNORATES,
  IMAGES,
  buildWhatsAppQuoteUrl,
  getDirectWhatsAppUrl,
  type ProjectItem,
  type ServiceItem,
} from './config/siteConfig';

import { updateSEO } from './utils/seo';

// Helper to determine the current page route from window.location
function getNormalizedRoute(): { page: string; projectId?: string; path: string } {
  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '/';

  // Support both hash routing and HTML5 path routing
  let raw = hash.replace(/^#\/?/, '').trim();
  if (!raw && pathname !== '/') {
    raw = pathname.replace(/^\//, '').trim();
  }

  if (!raw || raw === '/') {
    return { page: 'home', path: '/' };
  }
  if (raw === 'about') {
    return { page: 'about', path: '/about' };
  }
  if (raw === 'services') {
    return { page: 'services', path: '/services' };
  }
  if (raw === 'projects') {
    return { page: 'projects', path: '/projects' };
  }
  if (raw.startsWith('project/') || raw.startsWith('projects/')) {
    const id = raw.replace(/^projects?\//, '');
    return { page: 'project', projectId: id, path: `/projects/${id}` };
  }
  if (raw === 'contact') {
    return { page: 'contact', path: '/contact' };
  }

  return { page: 'home', path: '/' };
}

function App() {
  const [routeInfo, setRouteInfo] = useState(getNormalizedRoute);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      const current = getNormalizedRoute();
      setRouteInfo(current);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const project = useMemo(() => {
    if (routeInfo.projectId) {
      return PROJECTS.find((item) => item.id === routeInfo.projectId) || PROJECTS[0];
    }
    return PROJECTS[0];
  }, [routeInfo.projectId]);

  // Update Page SEO dynamically on route change
  useEffect(() => {
    switch (routeInfo.page) {
      case 'home':
        updateSEO({
          title: `${COMPANY.name} | مقاولات وأعمال كهرباء في مصر`,
          description:
            'الديب للمقاولات الكهربائية والتوريدات تقدم حلولًا متكاملة في تنفيذ وتأسيس وتشطيب الأعمال الكهربائية، تمديد الكابلات، الكابل تراي، لوحات الكهرباء، CCTV، Fire Alarm والشبكات في جميع محافظات مصر.',
          path: '/',
          image: IMAGES.hero,
        });
        break;

      case 'about':
        updateSEO({
          title: `من نحن | ${COMPANY.name}`,
          description:
            'تعرف على شركة الديب للمقاولات الكهربائية والتوريدات وخبراتها في تنفيذ الأعمال الكهربائية والتوريدات والصيانة للمشروعات السكنية والتجارية والإدارية والصناعية.',
          path: '/about',
          image: IMAGES.welding,
        });
        break;

      case 'services':
        updateSEO({
          title: `خدمات المقاولات الكهربائية والتوريدات | ${COMPANY.shortName}`,
          description:
            'تعرف على خدمات الديب في المقاولات الكهربائية، تأسيس وتشطيب الكهرباء، تمديد الكابلات والمواسير، لوحات الكهرباء، Low Voltage، Medium Voltage، CCTV، Fire Alarm والشبكات.',
          path: '/services',
          image: IMAGES.panel,
        });
        break;

      case 'projects':
        updateSEO({
          title: `مشاريع وأعمال كهربائية | ${COMPANY.name}`,
          description:
            'استعرض نماذج من مشاريع وأعمال الديب للمقاولات الكهربائية والتوريدات في القطاعات السكنية والتجارية والإدارية والصناعية.',
          path: '/projects',
          image: IMAGES.building,
        });
        break;

      case 'project':
        updateSEO({
          title: `${project.title} | مشاريع الديب للمقاولات الكهربائية`,
          description: `تفاصيل ونطاق أعمال ${project.title} المنفذة بواسطة الديب للمقاولات الكهربائية والتوريدات في ${project.location}، تشمل التأسيس والتوريد والتشغيل.`,
          path: `/projects/${project.id}`,
          image: project.image,
          type: 'article',
        });
        break;

      case 'contact':
        updateSEO({
          title: `تواصل معنا | طلب عرض سعر لأعمال الكهرباء | ${COMPANY.shortName}`,
          description:
            'تواصل مع الديب للمقاولات الكهربائية والتوريدات لطلب عرض سعر أو الاستفسار عن تنفيذ الأعمال الكهربائية والصيانة والتوريدات في محافظات مصر.',
          path: '/contact',
          image: IMAGES.site,
        });
        break;

      default:
        break;
    }
  }, [routeInfo, project]);

  return (
    <div dir="rtl" className="app-shell">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} currentPath={routeInfo.path} />
      <main>
        {routeInfo.page === 'home' && <Home />}
        {routeInfo.page === 'about' && <About />}
        {routeInfo.page === 'services' && <ServicesPage />}
        {routeInfo.page === 'projects' && <ProjectsPage />}
        {routeInfo.page === 'project' && <ProjectDetails project={project} />}
        {routeInfo.page === 'contact' && <Contact />}
      </main>
      <Footer />
    </div>
  );
}

function Navbar({
  menuOpen,
  setMenuOpen,
  currentPath,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  currentPath: string;
}) {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a href="#/" className="brand" aria-label="الديب للمقاولات الكهربائية والتوريدات - الصفحة الرئيسية">
          <span className="brand-mark">
            <Zap size={18} fill="currentColor" />
          </span>
          <span>
            <strong>{COMPANY.shortName}</strong>
            <small>{COMPANY.subtitle}</small>
          </span>
        </a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="القائمة الرئيسية">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPath === item.path ||
              (item.path === '/' && (currentPath === '/' || !currentPath));
            return (
              <a
                key={item.path}
                href={item.hash}
                className={isActive ? 'active' : ''}
              >
                {item.label}
              </a>
            );
          })}
          <a href="#/contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
            اطلب عرض سعر
          </a>
        </nav>
        <div className="nav-actions">
          <a href={`tel:${COMPANY.phoneSecondaryTel}`} className="phone-link" aria-label="رقم الهاتف">
            <Phone size={15} /> {COMPANY.phoneSecondary}
          </a>
          <a href="#/contact" className="button button-small">
            اطلب عرض سعر <ArrowLeft size={15} />
          </a>
        </div>
        <button
          className="menu-button"
          aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-image" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="pill">
              <Sparkles size={14} /> خبرة تمتد عبر مختلف محافظات مصر
            </span>
            <h1>
              حلول كهربائية
              <br />
              <em>متكاملة</em> بخبرة
              <br />
              تعتمد عليها
            </h1>
            <p>
              ننفذ ونورد حلولاً كهربائية موثوقة للمشروعات السكنية والتجارية والإدارية والصناعية والطبية، من الفكرة والتأسيس وحتى التشغيل والتسليم.
            </p>
            <div className="hero-buttons">
              <a href="#/contact" className="button">
                اطلب عرض سعر <ArrowLeft size={17} />
              </a>
              <a href="#/services" className="button button-outline">
                اكتشف خدماتنا <ArrowLeft size={17} />
              </a>
            </div>
            <div className="hero-stats">
              <Stat number="+500" label="مشروع منجز" />
              <Stat number="+10" label="سنوات خبرة" />
              <Stat number="27" label="محافظة" />
              <Stat number="100%" label="التزام بالجودة" />
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="section about-preview">
          <div className="container about-grid">
            <div className="image-frame">
              <img
                src={IMAGES.welding}
                alt="فني كهرباء أثناء تنفيذ الأعمال والتجهيزات بالموقع الإنشائي"
                loading="lazy"
                decoding="async"
                width={500}
                height={410}
              />
              <div className="experience-badge">
                <strong>+10</strong>
                <span>
                  سنوات من
                  <br />
                  الخبرة
                </span>
              </div>
            </div>
            <div>
              <SectionTitle
                eyebrow="من نحن"
                title={
                  <>
                    نبني الثقة
                    <br />
                    <em>بالخبرة والجودة</em>
                  </>
                }
                text="الديب للمقاولات الكهربائية والتوريدات شريكك المتخصص في تنفيذ وتوريد حلول الكهرباء للمشروعات المختلفة. نعمل بفريق فني مؤهل، ونلتزم بأدق المعايير لضمان نتائج آمنة ومستدامة."
              />
              <div className="mini-values">
                <Value icon={Award} title="جودة التنفيذ" text="مواصفات دقيقة ونتائج تدوم" />
                <Value icon={ClipboardCheck} title="التزام بالمواعيد" text="خطط واضحة وتسليم في الموعد" />
                <Value icon={HardHat} title="سلامة أولاً" text="معايير أمان في كل خطوة" />
              </div>
              <a href="#/about" className="text-link">
                تعرف علينا أكثر <ArrowLeft size={16} />
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section services-section soft-bg">
          <div className="container">
            <SectionTitle
              eyebrow="خدماتنا"
              title="كل ما يحتاجه مشروعك الكهربائي"
              text="حلول متكاملة تبدأ من التأسيس ولا تنتهي عند التسليم، بأيدي مهندسين وفنيين متخصصين."
            />
            <div className="service-grid">
              {SERVICES.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
            <div className="center-link">
              <a href="#/services" className="text-link">
                استعرض جميع الخدمات <ArrowLeft size={16} />
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <WhyUs />
      </Reveal>

      <Reveal>
        <section className="section sectors-section">
          <div className="container">
            <SectionTitle eyebrow="قطاعات نخدمها" title="خبرتنا تناسب كل نوع من المشروعات" />
            <div className="sector-grid">
              <Sector icon={Building2} title="المشروعات السكنية" text="شقق، فلل، ومجمعات سكنية" />
              <Sector icon={LayoutGrid} title="المكاتب والإداري" text="مكاتب ومبانٍ إدارية" />
              <Sector icon={Users} title="التجاري" text="محلات ومراكز تجارية" />
              <Sector icon={Wrench} title="الصناعي" text="مصانع ومنشآت إنتاجية" />
              <Sector icon={ShieldCheck} title="الطبي" text="مستشفيات ومنشآت طبية" />
              <Sector icon={MapPin} title="كل مصر" text="تغطية جميع المحافظات" />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <ProjectsPreview />
      </Reveal>

      <Reveal>
        <Process />
      </Reveal>

      <Reveal>
        <CTA />
      </Reveal>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <strong>{number}</strong>
      <span>{label}</span>
    </div>
  );
}

function Value({ icon: Icon, title, text }: { icon: typeof Award; title: string; text: string }) {
  return (
    <div className="mini-value">
      <span className="icon-box">
        <Icon size={18} />
      </span>
      <div>
        <strong>{title}</strong>
        <small>{text}</small>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = service.icon;
  return (
    <article className="service-card">
      <span className="card-number">0{index + 1}</span>
      <span className="service-icon">
        <Icon size={23} />
      </span>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
      <a href="#/services" aria-label={`تفاصيل خدمة ${service.title}`}>
        <ArrowLeft size={17} />
      </a>
    </article>
  );
}

function Sector({ icon: Icon, title, text }: { icon: typeof Building2; title: string; text: string }) {
  return (
    <div className="sector">
      <Icon size={26} />
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

function WhyUs() {
  return (
    <section className="section why-section">
      <div className="container why-grid">
        <div>
          <SectionTitle
            eyebrow="لماذا الديب؟"
            title={
              <>
                شريكك الآمن
                <br />
                <em>لنجاح مشروعك</em>
              </>
            }
            text="نضع الجودة والسلامة والالتزام في قلب كل مشروع، ونقدم حلولاً عملية مصممة لتدوم."
          />
          <a href="#/about" className="button button-dark">
            لماذا نحن <ArrowLeft size={16} />
          </a>
        </div>
        <div className="why-list">
          <div>
            <span>01</span>
            <strong>جودة تنفيذ لا تهاون فيها</strong>
            <p>نستخدم خامات موثوقة ونطبق أفضل الممارسات الفنية والهندسية في كل مرحلة.</p>
          </div>
          <div>
            <span>02</span>
            <strong>فريق فني متخصص</strong>
            <p>مهندسون وفنيون بخبرة عملية مثبتة في مختلف أنواع المشروعات الإنشائية والصناعية.</p>
          </div>
          <div>
            <span>03</span>
            <strong>حلول متكاملة من مصدر واحد</strong>
            <p>تنفيذ وتوريد وصيانة تحت إدارة واحدة لتجربة أسهل ونتيجة أكثر دقة وأماناً.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  return (
    <section className="section projects-section soft-bg">
      <div className="container">
        <SectionTitle
          eyebrow="أعمالنا"
          title="مشروعات نفخر بتنفيذها"
          text="نماذج واقعية من الخبرة التي نقدمها لعملائنا في قطاعات سكنية وصناعية وتجارية وإدارية."
        />
        <div className="projects-grid">
          {PROJECTS.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="center-link">
          <a href="#/projects" className="text-link">
            شاهد كل المشروعات <ArrowLeft size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <a href={`#/projects/${project.id}`} className="project-card">
      <div className="project-image">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width={380}
          height={235}
        />
        <span>{project.category}</span>
      </div>
      <div className="project-info">
        <small>{project.location}</small>
        <h3>{project.title}</h3>
        <span className="text-link">
          التفاصيل <ArrowLeft size={15} />
        </span>
      </div>
    </a>
  );
}

function Process() {
  const steps = [
    'دراسة احتياجات المشروع',
    'التخطيط والتجهيز',
    'التنفيذ',
    'الاختبار والتسليم',
    'الصيانة والدعم',
  ];
  return (
    <section className="section process-section">
      <div className="container">
        <SectionTitle
          eyebrow="منهجية العمل"
          title="كيف نعمل؟"
          text="خطوات واضحة تضمن لك أعلى مستويات الجودة والالتزام في كل مرحلة من مراحل العمل."
        />
        <div className="process-track">
          {steps.map((step, index) => (
            <div className="process-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              <p>
                {index === 0
                  ? 'نفهم احتياجاتك ونحدد نطاق العمل والمواصفات الفنية بدقة.'
                  : index === 1
                  ? 'نضع خطة تنفيذ وجدولاً زمنياً معتمداً وقائمة التوريدات.'
                  : index === 2
                  ? 'فريقنا يبدأ العمل والتمديدات وفق الكود الهندسي والمواصفات.'
                  : index === 3
                  ? 'اختبارات عزل وتوصيل دقيقة قبل التسليم النهائي الموثق.'
                  : 'نبقى معك لتقديم خدمات الصيانة وضمان استمرارية الأداء.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-content">
        <div>
          <span className="eyebrow">جاهزون لمشروعك</span>
          <h2>هل لديك مشروع كهربائي؟</h2>
          <p>تواصل معنا اليوم لمناقشة احتياجات مشروعك والحصول على عرض سعر فني وتجاري مناسب.</p>
        </div>
        <a href="#/contact" className="button">
          اطلب عرض سعر <ArrowLeft size={17} />
        </a>
      </div>
    </section>
  );
}

function InnerHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="inner-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <InnerHero
        eyebrow="من نحن"
        title="خبرة تُبنى عليها الثقة"
        text="شريكك المتخصص في تنفيذ الأعمال الكهربائية والتوريدات الهندسية باحترافية في جميع أنحاء مصر."
      />
      <section className="section about-page">
        <div className="container about-grid">
          <div className="image-frame large">
            <img
              src={IMAGES.welding}
              alt="أعمال لحام وتجهيزات وتأسيس كهربائي في موقع العمل"
              loading="lazy"
              decoding="async"
              width={500}
              height={470}
            />
            <div className="experience-badge">
              <strong>+500</strong>
              <span>
                مشروع
                <br />
                منجز
              </span>
            </div>
          </div>
          <div>
            <SectionTitle
              eyebrow="الديب للمقاولات"
              title={
                <>
                  نحوّل التحديات
                  <br />
                  <em>إلى حلول عملية</em>
                </>
              }
              text="منذ انطلاقنا، التزمنا بتقديم قيمة حقيقية لعملائنا عبر تنفيذ أعمال كهربائية دقيقة وآمنة، مع اختيار أفضل الخامات والاعتماد على فريق يجمع بين الخبرة والمعرفة الحديثة. نؤمن أن نجاحنا يقاس باستمرارية عمل منشآتك ورضا عملائنا."
            />
            <div className="mission-grid">
              <Value icon={Target} title="رؤيتنا" text="أن نكون الشريك الأول للحلول الكهربائية والتوريدات في مصر." />
              <Value icon={Sparkles} title="رسالتنا" text="تقديم تنفيذ موثوق بأعلى معايير الأمان يضيف قيمة حقيقية لكل منشأة." />
            </div>
          </div>
        </div>
      </section>
      <section className="section soft-bg values-section">
        <div className="container">
          <SectionTitle eyebrow="قيمنا" title="مبادئ ثابتة في كل ما ننجزه" />
          <div className="values-grid">
            <ValueLarge
              icon={ShieldCheck}
              title="السلامة والجودة"
              text="نضع سلامة فريق العمل والمنشأة في مقدمة أولوياتنا، ونلتزم بالمواصفات الهندسية المعتمدة."
            />
            <ValueLarge
              icon={Users}
              title="العمل بروح الفريق"
              text="نتعاون مع العميل والاستشاري وكل أطراف المشروع لتحقيق أعلى درجات التنسيق والإتقان."
            />
            <ValueLarge
              icon={Award}
              title="الالتزام والشفافية"
              text="مواعيد واضحة، تقارير متابعة دورية، وتواصل مستمر مع إدارة المشروع من البداية حتى التسليم."
            />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function ValueLarge({ icon: Icon, title, text }: { icon: typeof Award; title: string; text: string }) {
  return (
    <div className="value-large">
      <span className="icon-box">
        <Icon size={24} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      <InnerHero
        eyebrow="خدماتنا"
        title="حلول كهربائية متكاملة للمباني والمنشآت"
        text="من التأسيس إلى التشغيل والصيانة، نقدم لك الخبرة المتخصصة التي يحتاجها مشروعك في كافة المحافظات."
      />
      <section className="section service-detail-section">
        <div className="container service-details">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <article className={`service-detail ${index % 2 ? 'reverse' : ''}`} key={service.title}>
                <div className="detail-visual">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={500}
                    height={350}
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="detail-copy">
                  <span className="service-icon">
                    <Icon size={24} />
                  </span>
                  <h2>{service.title}</h2>
                  <p>{service.detailedText}</p>
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <Check size={16} /> {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="#/contact" className="text-link">
                    اطلب هذه الخدمة الآن <ArrowLeft size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState('الكل');
  const categories = ['الكل', ...PROJECT_TYPES];
  const filtered = useMemo(
    () => (filter === 'الكل' ? PROJECTS : PROJECTS.filter((project) => project.category === filter)),
    [filter]
  );
  return (
    <>
      <InnerHero
        eyebrow="مشاريعنا"
        title="أعمال تتحدث عن خبرتنا في المقاولات الكهربائية"
        text="نشارككم نماذج من المشروعات التي نفذناها في قطاعات سكنية وصناعية وتجارية وإدارية وطبية."
      />
      <section className="section projects-page">
        <div className="container">
          <div className="filters">
            {categories.map((category) => (
              <button
                key={category}
                className={filter === category ? 'selected' : ''}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="projects-grid wide">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectDetails({ project }: { project: ProjectItem }) {
  return (
    <>
      <InnerHero
        eyebrow={project.category}
        title={project.title}
        text={`تفاصيل المشروع ونطاق الأعمال الكهربائية المنفذة في ${project.location}.`}
      />
      <section className="section project-detail-page">
        <div className="container">
          <img
            className="project-cover"
            src={project.image}
            alt={project.imageAlt}
            loading="eager"
            width={1180}
            height={520}
          />
          <div className="project-meta">
            <div>
              <span>الموقع</span>
              <strong>{project.location}</strong>
            </div>
            <div>
              <span>القطاع</span>
              <strong>{project.category}</strong>
            </div>
            <div>
              <span>نطاق العمل</span>
              <strong>أعمال كهربائية متكاملة</strong>
            </div>
          </div>
          <div className="project-description">
            <div>
              <SectionTitle eyebrow="عن المشروع" title="تنفيذ بمعايير هندسية تليق بالمكان" />
              <p>
                {project.text} تم تنفيذ المشروع من خلال مراحل مدروسة شملت المعاينة والدراسة والتخطيط والتوريد والتركيب
                والاختبار، مع تنسيق كامل مع باقي الأعمال بالموقع لضمان التسليم في الموعد المحدد وبأعلى معايير الأمان.
              </p>
              <p>
                حرص فريق الديب على تقديم حل عملي وموثوق يلبي احتياجات التشغيل الحالية مع الالتزام بأصول الصنعة ومراعاة
                إمكانية التوسع المستقبلي في الأحمال.
              </p>
            </div>
            <div className="scope-card">
              <h3>نطاق الأعمال المنفذة</h3>
              {project.scope.map((item) => (
                <div key={item}>
                  <Check size={16} /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="detail-gallery">
            <img
              src={IMAGES.panel}
              alt="لوحة توزيع وتحكم كهربائية رئيسية وقواطع حماية"
              loading="lazy"
              decoding="async"
              width={380}
              height={200}
            />
            <img
              src={IMAGES.cable}
              alt="كابلات صناعية ومسارات كابل تراي كهربائية"
              loading="lazy"
              decoding="async"
              width={380}
              height={200}
            />
            <img
              src={IMAGES.site}
              alt="موقع تنفيذ المشروعات الكهربائية والمتابعة الميدانية"
              loading="lazy"
              decoding="async"
              width={380}
              height={200}
            />
          </div>
          <div className="center-link">
            <a href="#/contact" className="button">
              ناقش مشروعك معنا <ArrowLeft size={17} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    governorate: '',
    details: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    projectType?: string;
    governorate?: string;
    details?: string;
  }>({});

  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    // 1. Name validation (required, at least 2 chars)
    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال الاسم بالكامل';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'الاسم يجب أن يحتوي على حرفين على الأقل';
    }

    // 2. Phone validation (required, Egyptian phone format or standard digits)
    const phoneClean = formData.phone.trim().replace(/\s+/g, '');
    if (!phoneClean) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    } else {
      // Must be at least 10-11 digits (Egyptian numbers e.g., 01xxxxxxxxx or +201xxxxxxxxx)
      const phoneRegex = /^(01[0125][0-9]{8}|\+?201[0125][0-9]{8}|0[0-9]{9,10})$/;
      if (!phoneRegex.test(phoneClean)) {
        newErrors.phone = 'يرجى إدخال رقم هاتف صحيح (مثال: 01000901370)';
      }
    }

    // 3. Email validation (optional, but validated if provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح أو تركه فارغاً';
      }
    }

    // 4. Project Type validation (required)
    if (!formData.projectType) {
      newErrors.projectType = 'يرجى اختيار نوع المشروع';
    }

    // 5. Governorate validation (required)
    if (!formData.governorate) {
      newErrors.governorate = 'يرجى اختيار المحافظة';
    }

    // 6. Request details validation (required, at least 10 chars)
    if (!formData.details.trim()) {
      newErrors.details = 'يرجى كتابة تفاصيل الطلب واحتياجاتك الكهربائية';
    } else if (formData.details.trim().length < 10) {
      newErrors.details = 'يرجى كتابة تفاصيل أوضح عن المشروع (10 أحرف على الأقل)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field once user edits
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    // 1. Build structured WhatsApp quote URL
    const whatsappUrl = buildWhatsAppQuoteUrl(formData);

    // 2. Open WhatsApp in new window/tab safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // 3. Show smooth completion state without reloading the page
    setSent(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: '',
      governorate: '',
      details: '',
    });
    setErrors({});
    setSent(false);
  };

  return (
    <>
      <InnerHero
        eyebrow="تواصل معنا"
        title="لنبدأ مشروعك معاً"
        text="نحن جاهزون للاستماع إلى متطلبات مشروعك وتقديم عروض الأسعار والاستشارات الفنية."
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <SectionTitle
              eyebrow="معلومات التواصل"
              title="نحن قريبون منك"
              text="تغطية تنفيذ وتوريد لجميع محافظات مصر، وفريق هندسي وفني جاهز للرد على استفساراتك."
            />
            <div className="contact-items">
              <a href={`tel:${COMPANY.phonePrimaryTel}`} aria-label={`اتصل بنا على ${COMPANY.phonePrimary}`}>
                <span>
                  <Phone size={19} />
                </span>
                <div>
                  <small>اتصل بنا</small>
                  <strong>{COMPANY.phonePrimary}</strong>
                </div>
              </a>
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`محادثة واتساب على ${COMPANY.whatsappDisplay}`}
              >
                <span>
                  <MessageIcon />
                </span>
                <div>
                  <small>واتساب</small>
                  <strong>{COMPANY.whatsappDisplay}</strong>
                </div>
              </a>
              <div>
                <span>
                  <MapPin size={19} />
                </span>
                <div>
                  <small>نطاق العمل والتغطية</small>
                  <strong>{COMPANY.coverage}</strong>
                </div>
              </div>
              <a href={`mailto:${COMPANY.email}`} aria-label={`البريد الإلكتروني ${COMPANY.email}`}>
                <span>
                  <Mail size={19} />
                </span>
                <div>
                  <small>البريد الإلكتروني</small>
                  <strong>{COMPANY.email}</strong>
                </div>
              </a>
              <a
                href={COMPANY.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="صفحة فيسبوك الديب للمقاولات والتوريدات"
              >
                <span>
                  <Facebook size={19} />
                </span>
                <div>
                  <small>فيسبوك</small>
                  <strong>صفحتنا على فيسبوك</strong>
                </div>
              </a>
              <a
                href={COMPANY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="حساب إنستجرام الديب للمقاولات والتوريدات"
              >
                <span>
                  <Instagram size={19} />
                </span>
                <div>
                  <small>إنستجرام</small>
                  <strong>حسابنا على إنستجرام</strong>
                </div>
              </a>
            </div>
            <div className="contact-services">
              <strong>خدماتنا الرئيسية</strong>
              <div>
                {SERVICES.slice(0, 5).map((service) => (
                  <span key={service.title}>{service.title}</span>
                ))}
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="form-heading">
              <span className="eyebrow">تحدث معنا</span>
              <h2>أرسل لنا طلب عرض سعر</h2>
              <p>املأ البيانات وسيتم فتح المحادثة مباشرة عبر واتساب لتأكيد طلبك.</p>
            </div>

            {sent ? (
              <div className="success-message">
                <Check size={30} />
                <h3>تم إرسال طلبك بنجاح</h3>
                <p>شكراً لتواصلك معنا، تم فتح المحادثة على واتساب لمتابعة طلب عرض السعر فوراً.</p>
                <button type="button" className="text-link" onClick={handleResetForm}>
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <label>
                    الاسم *
                    <input
                      required
                      placeholder="اسمك الكامل"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="field-error-msg">{errors.name}</span>}
                  </label>

                  <label>
                    رقم الهاتف *
                    <input
                      required
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={errors.phone ? 'input-error' : ''}
                    />
                    {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                  </label>
                </div>

                <label>
                  البريد الإلكتروني (اختياري)
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="field-error-msg">{errors.email}</span>}
                </label>

                <div className="form-row">
                  <label>
                    نوع المشروع *
                    <select
                      value={formData.projectType}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      className={errors.projectType ? 'input-error' : ''}
                    >
                      <option value="" disabled>
                        اختر نوع المشروع
                      </option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && <span className="field-error-msg">{errors.projectType}</span>}
                  </label>

                  <label>
                    المحافظة *
                    <select
                      value={formData.governorate}
                      onChange={(e) => handleChange('governorate', e.target.value)}
                      className={errors.governorate ? 'input-error' : ''}
                    >
                      <option value="" disabled>
                        اختر المحافظة
                      </option>
                      {GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                    {errors.governorate && <span className="field-error-msg">{errors.governorate}</span>}
                  </label>
                </div>

                <label>
                  تفاصيل الطلب *
                  <textarea
                    required
                    placeholder="اكتب تفاصيل مشروعك واحتياجاتك الكهربائية وموقع التنفيذ..."
                    rows={5}
                    value={formData.details}
                    onChange={(e) => handleChange('details', e.target.value)}
                    className={errors.details ? 'input-error' : ''}
                  />
                  {errors.details && <span className="field-error-msg">{errors.details}</span>}
                </label>

                <button className="button submit-button" type="submit">
                  إرسال الطلب عبر واتساب <ArrowLeft size={17} />
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function MessageIcon() {
  return <span className="message-icon">W</span>;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#/" className="brand" aria-label="الديب للمقاولات الكهربائية والتوريدات">
            <span className="brand-mark">
              <Zap size={18} fill="currentColor" />
            </span>
            <span>
              <strong>{COMPANY.shortName}</strong>
              <small>{COMPANY.subtitle}</small>
            </span>
          </a>
          <p>
            حلول كهربائية موثوقة من التأسيس إلى التشغيل والصيانة، وتوريد المستلزمات الكهربائية في جميع أنحاء مصر.
          </p>
          <div className="socials">
            <a
              href={COMPANY.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فيسبوك"
            >
              <Facebook size={16} />
            </a>
            <a
              href={COMPANY.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستجرام"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
        <div>
          <h3>روابط سريعة</h3>
          {NAV_ITEMS.map((item) => (
            <a key={item.path} href={item.hash}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <h3>خدماتنا</h3>
          {SERVICES.slice(0, 5).map((service) => (
            <a key={service.title} href="#/services">
              {service.title}
            </a>
          ))}
        </div>
        <div>
          <h3>تواصل معنا</h3>
          <a href={`tel:${COMPANY.phoneSecondaryTel}`}>
            <Phone size={14} /> {COMPANY.phoneSecondary}
          </a>
          <a href={`mailto:${COMPANY.email}`}>
            <Mail size={14} /> {COMPANY.email}
          </a>
          <a href="#/contact">
            <MapPin size={14} /> {COMPANY.coverage}
          </a>
          <a href={COMPANY.facebookUrl} target="_blank" rel="noopener noreferrer">
            <Facebook size={14} /> فيسبوك
          </a>
          <a href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer">
            <Instagram size={14} /> إنستجرام
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {COMPANY.name}</span>
        <span>ننفذ بثقة، ونبني للمستقبل</span>
      </div>
    </footer>
  );
}

export default App;
