type Gradient = [string, string, string, string]

type Project = {
  name: string
  description: string
  link: string
  gradientColors: Gradient
  id: string
}

type WorkExperience = {
  title: string
  company: string
  start: string
  end: string
  id: string
}

type SocialLink = {
  label: string
  link: string
}

type CourseNote = {
  semester: string
  name: string
  link: string
  gradientColors: Gradient
  id: string
}

export const NOTES_URL = 'https://github.com/elazdi-al/notes'

export const PROJECTS: Project[] = [
  {
    name: 'Self-custody wallet',
    description:
      'ERC-4337 smart account in Solidity that checks two signatures on-chain, a wallet key and a Face ID passkey, with a written threat model. BSA Hackathon, Swissquote challenge.',
    link: 'https://github.com/elazdi-al/bsa-the-hackathon',
    gradientColors: ['#5f27cd', '#00d2d3', '#ff9ff3', '#341f97'],
    id: 'project-wallet',
  },
  {
    name: 'Stars',
    description:
      'Decentralized ticketing and resale app on Base, built with Solidity and Next.js in a team of 4. Winner of StartHack x Base among 930 teams.',
    link: 'https://github.com/elazdi-al/starthack-2025',
    gradientColors: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
    id: 'project-stars',
  },
  {
    name: 'Course notes',
    description: 'Notes, summaries and cheatsheets from my EPFL courses.',
    link: NOTES_URL,
    gradientColors: ['#ffd3a5', '#fd9853', '#ee9ca7', '#ffdde1'],
    id: 'project-notes',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    title: 'Student Assistant',
    company: 'EPFL',
    start: 'Sep 2026',
    end: 'Present',
    id: 'work-ta',
  },
  {
    title: 'Member',
    company: 'polygl0ts, EPFL CTF association',
    start: 'Sep 2026',
    end: 'Present',
    id: 'work-polygl0ts',
  },
  {
    title: 'Research Assistant, Explique',
    company: 'Theory of Computation Laboratory, EPFL',
    start: 'Jul 2026',
    end: 'Present',
    id: 'work-explique',
  },
  {
    title: 'Bachelor Project and Thesis, Text-to-SQL Research',
    company: 'DIAS Laboratory, EPFL',
    start: 'Feb 2026',
    end: 'Sep 2026',
    id: 'work-thesis',
  },
  {
    title: 'Freelance Software Developer',
    company: 'Fiverr',
    start: 'Nov 2021',
    end: 'Jun 2024',
    id: 'work-fiverr',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/elazdi-al',
  },
  {
    label: 'X',
    link: 'https://x.com/elazdi_al',
  },
]

export const EMAIL = 'ali.elazdi@epfl.ch'

export const COURSE_NOTES: CourseNote[] = [
  {
    semester: 'BA6',
    name: 'Computer Language Processing',
    link: NOTES_URL,
    gradientColors: ['#ee5a24', '#feca57', '#ff9ff3', '#54a0ff'],
    id: 'course-clp',
  },
  {
    semester: 'BA6',
    name: 'Data-Intensive Systems',
    link: NOTES_URL,
    gradientColors: ['#ffd3a5', '#fd9853', '#ee9ca7', '#ffdde1'],
    id: 'course-dis',
  },
  {
    semester: 'BA5',
    name: 'Computer Security',
    link: NOTES_URL,
    gradientColors: ['#fa7671', '#ffa8a5', '#ffc3a0', '#f9e9df'],
    id: 'course-compsec',
  },
  {
    semester: 'BA5',
    name: 'Responsible Software',
    link: NOTES_URL,
    gradientColors: ['#a8e6cf', '#88d8c0', '#78c2ad', '#68ac98'],
    id: 'course-responsible',
  },
  {
    semester: 'BA5',
    name: 'Technologies for Democratic Societies',
    link: NOTES_URL,
    gradientColors: ['#667eea', '#764ba2', '#6fa8dc', '#9fc5e8'],
    id: 'course-tds',
  },
  {
    semester: 'BA5',
    name: 'Algebra',
    link: NOTES_URL,
    gradientColors: ['#fa709a', '#fee140', '#ffecd2', '#fcb69f'],
    id: 'course-algebra',
  },
  {
    semester: 'BA4',
    name: 'Introduction to Machine Learning',
    link: NOTES_URL,
    gradientColors: ['#667eea', '#764ba2', '#667eea', '#a8d8ea'],
    id: 'course-iml',
  },
  {
    semester: 'BA4',
    name: 'Computer Systems',
    link: NOTES_URL,
    gradientColors: ['#667eea', '#764ba2', '#6fa8dc', '#9fc5e8'],
    id: 'course-compsys',
  },
  {
    semester: 'BA4',
    name: 'Algorithms I',
    link: NOTES_URL,
    gradientColors: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
    id: 'course-algorithms',
  },
  {
    semester: 'BA3',
    name: 'Analysis III',
    link: NOTES_URL,
    gradientColors: ['#fa709a', '#fee140', '#ffecd2', '#fcb69f'],
    id: 'course-analysis-iii',
  },
  {
    semester: 'BA3',
    name: 'Computer Architecture',
    link: NOTES_URL,
    gradientColors: ['#5f27cd', '#00d2d3', '#ff9ff3', '#341f97'],
    id: 'course-comparch',
  },
  {
    semester: 'BA2',
    name: 'Fundamentals of Digital Systems',
    link: NOTES_URL,
    gradientColors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    id: 'course-fds',
  },
]
