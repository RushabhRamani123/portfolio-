// ===== SKILLS DATA =====
export interface Skill {
    name: string;
    logo: string;
}

export interface SkillCategory {
    name: string;
    gradient: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        name: 'Languages',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        skills: [
            { name: 'C', logo: 'https://cdn.simpleicons.org/c/ffffff' },
            { name: 'C++', logo: 'https://cdn.simpleicons.org/cplusplus/ffffff' },
            { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/ffffff' },
            { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/ffffff' },
        ]
    },
    {
        name: 'Frontend',
        gradient: 'linear-gradient(135deg, #00D6FF 0%, #0050FF 100%)',
        skills: [
            { name: 'React.js', logo: 'https://cdn.simpleicons.org/react/ffffff' },
            { name: 'Next.js 14', logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
            { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/ffffff' },
            { name: 'Redux', logo: 'https://cdn.simpleicons.org/redux/ffffff' },
            { name: 'Zustand', logo: 'https://cdn.simpleicons.org/react/ffffff' },
            { name: 'ShadCN UI', logo: 'https://cdn.simpleicons.org/shadcnui/ffffff' },
            { name: 'React Flow', logo: 'https://cdn.simpleicons.org/react/ffffff' },
            { name: 'Jest', logo: 'https://cdn.simpleicons.org/jest/ffffff' },
        ]
    },
    {
        name: 'Backend',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        skills: [
            { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
            { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/ffffff' },
            { name: 'Redis', logo: 'https://cdn.simpleicons.org/redis/ffffff' },
            { name: 'REST APIs', logo: 'https://cdn.simpleicons.org/insomnia/ffffff' },
            { name: 'Prisma', logo: 'https://cdn.simpleicons.org/prisma/ffffff' },
            { name: 'WebSockets', logo: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
            { name: 'Pusher', logo: 'https://cdn.simpleicons.org/pusher/ffffff' },
            { name: 'NodeMailer', logo: 'https://cdn.simpleicons.org/minutemailer/ffffff' },
        ]
    },
    {
        name: 'Database',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        skills: [
            { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/ffffff' },
            { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/ffffff' },
            { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/ffffff' },
        ]
    },
    {
        name: 'DevOps',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        skills: [
            { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/ffffff' },
            { name: 'Kubernetes', logo: 'https://cdn.simpleicons.org/kubernetes/ffffff' },
            { name: 'Jenkins', logo: 'https://cdn.simpleicons.org/jenkins/ffffff' },
            { name: 'Grafana', logo: 'https://cdn.simpleicons.org/grafana/ffffff' },
        ]
    },
    {
        name: 'Tools',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        skills: [
            { name: 'Git', logo: 'https://cdn.simpleicons.org/git/ffffff' },
            { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman/ffffff' },
            { name: 'Swagger', logo: 'https://cdn.simpleicons.org/swagger/ffffff' },
            { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/ffffff' },
            { name: 'Clerk', logo: 'https://cdn.simpleicons.org/clerk/ffffff' },
            { name: 'OAuth', logo: 'https://cdn.simpleicons.org/auth0/ffffff' },
            { name: 'Gemini AI', logo: 'https://cdn.simpleicons.org/googlegemini/ffffff' },
        ]
    },
];

// ===== EXPERIENCE DATA =====
export interface ExperienceItem {
    company: string;
    role: string;
    duration: string;
    location: string;
    description: string[];
    technologies: string[];
    gradient: string;
}

export const experiences: ExperienceItem[] = [
    {
        company: 'Bluemeet',
        role: 'Remote Intern',
        duration: 'October 2024 - December 2024',
        location: 'Remote',
        description: [
            'Built and deployed a customer service app on AWS with broadcast, templates, and chat features.',
            'Implemented Redis for backend caching to optimize performance and reduce latency.',
            'Containerized application components using Docker and managed CI/CD workflows using Jenkins.',
            'Utilized Kubernetes for orchestrating containers, scaling backend APIs, and ensuring high availability.',
            'Set up a comprehensive monitoring and observability stack using Grafana.'
        ],
        technologies: ['AWS', 'Redis', 'Docker', 'Jenkins', 'Kubernetes', 'Grafana'],
        gradient: 'linear-gradient(135deg, #00D6FF 0%, #0050FF 100%)'
    },
    {
        company: 'Chamunda Creation',
        role: 'Remote Intern',
        duration: 'June 2024 - August 2024',
        location: 'Remote',
        description: [
            'Optimized SQL databases for efficient storage and fast queries.',
            'Built responsive UIs with React.js and integrated RESTful APIs.',
            'Ensured full-stack quality through API and database testing.'
        ],
        technologies: ['React.js', 'SQL', 'RESTful APIs', 'Database Testing'],
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    }
];

// ===== PROJECTS DATA =====
export interface Project {
    title: string;
    image: string;
    description: string[];
    technologies: string[];
    gradient: string;
    githubLink: string;
}

export const projects: Project[] = [
    {
        title: 'Fuzzie',
        image: '/Fuzzie.png',
        description: [
            'Built visual workflow automation using Next.js 14 and React Flow.',
            'Integrated Discord, Notion, Slack, and Google Drive APIs with OAuth authentication.',
            'Developed a node-based editor enabling drag-and-drop workflow creation.',
            'Implemented real-time automation execution with persistent workflow storage.',
            'Built Stripe subscription billing with credit-based usage tracking.',
            'Designed a responsive UI using ShadCN components and Tailwind CSS.'
        ],
        technologies: ['Next.js 14', 'React Flow', 'OAuth', 'Stripe', 'ShadCN UI', 'Tailwind CSS', 'Discord API', 'Notion API'],
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        githubLink: 'https://github.com/rushabh'
    },
    {
        title: 'Corinna AI',
        image: '/CorinnaAi.png',
        description: [
            'Built a multi-tenant AI chatbot platform with lead capture, booking, and real-time chat for sales automation.',
            'Developed a full-stack SaaS application using Next.js 14, Prisma, PostgreSQL, and Stripe Connect.',
            'Implemented domain-based deployment, role-based access control (RBAC), and email marketing workflows.',
            'Integrated Google Gemini AI for conversation flow management with automated email extraction.',
            'Used Pusher for real-time messaging, UploadCare for file management, and NodeMailer for email automation.'
        ],
        technologies: ['Next.js 14', 'Prisma', 'PostgreSQL', 'Stripe Connect', 'Gemini AI', 'Pusher', 'UploadCare', 'RBAC'],
        gradient: 'linear-gradient(135deg, #00D6FF 0%, #0050FF 100%)',
        githubLink: 'https://github.com/rushabh'
    },
    {
        title: 'Plura',
        image: '/Plura.png',
        description: [
            'Built multi-tenant SaaS for agencies with onboarding, clients, and dashboards.',
            'Utilized Next.js 14, Tailwind CSS, ShadCN UI, Prisma, and Clerk for responsive UI and authentication.',
            'Integrated Stripe Connect for subscriptions, platform fees, and custom billing workflows.',
            'Used MySQL for structured data and Amazon S3 for media storage.'
        ],
        technologies: ['Next.js 14', 'Tailwind CSS', 'ShadCN UI', 'Prisma', 'Clerk', 'Stripe Connect', 'MySQL', 'Amazon S3'],
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        githubLink: 'https://github.com/rushabh'
    }
];

// ===== ACHIEVEMENTS DATA =====
export interface AchievementImage {
    src: string;
    alt: string;
}

export interface Achievement {
    title: string;
    event: string;
    position: string;
    date: string;
    images: AchievementImage[];
    description: string[];
    stats: { value: string; label: string; icon: string }[];
    techStack: string[];
}

export const achievements: Achievement[] = [
    {
        title: '2nd Runner Up',
        event: 'UBS Hackathon 2025',
        position: '🥉 3rd Place',
        date: 'January 2025',
        images: [
            { src: '/UBS_hACKTHON.jpeg', alt: 'UBS Hackathon Main' },
            { src: '/UBS.jpeg', alt: 'UBS Event' },
            { src: '/ubshack.png', alt: 'UBS Hackathon Team' }
        ],
        description: [
            'Competed against 200+ developers in the prestigious UBS Hackathon 2025',
            'Built an innovative fintech solution using cutting-edge AI/ML technologies',
            'Impressed industry experts and senior UBS leadership with our presentation',
            'Delivered a fully functional prototype within 24 hours of intense coding'
        ],
        stats: [
            { value: '200+', label: 'Participants', icon: 'https://api.iconify.design/lucide:users.svg' },
            { value: '24h', label: 'Build Time', icon: 'https://api.iconify.design/lucide:timer.svg' },
            { value: 'Top 3', label: 'Final Rank', icon: 'https://api.iconify.design/lucide:medal.svg' },
            { value: '4', label: 'Team Size', icon: 'https://api.iconify.design/lucide:user-plus.svg' }
        ],
        techStack: ['React', 'Node.js', 'Python', 'TensorFlow', 'AWS']
    }
];
