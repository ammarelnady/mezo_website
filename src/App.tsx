import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  Award,
  BatteryCharging,
  Building2,
  Cable,
  Check,
  ClipboardCheck,
  Facebook,
  HardHat,
  Instagram,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  PanelTop,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=1800',
  welding: 'https://images.pexels.com/photos/36847990/pexels-photo-36847990.jpeg?auto=compress&cs=tinysrgb&w=1000',
  cable: 'https://images.pexels.com/photos/29596327/pexels-photo-29596327.jpeg?auto=compress&cs=tinysrgb&w=1000',
  building: 'https://images.pexels.com/photos/1816030/pexels-photo-1816030.jpeg?auto=compress&cs=tinysrgb&w=1000',
  panel: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1000',
  site: 'https://images.pexels.com/photos/5667685/pexels-photo-5667685.jpeg?auto=compress&cs=tinysrgb&w=1000',
};

const services = [
  { icon: Zap, title: 'تنفيذ جميع الأعمال الكهربائية', text: 'تنفيذ متكامل للأعمال الكهربائية وفق الرسومات والمواصفات الفنية المعتمدة.' },
  { icon: Cable, title: 'تمديد وسحب الكابلات', text: 'تأسيس وتمديد الكابلات داخل المواسير والكابل تراي بأعلى معايير الأمان.' },
  { icon: PanelTop, title: 'لوحات الكهرباء', text: 'تصميم وتجميع وتركيب لوحات التوزيع والتحكم للمشروعات المختلفة.' },
  { icon: BatteryCharging, title: 'Low & Medium Voltage', text: 'حلول الجهد المنخفض والمتوسط للمباني والمصانع والمنشآت الحيوية.' },
  { icon: ShieldCheck, title: 'CCTV و Fire Alarm', text: 'أنظمة مراقبة وإنذار حريق موثوقة لحماية الأفراد والممتلكات.' },
  { icon: Wrench, title: 'الصيانة والتوريدات', text: 'صيانة دورية وطوارئ مع توفير المستلزمات الكهربائية الأصلية.' },
];

const projects = [
  { id: 'new-cairo', title: 'مجمع سكني — القاهرة الجديدة', category: 'سكني', location: 'القاهرة الجديدة', image: images.building, text: 'تنفيذ الأعمال الكهربائية المتكاملة لمجمع سكني حديث.' },
  { id: 'industrial', title: 'مصنع صناعي — العاشر من رمضان', category: 'صناعي', location: 'العاشر من رمضان', image: images.cable, text: 'توريد وتركيب لوحات الجهد وتمديدات القوى للمصنع.' },
  { id: 'office', title: 'مبنى إداري — العاصمة الإدارية', category: 'إداري', location: 'العاصمة الإدارية', image: images.panel, text: 'حلول كهربائية وأنظمة تيار خفيف لمبنى إداري.' },
  { id: 'hospital', title: 'منشأة طبية — الجيزة', category: 'طبي', location: 'الجيزة', image: images.site, text: 'أعمال كهرباء وأنظمة إنذار للمرافق الطبية.' },
  { id: 'villa', title: 'فيلا سكنية — الساحل الشمالي', category: 'سكني', location: 'الساحل الشمالي', image: images.hero, text: 'تنفيذ التشطيبات الكهربائية وأنظمة المنزل الذكي.' },
  { id: 'commercial', title: 'مركز تجاري — مدينة نصر', category: 'تجاري', location: 'مدينة نصر', image: images.welding, text: 'تنفيذ شبكة القوى والإنارة لمركز تجاري.' },
];

const navItems = [
  ['الرئيسية', '#/'],
  ['من نحن', '#/about'],
  ['خدماتنا', '#/services'],
  ['مشاريعنا', '#/projects'],
  ['تواصل معنا', '#/contact'],
];

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash || '#/');
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const page = route.startsWith('#/project/') ? 'project' : route.replace('#/', '') || 'home';
  const project = projects.find((item) => item.id === route.replace('#/project/', '')) || projects[0];

  return (
    <div dir="rtl" className="app-shell">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {page === 'home' && <Home />}
      {page === 'about' && <About />}
      {page === 'services' && <ServicesPage />}
      {page === 'projects' && <ProjectsPage />}
      {page === 'project' && <ProjectDetails project={project} />}
      {page === 'contact' && <Contact />}
      <Footer />
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a href="#/" className="brand" aria-label="الديب للمقاولات الكهربائية والتوريدات">
          <span className="brand-mark"><Zap size={18} fill="currentColor" /></span>
          <span><strong>الديب</strong><small>للمقاولات والتوريدات</small></span>
        </a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          {navItems.map(([label, href]) => <a key={href} href={href} className={window.location.hash === href || (href === '#/' && !window.location.hash) ? 'active' : ''}>{label}</a>)}
          <a href="#/contact" className="mobile-cta">اطلب عرض سعر</a>
        </nav>
        <div className="nav-actions">
          <a href="tel:+201000001020" className="phone-link"><Phone size={15} /> 0100 000 1020</a>
          <a href="#/contact" className="button button-small">اطلب عرض سعر <ArrowLeft size={15} /></a>
        </div>
        <button className="menu-button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
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
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-copy">
          <span className="pill"><Sparkles size={14} /> خبرة تمتد عبر مختلف محافظات مصر</span>
          <h1>حلول كهربائية<br /><em>متكاملة</em> بخبرة<br />تعتمد عليها</h1>
          <p>ننفذ ونورد حلولاً كهربائية موثوقة للمشروعات السكنية والتجارية والإدارية والصناعية والطبية، من الفكرة وحتى التسليم.</p>
          <div className="hero-buttons"><a href="#/contact" className="button">اطلب عرض سعر <ArrowLeft size={17} /></a><a href="#/services" className="button button-outline">اكتشف خدماتنا <ArrowLeft size={17} /></a></div>
          <div className="hero-stats"><Stat number="+500" label="مشروع منجز" /><Stat number="+10" label="سنوات خبرة" /><Stat number="27" label="محافظة" /><Stat number="100%" label="التزام بالجودة" /></div>
        </div>
      </div>
    </section>
    <Reveal><section className="section about-preview"><div className="container about-grid"><div className="image-frame"><img src={images.welding} alt="فني يعمل في موقع إنشائي" /><div className="experience-badge"><strong>+10</strong><span>سنوات من<br />الخبرة</span></div></div><div><SectionTitle eyebrow="من نحن" title={<>نبني الثقة<br /><em>بالخبرة والجودة</em></>} text="الديب للمقاولات الكهربائية والتوريدات شريكك المتخصص في تنفيذ وتوريد حلول الكهرباء للمشروعات المختلفة. نعمل بفريق فني مؤهل، ونلتزم بأدق المعايير لضمان نتائج آمنة ومستدامة." /><div className="mini-values"><Value icon={Award} title="جودة التنفيذ" text="مواصفات دقيقة ونتائج تدوم" /><Value icon={ClipboardCheck} title="التزام بالمواعيد" text="خطط واضحة وتسليم في الموعد" /><Value icon={HardHat} title="سلامة أولاً" text="معايير أمان في كل خطوة" /></div><a href="#/about" className="text-link">تعرف علينا أكثر <ArrowLeft size={16} /></a></div></div></section></Reveal>
    <Reveal><section className="section services-section soft-bg"><div className="container"><SectionTitle eyebrow="خدماتنا" title="كل ما يحتاجه مشروعك الكهربائي" text="حلول متكاملة تبدأ من التأسيس ولا تنتهي عند التسليم." /><div className="service-grid">{services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}</div><div className="center-link"><a href="#/services" className="text-link">استعرض جميع الخدمات <ArrowLeft size={16} /></a></div></div></section></Reveal>
    <Reveal><WhyUs /></Reveal>
    <Reveal><section className="section sectors-section"><div className="container"><SectionTitle eyebrow="قطاعات نخدمها" title="خبرتنا تناسب كل نوع من المشروعات" /><div className="sector-grid"><Sector icon={Building2} title="المشروعات السكنية" text="شقق، فلل، ومجمعات سكنية" /><Sector icon={LayoutGrid} title="المكاتب والإداري" text="مكاتب ومبانٍ إدارية" /><Sector icon={Users} title="التجاري" text="محلات ومراكز تجارية" /><Sector icon={Wrench} title="الصناعي" text="مصانع ومنشآت إنتاجية" /><Sector icon={ShieldCheck} title="الطبي" text="مستشفيات ومنشآت طبية" /><Sector icon={MapPin} title="كل مصر" text="تغطية جميع المحافظات" /></div></div></section></Reveal>
    <Reveal><ProjectsPreview /></Reveal>
    <Reveal><Process /></Reveal>
    <Reveal><CTA /></Reveal>
  </>;
}

function Stat({ number, label }: { number: string; label: string }) { return <div><strong>{number}</strong><span>{label}</span></div>; }
function Value({ icon: Icon, title, text }: { icon: typeof Award; title: string; text: string }) { return <div className="mini-value"><span className="icon-box"><Icon size={18} /></span><div><strong>{title}</strong><small>{text}</small></div></div>; }
function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) { const Icon = service.icon; return <article className="service-card"><span className="card-number">0{index + 1}</span><span className="service-icon"><Icon size={23} /></span><h3>{service.title}</h3><p>{service.text}</p><a href="#/services" aria-label={`تفاصيل ${service.title}`}><ArrowLeft size={17} /></a></article>; }
function Sector({ icon: Icon, title, text }: { icon: typeof Building2; title: string; text: string }) { return <div className="sector"><Icon size={26} /><strong>{title}</strong><span>{text}</span></div>; }

function WhyUs() { return <section className="section why-section"><div className="container why-grid"><div><SectionTitle eyebrow="لماذا الديب؟" title={<>شريكك الآمن<br /><em>لنجاح مشروعك</em></>} text="نضع الجودة والسلامة والالتزام في قلب كل مشروع، ونقدم حلولاً عملية مصممة لتدوم." /><a href="#/about" className="button button-dark">لماذا نحن <ArrowLeft size={16} /></a></div><div className="why-list"><div><span>01</span><strong>جودة تنفيذ لا compromise فيها</strong><p>نستخدم خامات موثوقة ونطبق أفضل الممارسات الفنية في كل مرحلة.</p></div><div><span>02</span><strong>فريق فني متخصص</strong><p>مهندسون وفنيون بخبرة عملية في مختلف أنواع المشروعات.</p></div><div><span>03</span><strong>حلول متكاملة من مصدر واحد</strong><p>تنفيذ وتوريد وصيانة تحت إدارة واحدة لتجربة أسهل ونتيجة أفضل.</p></div></div></div></section>; }

function ProjectsPreview() { return <section className="section projects-section soft-bg"><div className="container"><SectionTitle eyebrow="أعمالنا" title="مشروعات نفخر بتنفيذها" text="نماذج من الخبرة التي نقدمها لعملائنا في قطاعات مختلفة." /><div className="projects-grid">{projects.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} />)}</div><div className="center-link"><a href="#/projects" className="text-link">شاهد كل المشروعات <ArrowLeft size={16} /></a></div></div></section>; }
function ProjectCard({ project }: { project: typeof projects[number] }) { return <a href={`#/project/${project.id}`} className="project-card"><div className="project-image"><img src={project.image} alt={project.title} /><span>{project.category}</span></div><div className="project-info"><small>{project.location}</small><h3>{project.title}</h3><span className="text-link">التفاصيل <ArrowLeft size={15} /></span></div></a>; }
function Process() { const steps = ['دراسة احتياجات المشروع', 'التخطيط والتجهيز', 'التنفيذ', 'الاختبار والتسليم', 'الصيانة والدعم']; return <section className="section process-section"><div className="container"><SectionTitle eyebrow="منهجية العمل" title="كيف نعمل؟" text="خطوات واضحة تضمن لك نتيجة مضمونة في كل مرحلة." /><div className="process-track">{steps.map((step, index) => <div className="process-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><p>{index === 0 ? 'نفهم احتياجاتك ونحدد نطاق العمل بدقة.' : index === 1 ? 'نضع خطة تنفيذ وجدولاً زمنياً واضحاً.' : index === 2 ? 'فريقنا يبدأ العمل وفق أعلى المعايير.' : index === 3 ? 'نتأكد من الجودة قبل التسليم النهائي.' : 'نبقى معك لضمان استمرارية الأداء.'}</p></div>)}</div></div></section>; }
function CTA() { return <section className="cta-section"><div className="container cta-content"><div><span className="eyebrow">جاهزون لمشروعك</span><h2>هل لديك مشروع كهربائي؟</h2><p>تواصل معنا لمناقشة احتياجات مشروعك والحصول على عرض مناسب.</p></div><a href="#/contact" className="button">اطلب عرض سعر <ArrowLeft size={17} /></a></div></section>; }

function InnerHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <section className="inner-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>; }
function About() { return <><InnerHero eyebrow="من نحن" title="خبرة تُبنى عليها الثقة" text="شريكك المتخصص في تنفيذ الأعمال الكهربائية باحترافية في جميع أنحاء مصر." /><section className="section about-page"><div className="container about-grid"><div className="image-frame large"><img src={images.welding} alt="أعمال لحام وتنفيذ" /><div className="experience-badge"><strong>+500</strong><span>مشروع<br />منجز</span></div></div><div><SectionTitle eyebrow="الديب للمقاولات" title={<>نحوّل التحديات<br /><em>إلى حلول عملية</em></>} text="منذ انطلاقنا، التزمنا بتقديم قيمة حقيقية لعملائنا عبر تنفيذ أعمال كهربائية دقيقة وآمنة، مع اختيار أفضل الخامات والاعتماد على فريق يجمع بين الخبرة والمعرفة الحديثة. نؤمن أن نجاحنا يقاس باستمرارية عمل منشآتك ورضا عملائنا." /><div className="mission-grid"><Value icon={Target} title="رؤيتنا" text="أن نكون الشريك الأول للحلول الكهربائية في مصر." /><Value icon={Sparkles} title="رسالتنا" text="تقديم تنفيذ موثوق يضيف قيمة حقيقية لكل مشروع." /></div></div></div></section><section className="section soft-bg values-section"><div className="container"><SectionTitle eyebrow="قيمنا" title="مبادئ ثابتة في كل ما ننجزه" /><div className="values-grid"><ValueLarge icon={ShieldCheck} title="السلامة والجودة" text="نضع سلامة فريق العمل والمنشأة في مقدمة أولوياتنا، ونلتزم بالمواصفات المعتمدة." /><ValueLarge icon={Users} title="العمل بروح الفريق" text="نتعاون مع العميل والاستشاري وكل أطراف المشروع لتحقيق نتيجة متكاملة." /><ValueLarge icon={Award} title="الالتزام والشفافية" text="مواعيد واضحة، تقارير دقيقة، وتواصل مستمر من البداية حتى التسليم." /></div></div></section><CTA /></>; }
function ValueLarge({ icon: Icon, title, text }: { icon: typeof Award; title: string; text: string }) { return <div className="value-large"><span className="icon-box"><Icon size={24} /></span><h3>{title}</h3><p>{text}</p></div>; }

function ServicesPage() { return <><InnerHero eyebrow="خدماتنا" title="حلول كهربائية متكاملة" text="من التأسيس إلى التشغيل والصيانة، نقدم لك الخبرة التي يحتاجها مشروعك." /><section className="section service-detail-section"><div className="container service-details">{services.map((service, index) => { const Icon = service.icon; return <article className={`service-detail ${index % 2 ? 'reverse' : ''}`} key={service.title}><div className="detail-visual"><img src={[images.welding, images.panel, images.hero, images.cable, images.site, images.building][index]} alt={service.title} /><span>0{index + 1}</span></div><div className="detail-copy"><span className="service-icon"><Icon size={24} /></span><h2>{service.title}</h2><p>{service.text} نعمل على دراسة احتياجات الموقع وتقديم الحل الأنسب من حيث الأداء والتكلفة والاستدامة، مع الالتزام بجداول التنفيذ ومعايير السلامة.</p><ul><li><Check size={16} /> فريق فني متخصص ومتابعة هندسية</li><li><Check size={16} /> خامات ومكونات موثوقة</li><li><Check size={16} /> اختبار وتسليم موثق</li></ul><a href="#/contact" className="text-link">اطلب هذه الخدمة <ArrowLeft size={16} /></a></div></article>; })}</div></section><CTA /></>; }

function ProjectsPage() { const [filter, setFilter] = useState('الكل'); const categories = ['الكل', 'سكني', 'تجاري', 'إداري', 'صناعي', 'طبي']; const filtered = useMemo(() => filter === 'الكل' ? projects : projects.filter((project) => project.category === filter), [filter]); return <><InnerHero eyebrow="مشاريعنا" title="أعمال تتحدث عن خبرتنا" text="نشارككم نماذج من المشروعات التي نفذناها في قطاعات ومواقع مختلفة." /><section className="section projects-page"><div className="container"><div className="filters">{categories.map((category) => <button key={category} className={filter === category ? 'selected' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="projects-grid wide">{filtered.map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></section></>; }

function ProjectDetails({ project }: { project: typeof projects[number] }) { return <><InnerHero eyebrow={project.category} title={project.title} text="تفاصيل المشروع ونطاق الأعمال الكهربائية المنفذة." /><section className="section project-detail-page"><div className="container"><img className="project-cover" src={project.image} alt={project.title} /><div className="project-meta"><div><span>الموقع</span><strong>{project.location}</strong></div><div><span>القطاع</span><strong>{project.category}</strong></div><div><span>نطاق العمل</span><strong>أعمال كهربائية متكاملة</strong></div></div><div className="project-description"><div><SectionTitle eyebrow="عن المشروع" title="تنفيذ بمعايير تليق بالمكان" /><p>{project.text} تم تنفيذ المشروع من خلال مراحل مدروسة شملت المعاينة والتخطيط والتوريد والتركيب والاختبار، مع تنسيق كامل مع باقي الأعمال بالموقع لضمان التسليم في الموعد.</p><p>حرص فريق الديب على تقديم حل عملي وموثوق يلبي احتياجات التشغيل الحالية ويترك مجالاً للتوسع مستقبلاً.</p></div><div className="scope-card"><h3>نطاق الأعمال</h3>{['أعمال التأسيس والتمديدات', 'توريد وتركيب اللوحات', 'أنظمة التيار الخفيف', 'الاختبار والتشغيل والتسليم'].map((item) => <div key={item}><Check size={16} /> {item}</div>)}</div></div><div className="detail-gallery"><img src={images.panel} alt="لوحة كهربائية" /><img src={images.cable} alt="كابلات صناعية" /><img src={images.site} alt="موقع تنفيذ" /></div><div className="center-link"><a href="#/contact" className="button">ناقش مشروعك معنا <ArrowLeft size={17} /></a></div></div></section></>; }

function Contact() { const [sent, setSent] = useState(false); const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); }; return <><InnerHero eyebrow="تواصل معنا" title="لنبدأ مشروعك معاً" text="نحن جاهزون للاستماع إلى احتياجاتك وتقديم الحل المناسب." /><section className="section contact-section"><div className="container contact-grid"><div className="contact-info"><SectionTitle eyebrow="معلومات التواصل" title="نحن قريبون منك" text="تغطية لجميع محافظات مصر، وفريق جاهز للرد على استفساراتك." /><div className="contact-items"><a href="tel:+201000001020"><span><Phone size={19} /></span><div><small>اتصل بنا</small><strong>0100 000 1020</strong></div></a><a href="https://wa.me/201000001020"><span><MessageIcon /></span><div><small>واتساب</small><strong>0100 000 1020</strong></div></a><div><span><MapPin size={19} /></span><div><small>نطاق العمل</small><strong>جميع محافظات مصر</strong></div></div><a href="mailto:info@aldeeb-eg.com"><span><Mail size={19} /></span><div><small>البريد الإلكتروني</small><strong>info@aldeeb-eg.com</strong></div></a></div><div className="contact-services"><strong>خدماتنا الرئيسية</strong><div>{services.slice(0, 5).map((service) => <span key={service.title}>{service.title}</span>)}</div></div></div><form className="contact-form" onSubmit={submit}><div className="form-heading"><span className="eyebrow">تحدث معنا</span><h2>أرسل لنا طلبك</h2><p>املأ البيانات وسيتواصل معك أحد خبرائنا.</p></div>{sent ? <div className="success-message"><Check size={30} /><h3>تم إرسال طلبك بنجاح</h3><p>شكراً لتواصلك معنا، سنرد عليك في أقرب وقت.</p><button type="button" className="text-link" onClick={() => setSent(false)}>إرسال طلب آخر</button></div> : <><div className="form-row"><label>الاسم<input required placeholder="اسمك الكامل" /></label><label>رقم الهاتف<input required type="tel" placeholder="01xxxxxxxxx" /></label></div><label>البريد الإلكتروني<input type="email" placeholder="example@email.com" /></label><div className="form-row"><label>نوع المشروع<select defaultValue=""><option value="" disabled>اختر نوع المشروع</option><option>سكني</option><option>تجاري</option><option>إداري</option><option>صناعي</option></select></label><label>المحافظة<select defaultValue=""><option value="" disabled>اختر المحافظة</option><option>القاهرة</option><option>الجيزة</option><option>الإسكندرية</option><option>محافظة أخرى</option></select></label></div><label>تفاصيل الطلب<textarea required placeholder="اكتب تفاصيل مشروعك واحتياجاتك الكهربائية..." rows={5} /></label><button className="button submit-button" type="submit">إرسال الطلب <ArrowLeft size={17} /></button></>}</form></div></section></>; }
function MessageIcon() { return <span className="message-icon">W</span>; }

function Footer() { return <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><a href="#/" className="brand"><span className="brand-mark"><Zap size={18} fill="currentColor" /></span><span><strong>الديب</strong><small>للمقاولات والتوريدات</small></span></a><p>حلول كهربائية موثوقة من التأسيس إلى التشغيل والصيانة، في جميع أنحاء مصر.</p><div className="socials"><a href="#/" aria-label="فيسبوك"><Facebook size={16} /></a><a href="#/" aria-label="إنستجرام"><Instagram size={16} /></a></div></div><div><h3>روابط سريعة</h3>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div><div><h3>خدماتنا</h3>{services.slice(0, 5).map((service) => <a key={service.title} href="#/services">{service.title}</a>)}</div><div><h3>تواصل معنا</h3><a href="tel:+201000001020"><Phone size={14} /> 0100 000 1020</a><a href="mailto:info@aldeeb-eg.com"><Mail size={14} /> info@aldeeb-eg.com</a><a href="#/contact"><MapPin size={14} /> جميع محافظات مصر</a></div></div><div className="container footer-bottom"><span>© 2026 الديب للمقاولات الكهربائية والتوريدات</span><span>ننفذ بثقة، ونبني للمستقبل</span></div></footer>; }

export default App;
