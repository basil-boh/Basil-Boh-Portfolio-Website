// Single source of truth for articles — short write-ups of learnings & findings.
// `pages/articles/index.js` reads the card-level fields; `pages/articles/[slug].js`
// reads `content`. Content is a list of typed blocks:
//   { type: 'paragraph', text }
//   { type: 'heading',   text }
//   { type: 'list',      items: [] }
//   { type: 'code',      code, language? }
//   { type: 'quote',     text }
// To add an article, append an object below — newest sorts to the top by `date`.

const articles = [
  {
    slug: 'ai-engineer-singapore-2026',
    title: 'AI Engineer Singapore 2026: the harness is the moat',
    summary:
      'A day at Capitol Theatre for AI Engineer Singapore. Thirty-three talks, one recurring argument: the model is becoming a commodity, and the orchestration layer around it is where the value now lives.',
    date: '2026-05-18',
    readingTime: '8 min',
    tags: ['AI', 'Conference', 'Agents'],
    isPlaceholder: false,
    content: [
      {
        type: 'paragraph',
        text: 'I spent Day 1 of AI Engineer Singapore at the Capitol Theatre on 16 May. It was put on by 65 Labs, a grassroots builder collective, and curated by Joel Tong, with OpenAI and Z.ai as diamond sponsors and Google DeepMind, Arise and Cursor on the next tier. The numbers give a sense of the density: 33 talks across two days, 20 workshops in five concurrent rooms, and a laptop-open workshop day that somehow held 98% attendance. Twenty student scholars were sponsored in by the community.',
      },
      {
        type: 'paragraph',
        text: 'I went in expecting a model-capability arms race. I left with the opposite takeaway, and so, it turned out, did almost every speaker.',
      },
      {
        type: 'heading',
        text: 'The one idea everyone agreed on',
      },
      {
        type: 'paragraph',
        text: 'Speaker after speaker — OpenAI, Stripe, Cursor, GovTech, Cognition — described the same architecture: the model treated as commodity infill, and the real work sitting in the layer above it. They kept using the same word for that layer: the harness. Skills, MCP, sandboxes, evals, playbooks, memory, routing. The consensus was blunt: the model is not the moat anymore, the harness is.',
      },
      {
        type: 'quote',
        text: 'Super engines alone are not enough. You need robust cars, established roads, and clear traffic rules.',
      },
      {
        type: 'paragraph',
        text: 'That metaphor came from GovTech and it stuck with me for the rest of the day. Every other talk was, in some form, an answer to "so what does the car look like?"',
      },
      {
        type: 'heading',
        text: "Dr Vivian Balakrishnan's Raspberry Pi second brain",
      },
      {
        type: 'paragraph',
        text: "The opening talk was from Singapore's Foreign Minister, and it was not the politician's keynote I expected. He had built a personal agent on a three-year-old 8GB Raspberry Pi — NanoClaw for the harness, a Neman graph for memory, Ollama embeddings, Obsidian as the store. His point was that the barriers to agentic tooling have collapsed: the value is at the workflow and individual layer, not in frontier-model capex. He was careful about the threat model too — the agent only ever loads public foreign-policy material, so a breach leaks nothing worse than a phone number.",
      },
      {
        type: 'quote',
        text: 'You cannot govern a technology you have only been briefed on. Building with it tells you where it breaks, what it costs, and what it cannot yet do.',
      },
      {
        type: 'paragraph',
        text: 'For a room full of engineers, hearing a sitting minister say "tools matter more than models" and mean it technically was a strong way to open.',
      },
      {
        type: 'heading',
        text: 'NanoClaw, and treating your own codebase as an attack surface',
      },
      {
        type: 'paragraph',
        text: 'Gavriel Cohen, who created NanoClaw, followed up — 30,000 GitHub stars in three months, 12,000 forks. His architecture for safe autonomous agents came down to three moves I wrote straight into my notes:',
      },
      {
        type: 'list',
        items: [
          'Container isolation — the agent is confined to a sandbox and cannot touch the router, the Slack bridge, or the host VM.',
          'Credentials kept external — a vault swaps placeholder tokens for real secrets only if policy permits, so the agent never holds live credentials.',
          'Separate the tool call from the tool execution — the agent emits intent (say, a gh CLI command), a human approves it in Slack, and the privileged action runs outside the agent’s reach.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Daytona reinforced this later with a genuinely alarming data point: in early 2026 they audited over 800 malicious skills in the supply chain. The mood across these talks was that your agent’s codebase and its skill list are now an attack surface, and you should design like you believe that.',
      },
      {
        type: 'heading',
        text: 'OpenAI on Codex, and the real bottleneck: approval fatigue',
      },
      {
        type: 'paragraph',
        text: 'Thibault Sottiaux, who heads Codex at OpenAI, walked the model progression — GPT-5.1-Codex-Max using end-to-end RL for compaction and 30% fewer thinking tokens, then a roughly monthly cadence toward 1M context and computer use. But the part that landed was not the model line, it was the operational story.',
      },
      {
        type: 'paragraph',
        text: 'The constraint inside OpenAI was not the agent making changes — it was humans being asked to approve all of them. Their answer is Auto Review: a second agent that verifies the main agent’s actions against the original task intent, blocks suspicious or high-risk steps, and redirects. It cut approvals 20x internally. He also described their harness philosophy as a deliberate tension — fix a problem in the model if the next training run is under two months away, otherwise patch the harness — specifically so the scaffolding does not ossify.',
      },
      {
        type: 'heading',
        text: "GovTech's sovereign agentic harness",
      },
      {
        type: 'paragraph',
        text: 'Dr Feng Yuzhang, GovTech’s Head of AI, made the harness argument at national scale. The shift he described is from "AI-enabled" — AI bolted onto legacy systems — to "AI-native", reimagined from the ground up so the gains compound. Singapore is building a sovereign agentic harness for 150,000 public officers: an MCP gateway as the front door, an agentic runtime sandbox, agent identity, short- and long-term memory, observability, and a versioned, governed Skills platform.',
      },
      {
        type: 'paragraph',
        text: 'The deployed results were concrete rather than aspirational — AI-assisted teacher marking saving 3 to 4 hours per class, a call-centre LLM stack cutting after-call work by 72%, pre-dementia detection published in Nature Communications and rolling out to community sites. He cited IDC’s forecast of 1.3 billion agents by 2028, and called it conservative.',
      },
      {
        type: 'heading',
        text: 'Open models quietly crossed a line',
      },
      {
        type: 'paragraph',
        text: 'A thread running under everything: open models have crossed real capability thresholds. GLM 5.1, Qwen 27B, Gemma 3 1B and DeepSeek-V3-class models now beat GPT-4 on coding tasks, and some of those run on a laptop. Eugene Cheah of Featherless AI — who raised $120M — described routing 30,000 models as interchangeable commodities. Z.ai’s talk put GLM 5.1 within reach of frontier long-horizon performance. If the model is swappable, the harness argument stops being a slogan and starts being an obvious consequence.',
      },
      {
        type: 'heading',
        text: 'Where the SDLC bottleneck moved',
      },
      {
        type: 'paragraph',
        text: 'The framing I keep coming back to: agentic coding widened the build phase, so the constraint moved everywhere else — planning, review, validation, CI, deploy, debug. The supporting numbers were striking:',
      },
      {
        type: 'list',
        items: [
          'Stripe runs 3,000 PRs a week through its Minions agents at a 65% one-shot merge rate.',
          'Greptile found 27.6% of April PRs were agent-authored — with model-specific bug fingerprints you can actually see.',
          'Sonar’s evals were a useful cold shower: AI catches only 41.5% of the issues a human reviewer flags.',
          'Long-horizon agents fail through goal drift and error accumulation; the fix is depth, not duration — forced goal rereads, file-handle discipline, and judges that refuse to accept a "done" claim at face value.',
        ],
      },
      {
        type: 'heading',
        text: 'What I took home',
      },
      {
        type: 'paragraph',
        text: 'Sean "swyx" Wang closed it out for Cognition — fresh off acquiring Havana and standing up an Asia HQ in Singapore — with the "agent lab nation" framing. The throughline of the whole day, for me:',
      },
      {
        type: 'list',
        items: [
          'Invest in the harness, not the model — orchestration, evals, skills and sandboxes are the durable moat.',
          'Approval fatigue is the binding constraint; a second agent reviewing the first against intent is the pattern that breaks it.',
          'Design as if your skills and codebase are an attack surface, because 800+ malicious skills say they are.',
          'Sovereignty is a choice of which layers you own — post-training and routing are the practical control points — not full-stack self-sufficiency.',
          'Chat is starting to feel like the legacy surface; multiplayer canvases and voice are where the next defensibility is being built.',
        ],
      },
      {
        type: 'paragraph',
        text: 'I walked in thinking the interesting question was which model is best. I walked out convinced the interesting question is what you build around it.',
      },
    ],
  },
]

export function getAllArticles() {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) || null
}

export function getAllArticleSlugs() {
  return articles.map((a) => a.slug)
}
