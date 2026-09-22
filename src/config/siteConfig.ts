import {
  Zap,
  Cable,
  PanelTop,
  BatteryCharging,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Centralized Configuration for "الديب للمقاولات الكهربائية والتوريدات"
 * All company details, contact information, social links, and SEO defaults are defined here.
 */

export const SITE_URL = 'https://aldeeb-eg.com';

export const COMPANY = {
  name: 'الديب للمقاولات الكهربائية والتوريدات',
  shortName: 'الديب',
  subtitle: 'للمقاولات والتوريدات',
  // Contact phone numbers
  phonePrimary: '01004885562',
  phonePrimaryTel: '+201004885562',
  phoneSecondary: '01000901370',
  phoneSecondaryTel: '+201000901370',
  // Centralized WhatsApp Number
  whatsappNumber: '201000901370',
  whatsappDisplay: '01000901370',
  // Email
  email: '01004885562so@gmail.com',
  // Social links
  facebookUrl: 'https://www.facebook.com/profile.php?id=61576133174297',
  instagramUrl: 'https://www.instagram.com/moatazeldeeb951?stkn=eW5vOGp1bzJndTAx',
  // Coverage area
  coverage: 'جميع محافظات مصر',
  country: 'مصر',
  countryEn: 'Egypt',
} as const;

export const PROJECT_TYPES = [
  'سكني',
  'تجاري',
  'إداري',
  'صناعي',
  'طبي',
] as const;

export const GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'القليوبية',
  'الشرقية',
  'الدقهلية',
  'البحيرة',
  'المنوفية',
  'الغربية',
  'دمياط',
  'كفر الشيخ',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'شمال سيناء',
  'جنوب سيناء',
  'البحر الأحمر',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'الوادي الجديد',
  'مطروح',
  'محافظة أخرى',
] as const;

export const IMAGES = {
  hero: 'https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=1800',
  welding: 'https://images.pexels.com/photos/36847990/pexels-photo-36847990.jpeg?auto=compress&cs=tinysrgb&w=1000',
  cable: 'https://images.pexels.com/photos/29596327/pexels-photo-29596327.jpeg?auto=compress&cs=tinysrgb&w=1000',
  building: 'https://images.pexels.com/photos/1816030/pexels-photo-1816030.jpeg?auto=compress&cs=tinysrgb&w=1000',
  panel: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1000',
  site: 'https://images.pexels.com/photos/5667685/pexels-photo-5667685.jpeg?auto=compress&cs=tinysrgb&w=1000',
};

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  text: string;
  detailedText: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: Zap,
    title: 'تنفيذ جميع الأعمال الكهربائية',
    text: 'تنفيذ متكامل للأعمال الكهربائية وفق الرسومات والمواصفات الفنية المعتمدة للمباني والمنشآت.',
    detailedText: 'تنفيذ وتأسيس وتشطيب جميع الأعمال الكهربائية للمشروعات السكنية والتجارية والإدارية والصناعية وفق الرسومات الهندسية المعتمدة وأعلى معايير السلامة والجودة الفنية.',
    features: ['فريق فني متخصص ومتابعة هندسية', 'خامات ومكونات موثوقة ومعتمدة', 'اختبار وتسليم موثق وفق المواصفات'],
    image: IMAGES.welding,
    imageAlt: 'فني كهرباء أثناء تنفيذ الأعمال والتجهيزات الكهربائية بالموقع',
  },
  {
    icon: Cable,
    title: 'تمديد وسحب الكابلات',
    text: 'تأسيس وتمديد الكابلات داخل المواسير والكابل تراي بأعلى معايير الأمان والحماية.',
    detailedText: 'أعمال تمديد وسحب كابلات القوى والإنارة والتيار الخفيف، وتركيب مسارات الكابل تراي والمواسير الكهربائية بمختلف المقاسات لضمان انسيابية وأمان الشبكة.',
    features: ['تركيب مسارات كابل تراي مجلفنة ومطابقة للكود', 'تمديد المواسير والكابلات وفق حسابات الأحمال', 'فحص العزل واختبارات التوصيل قبل التشغيل'],
    image: IMAGES.panel,
    imageAlt: 'تمديد وسحب الكابلات الكهربائية وتركيب مسارات الكابل تراي',
  },
  {
    icon: PanelTop,
    title: 'لوحات الكهرباء',
    text: 'تصميم وتجميع وتركيب لوحات التوزيع والتحكم الرئيسية والفرعية للمشروعات المختلفة.',
    detailedText: 'توريد وتركيب وتجميع لوحات الجهد المنخفض والمتوسط، ولوحات التوزيع العمومية والفرعية مع القواطع المناسبة للحمل لحماية الدوائر الكهربائية.',
    features: ['تجميع وربط دقيق للبارات والقواطع', 'تنظيم وترقيم الخطوط لتسهيل الصيانة', 'مطابقة شاملة للرسومات الفنية ومعايير الحماية'],
    image: IMAGES.hero,
    imageAlt: 'لوحة توزيع وتحكم كهربائية رئيسية مع القواطع والبارات',
  },
  {
    icon: BatteryCharging,
    title: 'Low & Medium Voltage',
    text: 'حلول الجهد المنخفض والمتوسط للمباني والمصانع والمنشآت الحيوية والتجارية.',
    detailedText: 'حلول متخصصة في شبكات الجهد المنخفض والمتوسط تشمل المحولات والمولدات ولوحات التوزيع الرئيسية للمنشآت والمصانع والمشروعات الكبرى.',
    features: ['دراسة وتوزيع الأحمال الكهربائية', 'توصيل وتشغيل آمن للمعدات واللوحات', 'التوافق مع متطلبات شركات توزيع الكهرباء'],
    image: IMAGES.cable,
    imageAlt: 'كابلات وشبكات كهربائية للجهد المنخفض والمتوسط في منشأة صناعية',
  },
  {
    icon: ShieldCheck,
    title: 'CCTV و Fire Alarm',
    text: 'أنظمة مراقبة وإنذار حريق موثوقة وتيار خفيف لحماية الأفراد والممتلكات.',
    detailedText: 'تأسيس وتركيب أنظمة التيار الخفيف التي تشمل كاميرات المراقبة CCTV، وأنظمة إنذار الحريق Fire Alarm، والشبكات والداتا لتأمين المنشآت وحمايتها.',
    features: ['توزيع مدروس للحساسات والكاميرات', 'تمديد كابلات الحريق والشبكات المقاومة للحرارة', 'برمجة واختبار عمل المنظومة بالكامل'],
    image: IMAGES.site,
    imageAlt: 'أنظمة إنذار حريق وكاميرات مراقبة وتيار خفيف للمباني',
  },
  {
    icon: Wrench,
    title: 'الصيانة والتوريدات',
    text: 'صيانة دورية وطوارئ مع توفير المستلزمات والمهمات الكهربائية الأصلية.',
    detailedText: 'خدمات الصيانة الوقائية والدورية لشبكات الكهرباء، مع توريد كافة المستلزمات والمهمات الكهربائية الأصلية للمشروعات بأسعار تنافسية ومواصفات قياسية.',
    features: ['استجابة سريعة لحالات الطوارئ والأعطال', 'توريد خامات أصلية من أفضل المصانع', 'عقود صيانة دورية للمؤسسات والشركات'],
    image: IMAGES.building,
    imageAlt: 'صيانة وتوريدات كهربائية وتركيبات متكاملة للمباني',
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  imageAlt: string;
  text: string;
  scope: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'new-cairo',
    title: 'مجمع سكني — القاهرة الجديدة',
    category: 'سكني',
    location: 'القاهرة الجديدة',
    image: IMAGES.building,
    imageAlt: 'تنفيذ الأعمال الكهربائية المتكاملة لمجمع سكني في القاهرة الجديدة',
    text: 'تنفيذ الأعمال الكهربائية المتكاملة لمجمع سكني حديث وفق أحدث المواصفات الهندسية.',
    scope: ['أعمال التأسيس والتمديدات', 'توريد وتركيب اللوحات', 'أنظمة التيار الخفيف', 'الاختبار والتشغيل والتسليم'],
  },
  {
    id: 'industrial',
    title: 'مصنع صناعي — العاشر من رمضان',
    category: 'صناعي',
    location: 'العاشر من رمضان',
    image: IMAGES.cable,
    imageAlt: 'أعمال تمديد الكابلات وتركيب لوحات الجهد لمصنع صناعي بالعاشر من رمضان',
    text: 'توريد وتركيب لوحات الجهد وتمديدات القوى وشبكات الكهرباء المتكاملة للمصنع.',
    scope: ['تمديد كابلات القوى والتحكم', 'تركيب مسارات الكابل تراي', 'تجميع لوحات التوزيع الصناعية', 'الاختبار والتشغيل النهائي'],
  },
  {
    id: 'office',
    title: 'مبنى إداري — العاصمة الإدارية',
    category: 'إداري',
    location: 'العاصمة الإدارية',
    image: IMAGES.panel,
    imageAlt: 'حلول كهربائية وأنظمة تيار خفيف لمبنى إداري بالعاصمة الإدارية',
    text: 'حلول كهربائية متطورة وأنظمة تيار خفيف وشبكات داتا لمبنى إداري حديث.',
    scope: ['تأسيس شبكات القوى والإنارة', 'شبكات الداتا والاتصالات', 'أنظمة الإنذار والمراقبة CCTV', 'الفحص والاعتماد الهندسي'],
  },
  {
    id: 'hospital',
    title: 'منشأة طبية — الجيزة',
    category: 'طبي',
    location: 'الجيزة',
    image: IMAGES.site,
    imageAlt: 'تنفيذ شبكات الكهرباء وأنظمة إنذار الحريق لمنشأة طبية في الجيزة',
    text: 'تنفيذ أعمال الكهرباء الحيوية وأنظمة الإنذار واستمرارية التغذية للمرافق الطبية.',
    scope: ['شبكات التغذية الحيوية', 'لوحات الطوارئ ومصادر التغذية البديلة', 'نظام إنذار الحريق المعتمد', 'تسليم معتمد وموثق'],
  },
  {
    id: 'villa',
    title: 'فيلا سكنية — الساحل الشمالي',
    category: 'سكني',
    location: 'الساحل الشمالي',
    image: IMAGES.hero,
    imageAlt: 'تشطيبات وتأسيس الأعمال الكهربائية لفيلا سكنية في الساحل الشمالي',
    text: 'تنفيذ التأسيس والتشطيبات الكهربائية المتميزة وأنظمة الإنارة الحديثة للفيلا.',
    scope: ['تأسيس شبكة الكهرباء الداخلية والخارجية', 'لوحات التحكم وتوزيع الأحمال', 'أنظمة الإنارة الديكورية', 'الفحص والتشغيل الكامل'],
  },
  {
    id: 'commercial',
    title: 'مركز تجاري — مدينة نصر',
    category: 'تجاري',
    location: 'مدينة نصر',
    image: IMAGES.welding,
    imageAlt: 'تنفيذ شبكة القوى والإنارة لمركز تجاري في مدينة نصر',
    text: 'تنفيذ شبكة القوى والإنارة وأنظمة الأمان لمركز تجاري متكامل.',
    scope: ['تمديد كابلات القوى والإنارة', 'تركيب الكابل تراي واللوحات الفرعية', 'تغذية المحلات والأنظمة المساعدة', 'الاختبار والمطابقة الفنية'],
  },
];

export const NAV_ITEMS = [
  { label: 'الرئيسية', path: '/', hash: '#/' },
  { label: 'من نحن', path: '/about', hash: '#/about' },
  { label: 'خدماتنا', path: '/services', hash: '#/services' },
  { label: 'مشاريعنا', path: '/projects', hash: '#/projects' },
  { label: 'تواصل معنا', path: '/contact', hash: '#/contact' },
] as const;

/**
 * Builds the pre-filled Arabic WhatsApp message and returns the wa.me link.
 */
export function buildWhatsAppQuoteUrl(data: {
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  governorate: string;
  details: string;
}): string {
  const emailLine = data.email && data.email.trim() ? data.email.trim() : 'غير محدد';
  
  const message = [
    `مرحبًا، أريد طلب عرض سعر من شركة الديب للمقاولات الكهربائية والتوريدات.`,
    '',
    `بيانات العميل:`,
    `الاسم: ${data.name.trim()}`,
    `رقم الهاتف: ${data.phone.trim()}`,
    `البريد الإلكتروني: ${emailLine}`,
    '',
    `بيانات المشروع:`,
    `نوع المشروع: ${data.projectType}`,
    `المحافظة: ${data.governorate}`,
    '',
    `تفاصيل الطلب:`,
    `${data.details.trim()}`,
    '',
    `يرجى التواصل معي بخصوص هذا الطلب.`,
  ].join('\n');

  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns a direct WhatsApp contact link (for general inquiries).
 */
export function getDirectWhatsAppUrl(): string {
  const defaultText = `مرحبًا، أود الاستفسار عن خدمات شركة الديب للمقاولات الكهربائية والتوريدات.`;
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
}
