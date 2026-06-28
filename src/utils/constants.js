export const NAV_LINKS = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Resume', to: 'experience' },
  { label: 'Contact', to: 'contact' },
]

export const SKILLS = [
  { name: 'Flutter',      icon: 'SiFlutter',    color: '#54C5F8' },
  { name: 'Dart',         icon: 'SiDart',        color: '#0175C2' },
  { name: 'Android',      icon: 'SiAndroid',     color: '#3DDC84' },
  { name: 'Kotlin',       icon: 'SiKotlin',      color: '#7F52FF' },
  { name: 'Firebase',     icon: 'SiFirebase',    color: '#FFCA28' },
  { name: 'Git',          icon: 'SiGit',         color: '#F05032' },
  { name: 'GitHub',       icon: 'SiGithub',      color: '#ffffff' },
  { name: 'Figma',        icon: 'SiFigma',       color: '#F24E1E' },
  { name: 'SQLite',       icon: 'SiSqlite',      color: '#003B57' },
  { name: 'Postman',      icon: 'SiPostman',     color: '#FF6C37' },
  { name: 'Android Studio', icon: 'SiAndroidstudio', color: '#3DDC84' },
  { name: 'Google Play',  icon: 'SiGoogleplay',  color: '#414141' },
  { name: 'App Store',    icon: 'SiAppstore',    color: '#0D96F6' },
]

export const PROJECTS = [
  {
    id: 1,
    slug: 'mandara',
    title: 'Mandara',
    subtitle: 'Multi-Role Wellness & Hospital Management App',
    description: 'A large-scale Flutter application serving a luxury wellness resort — built with 6 distinct login roles, each with a dedicated feature set covering women\'s wellness, smart room controls, clinical management, and kitchen operations.',
    tags: ['Flutter', 'GetX', 'Firebase', 'Tuya SDK', 'H Band SDK', 'Thermal Printer'],
    emoji: '🏥',
    category: 'Wellness Application',
    github: '#',
    appStore: 'https://apps.apple.com/in/app/mandara/id6763697574',
    playStore: 'https://play.google.com/store/apps/details?id=app.mandara.wellness&hl=en_IN',
    featured: true,
    roles: [
      {
        name: 'Public',
        icon: '👩',
        desc: 'Women-focused lifestyle app — authentication, Mandara wellness booking, and tools including Baby Name finder, Journal, Period Tracker, Nutrition Calculator, Meal Scanner, Feed & Stories.',
      },
      {
        name: 'Guest',
        icon: '🛎️',
        desc: 'Hotel guest portal — H Band watch integration, Tuya Baby Monitor camera, amenity booking, and in-room service requests.',
      },
      {
        name: 'Doctor & Nurse',
        icon: '👨‍⚕️',
        desc: 'Clinical dashboard — patient care notes, contradictions, PDF body composition uploads, baby detail updates, and doctor approval for amenity schedules.',
      },
      {
        name: 'GRE',
        icon: '🗂️',
        desc: 'Guest Relations — receives and assigns guest service requests to staff workers, and manages Tuya camera options.',
      },
      {
        name: 'Baby Nursery (Tablet)',
        icon: '🍼',
        desc: 'Tablet layout — assign babies to beds, update vitals and feed logs, barcode scanner for auto-fill, breast milk container inventory system, and thermal label printer integration.',
      },
      {
        name: 'Kitchen Staff',
        icon: '🍽️',
        desc: 'Restaurant management — live guest order feed with real-time updates, KOT creation and management, and thermal printer integration for KOT & bill printing.',
      },
    ],
  },
]

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Flutter Developer',
    company: 'Trogon Media',
    period: '2021 – Present',
    tags: ['Flutter', 'Dart', 'Firebase', 'GetX', 'Riverpod'],
    description: [
      'Developed and maintained 50+ Flutter applications across custom LMS, CRM & ERP, e-commerce, and healthcare platforms.',
      'Led mobile architecture decisions using GetX and Riverpod state management patterns.',
      'Integrated Firebase services, REST APIs, and third-party SDKs across projects.',
      'Built custom UI components and smooth animations to deliver pixel-perfect experiences.',
    ],
    integrations: [
      { label: 'Zoom Meeting SDK',   desc: 'In-app video calls & meeting management' },
      { label: 'Razorpay',          desc: 'Payment gateway — UPI, cards, wallets' },
      { label: 'Omniware',          desc: 'Payment gateway integration' },
      { label: 'Tuya Camera SDK',   desc: 'Live camera streaming & smart home' },
      { label: 'H Band Watch SDK',  desc: 'Health & fitness wearable data sync' },
      { label: 'Thermal Printers',  desc: 'Bluetooth & USB receipt/QR printing' },
      { label: 'Airbridge',         desc: 'Deep linking & user attribution' },
    ],
    current: true,
  },
  {
    id: 2,
    role: 'Android Native Developer',
    company: 'Trogon Media',
    period: '2021 – Present',
    tags: ['Android', 'Kotlin', 'Java', 'MVVM'],
    description: [
      'Built 10+ native Android applications in Java and Kotlin with MVVM and Clean Architecture.',
      'Worked with core Android components — ViewModel, LiveData, and Navigation.',
      'Integrated Google Maps, push notifications, and hardware APIs (camera, GPS, Bluetooth).',
      'Collaborated closely with Flutter team to share business logic via platform channels.',
    ],
    integrations: [
      { label: 'Zoom Meeting SDK', desc: 'In-app video calls on native Android' },
      { label: 'Razorpay',        desc: 'Payment gateway — UPI, cards, wallets' },
      { label: 'Camera SDK',      desc: 'Custom camera with filters & capture controls' },
      { label: 'Watch SDK',       desc: 'Wearable health & fitness data integration' },
    ],
    current: true,
  },
]

export const EDUCATION = [
  {
    id: 1,
    degree: 'Diploma in Computer Engineering',
    institution: 'AKNM Government Polytechnic College',
    location: 'Thirurangadi, Kerala',
    period: '2020 – 2023',
    description: 'Gained solid technical foundations in computer engineering — covering programming, electronics, networking, and software development principles that shaped my path into mobile development.',
  },
]

export const CONTACT_INFO = {
  email: 'farhanilr4@gmail.com',
  github: 'https://github.com/farhan-ilr',
  linkedin: 'https://www.linkedin.com/in/farhan-nazar/',
  instagram: 'https://instagram.com/__f_arhan',
  location: 'Kottakkal, Malappuram, Kerala, India',
}
