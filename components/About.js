export default function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start fade-in-section mb-16">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img 
              src="https://media.licdn.com/dms/image/v2/D5603AQF2PPoGRvJS4w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725555850583?e=1765411200&v=beta&t=H9071AZYEzDZ2wFg0nmcfUWxyZ_URcExC6dbtyQwUbc" 
              alt="Basil Boh" 
              className="w-48 h-48 object-cover rounded-full border-2 border-[#4ecdc4]/30"
            />
          </div>
          <div className="glass-panel p-8 rounded-2xl relative group">
            <div className="absolute top-4 left-4 flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mt-6 font-mono text-sm text-gray-300 overflow-hidden">
            <p>
              <span className="text-purple-400">const</span>{' '}
              <span className="text-yellow-400">developer</span> = {'{'}
            </p>
            <p className="pl-4">
              name: <span className="text-green-400">'Basil Boh'</span>,
            </p>
            <p className="pl-4">
              role: <span className="text-green-400">'Software Engineer'</span>,
            </p>
            <p className="pl-4">
              passions: [
              <span className="text-green-400">'Software Engineering'</span>,{' '}
              <span className="text-green-400">'AI'</span>,{' '}
              <span className="text-green-400">'Fintech'</span>],
            </p>
            <p className="pl-4">
              hardWorker: <span className="text-blue-400">true</span>
            </p>
            <p>{'};'}</p>
          </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <span className="text-[#4ecdc4] text-2xl mr-4">01.</span> About Me
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            I'm a passionate Computer Science student with a strong interest in software development and problem-solving. I enjoy creating efficient, user-friendly applications and exploring new technologies.
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Education</h3>
            <div className="mb-4 flex items-start gap-4">
              <div>
                <p className="text-white font-semibold mb-1">B.S. in Computer Science</p>
                <p className="text-gray-400 text-sm mb-1">National University of Singapore</p>
                <p className="text-gray-400 text-sm">Expected Graduation: 2027</p>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/200px-NUS_coat_of_arms.svg.png" 
                alt="NUS Logo" 
                className="w-12 h-12 object-contain flex-shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.nus.edu.sg/images/default-source/base/logo.png';
                }}
              />
            </div>
            <div className="mb-4 flex items-start gap-4">
              <div>
                <p className="text-white font-semibold mb-1">Diploma in Biomedical Engineering</p>
                <p className="text-gray-400 text-sm mb-1">Temasek Polytechnic</p>
                <p className="text-gray-400 text-sm">Graduated: 2021</p>
              </div>
              <img 
                src="https://scontent.fsin15-1.fna.fbcdn.net/v/t39.30808-6/555061028_1226858106153644_7678778612606033291_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=8uLXSWz2eAQQ7kNvwGc5ksp&_nc_oc=AdlP8_bzx0qOSsREW8PkQpnuhdPsnY0Dl_YOQB7famOEGzf2_xtRuODEyJIyiM6eVnw&_nc_zt=23&_nc_ht=scontent.fsin15-1.fna&_nc_gid=kxxg2wD0Vy4bNSVMaYJjfg&oh=00_AfjmMhcofSa6eGBAVmMx2qZ1b9SXs28Djr9s9EceiSLb1Q&oe=69232FBE" 
                alt="Temasek Polytechnic Logo" 
                className="w-12 h-12 object-contain flex-shrink-0"
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">Focus Areas</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="ph-fill ph-caret-right text-[#4ecdc4] mr-2"></i> Software Development
              </li>
              <li className="flex items-center">
                <i className="ph-fill ph-caret-right text-[#4ecdc4] mr-2"></i> Data Analytics
              </li>
              <li className="flex items-center">
                <i className="ph-fill ph-caret-right text-[#4ecdc4] mr-2"></i> Artificial Intelligence
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Experience Section */}
      <div className="max-w-6xl w-full fade-in-section mt-16">
        <div className="glass-panel p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 text-white">Experience</h3>
          <div className="space-y-6">
            {/* Biohackk */}
            <div className="flex gap-4">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D560BAQH7SKrGOFS43g/company-logo_100_100/B56Zg2F0_UG0AU-/0/1753254155154/biohackk_logo?e=1765411200&v=beta&t=PMYRxeTbpjiB1bwTYb8VelrjoMhH8W0tUEy2J6-Wax0" 
                  alt="Biohackk Logo" 
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Software Engineer Intern</h4>
                    <p className="text-[#4ecdc4] text-sm mb-1">Biohackk</p>
                  </div>
                  <p className="text-gray-400 text-sm">Jan 2026 - Present</p>
                </div>
                <p className="text-gray-400 text-sm">Details about the role and responsibilities...</p>
              </div>
            </div>

            {/* DNDTS */}
            <div className="flex gap-4">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <img 
                  src="https://www.dndts.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.aeaf8ed3.png&w=1920&q=75" 
                  alt="DNDTS Logo" 
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Software Engineer Intern</h4>
                    <p className="text-[#4ecdc4] text-sm mb-1">DNDTS</p>
                  </div>
                  <p className="text-gray-400 text-sm">May 2025 - Jul 2025</p>
                </div>
                <p className="text-gray-400 text-sm">Details about the role and responsibilities...</p>
              </div>
            </div>

            {/* Camtech Diagnostics */}
            <div className="flex gap-4">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <img 
                  src="https://media.licdn.com/dms/image/v2/C560BAQGJShr9Y5R4eA/company-logo_100_100/company-logo_100_100/0/1630568709770/camtech_innovations_limited_logo?e=1765411200&v=beta&t=ZWYvvXwsZE6H0sfz-3A9E5F_Xikxm5isWPTJx2pM9_g" 
                  alt="Camtech Logo" 
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Laboratory Technician Intern</h4>
                    <p className="text-[#4ecdc4] text-sm mb-1">Camtech Diagnostics</p>
                  </div>
                  <p className="text-gray-400 text-sm">Mar 2020 - Aug 2020</p>
                </div>
                <p className="text-gray-400 text-sm">Details about the role and responsibilities...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programmes Section */}
      <div className="max-w-6xl w-full fade-in-section mt-8">
        <div className="glass-panel p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 text-white">Programmes</h3>
          <div className="space-y-6">
            {/* Harvard Business School */}
            <div className="flex gap-0 items-start -ml-6">
              <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
                <img 
                  src="https://1000logos.net/wp-content/uploads/2024/09/Harvard-Business-School-Logo.png" 
                  alt="Harvard Business School Logo" 
                  className="w-full h-full object-contain rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Harvard_Business_School_logo.svg/200px-Harvard_Business_School_logo.svg.png';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Mentee</h4>
                    <p className="text-[#4ecdc4] text-sm mb-1">Harvard Business School Club of Singapore</p>
                  </div>
                  <p className="text-gray-400 text-sm">Timeline</p>
                </div>
                <p className="text-gray-400 text-sm">Details about the programme...</p>
              </div>
            </div>

            {/* Orbital Programme */}
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center -ml-1">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/200px-NUS_coat_of_arms.svg.png" 
                  alt="NUS Logo" 
                  className="w-full h-full object-contain rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://www.nus.edu.sg/images/default-source/base/logo.png';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Orbital Programme</h4>
                    <p className="text-[#4ecdc4] text-sm mb-1">National University of Singapore</p>
                  </div>
                  <p className="text-gray-400 text-sm">Timeline</p>
                </div>
                <p className="text-gray-400 text-sm">Details about the programme...</p>
              </div>
            </div>

            {/* PayPal Pathways */}
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center -ml-1">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/174/174861.png" 
                  alt="PayPal Logo" 
                  className="w-full h-full object-contain rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/paypal.svg';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold mb-1">PayPal Pathways Programme</h4>
                    <p className="text-[#4ecdc4] text-sm mb-1">PayPal</p>
                  </div>
                  <p className="text-gray-400 text-sm">Timeline</p>
                </div>
                <p className="text-gray-400 text-sm">Details about the programme...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full fade-in-section mt-8">
        <div className="glass-panel p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-8 text-white text-center">Tech Stack</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#4ecdc4] flex items-center">
                <i className="ph ph-browser text-xl mr-2"></i>
                Frontend
              </h4>
              <ul className="space-y-2 font-mono text-base text-gray-400">
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" 
                    alt="HTML/CSS" 
                    className="w-8 h-8 mr-3"
                  />
                  HTML/CSS
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
                    alt="JavaScript" 
                    className="w-8 h-8 mr-3"
                  />
                  JavaScript
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                    alt="React/React Native" 
                    className="w-8 h-8 mr-3"
                  />
                  React/React Native
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" 
                    alt="Figma" 
                    className="w-8 h-8 mr-3"
                  />
                  Figma
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#4ecdc4] flex items-center">
                <i className="ph ph-server text-xl mr-2"></i>
                Backend
              </h4>
              <ul className="space-y-2 font-mono text-base text-gray-400">
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
                    alt="Java" 
                    className="w-8 h-8 mr-3"
                  />
                  Java
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                    alt="Python" 
                    className="w-8 h-8 mr-3"
                  />
                  Python
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" 
                    alt="C/C++" 
                    className="w-8 h-8 mr-3"
                  />
                  C/C++
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
                    alt="Node.js" 
                    className="w-8 h-8 mr-3"
                  />
                  Node.js
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" 
                    alt="Express" 
                    className="w-8 h-8 mr-3"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Express
                </li>
              </ul>
            </div>

            {/* Database */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#4ecdc4] flex items-center">
                <i className="ph ph-database text-xl mr-2"></i>
                Database
              </h4>
              <ul className="space-y-2 font-mono text-base text-gray-400">
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" 
                    alt="MongoDB" 
                    className="w-8 h-8 mr-3"
                  />
                  MongoDB
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" 
                    alt="PostgreSQL" 
                    className="w-8 h-8 mr-3"
                  />
                  PostgreSQL
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/supabase.svg" 
                    alt="Supabase" 
                    className="w-8 h-8 mr-3"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  Supabase
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" 
                    alt="Firebase" 
                    className="w-8 h-8 mr-3"
                  />
                  Firebase
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" 
                    alt="Redis" 
                    className="w-8 h-8 mr-3"
                  />
                  Redis
                </li>
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#4ecdc4] flex items-center">
                <i className="ph ph-wrench text-xl mr-2"></i>
                Tools
              </h4>
              <ul className="space-y-2 font-mono text-base text-gray-400">
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" 
                    alt="Git" 
                    className="w-8 h-8 mr-3"
                  />
                  Git
                </li>
                <li className="flex items-center">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
                    alt="Docker" 
                    className="w-8 h-8 mr-3"
                  />
                  Docker
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

