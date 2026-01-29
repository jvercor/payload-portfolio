import type { RequiredDataFromCollectionSlug } from 'payload'

type SkillData = RequiredDataFromCollectionSlug<'skills'>
type ExperienceData = RequiredDataFromCollectionSlug<'experiences'>
type EducationData = RequiredDataFromCollectionSlug<'educations'>
type LanguageData = RequiredDataFromCollectionSlug<'languages'>

/**
 * Helper function to calculate dates relative to today
 */
const getDateRelativeToDays = (daysAgo: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

/**
 * Helper function to create RichText from plain text description
 */
const createRichText = (text: string) => {
  const lines = text.split('\n').filter((line) => line.trim())

  return {
    root: {
      type: 'root' as const,
      children: lines.map((line) => ({
        type: 'paragraph' as const,
        children: [
          {
            type: 'text' as const,
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text: line,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Get all skills data
 * Returns array of skill objects to be created in the database
 */
export const getSkillsData = (): SkillData[] => {
  return [
    // Frontend Skills
    { name: 'HTML', proficiency_level: 'expert', context_of_use: 'production' },
    { name: 'CSS', proficiency_level: 'expert', context_of_use: 'production' },
    { name: 'JavaScript', proficiency_level: 'expert', context_of_use: 'production' },
    { name: 'TypeScript', proficiency_level: 'advanced', context_of_use: 'production' },
    { name: 'React', proficiency_level: 'expert', context_of_use: 'production' },
    { name: 'Next.js', proficiency_level: 'advanced', context_of_use: 'production' },
    { name: 'Tailwind CSS', proficiency_level: 'expert', context_of_use: 'production' },
    { name: 'SCSS', proficiency_level: 'advanced', context_of_use: 'production' },
    { name: 'Vue.js', proficiency_level: 'intermediate', context_of_use: 'labs' },

    // Backend Skills
    { name: 'Node.js', proficiency_level: 'advanced', context_of_use: 'production' },
    { name: 'Express', proficiency_level: 'advanced', context_of_use: 'production' },
    { name: 'Python', proficiency_level: 'intermediate', context_of_use: 'study' },
    { name: 'PostgreSQL', proficiency_level: 'advanced', context_of_use: 'production' },
    { name: 'MongoDB', proficiency_level: 'intermediate', context_of_use: 'labs' },

    // DevOps & Tools
    { name: 'Git', proficiency_level: 'expert', context_of_use: 'production' },
    { name: 'Docker', proficiency_level: 'intermediate', context_of_use: 'labs' },
    { name: 'AWS', proficiency_level: 'intermediate', context_of_use: 'production' },

    // Soft Skills
    { name: 'Problem Solving', proficiency_level: 'expert', context_of_use: 'production' },
    { name: 'Team Leadership', proficiency_level: 'advanced', context_of_use: 'production' },
    { name: 'Communication', proficiency_level: 'expert', context_of_use: 'production' },
  ]
}

/**
 * Get all experiences data
 * skillsMap: Map of skill names to their IDs (populated from created skills)
 */
export const getExperiencesData = (skillsMap: Map<string, string>): ExperienceData[] => {
  const now = new Date()
  const today = now.getTime()

  return [
    {
      role_title: 'Senior Frontend Developer',
      company_name: 'DataFlow Inc.',
      start_date: getDateRelativeToDays(200),
      is_current: true,
      location: 'San Francisco, CA',
      context: 'Leading frontend architecture and mentoring junior developers',
      responsibilities: createRichText(
        `Led the design and implementation of React component architecture for 3+ major product features, improving code reusability by 40%.
Implemented TypeScript strict mode across 500+ components, reducing runtime errors by 35%.
Mentored 2 junior developers on Next.js best practices, progressive enhancement, and performance optimization.
Collaborated with design team to implement pixel-perfect UI using Tailwind CSS with accessibility standards (WCAG 2.1).
Established frontend testing standards using Vitest, achieving 80% code coverage across the team.
Optimized bundle size through code splitting and lazy loading, reducing initial load time by 45%.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      ),
      technologies: [
        skillsMap.get('React'),
        skillsMap.get('TypeScript'),
        skillsMap.get('Next.js'),
        skillsMap.get('Tailwind CSS'),
        skillsMap.get('JavaScript'),
        skillsMap.get('Git'),
        skillsMap.get('Problem Solving'),
        skillsMap.get('Team Leadership'),
      ].filter(Boolean) as string[],
    },
    {
      role_title: 'Full Stack Developer',
      company_name: 'TechCorp Solutions',
      start_date: getDateRelativeToDays(850),
      end_date: getDateRelativeToDays(200),
      is_current: false,
      location: 'New York, NY',
      context: 'Full stack development for e-commerce platform serving 100K+ users',
      responsibilities: createRichText(
        `Developed and maintained full-stack features for a high-traffic e-commerce platform using React and Node.js.
Built RESTful APIs with Express.js and PostgreSQL, handling 10K+ requests per day with 99.9% uptime.
Implemented real-time features using WebSockets for order tracking and inventory management.
Optimized database queries, reducing API response time from 800ms to 150ms.
Created comprehensive API documentation and mentored 3 developers on backend best practices.
Implemented CI/CD pipelines using Git and Docker for automated testing and deployment.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      ),
      technologies: [
        skillsMap.get('React'),
        skillsMap.get('Node.js'),
        skillsMap.get('Express'),
        skillsMap.get('PostgreSQL'),
        skillsMap.get('JavaScript'),
        skillsMap.get('Docker'),
        skillsMap.get('Git'),
        skillsMap.get('Communication'),
      ].filter(Boolean) as string[],
    },
    {
      role_title: 'Frontend Developer',
      company_name: 'Creative Studios',
      start_date: getDateRelativeToDays(1500),
      end_date: getDateRelativeToDays(850),
      is_current: false,
      location: 'Austin, TX',
      context: 'Frontend development for design-focused web applications',
      responsibilities: createRichText(
        `Developed responsive web interfaces using React and CSS, supporting 50+ client projects.
Converted Figma designs to pixel-perfect HTML/CSS components with accessibility compliance.
Implemented component library documentation with Storybook for 80+ reusable components.
Improved website performance by 55% through lazy loading and code optimization.
Collaborated with 5+ designers to establish design system and component guidelines.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      ),
      technologies: [
        skillsMap.get('React'),
        skillsMap.get('HTML'),
        skillsMap.get('CSS'),
        skillsMap.get('SCSS'),
        skillsMap.get('JavaScript'),
        skillsMap.get('Tailwind CSS'),
        skillsMap.get('Git'),
      ].filter(Boolean) as string[],
    },
    {
      role_title: 'Junior Developer',
      company_name: 'StartUp Ventures',
      start_date: getDateRelativeToDays(2200),
      end_date: getDateRelativeToDays(1500),
      is_current: false,
      location: 'Boston, MA',
      context: 'Entry-level development work on internal tools and MVP projects',
      responsibilities: createRichText(
        `Built UI components using HTML, CSS, and vanilla JavaScript for multiple internal tools.
Participated in code reviews and learned best practices from senior developers.
Assisted in debugging and fixing production issues, resulting in faster incident resolution.
Learned React fundamentals and contributed to 2 React-based projects from ground up.
Documented code and wrote basic unit tests for assigned components.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      ),
      technologies: [
        skillsMap.get('HTML'),
        skillsMap.get('CSS'),
        skillsMap.get('JavaScript'),
        skillsMap.get('React'),
        skillsMap.get('Git'),
        skillsMap.get('Problem Solving'),
      ].filter(Boolean) as string[],
    },
    {
      role_title: 'Backend Engineer',
      company_name: 'FinTech Platform',
      start_date: getDateRelativeToDays(950),
      end_date: getDateRelativeToDays(500),
      is_current: false,
      location: 'Seattle, WA',
      context: 'Backend services for financial transaction processing',
      responsibilities: createRichText(
        `Designed and implemented microservices architecture using Node.js and Express for payment processing.
Developed PostgreSQL schemas supporting 1M+ transactions with ACID compliance.
Implemented API rate limiting and security measures protecting against DDoS attacks.
Wrote 200+ automated tests achieving 85% code coverage.
Reduced transaction processing time by 60% through database optimization.
Collaborated with frontend team to define API contracts and integration points.
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`,
      ),
      technologies: [
        skillsMap.get('Node.js'),
        skillsMap.get('Express'),
        skillsMap.get('PostgreSQL'),
        skillsMap.get('TypeScript'),
        skillsMap.get('Docker'),
        skillsMap.get('AWS'),
        skillsMap.get('Git'),
      ].filter(Boolean) as string[],
    },
  ]
}

/**
 * Get all educations data
 */
export const getEducationsData = (): EducationData[] => {
  return [
    {
      type: 'degree',
      title: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      start_date: '2016-08-15',
      end_date: '2020-05-20',
      status: 'completed',
      description: createRichText(
        `Completed a rigorous 4-year program focusing on software engineering, data structures, and algorithms.
Coursework included: Data Structures, Operating Systems, Artificial Intelligence, Web Development, and Database Systems.
Participated in student-led projects and hackathons, winning 1st place at TechVision Hackathon 2019.
Maintained 3.7 GPA and graduated with honors.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      ),
    },
    {
      type: 'certification',
      title: 'AWS Certified Solutions Architect - Associate',
      institution: 'Amazon Web Services',
      location: 'Online',
      start_date: '2022-03-01',
      end_date: '2023-06-15',
      status: 'completed',
      description: createRichText(
        `Completed comprehensive AWS training covering EC2, S3, RDS, Lambda, and CloudFormation.
Learned cloud architecture best practices, scalability, and high availability design patterns.
Passed AWS Solutions Architect - Associate exam with a score of 850/1000.
Studied AWS Well-Architected Framework and implemented learnings in production environments.`,
      ),
    },
    {
      type: 'certification',
      title: 'React Advanced Patterns & Best Practices',
      institution: 'Frontend Masters',
      location: 'Online',
      start_date: '2021-06-01',
      end_date: '2021-12-30',
      status: 'completed',
      description: createRichText(
        `In-depth course on advanced React patterns including hooks, context API, and performance optimization.
Learned about render optimization, code splitting, and modern React architecture.
Built 5+ complex React applications applying course concepts.
Mastered testing strategies using React Testing Library and Jest.`,
      ),
    },
    {
      type: 'certification',
      title: 'Full Stack Web Development Bootcamp',
      institution: 'General Assembly',
      location: 'San Francisco, CA',
      start_date: '2015-01-15',
      end_date: '2015-04-10',
      status: 'completed',
      description: createRichText(
        `Intensive 12-week bootcamp covering HTML, CSS, JavaScript, Node.js, Express, and MongoDB.
Collaborated on group projects building full-stack applications from design to deployment.
Completed capstone project: a social media platform for photographers with 15+ features.
Ut labore et dolore magna aliqua sed do eiusmod tempor incididunt.`,
      ),
    },
  ]
}

/**
 * Get all languages data
 */
export const getLanguagesData = (): LanguageData[] => {
  return [
    {
      name: 'English',
      level: 'native',
      context: 'Professional work and everyday communication',
    },
    {
      name: 'Spanish',
      level: 'fluent',
      context: 'Professional projects and personal development',
    },
    {
      name: 'French',
      level: 'business',
      context: 'International business communications',
    },
    {
      name: 'German',
      level: 'conversational',
      context: 'Travel and hobby learning',
    },
    {
      name: 'Portuguese',
      level: 'basic',
      context: 'Personal interest and hobby',
    },
  ]
}
