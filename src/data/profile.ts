export const profile = {
  name: 'Arava Tejesh Kumar',
  shortName: 'Tejesh Kumar',
  role: 'Software Developer @ Fairexpay',
  tagline: 'Ideas → Impact',
  intro:
    'I build fintech products that help businesses and travellers move money across borders. I start with the business problem, then solve it with clean, reliable technology.',
  location: 'Bengaluru, India',
  email: 'tejraj0078@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tejeshkumar-dev',
  github: 'https://github.com/Tejash12345',
  resume: '/Arava_Tejesh_Kumar_Resume.pdf',
};

export const about = {
  paragraphs: [
    'Software Developer at Fairexpay, building fintech products for cross-border payments, export collections and travel forex.',
    'I like understanding how money moves, where users get stuck and what operations teams need, and then turning that into simple, scalable products.',
  ],
  strengths: [
    { title: 'Business understanding', text: 'Payments, settlements, KYC and forex workflows.' },
    { title: 'Problem solving', text: 'Turning business needs into simple, scalable products.' },
    { title: 'Cloud', text: 'AWS: EC2, S3, Cognito, RDS, Amplify, API Gateway.' },
    { title: 'Automation', text: 'CI/CD pipelines, automated testing and quality reports.' },
  ],
  stats: [
    { value: '3', label: 'Fintech products' },
    { value: '6+', label: 'Personal projects' },
    { value: '2025', label: 'BTech, ECE' },
  ],
};

export const experience = [
  {
    role: 'Software Developer',
    org: 'Fairexpay',
    period: 'Aug 2025 – Present',
    place: 'Bengaluru · On-site',
    points: [
      'Building cross-border payment products (XChangepe, SaveDesk / XChangepe TMS and Fairexpay Travel) with business and operations teams.',
      'Developing responsive Angular front ends connected to Java Spring Boot APIs.',
      'Deploying and running applications on AWS.',
      'Implemented SEO and Meta Ads integration for the XChangepe and Fairexpay websites to improve visibility and lead tracking.',
      'Automated CI/CD pipelines with GitHub Actions: test-coverage gates and automated quality reports.',
    ],
  },
  {
    role: 'BTech, Electronics and Communication Engineering',
    org: 'Narasaraopeta Institute of Technology (JNTUK)',
    period: 'Aug 2021 – Aug 2025',
    place: 'Narasaraopet, Andhra Pradesh',
    points: ['Affiliated to JNTU Kakinada. Built and deployed full-stack projects alongside coursework.'],
  },
];

export const workProducts = [
  { name: 'XChangepe', text: 'Payment collection platform for Indian exporters: invoices, INR settlement, card payments and KYC.' },
  { name: 'SaveDesk / XChangepe TMS', text: 'Internal operations platform for the payments team.' },
  { name: 'Fairexpay Travel', text: 'Travel forex platform for students, travellers and travel partners.' },
];

export type Project = {
  title: string;
  text: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    title: 'Streamify',
    text: 'Real-time chat and video calling app with JWT auth, friend system, 32+ UI themes and TanStack Query.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'WebRTC'],
    image: 'https://res.cloudinary.com/diqqtjz0i/image/upload/f_auto,q_auto,w_720/v1751466419/Screenshot_2025-07-01_173021_h4t7rs.png',
    github: 'https://github.com/Tejash12345/Stremefiy',
    demo: 'https://stremefiy.onrender.com',
  },
  {
    title: 'TitanFit AI',
    text: 'AI fitness assistant with real-time workouts, diet plans and voice coaching using Gemini AI and Vapi.',
    tech: ['Next.js', 'Clerk', 'Convex', 'Gemini AI', 'Vapi'],
    image: 'https://res.cloudinary.com/diqqtjz0i/image/upload/f_auto,q_auto,w_720/v1751467068/Screenshot_2025-07-02_140302_ywpycd.png',
    github: 'https://github.com/Tejash12345/Titanfit_ai',
    demo: 'https://titanfit-ai-yp6t-26zm9nzl2-tejesh-kumars-projects.vercel.app/',
  },
  {
    title: 'TuneTime',
    text: 'Spotify-style music platform with real-time chat, playback control, admin dashboard and activity feeds.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Cloudinary'],
    image: 'https://res.cloudinary.com/diqqtjz0i/image/upload/f_auto,q_auto,w_720/v1751467436/Screenshot_2025-07-02_172305_pzvazq.png',
    github: 'https://github.com/Tejash12345/tunetimepro',
    demo: 'https://tunetimepro-1.onrender.com/',
  },
  {
    title: 'Chatter',
    text: 'Real-time chat app with JWT auth, live messaging over Socket.io and Zustand state management.',
    tech: ['React', 'Express', 'MongoDB', 'Socket.io', 'Zustand'],
    image: 'https://res.cloudinary.com/diqqtjz0i/image/upload/f_auto,q_auto,w_720/v1751467036/Screenshot_2025-07-02_135649_kbn4wr.png',
    github: 'https://github.com/Tejash12345/chatterTime_app-',
    demo: 'https://chattertime-app.onrender.com/',
  },
  {
    title: 'Pure Pattry',
    text: 'Food ordering platform with auth, menu browsing, cart, Stripe payments and an admin panel.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://res.cloudinary.com/diqqtjz0i/image/upload/f_auto,q_auto,w_720/v1751467603/Screenshot_2025-07-02_172636_e2sm3m.png',
    github: 'https://github.com/Tejash12345/project_purepattry',
    demo: 'https://frontendp-xi.vercel.app/',
  },
];

export const skills = [
  { group: 'Frontend', items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Java', 'Spring Boot', 'Node.js', 'Express', 'REST APIs', 'FastAPI'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'CI/CD', 'GitHub Actions', 'Docker', 'Vercel', 'Git'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL'] },
  { group: 'Growth', items: ['SEO', 'Meta Ads', 'Business Analysis', 'FinTech'] },
];
