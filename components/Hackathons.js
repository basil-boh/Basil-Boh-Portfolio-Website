export default function Hackathons() {
  const hackathons = [
    {
      name: 'Sea x OpenAI Regional Codex Hackathon',
      date: '6 Jun 2026',
      upcoming: true,
      description:
        'Regional hackathon co-hosted by Sea and OpenAI, focused on building with Codex and OpenAI tooling across Southeast Asia.',
      image: '/hackathon-sea-openai.jpeg',
    },
    {
      name: 'Ralphthon @SG',
      date: '17 May 2026',
      role: '2nd Place Winner',
      description:
        'Won 2nd place building SnapRoom, a platform that turns a single room image into a walkable 3D world using Gaussian-splat world generation, AI-generated object meshes, and a companion mobile AR viewer.',
      image: '/hackathon-ralphthon.jpeg',
    },
    {
      name: 'AI Engineer Hackathon',
      date: '9 May 2026',
      description:
        'Shipped an end-to-end AI engineering prototype, agents, retrieval, and evaluation, under a tight time-boxed build alongside OpenAI, Cursor, Vercel, Google DeepMind and ElevenLabs.',
      image: '/hackathon-ai-engineer.png',
    },
    {
      name: 'GrabMaps Hackathon',
      date: '24 Apr 2026',
      description:
        'Tackled a real-world Southeast Asia mobility / mapping problem statement under a fast-paced, team-based build sprint.',
      image: '/hackathon-grab.png',
    },
    {
      name: 'NUS Hack&Roll',
      date: '17 Jan 2026',
      description:
        "Singapore's largest student-run 24-hour hackathon, hosted by NUS Hackers, built and shipped a full project end-to-end against the clock.",
      image: '/hackathon-hack-and-roll.png',
    },
    {
      name: 'Gemini Hackathon',
      date: '10 Jan 2026',
      description:
        'Built with the Gemini API across multimodal reasoning, tool use, and long-context workflows.',
      image: '/hackathon-gemini.png',
    },
  ]

  return (
    <section id="hackathons" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto fade-in-section">
        <h2 className="text-4xl font-bold mb-8 flex items-center">
          <span className="text-[#4ecdc4] text-2xl mr-4">07.</span> Hackathons
        </h2>

        <div className="glass-panel p-8 rounded-2xl">
          <div className="space-y-6">
            {hackathons.map((h) => (
              <div key={h.name} className="flex gap-4">
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden bg-black/30 border border-white/10">
                  <img
                    src={h.image}
                    alt={`${h.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <div>
                      <h4 className="text-white font-semibold mb-1 flex items-center gap-2 flex-wrap">
                        {h.name}
                        {h.upcoming ? (
                          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border border-[#4ecdc4]/40 text-[#4ecdc4] bg-[#4ecdc4]/10">
                            Upcoming
                          </span>
                        ) : null}
                      </h4>
                      <p className="text-[#4ecdc4] text-sm mb-1">{h.role || 'Hackathon Participant'}</p>
                    </div>
                    <p className="text-gray-400 text-sm text-right whitespace-nowrap">{h.date}</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
