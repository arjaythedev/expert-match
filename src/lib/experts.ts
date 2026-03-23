export type Vertical = "product" | "engineering" | "data" | "design" | "marketing" | "sales" | "ops" | "founder";

export const VERTICAL_LABELS: Record<Vertical, string> = {
  product: "Product",
  engineering: "Engineering",
  data: "Data & Analytics",
  design: "Design",
  marketing: "Marketing",
  sales: "Sales & GTM",
  ops: "Ops & Strategy",
  founder: "Founder",
};

export interface Expert {
  name: string;
  title: string;
  bio: string;
  imgUrl: string;
  topics: string[];
  verticals: Vertical[];
  experienceLevel: number;
  learningStyle: number;
  coachingStyle: number;
  strategic: number;
  fame: number;
  handsOn: number;
}

const AVATAR_COLORS = [
  "1e2542", "2d3a6e", "3a4f8a", "4a6ba0", "1a3a5c",
  "2c4a6e", "3d5c80", "4e6e92", "5f80a4", "3a5a3a",
];

export function getAvatarUrl(name: string): string {
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const bg = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23${bg}"/><text x="100" y="115" font-family="system-ui" font-size="72" font-weight="600" fill="white" text-anchor="middle">${initials}</text></svg>`;
  return `data:image/svg+xml,${svg}`;
}

export const EXPERTS: Expert[] = [
  {
    name: "Mahesh Yadav",
    title: "Former GenAI Product Lead at MAANG",
    bio: "Led AI product strategy at top tech companies. Helps product leaders navigate the AI transition with proven frameworks and practical coaching.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/KvgFAzZDR9Sn4tgDSe0t_Image%203-23-25%20at%207.52%E2%80%AFAM.jpeg",
    topics: ["ai-product", "ai-agents", "ai-productivity"],
    verticals: ["product", "engineering", "founder"],
    experienceLevel: 0.8, learningStyle: 0.7, coachingStyle: 0.6,
    strategic: 0.7, fame: 0.8, handsOn: 0.6,
  },
  {
    name: "Dr. Marily Nika",
    title: "Gen AI PM Lead at Google",
    bio: "Leads generative AI product management at Google. Known for breaking down complex AI concepts into actionable product strategies.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/pSuhPzFyTmbEtsDy5rUY_marily-nika.jpeg",
    topics: ["ai-product", "management-leadership"],
    verticals: ["product", "ops"],
    experienceLevel: 0.7, learningStyle: 0.4, coachingStyle: 0.4,
    strategic: 0.8, fame: 0.9, handsOn: 0.3,
  },
  {
    name: "Ethan Evans",
    title: "Retired Amazon VP, 70+ Patents",
    bio: "Former Amazon VP with decades of leadership experience. Coaches executives and senior leaders on career growth, decision making, and organizational strategy.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/PjUkSV6AQbOJCG9tdbBw_EE.jpeg",
    topics: ["management-leadership", "decision-making"],
    verticals: ["product", "engineering", "ops", "founder"],
    experienceLevel: 0.9, learningStyle: 0.3, coachingStyle: 0.8,
    strategic: 0.9, fame: 1.0, handsOn: 0.2,
  },
  {
    name: "Shyvee Shi",
    title: "Product at Microsoft",
    bio: "Product leader at Microsoft specializing in AI integration. Teaches practical frameworks for building AI powered products from zero to one.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/KmsUTAHXQfuF4yssYfdk_1Hubspot%20%20(5).jpg",
    topics: ["ai-product", "ai-productivity", "ai-agents"],
    verticals: ["product", "engineering", "design"],
    experienceLevel: 0.5, learningStyle: 0.6, coachingStyle: 0.3,
    strategic: 0.5, fame: 0.6, handsOn: 0.7,
  },
  {
    name: "Aishwarya Naresh Reganti",
    title: "AI Advisor & Founder, Former AWS",
    bio: "Former AWS AI leader turned advisor. Specializes in helping teams evaluate, build, and deploy AI systems with rigorous evaluation frameworks.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/fQraD1tATk2VxFm30lGl_aish.jpeg",
    topics: ["ai-evals", "ai-agents", "rag-llm-apps"],
    verticals: ["engineering", "data", "product"],
    experienceLevel: 0.8, learningStyle: 0.8, coachingStyle: 0.7,
    strategic: 0.6, fame: 0.7, handsOn: 0.8,
  },
  {
    name: "Harold Dijkstra",
    title: "AI Agents & Vibe Coding Bootcamp",
    bio: "Runs one of the largest AI bootcamps on Maven. Known for making complex AI topics accessible and helping students ship real projects fast.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/rdVrwqSNSuqWtEk8MWoW_Harold%20Dijkstra%20100%20School.png",
    topics: ["vibe-coding", "ai-agents", "ai-productivity"],
    verticals: ["engineering", "founder", "product"],
    experienceLevel: 0.3, learningStyle: 0.9, coachingStyle: 0.5,
    strategic: 0.2, fame: 0.7, handsOn: 0.9,
  },
  {
    name: "Vincent D. Warmerdam",
    title: "Engineer at Marimo",
    bio: "Deep technical expert in AI/ML engineering. Teaches practical, applied approaches to building with LLMs, RAG systems, and evaluation pipelines.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/ALpKcuY6REqcBTNGLAW8_Vincent.jpg",
    topics: ["rag-llm-apps", "ai-evals", "ai-agents"],
    verticals: ["engineering", "data"],
    experienceLevel: 0.7, learningStyle: 0.9, coachingStyle: 0.6,
    strategic: 0.3, fame: 0.5, handsOn: 0.9,
  },
  {
    name: "Ben Erez",
    title: "Former Meta PM",
    bio: "Former Meta product manager who now helps PMs and founders build AI first products. Combines big tech experience with startup scrappiness.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/d2oS4vDSQ423FnKjjaHz_Ben%20Headshot%20Dec%202018%20square.jpg",
    topics: ["ai-product", "customer-research"],
    verticals: ["product", "founder"],
    experienceLevel: 0.5, learningStyle: 0.7, coachingStyle: 0.5,
    strategic: 0.6, fame: 0.6, handsOn: 0.7,
  },
  {
    name: "Anna Arteeva",
    title: "AI Educator, Former Head of Design at Payoneer",
    bio: "Former head of product design turned AI educator. Specializes in teaching designers and PMs to prototype with AI tools like Lovable, Cursor, and Figma.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/T2bw6YitTltsiFUHosri_anna_arteeva.png",
    topics: ["ai-design", "vibe-coding", "figma-design-systems"],
    verticals: ["design", "product"],
    experienceLevel: 0.4, learningStyle: 0.8, coachingStyle: 0.3,
    strategic: 0.3, fame: 0.5, handsOn: 0.8,
  },
  {
    name: "Satyajeet Salgar",
    title: "Director of Product, Google AI",
    bio: "Leads product at Google AI. Brings a strategic lens to AI product development with deep expertise in scaling AI features to billions of users.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/Vrjw3sQ06R3khgfOqmgi_Screenshot%202026-01-07%20at%208.54.04%20AM.png",
    topics: ["ai-product", "management-leadership"],
    verticals: ["product", "ops", "founder"],
    experienceLevel: 0.9, learningStyle: 0.3, coachingStyle: 0.7,
    strategic: 0.9, fame: 0.9, handsOn: 0.2,
  },
  {
    name: "Manu Jayawardana",
    title: "AI Founder, 35K User Fintech Exit",
    bio: "Serial AI founder who has trained 5,000+ students. Known for practical teaching that gets you from idea to working prototype in a single session.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/7nm90orSQyMT2ivDci7B_HUx7egtLRnyuHnAGDSQc_manuuuuu.webp",
    topics: ["vibe-coding", "ai-agents"],
    verticals: ["founder", "engineering"],
    experienceLevel: 0.3, learningStyle: 0.9, coachingStyle: 0.7,
    strategic: 0.2, fame: 0.4, handsOn: 1.0,
  },
  {
    name: "Amir Feizpour",
    title: "CEO at Aggregate Intellect",
    bio: "AI community builder and educator who bridges the gap between AI research and practical business applications. Runs one of the most active AI learning communities.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/9vtg7pbbTfeJWrBnLDz3_me_green.jpeg",
    topics: ["ai-agents", "rag-llm-apps", "ai-evals", "ai-analysis"],
    verticals: ["engineering", "data", "product", "founder"],
    experienceLevel: 0.6, learningStyle: 0.5, coachingStyle: 0.4,
    strategic: 0.5, fame: 0.5, handsOn: 0.6,
  },
  {
    name: "Tal Raviv",
    title: "AI PM, Early at Patreon and Riverside",
    bio: "AI product manager with 1700+ students and millions of views. Teaches practical AI product skills and Claude Code workflows for builders.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/nkHLi2qDQbK4LFa9km6O_Tal%20Raviv-9003%20-%20this%20one.jpg",
    topics: ["vibe-coding", "claude-code", "ai-productivity"],
    verticals: ["product", "engineering", "founder"],
    experienceLevel: 0.5, learningStyle: 0.8, coachingStyle: 0.5,
    strategic: 0.4, fame: 0.6, handsOn: 0.8,
  },
  {
    name: "Justin Dougherty",
    title: "4x VP of Product, Top Lovable Builder",
    bio: "Veteran product leader who has become one of the top builders in the vibe coding movement. Teaches how to go from idea to shipped product using AI tools.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/huTtuMoSzKx1UcrmyJWu_Justin%20D%20Headshot.jpg",
    topics: ["vibe-coding", "ai-product"],
    verticals: ["product", "founder", "engineering"],
    experienceLevel: 0.4, learningStyle: 0.9, coachingStyle: 0.5,
    strategic: 0.4, fame: 0.5, handsOn: 0.9,
  },
  {
    name: "Helen Yu",
    title: "CEO Tigon Advisory, Top 50 Women in Tech",
    bio: "Award winning tech CEO and advisor who helps nontechnical professionals harness AI for business impact. Known for making AI accessible to everyone.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/WbO10EyR2dqZZjRjtoFg_Helen%20Yu.jpeg",
    topics: ["ai-productivity", "ai-x-leaders", "management-leadership"],
    verticals: ["ops", "marketing", "sales", "founder"],
    experienceLevel: 0.5, learningStyle: 0.3, coachingStyle: 0.3,
    strategic: 0.8, fame: 0.8, handsOn: 0.3,
  },
  {
    name: "Jason P. Yoong",
    title: "Co Founder & COO at Level Up",
    bio: "Operations leader and coach who helps professionals level up their careers. Specializes in leadership development and strategic decision making.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/dLFZIdjQRtCjHkIRBKtf_JPY%20Photo.png",
    topics: ["management-leadership", "decision-making"],
    verticals: ["ops", "product", "founder"],
    experienceLevel: 0.7, learningStyle: 0.5, coachingStyle: 0.6,
    strategic: 0.8, fame: 0.7, handsOn: 0.5,
  },
  {
    name: "Grace Man",
    title: "Founder at AI Strategy League, Former Microsoft Marketing",
    bio: "Former Microsoft marketing leader now helping sales and marketing teams leverage AI agents for growth. Bridges strategy with execution.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/Z567CyMkQ32mElruKvqf_Grace%20Man.JPG",
    topics: ["ai-agents", "ai-for-sales", "ai-marketing"],
    verticals: ["marketing", "sales", "founder"],
    experienceLevel: 0.6, learningStyle: 0.6, coachingStyle: 0.5,
    strategic: 0.7, fame: 0.4, handsOn: 0.7,
  },
  {
    name: "Elena Luneva",
    title: "VP GoFundMe, Former GM at Nextdoor and OpenTable",
    bio: "Senior product and GTM leader who has scaled multiple consumer and B2B products. Teaches the intersection of product strategy, sales, and AI.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/sUTxr1tRRJqeXkrGnnFY_Elena%20L.jpeg",
    topics: ["gtm-engineering", "ai-for-sales", "communication-storytelling"],
    verticals: ["sales", "ops", "founder", "product"],
    experienceLevel: 0.8, learningStyle: 0.4, coachingStyle: 0.7,
    strategic: 0.9, fame: 0.7, handsOn: 0.3,
  },
  {
    name: "Everett Berry",
    title: "Head of GTM Engineering at Clay",
    bio: "Leads GTM engineering at Clay, the defining tool for modern sales teams. Teaches how to build scalable outbound systems powered by AI.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/sMDdYMErSYmwuvP619TO_1710209431139.jpeg",
    topics: ["gtm-engineering", "ai-for-sales", "decision-making"],
    verticals: ["sales", "marketing", "founder"],
    experienceLevel: 0.6, learningStyle: 0.8, coachingStyle: 0.6,
    strategic: 0.5, fame: 0.6, handsOn: 0.9,
  },
  {
    name: "Cassie Kozyrkov",
    title: "Former Chief Decision Science Officer at Google",
    bio: "Former Chief Decision Science Officer at Google and one of the most popular voices in data science education. Makes analytics and AI approachable for everyone.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/cU5KbysaQHyNprN3AAvH_1709746519023.jpeg",
    topics: ["decision-making", "ai-analysis"],
    verticals: ["data", "ops", "product"],
    experienceLevel: 0.7, learningStyle: 0.4, coachingStyle: 0.5,
    strategic: 0.8, fame: 1.0, handsOn: 0.3,
  },
  {
    name: "Brooke Katalinich",
    title: "Product Design Director, Mobile + AI at Firefox",
    bio: "Product design director leading mobile and AI design at Firefox. Teaches designers how to prototype, test, and ship AI powered experiences.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/OlmX1wBShSkNldicGH3g_BKatalinich.jpg",
    topics: ["ux-design", "vibe-coding", "ai-design"],
    verticals: ["design", "product"],
    experienceLevel: 0.6, learningStyle: 0.7, coachingStyle: 0.3,
    strategic: 0.5, fame: 0.5, handsOn: 0.7,
  },
  {
    name: "Jared Spool",
    title: "Maker of Awesomeness, Expert in UX Strategy",
    bio: "One of the most influential voices in UX design with decades of experience. Teaches UX strategy and design leadership to product teams worldwide.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/qr1RmhOT32U0OE6Dckcw_Jared-headshot.png",
    topics: ["ux-design", "ai-design"],
    verticals: ["design", "product"],
    experienceLevel: 0.9, learningStyle: 0.3, coachingStyle: 0.7,
    strategic: 0.9, fame: 0.9, handsOn: 0.2,
  },
  {
    name: "Vitaly Friedman",
    title: "Co Founder of Smashing Magazine, Senior UX Lead",
    bio: "Co founded Smashing Magazine and brings 19 years of UX experience. Teaches cutting edge design patterns and AI powered design workflows.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/Cjsa1KYSWdyq37uwnFew_vitaly.jpeg",
    topics: ["ai-design", "ux-design"],
    verticals: ["design"],
    experienceLevel: 0.8, learningStyle: 0.5, coachingStyle: 0.5,
    strategic: 0.6, fame: 0.9, handsOn: 0.5,
  },
  {
    name: "Joey Banks",
    title: "Founder of Baseline, Previously at Figma, Twitter, and Webflow",
    bio: "Built design systems at Figma, Twitter, and Webflow. Now teaches designers how to create scalable, production ready design systems from scratch.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/ECzmBA4MRNG0QDAnOfBj_Banks_Joey_Square.jpg",
    topics: ["figma-design-systems", "ai-design"],
    verticals: ["design"],
    experienceLevel: 0.6, learningStyle: 0.8, coachingStyle: 0.4,
    strategic: 0.4, fame: 0.6, handsOn: 0.9,
  },
  {
    name: "Mostafa ElBermawy",
    title: "Founder & CEO at Goodie AI and NoGood",
    bio: "Founder of NoGood, a growth agency for top startups. Teaches marketers how to combine AI with proven growth frameworks for measurable results.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/tA7SeyafSOidfz6PISFK_Mostafa%20Profile%20image.png",
    topics: ["ai-marketing", "gtm-engineering"],
    verticals: ["marketing", "founder"],
    experienceLevel: 0.6, learningStyle: 0.7, coachingStyle: 0.6,
    strategic: 0.6, fame: 0.5, handsOn: 0.8,
  },
  {
    name: "Matt Lerner",
    title: "Co Founder of SYSTM, Former PayPal",
    bio: "Former PayPal growth leader and 500 Startups mentor. Teaches startup founders and marketers how to find product market fit and scale growth.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/CVhwwZXvRCSpjBtJcTOM_April-2021-Fora.jpeg",
    topics: ["ai-marketing", "gtm-engineering"],
    verticals: ["marketing", "founder", "sales"],
    experienceLevel: 0.7, learningStyle: 0.5, coachingStyle: 0.7,
    strategic: 0.8, fame: 0.7, handsOn: 0.4,
  },
  {
    name: "Jay Wengrow",
    title: "CEO of Actualize, Author of A Common Sense Guide to AI Engineering",
    bio: "Author and educator who makes AI engineering approachable. Teaches engineers how to build with Claude Code and modern AI development tools.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/bRoC2JPqTQC1hROZkacW_jay_headshot_2.jpg",
    topics: ["claude-code", "ai-agents"],
    verticals: ["engineering", "data"],
    experienceLevel: 0.4, learningStyle: 0.8, coachingStyle: 0.3,
    strategic: 0.3, fame: 0.5, handsOn: 0.9,
  },
  {
    name: "Hilary Gridley",
    title: "Product Leader at WHOOP, Previously Dropbox",
    bio: "Product leader who has built and scaled products at WHOOP, Dropbox, and Big Health. Teaches practical product management and AI productivity workflows.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/FD7csvvQUiETJ8e8nBUA_hilary%20bio%20photo.webp",
    topics: ["ai-productivity", "management-leadership"],
    verticals: ["product", "ops"],
    experienceLevel: 0.6, learningStyle: 0.5, coachingStyle: 0.4,
    strategic: 0.6, fame: 0.5, handsOn: 0.6,
  },
  {
    name: "Alexey Grigorev",
    title: "Principal Data Scientist, Author, 100K+ Students",
    bio: "Principal Data Scientist and bestselling author who has taught over 100,000 students worldwide. Specializes in practical, project based AI and data science education.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/5W7zDzjiTNqQHih36nMw_1718261603928.jpg",
    topics: ["ai-analysis", "rag-llm-apps"],
    verticals: ["data", "engineering"],
    experienceLevel: 0.6, learningStyle: 0.8, coachingStyle: 0.4,
    strategic: 0.3, fame: 0.6, handsOn: 0.9,
  },
  {
    name: "Shaw Talebi",
    title: "Former Toyota Data Scientist, 50K+ Learners",
    bio: "Former Toyota Data Scientist with 6 years in AI. Known for clear, practical teaching that helps analysts and data scientists level up with AI tools.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/GLTrzC1QqCnEVZfZtOHQ_headshot_1400-1400.jpeg",
    topics: ["ai-analysis", "ai-productivity"],
    verticals: ["data", "engineering"],
    experienceLevel: 0.4, learningStyle: 0.8, coachingStyle: 0.3,
    strategic: 0.3, fame: 0.4, handsOn: 0.9,
  },
  {
    name: "Sherveen Mashayekhi",
    title: "Founder & CEO of Free Agency",
    bio: "Founder and host of 3 startup shows on YouTube. Helps professionals and founders navigate career strategy and AI leadership with practical frameworks.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/Gt49hrxaR7u9BMyRTqAL_sm-yt2.jpeg",
    topics: ["ai-productivity", "ai-x-leaders"],
    verticals: ["founder", "ops", "marketing"],
    experienceLevel: 0.5, learningStyle: 0.5, coachingStyle: 0.5,
    strategic: 0.7, fame: 0.5, handsOn: 0.5,
  },
  {
    name: "Jesse Pujji",
    title: "Founder of Ampush, Gateway X, and GrowthAssistant",
    bio: "Serial entrepreneur and investor who has built multiple companies from scratch. Teaches founders and marketers how to think about growth, AI, and building teams.",
    imgUrl: "https://d2426xcxuh3ht5.cloudfront.net/RSynbPzoR6e4xQdB81Eb_J19A1648.JPG",
    topics: ["ai-marketing", "personal-branding"],
    verticals: ["founder", "marketing"],
    experienceLevel: 0.7, learningStyle: 0.4, coachingStyle: 0.7,
    strategic: 0.8, fame: 0.7, handsOn: 0.4,
  },
];

export interface QuizAnswers {
  vertical: Vertical;
  experience: "left" | "right";
  learningStyle: "left" | "right";
  workStyle: "left" | "right";
  careerGoal: "left" | "right";
  needType: "left" | "right";
  accountability: "left" | "right";
  urgency: "left" | "right";
  commitment: "left" | "right";
  perspective: "left" | "right";
  coachingVibe: "left" | "right";
  expertType: "left" | "right";
}

function answerToScore(answer: "left" | "right"): number {
  return answer === "left" ? 0 : 1;
}

export function matchExperts(answers: QuizAnswers): Expert[] {
  const verticalExperts = EXPERTS.filter(e => e.verticals.includes(answers.vertical));

  const scored = verticalExperts.map(expert => {
    let score = 0;

    // Experience match
    const expPref = answerToScore(answers.experience);
    score += 1 - Math.abs(expert.experienceLevel - expPref) * 1.5;

    // Learning style
    const learnPref = answerToScore(answers.learningStyle);
    score += 1 - Math.abs(expert.learningStyle - learnPref) * 1.2;

    // Career goal: switch=broad experts, deeper=specialized
    const careerPref = answerToScore(answers.careerGoal);
    score += 1 - Math.abs(expert.strategic - (careerPref * 0.6 + 0.2));

    // Need type: skill=hands on, strategy=strategic
    const needPref = answerToScore(answers.needType);
    score += 1 - Math.abs(expert.strategic - needPref) * 1.3;

    // Perspective: same shoes=hands on, bird's eye=strategic
    const perspPref = answerToScore(answers.perspective);
    score += 1 - Math.abs(expert.handsOn - (1 - perspPref)) * 1.4;

    // Coaching vibe: tough love=direct, supportive=collaborative
    const vibePref = answerToScore(answers.coachingVibe);
    score += 1 - Math.abs(expert.coachingStyle - vibePref) * 1.3;

    // Expert type: big name vs hidden gem
    const famePref = answerToScore(answers.expertType);
    score += 1 - Math.abs(expert.fame - (1 - famePref)) * 1.2;

    return { expert, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 5).map(s => s.expert);
}
