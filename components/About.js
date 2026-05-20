import { useState, useEffect } from 'react'

export default function About() {
  const [paypalLightboxSrc, setPaypalLightboxSrc] = useState(null)

  useEffect(() => {
    if (!paypalLightboxSrc) return
    const onKey = (e) => {
      if (e.key === 'Escape') setPaypalLightboxSrc(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [paypalLightboxSrc])

  return (
    <>
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start fade-in-section mb-16">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img 
              src="/profile.jpeg" 
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
                src="/tp_logo.jpg" 
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
      <div
        id="experience"
        className="max-w-6xl w-full fade-in-section mt-16 scroll-mt-24"
      >
        <div className="glass-panel p-8 rounded-2xl">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <span className="text-[#4ecdc4] text-2xl mr-4">02.</span> Experience
          </h2>
          <div className="space-y-6">
            {/* Twiss */}
            <div className="flex gap-4">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <img
                  src="https://framerusercontent.com/images/PgeppFxYE7z22xTAdZ0bVNFjRa8.png?width=246&height=67"
                  alt="Twiss Logo"
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold mb-1">Software Engineer Intern</h4>
                    <p className="text-[#4ecdc4] text-sm mb-1">Twiss</p>
                  </div>
                  <p className="text-gray-400 text-sm">May 2026 - Present</p>
                </div>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Built WatchTower, an AI operations layer for F&amp;B businesses that ingested
                      RTSP camera feeds and turned raw video into a queryable event stream covering
                      queue buildup, table turnover, kitchen pickup congestion, and staff coverage,
                      with realtime alerts and natural-language &ldquo;ask-your-camera&rdquo; queries.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Designed a multimodal reasoning pipeline that fused YOLO and Vertex AI Vision
                      detections with an OpenAI LLM summarisation layer to answer free-form
                      operational questions and emit autonomous action recommendations across
                      staffing, restocking, and counter allocation.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Engineered a semantic video memory layer that compressed raw frames into
                      structured events in Supabase/Postgres, enabling decision-simulation queries
                      against historical footage without re-processing video.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Shipped a tiered token/cost-optimisation layer that ran a cheap vision model
                      for steady-state monitoring and escalated to a stronger multimodal model only
                      on anomaly triggers (crowd spikes, blocked aisles, abandoned counters), on a
                      FastAPI + Next.js stack with Supabase Realtime over WebSockets deployed on
                      Cloud Run.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Biohackk */}
            <div className="flex gap-4">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/biohackk_logo.jpeg" 
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
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Developed and deployed a full-stack mobile health-tech application, integrating
                      secure authentication systems (Singpass OAuth, Google OAuth) with robust
                      implementations of state, nonce, and token validation to ensure end-to-end
                      authentication security.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Designed and optimised backend services and data pipelines using Supabase and
                      GCP, resolving critical data inconsistencies and implementing scalable database
                      schemas for user metrics, streaks, leaderboards, and health tracking.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Integrated Apple HealthKit and third-party IoT/biometric SDKs (e.g., Omron,
                      smart scales, Visbody) to enable real-time ingestion, synchronization, and
                      bidirectional write-back of health data across multiple sources.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Built advanced product features such as AI-powered nutritional analysis (OCR +
                      LLM APIs), biometric authentication, push notifications, and dynamic data
                      visualisation dashboards.
                    </span>
                  </li>
                </ul>
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
                    <p className="text-[#4ecdc4] text-sm mb-1">
                      DNDTS PTE. LTD. · Singapore
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm text-right">May 2025 - July 2025</p>
                </div>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Developed and maintained the company&apos;s internal operating system, a
                      full-stack platform with a React (Vite, Mantine) frontend and a Go-based backend
                      using SQL and Docker.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Implemented new features and enhancements to improve system functionality and
                      user experience.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Optimized performance and ensured seamless integration across microservices and
                      internal tools.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Camtech Diagnostics */}
            <div className="flex gap-4">
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/camtech_logo.jpeg" 
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
                  <p className="text-gray-400 text-sm text-right">Mar 2020 - Aug 2020</p>
                </div>
                <p className="text-gray-300 text-sm font-medium mb-2">
                  Project Assigned: 3-Monochloropropane-Diol (3-MCPD) Optimisation
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>
                      Assisted laboratory researchers in conducting a variety of laboratory experiments.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>Tabulated and visualised data obtained.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4ecdc4] shrink-0">•</span>
                    <span>Analysed and improved experimental reliability of project.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programmes Section */}
      <div className="max-w-6xl w-full fade-in-section mt-8">
        <div className="glass-panel p-8 rounded-2xl">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <span className="text-[#4ecdc4] text-2xl mr-4">03.</span> Programmes
          </h2>
          <div className="space-y-6">
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
                  <p className="text-gray-400 text-sm text-right">May 2024 - Aug 2024</p>
                </div>
                <div className="text-gray-400 text-sm mb-4 space-y-3">
                  <p>
                    Implemented a full-stack, geolocation-driven social networking platform,{' '}
                    <span className="text-gray-300">CrossRoads</span>, enabling real-time,
                    proximity-based user discovery and interaction. Designed a scalable client-server
                    architecture with event-driven communication to support low-latency messaging,
                    live location updates, and dynamic activity feeds. Implemented efficient
                    geospatial querying for nearby user matching, alongside real-time bidirectional
                    communication channels to coordinate spontaneous meetups and event participation.
                  </p>
                  <p>
                    <span className="text-gray-300">Tech stack:</span> React Native, Node.js,
                    MongoDB, Google Cloud Platform (GCP), OAuth 2.0, Google Maps API, WebSockets,
                    Figma, Git.
                  </p>
                </div>

                {/* LinkedIn-style credential (compact; opens PDF) */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <a
                    href="/Orbital.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-sm font-bold text-white hover:border-[#4ecdc4]/60 hover:text-[#4ecdc4] transition-colors"
                  >
                    Show credential
                    <i className="ph ph-arrow-square-out text-base" aria-hidden />
                  </a>
                  <div className="flex items-start gap-3">
                    <img
                      src="/orbital-certificate-thumb.png"
                      alt="Orbital certificate thumbnail"
                      className="h-auto max-h-40 sm:max-h-48 w-auto max-w-[10.5rem] sm:max-w-[12rem] object-contain rounded-md border border-white/10 flex-shrink-0 bg-white/5"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm leading-snug">
                        Orbital Certificate - Apollo 11
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        National University of Singapore · May 2025 - Aug 2025
                      </p>
                    </div>
                  </div>
                </div>
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
                  <p className="text-gray-400 text-sm text-right">May 2025 - July 2025</p>
                </div>
                <div className="text-gray-400 text-sm mb-4 space-y-3">
                  <p>
                    Selected mentee for an industry mentorship programme focused on fintech systems,
                    product development, and real-world software engineering practices. Collaborated
                    with industry mentors to analyse large-scale payment infrastructures, system design
                    considerations, and secure transaction workflows. Gained exposure to distributed
                    systems, scalability challenges, and data-driven product decision-making through
                    workshops and technical discussions. Strengthened skills in problem-solving,
                    stakeholder communication, and applying engineering principles to
                    production-level systems.
                  </p>
                </div>

                {/* Programme photos — Paypal2, Paypal1 (IMG_0888), Paypal3 (IMG_9962) → public/ */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div
                    className="flex flex-row gap-2 sm:gap-3 max-w-md sm:max-w-lg w-full"
                    role="group"
                    aria-label="PayPal Pathways programme photos"
                  >
                    <button
                      type="button"
                      onClick={() => setPaypalLightboxSrc('/Paypal2.jpg')}
                      className="flex-1 min-w-0 rounded-md overflow-hidden border border-white/10 ring-1 ring-inset ring-white/5 bg-white/5 p-0 cursor-pointer hover:border-[#4ecdc4]/40 hover:ring-[#4ecdc4]/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ecdc4]"
                      aria-label="Enlarge PayPal Pathways photo"
                    >
                      <img
                        src="/Paypal2.jpg"
                        alt=""
                        className="w-full h-28 sm:h-36 object-cover block pointer-events-none"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaypalLightboxSrc('/Paypal1.jpg')}
                      className="flex-1 min-w-0 rounded-md overflow-hidden border border-white/10 ring-1 ring-inset ring-white/5 bg-white/5 p-0 cursor-pointer hover:border-[#4ecdc4]/40 hover:ring-[#4ecdc4]/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ecdc4]"
                      aria-label="Enlarge PayPal Pathways photo"
                    >
                      <img
                        src="/Paypal1.jpg"
                        alt=""
                        className="w-full h-28 sm:h-36 object-cover block pointer-events-none"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaypalLightboxSrc('/Paypal3.jpg')}
                      className="flex-1 min-w-0 rounded-md overflow-hidden border border-white/10 ring-1 ring-inset ring-white/5 bg-white/5 p-0 cursor-pointer hover:border-[#4ecdc4]/40 hover:ring-[#4ecdc4]/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ecdc4]"
                      aria-label="Enlarge PayPal Pathways photo"
                    >
                      <img
                        src="/Paypal3.jpg"
                        alt=""
                        className="w-full h-28 sm:h-36 object-cover block pointer-events-none"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
                  <p className="text-gray-400 text-sm text-right">August 2019 - May 2020</p>
                </div>
                <div className="text-gray-400 text-sm mb-4 space-y-3">
                  <p>
                    Selected for a competitive mentorship programme, gaining exposure to strategic
                    thinking, leadership, and real-world business decision-making. Engaged with
                    experienced industry mentors to develop insights into problem-solving frameworks,
                    career development, and cross-functional collaboration.
                  </p>
                </div>

                {/* LinkedIn-style credential (PDF: public/HBSCS.pdf; thumb: assets/image-31.png → public/hbscs-certificate-thumb.png) */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  <a
                    href="/HBSCS.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-sm font-bold text-white hover:border-[#4ecdc4]/60 hover:text-[#4ecdc4] transition-colors"
                  >
                    Show credential
                    <i className="ph ph-arrow-square-out text-base" aria-hidden />
                  </a>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-fit max-w-full shrink-0 rounded-md border border-white/10 bg-white/5 overflow-hidden">
                    <img
                      src="/hbscs-certificate-thumb.png"
                      alt="Harvard Business School certificate thumbnail"
                      width={1844}
                      height={1266}
                      // Changed max-h from 56 to 32 and max-w from 36rem to 14rem
                      className="block h-auto w-auto max-h-32 sm:max-h-40 md:max-h-48 max-w-[14rem] object-contain"
                    />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm leading-snug">
                        Mentorship Programme Certificate
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Harvard Business School Club of Singapore · August 2019 - May 2020
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full fade-in-section mt-8">
        <div className="glass-panel p-8 rounded-2xl">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <span className="text-[#4ecdc4] text-2xl mr-4">04.</span> Tech Stack
          </h2>
          
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

    {paypalLightboxSrc ? (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Expanded image"
        onClick={() => setPaypalLightboxSrc(null)}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setPaypalLightboxSrc(null)
          }}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#050505]/90 text-white hover:border-[#4ecdc4] hover:text-[#4ecdc4] transition"
          aria-label="Close expanded image"
        >
          <i className="ph ph-x text-xl" aria-hidden />
        </button>
        <img
          src={paypalLightboxSrc}
          alt=""
          className="max-h-[90vh] max-w-full w-auto object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ) : null}
    </>
  )
}

