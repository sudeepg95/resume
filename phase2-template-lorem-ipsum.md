# Phase 2: Template Implementation with Lorem Ipsum

## Overview

This phase creates the complete resume template structure using static Lorem Ipsum content. This allows you to focus on layout, styling, and component architecture before integrating real data.

## Prerequisites

- Phase 1 completed successfully
- Development server running (`npm run dev`)
- Basic understanding of Astro components and CSS

## Implementation Steps

### Step 1: Create Base Layout Component

Create `src/layouts/ResumeLayout.astro`:

```astro
---
// src/layouts/ResumeLayout.astro
interface Props {
  title: string;
  description?: string;
  theme?: 'professional' | 'modern' | 'creative' | 'minimal';
}

const {
  title,
  description = 'Professional Resume',
  theme = 'professional',
} = Astro.props;
---

<!doctype html>
<html lang="en" data-theme={theme}>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />

    <!-- Preload critical resources -->
    <link
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      as="style"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Global Styles -->
    <style>
      @import '/src/styles/globals.css';
    </style>

    <!-- Print Styles -->
    <style media="print">
      @page {
        margin: 0.5in;
        size: letter;
      }
      .no-print {
        display: none !important;
      }
      body {
        font-size: 12pt;
        line-height: 1.4;
      }
      .resume-container {
        box-shadow: none;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <main class="resume-container">
      <slot />
    </main>
  </body>
</html>

<style>
  .resume-container {
    max-width: 8.5in;
    margin: 2rem auto;
    padding: 2rem;
    background: var(--color-white);
    box-shadow: var(--shadow-lg);
    border-radius: var(--border-radius-lg);
    min-height: 11in;
  }

  @media (max-width: 768px) {
    .resume-container {
      margin: 1rem;
      padding: 1rem;
      border-radius: var(--border-radius);
    }
  }

  @media print {
    .resume-container {
      max-width: none;
      margin: 0;
      padding: 0;
      box-shadow: none;
      border-radius: 0;
    }
  }
</style>
```

### Step 2: Create Header Component

Create `src/components/sections/Header.astro`:

```astro
---
// src/components/sections/Header.astro
// Static component with Lorem Ipsum content
---

<header class="resume-header">
  <div class="header-overlay"></div>

  <div class="header-content">
    <div class="header-main">
      <div class="profile-image-container">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          alt="Professional headshot"
          class="profile-image"
          loading="eager"
        />
      </div>

      <div class="header-text">
        <h1 class="name">John Alexander Smith</h1>
        <h2 class="title">Senior Software Engineer | Full-Stack Developer</h2>
      </div>
    </div>

    <div class="contact-info">
      <div class="contact-item">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          ></path>
        </svg>
        <a href="mailto:john.smith@example.com" class="contact-link"
          >john.smith@example.com</a
        >
      </div>

      <div class="contact-item">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
          ></path>
        </svg>
        <a href="tel:+1234567890" class="contact-link">+1 (234) 567-8900</a>
      </div>

      <div class="contact-item">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          ></path>
        </svg>
        <span>San Francisco, CA</span>
      </div>
    </div>

    <div class="social-links">
      <a
        href="https://linkedin.com/in/johnsmith"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="social-icon linkedin"></span>
        <span class="social-text">LinkedIn</span>
      </a>
      <a
        href="https://github.com/johnsmith"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="social-icon github"></span>
        <span class="social-text">GitHub</span>
      </a>
      <a
        href="https://johnsmith.dev"
        class="social-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="social-icon website"></span>
        <span class="social-text">Portfolio</span>
      </a>
    </div>
  </div>
</header>

<style>
  .resume-header {
    position: relative;
    background: linear-gradient(
      135deg,
      var(--color-primary) 0%,
      var(--color-accent) 100%
    );
    color: white;
    overflow: hidden;
    margin: -2rem -2rem 0 -2rem;
    border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  }

  .header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .header-content {
    position: relative;
    z-index: 1;
    padding: 3rem 2rem;
    text-align: center;
  }

  .header-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .profile-image-container {
    position: relative;
  }

  .profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.2);
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .name {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .title {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
    opacity: 0.9;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    opacity: 0.8;
  }

  .contact-link {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .contact-link:hover {
    color: white;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 2rem;
    color: white;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all var(--transition-fast);
    backdrop-filter: blur(10px);
  }

  .social-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .social-icon {
    width: 1rem;
    height: 1rem;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .social-icon.linkedin {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E");
  }

  .social-icon.github {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
  }

  .social-icon.website {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E");
  }

  @media (max-width: 768px) {
    .resume-header {
      margin: -1rem -1rem 0 -1rem;
    }

    .header-content {
      padding: 2rem 1rem;
    }

    .name {
      font-size: 2.5rem;
    }

    .title {
      font-size: 1.25rem;
    }

    .contact-info {
      flex-direction: column;
      gap: 1rem;
    }

    .social-links {
      flex-direction: column;
      align-items: center;
    }
  }

  @media print {
    .resume-header {
      background: none !important;
      color: var(--color-text) !important;
      border-bottom: 2px solid var(--color-primary);
      margin: 0;
      border-radius: 0;
    }

    .header-overlay {
      display: none;
    }

    .profile-image {
      width: 80px;
      height: 80px;
      border: 2px solid var(--color-border);
    }

    .social-links {
      display: none;
    }
  }
</style>
```

### Step 3: Create About Section Component

Create `src/components/sections/About.astro`:

```astro
---
// src/components/sections/About.astro
---

<section class="about-section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V4C15 1.79 13.21 0 11 0S7 1.79 7 4V5.5L1 7V9L7 7.5V11C7 11.55 7.45 12 8 12S9 11.55 9 11V8.5L11 8V22H13V8L15 8.5V11C15 11.55 15.45 12 16 12S17 11.55 17 11V7.5L21 9Z"
      ></path>
    </svg>
    About
  </h2>

  <div class="about-content">
    <p class="summary-text">
      Highly accomplished Senior Software Engineer with 8+ years of experience
      specializing in full-stack web development, cloud architecture, and team
      leadership. Proven track record of architecting scalable solutions,
      leading complex migrations, and driving product innovation. Passionate
      about creating efficient, maintainable code and mentoring junior
      developers. Experience spans from startup environments to enterprise-level
      applications, consistently delivering high-impact results in fast-paced,
      collaborative teams.
    </p>

    <p class="summary-text">
      Expert in modern JavaScript frameworks (React, Vue.js, Angular), backend
      technologies (Node.js, Python, Java), and cloud platforms (AWS, Azure,
      GCP). Strong advocate for test-driven development, CI/CD practices, and
      agile methodologies. Currently focused on exploring emerging technologies
      in AI/ML integration and serverless architectures while maintaining a
      commitment to code quality and user experience excellence.
    </p>
  </div>
</section>

<style>
  .about-section {
    margin: 2rem 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--color-primary);
  }

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .about-content {
    padding: 1rem 0;
  }

  .summary-text {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text);
    margin-bottom: 1.5rem;
  }

  .summary-text:last-child {
    margin-bottom: 0;
  }

  @media print {
    .about-section {
      margin: 1rem 0;
    }

    .summary-text {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
</style>
```

### Step 4: Create Work Experience Component

Create `src/components/sections/WorkExperience.astro`:

```astro
---
// src/components/sections/WorkExperience.astro
---

<section class="work-section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V8A2,2 0 0,1 4,6H8V4A2,2 0 0,1 10,2M14,6V4H10V6H14Z"
      ></path>
    </svg>
    Work Experience
  </h2>

  <div class="work-timeline">
    <!-- Senior Software Engineer at TechCorp -->
    <article class="work-item">
      <div class="work-header">
        <div class="work-main">
          <h3 class="position">Senior Software Engineer</h3>
          <div class="company">
            <a
              href="https://techcorp.example.com"
              target="_blank"
              rel="noopener noreferrer"
              class="company-link"
            >
              TechCorp Solutions
            </a>
            <span class="work-type">(Full-time)</span>
          </div>
        </div>

        <div class="work-meta">
          <div class="date-info">
            <span class="date-range">Jan 2022 - Present</span>
            <span class="duration">(2 yrs 3 mos)</span>
          </div>
          <div class="location">San Francisco, CA</div>
        </div>
      </div>

      <div class="work-summary">
        <p>
          Led UI architectural initiatives and drove significant code migrations
          to enhance a next-generation SaaS platform serving 100K+ users.
        </p>
      </div>

      <div class="work-highlights">
        <ul class="highlights-list">
          <li class="highlight-item">
            Architected and implemented critical UI architectural decisions,
            optimizing front-end performance by 40% for the main platform
          </li>
          <li class="highlight-item">
            Led and executed large-scale migration from legacy Angular to React
            for 15+ modules, improving developer productivity by 60%
          </li>
          <li class="highlight-item">
            Mentored team of 6 junior developers, establishing best practices
            for code review and testing protocols
          </li>
          <li class="highlight-item">
            Implemented comprehensive CI/CD pipeline reducing deployment time
            from 2 hours to 15 minutes
          </li>
        </ul>
      </div>
    </article>

    <!-- Software Engineer at InnovateTech -->
    <article class="work-item">
      <div class="work-header">
        <div class="work-main">
          <h3 class="position">Software Engineer</h3>
          <div class="company">
            <a
              href="https://innovatetech.example.com"
              target="_blank"
              rel="noopener noreferrer"
              class="company-link"
            >
              InnovateTech
            </a>
            <span class="work-type">(Contract)</span>
          </div>
        </div>

        <div class="work-meta">
          <div class="date-info">
            <span class="date-range">Mar 2020 - Dec 2021</span>
            <span class="duration">(1 yr 10 mos)</span>
          </div>
          <div class="location">Remote</div>
        </div>
      </div>

      <div class="work-summary">
        <p>
          Delivered comprehensive web and mobile solutions, focusing on
          high-performance applications for diverse client projects in fintech
          and e-commerce.
        </p>
      </div>

      <div class="work-highlights">
        <ul class="highlights-list">
          <li class="highlight-item">
            Developed scalable web applications using React and Node.js, serving
            50K+ concurrent users
          </li>
          <li class="highlight-item">
            Built cross-platform mobile applications using React Native,
            achieving 95% code reuse between iOS and Android
          </li>
          <li class="highlight-item">
            Optimized database queries and API performance, reducing average
            response time by 65%
          </li>
          <li class="highlight-item">
            Collaborated with design team to implement pixel-perfect, responsive
            user interfaces
          </li>
        </ul>
      </div>
    </article>

    <!-- Full Stack Developer at StartupCo -->
    <article class="work-item">
      <div class="work-header">
        <div class="work-main">
          <h3 class="position">Full Stack Developer</h3>
          <div class="company">
            <span>StartupCo</span>
            <span class="work-type">(Full-time)</span>
          </div>
        </div>

        <div class="work-meta">
          <div class="date-info">
            <span class="date-range">Jun 2018 - Feb 2020</span>
            <span class="duration">(1 yr 9 mos)</span>
          </div>
          <div class="location">Austin, TX</div>
        </div>
      </div>

      <div class="work-summary">
        <p>
          Contributed to full-stack development and performance optimization of
          core platform, driving user engagement and platform scalability during
          rapid growth phase.
        </p>
      </div>

      <div class="work-highlights">
        <ul class="highlights-list">
          <li class="highlight-item">
            Built and maintained RESTful APIs using Express.js and MongoDB,
            handling 1M+ requests daily
          </li>
          <li class="highlight-item">
            Implemented real-time features using WebSocket connections,
            improving user engagement by 35%
          </li>
          <li class="highlight-item">
            Developed comprehensive test suites achieving 85% code coverage
            across front-end and back-end
          </li>
          <li class="highlight-item">
            Contributed to infrastructure setup using Docker and AWS services
            (EC2, RDS, S3)
          </li>
        </ul>
      </div>
    </article>
  </div>
</section>

<style>
  .work-section {
    margin: 2rem 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--color-primary);
  }

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .work-timeline {
    position: relative;
  }

  .work-timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--color-border);
  }

  .work-item {
    position: relative;
    margin-bottom: 2.5rem;
    padding-left: 2rem;
    padding: 1.5rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    transition: all var(--transition-normal);
  }

  .work-item::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 2rem;
    width: 12px;
    height: 12px;
    background: var(--color-primary);
    border-radius: 50%;
    border: 2px solid var(--color-background);
  }

  .work-item:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
    transform: translateX(4px);
  }

  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .work-main {
    flex: 1;
  }

  .position {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 0.5rem 0;
  }

  .company {
    font-size: 1rem;
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .company-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color var(--transition-fast);
  }

  .company-link:hover {
    text-decoration: underline;
  }

  .work-type {
    font-style: italic;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .work-meta {
    text-align: right;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  .date-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .date-range {
    font-weight: 500;
    color: var(--color-text);
  }

  .duration {
    font-size: 0.75rem;
    opacity: 0.8;
  }

  .location {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }

  .work-summary {
    margin: 1rem 0;
    padding: 1rem;
    background: var(--color-background-secondary);
    border-radius: var(--border-radius);
    border-left: 3px solid var(--color-primary);
  }

  .work-summary p {
    margin: 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }

  .work-highlights {
    margin-top: 1rem;
  }

  .highlights-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .highlight-item {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.6;
    color: var(--color-text);
  }

  .highlight-item::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-size: 0.75rem;
    top: 0.125rem;
  }

  .highlight-item:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .work-timeline::before {
      display: none;
    }

    .work-item {
      padding-left: 1.5rem;
    }

    .work-item::before {
      display: none;
    }

    .work-item:hover {
      transform: none;
    }

    .work-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .work-meta {
      text-align: left;
    }

    .date-info {
      align-items: flex-start;
    }
  }

  @media print {
    .work-timeline::before {
      display: none;
    }

    .work-item {
      break-inside: avoid;
      border: none;
      border-bottom: 1px solid var(--color-border);
      border-radius: 0;
      padding: 1rem 0;
      box-shadow: none;
      margin-bottom: 1.5rem;
    }

    .work-item::before {
      display: none;
    }

    .work-item:hover {
      box-shadow: none;
      border-color: var(--color-border);
      transform: none;
    }
  }
</style>
```

### Step 5: Create Skills Component

Create `src/components/sections/Skills.astro`:

```astro
---
// src/components/sections/Skills.astro
---

<section class="skills-section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"
      ></path>
    </svg>
    Skills & Technologies
  </h2>

  <div class="skills-grid">
    <!-- Programming Languages -->
    <div class="skill-category">
      <h3 class="category-title">
        <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3H8M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z"
          ></path>
        </svg>
        Programming Languages
        <span class="skill-level">Expert</span>
      </h3>
      <div class="keywords-container">
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">Java</span>
        <span class="skill-tag">Go</span>
        <span class="skill-tag">SQL</span>
      </div>
    </div>

    <!-- Frontend Technologies -->
    <div class="skill-category">
      <h3 class="category-title">
        <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"
          ></path>
        </svg>
        Frontend Development
        <span class="skill-level">Advanced</span>
      </h3>
      <div class="keywords-container">
        <span class="skill-tag">React</span>
        <span class="skill-tag">Vue.js</span>
        <span class="skill-tag">Angular</span>
        <span class="skill-tag">Svelte</span>
        <span class="skill-tag">Next.js</span>
        <span class="skill-tag">Nuxt.js</span>
        <span class="skill-tag">Tailwind CSS</span>
        <span class="skill-tag">SCSS</span>
      </div>
    </div>

    <!-- Backend Technologies -->
    <div class="skill-category">
      <h3 class="category-title">
        <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M3,13V18L3,19H21V18V13H3M20,15V17H19V15H20Z"
          ></path>
        </svg>
        Backend Development
        <span class="skill-level">Advanced</span>
      </h3>
      <div class="keywords-container">
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Express.js</span>
        <span class="skill-tag">NestJS</span>
        <span class="skill-tag">Django</span>
        <span class="skill-tag">FastAPI</span>
        <span class="skill-tag">Spring Boot</span>
        <span class="skill-tag">GraphQL</span>
        <span class="skill-tag">REST APIs</span>
      </div>
    </div>

    <!-- Database Technologies -->
    <div class="skill-category">
      <h3 class="category-title">
        <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"
          ></path>
        </svg>
        Database & Storage
        <span class="skill-level">Intermediate</span>
      </h3>
      <div class="keywords-container">
        <span class="skill-tag">PostgreSQL</span>
        <span class="skill-tag">MongoDB</span>
        <span class="skill-tag">Redis</span>
        <span class="skill-tag">MySQL</span>
        <span class="skill-tag">Elasticsearch</span>
        <span class="skill-tag">DynamoDB</span>
      </div>
    </div>

    <!-- Cloud & DevOps -->
    <div class="skill-category">
      <h3 class="category-title">
        <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M6.5,20Q4.22,20 2.61,18.43Q1,16.85 1,14.58Q1,12.63 2.17,11.1Q3.35,9.57 5.25,9.15Q5.88,6.85 7.75,5.43Q9.63,4 12,4Q14.93,4 16.96,6.04Q19,8.07 19,11Q20.73,11.2 21.86,12.5Q23,13.78 23,15.5Q23,17.38 21.69,18.69Q20.38,20 18.5,20H6.5M6.5,18H18.5Q19.28,18 19.89,17.39Q20.5,16.78 20.5,16Q20.5,15.22 19.89,14.61Q19.28,14 18.5,14H17V11Q17,9.15 15.92,8.08Q14.85,7 13,7Q11.15,7 10.08,8.08Q9,9.15 9,11H8.5Q7.18,11 6.09,11.91Q5,12.82 5,14.25Q5,15.68 6.09,16.59Q7.18,17.5 8.5,17.5H6.5Q5.12,17.5 4.31,16.69Q3.5,15.88 3.5,14.5Q3.5,13.12 4.31,12.31Q5.12,11.5 6.5,11.5V18Z"
          ></path>
        </svg>
        Cloud & DevOps
        <span class="skill-level">Intermediate</span>
      </h3>
      <div class="keywords-container">
        <span class="skill-tag">AWS</span>
        <span class="skill-tag">Azure</span>
        <span class="skill-tag">Docker</span>
        <span class="skill-tag">Kubernetes</span>
        <span class="skill-tag">Terraform</span>
        <span class="skill-tag">Jenkins</span>
        <span class="skill-tag">GitHub Actions</span>
        <span class="skill-tag">Vercel</span>
      </div>
    </div>

    <!-- Tools & Others -->
    <div class="skill-category">
      <h3 class="category-title">
        <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z"
          ></path>
        </svg>
        Tools & Technologies
        <span class="skill-level">Advanced</span>
      </h3>
      <div class="keywords-container">
        <span class="skill-tag">Git</span>
        <span class="skill-tag">Webpack</span>
        <span class="skill-tag">Vite</span>
        <span class="skill-tag">Jest</span>
        <span class="skill-tag">Cypress</span>
        <span class="skill-tag">Figma</span>
        <span class="skill-tag">Jira</span>
        <span class="skill-tag">Slack</span>
      </div>
    </div>
  </div>
</section>

<style>
  .skills-section {
    margin: 2rem 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--color-primary);
  }

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .skill-category {
    padding: 1.5rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    transition: all var(--transition-normal);
  }

  .skill-category:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .category-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .category-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-primary);
  }

  .skill-level {
    font-size: 0.75rem;
    background: var(--color-primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-full);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .keywords-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    background: var(--color-background-secondary);
    color: var(--color-text);
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius-full);
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid var(--color-border);
    transition: all var(--transition-fast);
    cursor: default;
  }

  .skill-tag:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }

    .skill-category:hover {
      transform: none;
    }

    .category-title {
      font-size: 1rem;
    }
  }

  @media print {
    .skill-category {
      break-inside: avoid;
      border: 1px solid var(--color-border);
      box-shadow: none;
      margin-bottom: 1rem;
    }

    .skill-category:hover {
      box-shadow: none;
      border-color: var(--color-border);
      transform: none;
    }

    .skill-tag:hover {
      background: var(--color-background-secondary);
      color: var(--color-text);
      border-color: var(--color-border);
      transform: none;
    }
  }
</style>
```

### Step 6: Create Main Index Page

Create `src/pages/index.astro`:

```astro
---
// src/pages/index.astro
import ResumeLayout from '../layouts/ResumeLayout.astro';
import Header from '../components/sections/Header.astro';
import About from '../components/sections/About.astro';
import WorkExperience from '../components/sections/WorkExperience.astro';
import Skills from '../components/sections/Skills.astro';

const pageTitle =
  'John Alexander Smith - Senior Software Engineer | Full-Stack Developer';
const pageDescription =
  'Experienced Senior Software Engineer specializing in full-stack development, cloud architecture, and team leadership. Expert in React, Node.js, Python, and modern web technologies.';
---

<ResumeLayout
  title={pageTitle}
  description={pageDescription}
  theme="professional"
>
  <Header />
  <About />
  <WorkExperience />
  <Skills />
</ResumeLayout>
```

### Step 7: Create Education Component (Bonus)

Create `src/components/sections/Education.astro`:

```astro
---
// src/components/sections/Education.astro
---

<section class="education-section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"
      ></path>
    </svg>
    Education
  </h2>

  <div class="education-timeline">
    <article class="education-item">
      <div class="education-header">
        <div class="education-main">
          <h3 class="degree">Master of Science in Computer Science</h3>
          <div class="institution">
            <a
              href="https://stanford.edu"
              target="_blank"
              rel="noopener noreferrer"
              class="institution-link"
            >
              Stanford University
            </a>
          </div>
          <div class="specialization">
            Specialization: Artificial Intelligence & Machine Learning
          </div>
        </div>

        <div class="education-meta">
          <div class="date-info">
            <span class="date-range">2016 - 2018</span>
          </div>
          <div class="location">Stanford, CA</div>
          <div class="grade">GPA: 3.8/4.0</div>
        </div>
      </div>

      <div class="education-details">
        <p>
          <strong>Relevant Coursework:</strong> Machine Learning, Deep Learning,
          Computer Vision, Natural Language Processing, Distributed Systems, Advanced
          Algorithms
        </p>
        <p>
          <strong>Thesis:</strong> "Optimizing Neural Network Architectures for Real-time
          Image Classification on Mobile Devices"
        </p>
      </div>
    </article>

    <article class="education-item">
      <div class="education-header">
        <div class="education-main">
          <h3 class="degree">Bachelor of Science in Software Engineering</h3>
          <div class="institution">
            <a
              href="https://berkeley.edu"
              target="_blank"
              rel="noopener noreferrer"
              class="institution-link"
            >
              University of California, Berkeley
            </a>
          </div>
          <div class="specialization">Minor: Mathematics</div>
        </div>

        <div class="education-meta">
          <div class="date-info">
            <span class="date-range">2012 - 2016</span>
          </div>
          <div class="location">Berkeley, CA</div>
          <div class="grade">GPA: 3.7/4.0, Magna Cum Laude</div>
        </div>
      </div>

      <div class="education-details">
        <p>
          <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Software
          Engineering, Database Systems, Computer Networks, Operating Systems, Web
          Development
        </p>
        <p>
          <strong>Activities:</strong> Computer Science Student Association (President),
          ACM Programming Contest (Regional Finalist), Dean's Honor List (6 semesters)
        </p>
      </div>
    </article>
  </div>
</section>

<style>
  .education-section {
    margin: 2rem 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--color-primary);
  }

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .education-timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .education-item {
    padding: 1.5rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    transition: all var(--transition-normal);
  }

  .education-item:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  .education-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .education-main {
    flex: 1;
  }

  .degree {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 0.5rem 0;
  }

  .institution {
    margin-bottom: 0.25rem;
  }

  .institution-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
  }

  .institution-link:hover {
    text-decoration: underline;
  }

  .specialization {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    font-style: italic;
  }

  .education-meta {
    text-align: right;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  .date-info {
    margin-bottom: 0.5rem;
  }

  .date-range {
    font-weight: 500;
    color: var(--color-text);
  }

  .location {
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
  }

  .grade {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-primary);
  }

  .education-details {
    line-height: 1.6;
  }

  .education-details p {
    margin-bottom: 0.75rem;
    color: var(--color-text);
  }

  .education-details p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .education-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .education-meta {
      text-align: left;
    }
  }

  @media print {
    .education-item {
      break-inside: avoid;
      border: none;
      border-bottom: 1px solid var(--color-border);
      border-radius: 0;
      padding: 1rem 0;
      box-shadow: none;
    }

    .education-item:hover {
      box-shadow: none;
      border-color: var(--color-border);
    }
  }
</style>
```

## TODO List for Phase 2

### ✅ Layout Components

- [ ] Create `ResumeLayout.astro` with proper HTML structure and meta tags
- [ ] Configure global styles import in layout
- [ ] Test layout renders correctly with sample content
- [ ] Verify responsive behavior on different screen sizes
- [ ] Test print styles work correctly

### ✅ Header Section

- [ ] Create `Header.astro` component with static Lorem Ipsum content
- [ ] Add professional headshot placeholder (Unsplash or similar)
- [ ] Include contact information (email, phone, location)
- [ ] Add social media links with proper icons
- [ ] Implement responsive design for mobile devices
- [ ] Test hover effects and interactions

### ✅ About Section

- [ ] Create `About.astro` component with compelling summary text
- [ ] Write 2-3 paragraphs of professional Lorem Ipsum content
- [ ] Include relevant keywords for SEO
- [ ] Test typography and spacing
- [ ] Verify print layout

### ✅ Work Experience Section

- [ ] Create `WorkExperience.astro` with timeline layout
- [ ] Add 3-4 realistic job entries with Lorem Ipsum content
- [ ] Include company names, positions, dates, and locations
- [ ] Add compelling bullet points for achievements
- [ ] Implement hover effects and animations
- [ ] Test responsive timeline on mobile

### ✅ Skills Section

- [ ] Create `Skills.astro` with categorized skill display
- [ ] Add 6 skill categories with realistic technologies
- [ ] Include skill level indicators (Expert, Advanced, Intermediate)
- [ ] Implement interactive hover effects
- [ ] Test grid layout responsiveness
- [ ] Add appropriate icons for each category

### ✅ Education Section (Bonus)

- [ ] Create `Education.astro` component
- [ ] Add realistic degree information with Lorem Ipsum
- [ ] Include GPA, coursework, and activities
- [ ] Test responsive layout
- [ ] Verify print formatting

### ✅ Main Page Assembly

- [ ] Create `index.astro` with all sections
- [ ] Import and arrange components in logical order
- [ ] Add proper meta information for SEO
- [ ] Test complete page load and performance
- [ ] Verify all links work correctly

### ✅ Styling & Polish

- [ ] Ensure consistent spacing throughout
- [ ] Test all color combinations and contrast ratios
- [ ] Verify typography hierarchy is clear
- [ ] Test all interactive elements (hover, focus states)
- [ ] Ensure print styles work for entire page
- [ ] Test page performance with dev tools

### ✅ Cross-browser Testing

- [ ] Verify mobile responsiveness on different devices
- [ ] Test print functionality in all browsers
- [ ] Check accessibility with screen readers
- [ ] Validate HTML and CSS

### ✅ Content Quality

- [ ] Review all Lorem Ipsum content for realism
- [ ] Ensure job progression makes sense chronologically
- [ ] Verify skill combinations are realistic
- [ ] Check that education aligns with experience level
- [ ] Test overall narrative flow

## Verification Checklist

Before proceeding to Phase 3, ensure:

1. **Complete page renders without errors**: All sections visible and styled
2. **Responsive design works**: Mobile, tablet, and desktop layouts
3. **Print styles function correctly**: Page prints well on standard paper
4. **Interactive elements work**: Hover effects, links, and animations
5. **Typography is consistent**: Proper hierarchy and readability
6. **Performance is acceptable**: Page loads quickly with good metrics
7. **Accessibility is basic**: Proper heading structure and alt text
8. **Content is professional**: Realistic and compelling Lorem Ipsum

## Next Steps

Once Phase 2 is complete, proceed to **Phase 3: Data Integration from JSON** where you'll:

1. Create TypeScript interfaces matching the JSON data structure
2. Transform static components to accept props
3. Implement data loading and validation
4. Connect real JSON data to components

## Resources

- [Astro Components Guide](https://docs.astro.build/en/core-concepts/astro-components/)
- [CSS Grid and Flexbox](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Responsive Design Principles](https://web.dev/responsive-web-design-basics/)
- [Print CSS Guide](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/)
