import type { CVData } from '~/utils/schemas/cv-schema';

export const resumeLink =
  'https://drive.google.com/file/d/1ez2cOn9VhzDl45XweK6E0kcsXiX-7aSQ/view?usp=sharing';

export const cvData: CVData = {
  basics: {
    name: 'Sudeep G',
    label: 'Lead Software Engineer | AI-Enabled Engineering',
    image: null,
    bg_image: null,
    email: 'sudeepg95@gmail.com',
    phone: '',
    url: null,
    location: {
      address: null,
      postal_code: null,
      city: 'Bengaluru',
      country_code: 'IN',
      region: null,
    },
    profiles: [
      {
        network: 'LinkedIn',
        username: 'sudeepg95',
        url: 'https://www.linkedin.com/in/sudeepg95',
        icon: null,
      },
      {
        network: 'GitHub',
        username: 'sudeepg95',
        url: 'https://github.com/sudeepg95',
        icon: null,
      },
      {
        network: 'Email',
        username: null,
        url: 'sudeepg95@gmail.com',
        icon: null,
      },
      {
        network: 'Phone',
        username: null,
        url: '+919020709002',
        icon: null,
      },
    ],
    actions: [],
  },
  about: {
    summary:
      'Lead Software Engineer with 10 years of experience specializing in full-stack web development, AI-enabled engineering, and product building. Currently an AI-Enabled Engineering Specialist at Equal Experts, embedded at Travelopia, shipping production systems across international brands. Proven ability to architect scalable solutions, lead complex migrations, and leverage AI tools like Claude Code, Cursor, and MCP to compress months of work into days.',
  },
  media: [],
  work: [
    {
      name: 'Equal Experts',
      position: 'Lead Software Engineer',
      type: 'Full-time',
      url: null,
      start_date: '2022-09-01',
      end_date: null,
      summary:
        'AI-Enabled Engineering Specialist embedded at Travelopia, leading front-end engineering across the Yachts (The Moorings & Sunsail) and Le Boat brands, shipping production systems used by customers across the US, Europe, and multiple currencies.',
      highlights: [
        'Reverse-engineered an entire legacy application in 6 days using AI-assisted workflows (Claude Code, Cursor, Windsurf) — originally scoped at 4 months.',
        'Led Credit Card Surcharge for Yachts Checkout using PaymentJS with Fiserv — estimated to save 5-7M GBP annually. First brand within Travelopia live for both online and phone bookings simultaneously.',
        'Replaced legacy Drupal Checkout with a modern SPA for The Moorings and Sunsail, rolled out to all regions and currencies. CTO and Brand Technology Partner present for go-live.',
        'Delivered Le Boat New Online Checkout as a full SPA redesign across 8 international websites in ~6 weeks.',
        'Launched Le Boat Manage My Booking — crew management, extras selection, and instalment payments, built with AI-assisted delivery throughout.',
        'Built Le Boat Price Framing / Bundles (A/B tested, full rollout Dec 9). Ancillaries contribute 26% of Le Boat\'s overall business — Phase 1 showed strong mobile conversion uplift.',
        'Building Voice IQ: AI-powered call coaching dashboard using Talkdesk + Google Gemini — transcription, LLM scoring, and coaching feedback for Sales/Support teams.',
      ],
      city: 'Bengaluru',
      state: null,
      country: 'India',
    },
    {
      name: 'Travelopia',
      position: 'Lead Software Engineer (Contract)',
      type: 'Contract',
      url: null,
      start_date: '2022-11-01',
      end_date: null,
      summary:
        'Contracted via Equal Experts to Travelopia. Leading the Apps Squad across Yachts (The Moorings & Sunsail) and Le Boat for front-end engineering, checkout modernization, payment systems, and AI-powered internal tooling.',
      highlights: [],
      city: 'Bengaluru',
      state: null,
      country: 'India',
    },
    {
      name: 'InVideo',
      position: 'Senior Software Engineer',
      type: null,
      url: null,
      start_date: '2021-11-01',
      end_date: '2022-09-01',
      summary:
        'Led UI architecture for a next-gen video editing platform handling 4K media with bleeding-edge web technologies (WASM, WebCodecs, FFmpeg).',
      highlights: [
        'Architected and executed a large-scale code migration from Angular to React using Module Federation — improving build performance, team autonomy, and long-term maintainability.',
        'Made critical UI architectural decisions impacting the front-end of a product used by millions of creators worldwide.',
        'Provided on-call support and directly engaged with users to triage and resolve production issues, ensuring high availability for a real-time editing experience.',
      ],
      city: 'Remote',
      state: null,
      country: '',
    },
    {
      name: 'ThoughtWorks',
      position: 'Senior Consultant (Contract)',
      type: null,
      url: null,
      start_date: '2020-08-01',
      end_date: '2021-11-01',
      summary:
        'Delivered across 3 client engagements, working in React, Angular, React Native, and Gatsby.',
      highlights: [
        'IDFC First Bank: Built complete user journeys for iOS, Android, and Web using React Native with industry-first cloud-based hyper-personalization and server-side toggle-based journey enabling.',
        'Caterpillar: Developed features for a dealer/customer-facing PWA with deep Google Maps integration — asset tracking, geo-fencing, utilization optimization, and fleet-wide financial management.',
        'Metro Digital: Built a performance-focused portfolio website from scratch using Gatsby. Achieved 95+ Lighthouse scores across all categories.',
      ],
      city: 'Remote',
      state: null,
      country: '',
    },
    {
      name: 'CoffeeBeans Consulting',
      position: 'Software Engineer',
      type: null,
      url: null,
      start_date: '2020-01-01',
      end_date: '2021-11-01',
      summary:
        'Full-stack engineer across 4+ client projects in a consulting environment.',
      highlights: [
        'Talent500: Built features for Canvas, a next-gen ATS enabling multi-channel sourcing from proprietary talent pools to third-party job boards and LinkedIn.',
        'Unibiz: Conducted deep performance analysis of a heavy React application — identified memory leaks, raised issues with third-party library teams, and demonstrated measurable improvements.',
        'Syncari: Implemented metadata-focused features across the full stack for a distributed data management platform integrating Salesforce, Zendesk, and HubSpot.',
        'Organized the Food Code Sleep Hackathon, mentored new engineers, and led upskilling sessions on production-readiness.',
      ],
      city: 'Bengaluru',
      state: null,
      country: 'India',
    },
    {
      name: 'QBurst Technologies Pvt Ltd.',
      position: 'Senior Engineer',
      type: null,
      url: null,
      start_date: '2019-06-01',
      end_date: '2020-01-01',
      summary:
        'Promoted to Senior Engineer. Led full-stack development across multiple client projects and mentored junior engineers.',
      highlights: [
        'Rocket Partners: Developed mobile + kiosk PWA applications for a retail supermarket chain. Code quality commended by client top management.',
        'Mile Auto: Built the Quote-to-Bind process for a pay-per-mile auto insurance portal (Vue.js), including a Porsche-branded variant.',
        'Pure Engage: Implemented a Hadoop-based ETL pipeline — collection jobs for periodic CDR fetch, Spark jobs for rating/billing/tax calculation, and Salesforce integration.',
        'Won special mention in "Game of Code" internal hackathon. Completed GCP Architecture and TensorFlow specializations.',
      ],
      city: 'Calicut',
      state: null,
      country: 'India',
    },
    {
      name: 'QBurst Technologies Pvt Ltd.',
      position: 'Software Engineer',
      type: null,
      url: null,
      start_date: '2016-06-01',
      end_date: '2019-05-01',
      summary:
        'Started career as a full-stack web developer. Rapid growth across diverse projects and technologies.',
      highlights: [
        'StayNTouch: Built features for a hotel property management system (Web + Mobile). Developed automation suites using Selenium with cross-browser testing, Jenkins CI, and SauceLabs.',
        'Anywhere Auctions: Created entire application modules from scratch in Angular for a real-time real estate auction platform with DocuSign integration and fraud detection.',
        'Neo Trader: Implemented interactive candlestick, OHLC & line chart components using D3.js for an online commodity trading platform. Identified a critical memory leak.',
        'Blockchain POC (Concentrix): Built demo applications from zero showcasing identity management, smart contracts, and shared ledger — delivered end-to-end from setup to client demo.',
      ],
      city: 'Calicut',
      state: null,
      country: 'India',
    },
  ],
  volunteer: [],
  education: [
    {
      institution: 'NSS College of Engineering',
      url: null,
      area: 'Computer Science & Engineering',
      study_type: 'B.Tech',
      start_date: '2012-08-01',
      end_date: '2016-05-31',
      score: null,
      courses: [],
      city: 'Palakkad',
      state: null,
      country: 'India',
    },
  ],
  awards: [],
  publications: [],
  languages: [],
  certificates: [
    {
      name: 'Claude Code in Action',
      date: '2025-12-01',
      issuer: 'Anthropic',
      url: null,
    },
    {
      name: 'Introduction to Claude Code',
      date: '2025-12-01',
      issuer: 'Scrimba',
      url: null,
    },
    {
      name: 'Model Context Protocol for Leaders',
      date: '2025-12-01',
      issuer: 'Vanderbilt University',
      url: null,
    },
    {
      name: 'Intro to Model Context Protocol (MCP)',
      date: '2026-02-01',
      issuer: 'Scrimba',
      url: null,
    },
    {
      name: 'AI Fundamentals',
      date: '2026-02-01',
      issuer: 'Google',
      url: null,
    },
    {
      name: 'AI for Brainstorming and Planning',
      date: '2026-02-01',
      issuer: 'Google',
      url: null,
    },
    {
      name: 'Generative AI for Everyone',
      date: '2025-05-01',
      issuer: 'DeepLearning.AI',
      url: null,
    },
    {
      name: 'Google Prompting Essentials',
      date: '2025-05-01',
      issuer: 'Google',
      url: null,
    },
    {
      name: 'Programming with JavaScript',
      date: '2022-09-01',
      issuer: 'Coursera',
      url: null,
    },
    {
      name: 'TensorFlow in Practice Specialization',
      date: '2019-07-01',
      issuer: 'deeplearning.ai (Coursera)',
      url: null,
    },
    {
      name: 'Architecting with Google Cloud Platform Specialization',
      date: '2019-07-01',
      issuer: 'Google (Coursera)',
      url: null,
    },
    {
      name: 'Deep Learning Specialization',
      date: '2019-02-01',
      issuer: 'deeplearning.ai (Coursera)',
      url: null,
    },
    {
      name: 'Machine Learning',
      date: '2018-11-01',
      issuer: 'Andrew Ng (Coursera)',
      url: null,
    },
  ],
  skills: [
    {
      name: 'AI & GenAI Tools',
      keywords: ['Claude Code', 'Cursor', 'Windsurf', 'Roo Code', 'MCP', 'Google Gemini'],
    },
    {
      name: 'Programming Languages',
      keywords: ['TypeScript', 'JavaScript', 'Python', 'Golang', 'Java', 'Bash'],
    },
    {
      name: 'Frameworks/Libraries',
      keywords: [
        'React',
        'Next.js',
        'React Native',
        'Redux',
        'Angular',
        'Vue.js',
        'Gatsby',
        'Express',
        'NestJS',
      ],
    },
    {
      name: 'Technologies',
      keywords: ['Node.js', 'HTML5', 'SCSS/LESS/CSS3', 'Module Federation', 'WASM', 'WebCodecs', 'Docker', 'nginx'],
    },
    {
      name: 'Tools & Infrastructure',
      keywords: ['Git', 'Webpack', 'Jest', 'Playwright', 'CI/CD', 'Vercel', 'PaymentJS', 'Fiserv'],
    },
  ],
  interests: [],
  references: [],
  projects: [
    {
      name: 'Voice IQ — AI Call Coaching Platform',
      description:
        'AI-powered call coaching dashboard that ingests Talkdesk call recordings, transcribes them, translates non-English calls, and uses Google Gemini to score performance and generate coaching insights for Sales/Support teams.',
      highlights: ['Equal Experts / Travelopia (Le Boat)'],
      keywords: ['Python', 'Google Gemini', 'Claude Code', 'React', 'TypeScript'],
      visible: true,
    },
    {
      name: 'Le Boat Price Framing / Bundles',
      description:
        'A/B tested bundle pricing feature for Le Boat checkout — curated packages (Essential Escapes, Care-free Cruising, All on Board) to simplify decision-making and increase ancillary sales. Phase 1 showed strong mobile uplift; Phase 2 full rollout with Neptune-side enhancements.',
      highlights: ['Equal Experts / Travelopia (Le Boat)'],
      keywords: ['React', 'TypeScript', 'Node.js'],
      visible: true,
    },
    {
      name: 'Yachts & Le Boat Checkout Modernization',
      description:
        'Replaced legacy Drupal Checkout and Pay Balance applications with modern SPAs for The Moorings, Sunsail, and Le Boat brands. Rolled out across 8 international websites, all regions and currencies. Included Credit Card Surcharge implementation (PaymentJS/Fiserv) saving an estimated 5-7M GBP annually.',
      highlights: ['Equal Experts / Travelopia'],
      keywords: ['React', 'TypeScript', 'PaymentJS', 'Fiserv'],
      visible: true,
    },
    {
      name: 'Next-gen Video Editing Platform',
      description:
        'Led UI architecture for InVideo\'s next-gen video editing platform. Bleeding-edge feature sets including WASM, WebCodecs, and FFmpeg with 4K media handling. Executed large-scale Angular to React migration using Module Federation.',
      highlights: ['InVideo'],
      keywords: ['React', 'Angular', 'Module Federation', 'WASM', 'WebCodecs'],
      visible: true,
    },
    {
      name: 'IDFC First Bank',
      description:
        'Built complete user journeys for iOS, Android, and Web using React Native. Industry-first features including cloud-based hyper-personalization, server-side toggle-based journey enabling, and trunk-based development.',
      highlights: ['ThoughtWorks'],
      keywords: ['React', 'React Native', 'Golang'],
      visible: true,
    },
    {
      name: 'Caterpillar',
      description:
        'A dealer/customer-facing PWA providing fleet management capabilities — asset tracking, geo-fencing, utilization optimization, and financial management with deep Google Maps integration.',
      highlights: ['ThoughtWorks'],
      keywords: ['Angular', 'Jest', 'Galen', 'Testcafe'],
      visible: true,
    },
    {
      name: 'Talent500',
      description:
        'Built features for Canvas, a next-gen Applicant Tracking System enabling multi-channel sourcing from proprietary talent pools to third-party job boards and LinkedIn.',
      highlights: ['CoffeeBeans Consulting'],
      keywords: ['React', 'Golang'],
      visible: true,
    },
    {
      name: 'Syncari',
      description:
        'A highly customizable automated Data Management-Unification platform integrating Salesforce, Zendesk, HubSpot, and performing aggregations based on metadata.',
      highlights: ['CoffeeBeans Consulting'],
      keywords: ['React', 'Java'],
      visible: true,
    },
    {
      name: 'Rocket Partners',
      description:
        'Developed mobile + kiosk PWA applications for a retail supermarket chain with micro-services bridging external vendors. Code quality commended by client top management.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['React', 'NodeJS', 'NestJS', 'HTML', 'SCSS'],
      visible: true,
    },
    {
      name: 'Mile Auto',
      description:
        'An online pay-per-mile auto insurance portal with a Porsche-branded variant. Built the Quote-to-Bind process, Google Analytics integration, SEO optimization, and TISAX security assessment.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['Vue.js', 'JavaScript ES6', 'HTML', 'SCSS'],
      visible: true,
    },
    {
      name: 'Savi IoTA',
      description:
        'IoT processing engine for cargo tracking — ingests sensor data from cargo, derives analytics logic using rule engines for location, condition, and ETA predictions.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['Scala', 'Spark Streaming', 'Drools', 'Kafka'],
      visible: true,
    },
    {
      name: 'Anywhere Auctions',
      description:
        'Real-time real estate auction platform with DocuSign integration and fraud detection. Created entire application modules from scratch in Angular.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['Angular', 'JavaScript ES6', 'HTML', 'LESS'],
      visible: true,
    },
    {
      name: 'StayNTouch & StayNTouch Automation',
      description:
        'Hotel property management system (Web + Mobile). Built features and developed automation suites using Selenium with cross-browser testing, Jenkins CI, and SauceLabs integration.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['AngularJS', 'React', 'Ruby', 'Selenium', 'Java'],
      visible: true,
    },
    {
      name: 'Pure Engage - Billing Revamp',
      description:
        'Hadoop-based ETL pipeline replacing a legacy billing structure. Collection jobs for periodic CDR fetch, Spark jobs for rating/billing/tax calculation, and Salesforce integration.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['Scala', 'Spark', 'Python', 'PostgreSQL'],
      visible: false,
    },
    {
      name: 'Neo Trader',
      description:
        'Online commodity trading platform. Implemented interactive candlestick, OHLC & line chart components using D3.js. Identified a critical memory leak across the application.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['React', 'D3.js', 'JavaScript ES6'],
      visible: false,
    },
    {
      name: 'Blockchain POC - Concentrix',
      description:
        'Demo applications showcasing identity management, smart contracts, shared ledger, and digital content storage on blockchain — delivered end-to-end from setup to client demo.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['Vue.js', 'JavaScript ES6', 'HTML', 'LESS'],
      visible: false,
    },
    {
      name: 'Metro Digital',
      description:
        'Performance-focused portfolio website built from scratch using Gatsby. Achieved 95+ Lighthouse scores across all categories with ATS and analytics integration.',
      highlights: ['ThoughtWorks'],
      keywords: ['React', 'Gatsby'],
      visible: false,
    },
    {
      name: 'Air Springs Direct - Phase 2',
      description:
        'Online marketplace for aftermarket air suspensions. Re-implemented the product purchase flow and shopping cart with updated design and modular code structure.',
      highlights: ['QBurst Technologies Pvt Ltd.'],
      keywords: ['Angular', 'JavaScript ES6', 'HTML', 'LESS'],
      visible: false,
    },
    {
      name: 'Facial Recognition in airport security surveillance system',
      description:
        'Automatic face recognition system for identifying persons from surveillance videos by comparing against a facial database.',
      highlights: ['Academic Main Project'],
      keywords: ['Python', 'HTML', 'CSS3'],
      visible: false,
    },
    {
      name: 'Optimization of Integer Factorization algorithm using Modulo 20',
      description:
        'Modified Fermat Factorization Version 4 (MFFV4) for speeding up Integer Factorization, applied to cryptanalysis of RSA-based systems.',
      highlights: ['Academic Mini Project'],
      keywords: ['Java'],
      visible: false,
    },
  ],
  links: [],
  locations: [],
};

export default cvData;
