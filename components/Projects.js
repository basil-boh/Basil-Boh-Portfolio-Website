export default function Projects() {
  const projects = [
    {
      icon: 'ph-folder-notch-open',
      title: 'Neural Dashboard',
      description:
        'A real-time data visualization dashboard for AI model training metrics. Features interactive charts and websocket updates.',
      tags: ['React', 'D3.js', 'Firebase'],
      github: '#',
      live: '#',
    },
    {
      icon: 'ph-cube',
      title: 'E-Commerce 3D',
      description:
        'An experimental shopping experience allowing users to interact with 3D models of products before purchasing.',
      tags: ['Three.js', 'Shopify API', 'WebGL'],
      github: '#',
      live: '#',
    },
    {
      icon: 'ph-cloud-fog',
      title: 'Cloud Manager',
      description:
        'CLI tool and web interface for managing AWS EC2 instances and S3 buckets effortlessly.',
      tags: ['Go', 'AWS SDK', 'Docker'],
      github: '#',
      live: '#',
    },
  ]

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto fade-in-section">
        <h2 className="text-4xl font-bold mb-16 flex items-center">
          <span className="text-[#4ecdc4] text-2xl mr-4">02.</span> Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl p-6 hover:transform hover:-translate-y-2 transition duration-300 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <i className={`ph ${project.icon} text-4xl text-[#4ecdc4]`}></i>
                <div className="flex gap-4 text-xl">
                  <a href={project.github} className="hover:text-[#4ecdc4]">
                    <i className="ph ph-github-logo"></i>
                  </a>
                  <a href={project.live} className="hover:text-[#4ecdc4]">
                    <i className="ph ph-arrow-square-out"></i>
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-[#4ecdc4]">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


