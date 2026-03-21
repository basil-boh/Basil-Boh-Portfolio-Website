import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    mediaType: 'placeholder',
    image: null,
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/yourusername/project1',
    demo: 'https://project1-demo.netlify.app',
  },
  {
    id: 2,
    title: 'Data Visualization Dashboard',
    description:
      'Interactive dashboard for visualizing complex datasets with filtering and export capabilities.',
    mediaType: 'image',
    image: '/projects/Data.jpg',
    category: 'data',
    technologies: ['React', 'React Bootstrap', 'Javascript', 'Papa Parse'],
    github: 'https://github.com/basil-boh/Data-Dashboard',
    demo: 'https://basil-data-visualization.netlify.app',
  },
  {
    id: 3,
    title: 'Object Motion Detection',
    description:
      'An application for detecting and tracking moving objects, providing real-time monitoring and improved security.',
    mediaType: 'video',
    image: '/projects/recording.mp4',
    category: 'data',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'NumPy', 'YOLO'],
    github: 'https://github.com/basil-boh/Object-Detection',
    demo: 'https://project3-demo.netlify.app',
  },
  {
    id: 4,
    title: 'Stock Price Prediction Model',
    description:
      'A machine learning model for predicting stock prices using historical data and sentiment analysis.',
    mediaType: 'image',
    image: '/projects/Stock_Predictor.jpg',
    category: 'data',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    github: 'https://github.com/basil-boh/Stock-Predictor',
    demo: 'https://project4-demo.netlify.app',
  },
  {
    id: 5,
    title: 'Social Media Platform',
    description:
      'A social media platform with real-time messaging, post sharing, and user profiles.',
    mediaType: 'image',
    image: '/projects/DoWhat2.jpg',
    category: 'mobile',
    technologies: ['React Native', 'Supabase', 'Expo', 'TypeScript'],
    github: 'https://github.com/yourusername/project5',
    demo: 'https://project5-demo.netlify.app',
  },
  {
    id: 6,
    title: 'Resume Analyzer',
    description:
      'An AI-powered web application designed to optimize resumes by tailoring them to specific job roles.',
    mediaType: 'image',
    image: '/projects/Resume.jpg',
    category: 'web',
    technologies: ['Python', 'FastAPI', 'Uvicorn', 'CORS Middleware'],
    github: 'https://github.com/yourusername/project6',
    demo: 'https://project6-demo.netlify.app',
  },
]

function ProjectMedia({ project }) {
  const commonClass =
    'w-full h-full object-cover transition-transform duration-500 ease-out group-hover/media:scale-105'

  if (project.mediaType === 'placeholder') {
    return (
      <div
        className={`${commonClass} object-center bg-gradient-to-br from-[#4ecdc4]/25 via-[#050505] to-[#556270]/40 flex items-center justify-center`}
        aria-hidden
      >
        <span className="text-[#4ecdc4]/60 text-sm font-mono tracking-wider">Preview</span>
      </div>
    )
  }

  if (project.mediaType === 'video') {
    return (
      <video
        className={commonClass}
        src={project.image}
        autoPlay
        muted
        loop
        playsInline
        aria-label={`${project.title} preview`}
      />
    )
  }

  return (
    <img
      src={project.image}
      alt={project.title}
      className={commonClass}
      loading="lazy"
    />
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'web', label: 'Web' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'data', label: 'Data' },
  ]

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto fade-in-section">
        <h2 className="text-4xl font-bold mb-8 flex items-center">
          <span className="text-[#4ecdc4] text-2xl mr-4">02.</span> My Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition duration-300 border ${
                filter === key
                  ? 'bg-[#4ecdc4]/15 border-[#4ecdc4] text-[#4ecdc4] shadow-[0_0_20px_rgba(78,205,196,0.15)]'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-[#4ecdc4]/40 hover:text-[#4ecdc4]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="glass-panel rounded-xl overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition duration-300"
            >
              <div className="relative h-52 overflow-hidden group/media border-b border-white/5">
                <ProjectMedia project={project} />
                <div
                  className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300 bg-[#050505]/85 backdrop-blur-sm"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(78,205,196,0.88) 0%, rgba(85,98,112,0.9) 100%)',
                  }}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#050505] text-[#4ecdc4] text-sm font-semibold hover:bg-white hover:text-[#050505] transition"
                  >
                    <i className="ph ph-github-logo text-lg"></i>
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#050505] text-[#4ecdc4] text-sm font-semibold hover:bg-white hover:text-[#050505] transition"
                  >
                    <i className="ph ph-arrow-square-out text-lg"></i>
                    Demo
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#4ecdc4]/10 text-[#4ecdc4] border border-[#4ecdc4]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
