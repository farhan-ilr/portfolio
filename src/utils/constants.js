export const NAV_LINKS = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Experience', to: 'experience' },
  { label: 'Contact', to: 'contact' },
]

export const SKILLS = {
  core: [
    { name: 'Flutter', level: 95, icon: '🐦' },
    { name: 'Dart', level: 92, icon: '🎯' },
    { name: 'Android (Kotlin)', level: 80, icon: '🤖' },
    { name: 'Firebase', level: 88, icon: '🔥' },
    { name: 'REST APIs', level: 90, icon: '🌐' },
  ],
  tools: [
    { name: 'GetX / Riverpod', level: 90 },
    { name: 'BLoC Pattern', level: 85 },
    { name: 'Git & GitHub', level: 88 },
    { name: 'Figma', level: 75 },
    { name: 'CI/CD', level: 72 },
    { name: 'SQLite / Hive', level: 85 },
    { name: 'Google Maps API', level: 80 },
    { name: 'Push Notifications', level: 87 },
  ],
}

export const PROJECTS = [
  {
    id: 1,
    title: 'Project One',
    description: 'A full-featured Flutter mobile app with real-time capabilities, custom animations, and Firebase backend.',
    tags: ['Flutter', 'Firebase', 'GetX'],
    image: null,
    github: '#',
    live: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Cross-platform Flutter app with complex state management using BLoC, REST APIs and offline support.',
    tags: ['Flutter', 'BLoC', 'REST API', 'SQLite'],
    image: null,
    github: '#',
    live: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Android app with native Kotlin integration, custom UI components, and Google Maps integration.',
    tags: ['Flutter', 'Kotlin', 'Google Maps'],
    image: null,
    github: '#',
    live: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'E-commerce Flutter app with payment gateway integration, push notifications and admin dashboard.',
    tags: ['Flutter', 'Firebase', 'Stripe'],
    image: null,
    github: '#',
    live: '#',
    featured: false,
  },
]

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Flutter Developer',
    company: 'Trogon Media',
    period: '2021 – Present',
    description: [
      'Developed and maintained 70+ Flutter applications across diverse domains.',
      'Led mobile architecture decisions using BLoC, GetX, and Riverpod patterns.',
      'Integrated Firebase services, REST APIs, and third-party SDKs.',
      'Collaborated with cross-functional teams to deliver high-quality products on schedule.',
      'Implemented CI/CD pipelines for automated testing and deployment.',
    ],
    current: true,
  },
]

export const CONTACT_INFO = {
  email: 'python.trogon@gmail.com',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/',
  location: 'Pakistan',
}
