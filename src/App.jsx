import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ExternalLink, PlayCircle, Filter, Code2, Database, ServerCog, Cpu, Gauge, ShieldCheck, FileText, Moon, Sun, PhoneCall, Globe, Sparkles, LaptopMinimal } from 'lucide-react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { Input } from './components/ui/input.jsx'
import { Textarea } from './components/ui/textarea.jsx'
import { blogPosts } from './blog-posts.js'
import BlogPost from './components/BlogPost.jsx'

// Base-aware path helper so assets work on GitHub Pages subpath
const withBase = (p) => {
  const base = import.meta.env.BASE_URL || '/'
  const cleaned = p.startsWith('/') ? p.slice(1) : p
  return `${base}${cleaned}`
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('nc-theme')
    return saved ? saved === 'dark' : false // Default to light mode instead of system preference
  })
  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('nc-theme', isDark ? 'dark' : 'light')
  }, [isDark])
  return { isDark, setIsDark }
}

const roles = [
  'AI Software Engineer',
  'Web Developer',
  'Embedded Systems Engineer',
  'Data Pipeline Builder',
  'Microsoft 365 Specialist',
]

const Typewriter = ({ words, typeMs = 85, deleteMs = 55, holdMs = 900, gapMs = 250 }) => {
  const [i, setI] = useState(0);          // which word
  const [sub, setSub] = useState(0);      // how many chars shown
  const [phase, setPhase] = useState('type'); // 'type' | 'hold' | 'delete' | 'gap'

  // compute fixed width to prevent layout shift
  const maxLen = useMemo(() => Math.max(...words.map(w => w.length)), [words]);

  useEffect(() => {
    const word = words[i % words.length];

    let t;
    if (phase === 'type') {
      if (sub < word.length) {
        t = setTimeout(() => setSub(sub + 1), typeMs);
      } else {
        t = setTimeout(() => setPhase('hold'), holdMs);
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('delete'), holdMs);
    } else if (phase === 'delete') {
      if (sub > 0) {
        t = setTimeout(() => setSub(sub - 1), deleteMs);
      } else {
        t = setTimeout(() => { setI((i + 1) % words.length); setPhase('gap'); }, deleteMs);
      }
    } else if (phase === 'gap') {
      t = setTimeout(() => setPhase('type'), gapMs);
    }

    return () => clearTimeout(t);
  }, [phase, sub, i, words, typeMs, deleteMs, holdMs, gapMs]);

  const text = words[i % words.length].slice(0, sub);

  return (
    <span className="inline-block tabular-nums"
          style={{ minWidth: `${maxLen + 1}ch` }}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Background = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-700/20" />
    <div className="absolute -bottom-24 -right-24 h-[30rem] w-[30rem] rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-700/20" />
    <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,transparent_1px)] [background-size:40px_40px]" />
  </div>
)

const projects = [
  {
    title: 'Automated Social Media Video Generator',
    slug: 'social-media-video-generator',
    description: 'Scrapes Reddit stories, generates captions and TTS, edits with FFmpeg, and schedules uploads to TikTok, Instagram, and YouTube Shorts.',
    tags: ['Python', 'Google TTS', 'FFmpeg', 'Automation'],
    category: 'AI',
    links: {
      repo: 'https://github.com/nate-chambers/reddit-tiktok-automation',
      demo: 'https://www.tiktok.com/@teddyreddit.stories',
    },
    media: withBase('/demos/social-video.png'), // Screenshot of video generation interface or workflow
  },
  {
    title: 'LanguageAI - Podcast Generator',
    slug: 'languageai-podcast-generator',
    description: 'Generate personalized language-learning podcasts with AI scripts and Google Cloud TTS, deployed on Cloud Run.',
    tags: ['Python', 'Flask', 'OpenAI', 'Google TTS', 'Docker', 'Cloud Run'],
    category: 'AI',
    links: {
      repo: 'https://github.com/nate-chambers/languageAI',
      demo: 'https://languageai-592821856944.us-central1.run.app/',
    },
    media: withBase('/demos/laungAi.png'),
  },
  {
    title: 'Small Business Web Portfolio',
    slug: 'web-dev-portfolio',
    description: 'Responsive sites for 10+ businesses with SEO optimization, analytics, and maintenance workflows.',
    tags: ['React', 'HTML/CSS/JS', 'Wix Studio', 'WordPress'],
    category: 'Web',
    links: {
      repo: 'https://github.com/nate-chambers/web-dev-portfolio',
      demo: 'https://orriadeskai.com/',
    },
    media: withBase('/demos/web-portfolio.png'), // Screenshot of portfolio website or client sites
    hideCode: true, // Hide the code button for this project
  },
  {
    title: 'Environmental Sensor Data Pipeline',
    slug: 'environmental-data-pipeline',
    description: 'Collects, flags, and visualizes environmental data from embedded sensors with MySQL storage and Grafana dashboards. (Under NDA - limited details available)',
    tags: ['Python', 'MySQL', 'Grafana', 'REST'],
    category: 'Data',
    links: {
      repo: '#',
      demo: '#',
    },
    media: withBase('/demos/sensor-data.png'), // Screenshot of Grafana dashboard or data visualization
    nda: true,
  },
  {
    title: 'Protected MkDocs + OAuth2 Docs',
    slug: 'mkdocs-oauth2-docs',
    description: 'Internal documentation site with Google OAuth via OAuth2 Proxy behind NGINX, containerized with Docker. (Under NDA - limited details available)',
    tags: ['MkDocs', 'Docker', 'OAuth2 Proxy', 'NGINX'],
    category: 'Web',
    links: {
      repo: '#',
      demo: '#',
    },
    media: withBase('/demos/docs-system.png'), // Screenshot of documentation interface or architecture diagram
    nda: true,
  },
]

const categories = ['All', 'AI', 'Web', 'Data', 'Embedded']

const toolbox = [
  { name: 'React', icon: <Sparkles className='h-5 w-5' />, note: 'Frontend, components, hooks' },
  { name: 'HTML/CSS/JS', icon: <Globe className='h-5 w-5' />, note: 'Web fundamentals, responsive design' },
  { name: 'Dart/Flutter', icon: <Code2 className='h-5 w-5' />, note: 'Cross-platform mobile, UI' },
  { name: 'Python', icon: <Code2 className='h-5 w-5' />, note: 'Automation, data, scripting' },
  { name: 'Go', icon: <Cpu className='h-5 w-5' />, note: 'Services, concurrency' },
  { name: 'Java', icon: <Code2 className='h-5 w-5' />, note: 'Backend, testing' },
  { name: 'SQL', icon: <Database className='h-5 w-5' />, note: 'MySQL, schema design' },
  { name: 'Docker', icon: <ServerCog className='h-5 w-5' />, note: 'Packaging, deploys' },
  { name: 'Grafana', icon: <Gauge className='h-5 w-5' />, note: 'Dashboards, QA' },
  { name: 'OAuth2', icon: <ShieldCheck className='h-5 w-5' />, note: 'Auth, proxy' },
  { name: 'Docs', icon: <FileText className='h-5 w-5' />, note: 'MkDocs, Pages' },
  { name: 'Microsoft 365', icon: <FileText className='h-5 w-5' />, note: 'Excel, Word, PowerPoint, Teams, Outlook, SharePoint' },
  { name: 'GitHub', icon: <Code2 className='h-5 w-5' />, note: 'Version control, collaboration, CI/CD' },
]

const statItems = [
  { label: 'Projects', value: 24 },
  { label: 'Years Coding', value: 6 },
  { label: 'Video Views', value: '250k+' },
  { label: 'Clients', value: 10 },
]

const SectionTitle = ({ icon: Icon, title, sub }) => (
  <div className='mb-6 flex items-end justify-between'>
    <div>
      <h2 className='text-2xl font-bold tracking-tight flex items-center gap-2 text-neutral-900 dark:text-white'><Icon className='h-6 w-6' /> {title}</h2>
      {sub ? <p className='text-muted-foreground mt-1 text-sm text-neutral-600 dark:text-neutral-400'>{sub}</p> : null}
    </div>
  </div>
)

const Hero = ({ onResume }) => {
  return (
    <section className='relative mx-auto max-w-6xl px-4 pt-20 pb-12'>
      <Background />
      <div className='grid gap-8 md:grid-cols-5'>
        <div className='md:col-span-3 space-y-5'>
          <motion.h1 className='text-4xl font-extrabold leading-tight md:text-5xl text-neutral-900 dark:text-white' initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
            Nate Chambers
          </motion.h1>
          <motion.p className='text-xl text-neutral-600 dark:text-neutral-300' initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
            <Typewriter words={roles} />
          </motion.p>
          <motion.p className='max-w-prose text-neutral-600 dark:text-neutral-300' initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.15}}>
            I build AI training systems, data pipelines, and real time dashboards. I also ship clean web experiences and embedded prototypes.
          </motion.p>
          <div className='flex flex-wrap items-center gap-3 pt-2'>
            <Button asChild className="neu-button-primary"><a href='#projects'><PlayCircle className='mr-2 h-4 w-4' /> See projects</a></Button>
            <Button variant='secondary' onClick={onResume} className="neu-button-secondary"><Download className='mr-2 h-4 w-4' /> Download resume</Button>
            <Button variant='outline' asChild className="neu-button"><a href='mailto:nate.chambers4@gmail.com'><Mail className='mr-2 h-4 w-4' /> Contact</a></Button>
          </div>
          <div className='flex gap-4 pt-2'>
            <a href='https://github.com/nate-chambers' className='neu-button p-3'><Github /></a>
            <a href='https://linkedin.com/in/nate-chambers' className='neu-button p-3'><Linkedin /></a>
            <a href='mailto:nate.chambers4@gmail.com' className='neu-button p-3'><Mail /></a>
          </div>
        </div>
        <motion.div className='md:col-span-2' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}}>
          <Card className='neu-card border-0'>
            <CardHeader><CardTitle className='flex items-center gap-2 text-neutral-900 dark:text-white'><Sparkles className='h-5 w-5' /> Highlights</CardTitle></CardHeader>
            <CardContent className='space-y-3 text-sm text-neutral-600 dark:text-neutral-300'>
              <div>QA lead for training data at scale with 3,000+ engineers.</div>
              <div>Built UV based air monitors deployed in refineries and communities.</div>
              <div>Dockerized secure docs with Google OAuth and NGINX.</div>
              <div>10+ client sites with SEO and analytics.</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

const Projects = () => {
  const [active, setActive] = useState('All')
  const filtered = useMemo(() => active === 'All' ? projects : projects.filter(p => p.category === active), [active])
  
  const handleImageError = (e) => {
    // Fallback to a placeholder if image fails to load
    e.target.style.display = 'none'
    e.target.nextSibling.style.display = 'flex'
  }

  return (
    <section id='projects' className='mx-auto max-w-6xl px-4 py-12'>
      <SectionTitle icon={LaptopMinimal} title='Featured Projects' sub='Filter by area and jump into code or demos' />
      <div className='mb-6 flex flex-wrap items-center gap-2'>
        {categories.map(c => (
          <Button key={c} variant={active === c ? 'default' : 'secondary'} size='sm' onClick={() => setActive(c)} className={active === c ? "neu-button-primary" : "neu-button-secondary"}>
            <Filter className='mr-2 h-4 w-4' /> {c}
          </Button>
        ))}
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        {filtered.map(p => (
          <Card key={p.slug} className='neu-card overflow-hidden hover:neu-glow transition-all duration-300'>
            <div className='relative h-40 w-full'>
              <img 
                src={p.media} 
                alt={p.title}
                className={`h-full w-full object-contain rounded-t-lg ${
                  p.slug === 'web-dev-portfolio' 
                    ? 'bg-[#f8f4e8]' 
                    : 'bg-gray-50 dark:bg-neutral-700'
                }`}
                onError={handleImageError}
              />
              {/* Fallback placeholder if image fails to load */}
              <div className='hidden h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-700 dark:to-neutral-800 rounded-t-lg'>
                <div className='text-center'>
                  <div className='text-4xl mb-2'>📁</div>
                  <div className='text-sm text-gray-500 dark:text-gray-300'>Project Image</div>
                </div>
              </div>
            </div>
            <CardHeader><CardTitle className='text-neutral-900 dark:text-white'>{p.title}</CardTitle></CardHeader>
            <CardContent>
              <p className='text-sm text-neutral-600 dark:text-neutral-300 mb-3'>{p.description}</p>
              <div className='flex flex-wrap gap-2 mb-4'>{p.tags.map(t => <Badge key={t} variant='secondary' className="neu-badge">{t}</Badge>)}</div>
              {p.nda ? (
                <div className='mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg'>
                  <p className='text-xs text-amber-700 dark:text-amber-300'>
                    🔒 This project is under NDA - code and demo links are restricted
                  </p>
                </div>
              ) : (
                <div className='flex gap-3'>
                  {!p.hideCode && (
                    <Button asChild size='sm' className="neu-button-primary"><a href={p.links.repo} target='_blank' rel='noreferrer'><Github className='mr-2 h-4 w-4' /> Code</a></Button>
                  )}
                  <Button asChild size='sm' variant='outline' className="neu-button"><a href={p.links.demo} target='_blank' rel='noreferrer'><ExternalLink className='mr-2 h-4 w-4' /> Demo</a></Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.some(p => p.nda) && (
        <div className='mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
          <p className='text-sm text-blue-700 dark:text-blue-300 text-center'>
            💼 Some projects shown are under NDA agreements and have limited public information available
          </p>
        </div>
      )}
    </section>
  )
}

const Toolbox = () => (
  <section id='toolbox' className='mx-auto max-w-6xl px-4 py-12'>
    <SectionTitle icon={Code2} title='Tech Toolbox' sub='Hover for what I use each tool for' />
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {toolbox.map(t => (
        <Card key={t.name} className='neu-card group hover:neu-glow transition-all duration-300'>
          <CardHeader className='pb-2'><CardTitle className='flex items-center gap-2 text-base text-neutral-900 dark:text-white'>{t.icon} {t.name}</CardTitle></CardHeader>
          <CardContent><p className='text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors'>{t.note}</p></CardContent>
        </Card>
      ))}
    </div>
  </section>
)

const Stats = () => (
  <section className='mx-auto max-w-6xl px-4 py-12'>
    <SectionTitle icon={Gauge} title='Stats' sub='A quick snapshot' />
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
      {statItems.map(s => (
        <Card key={s.label} className="neu-card">
          <CardHeader className='pb-2'><CardTitle className='text-sm text-neutral-600 dark:text-neutral-300'>{s.label}</CardTitle></CardHeader>
          <CardContent><div className='text-3xl font-bold text-neutral-900 dark:text-white'>{s.value}</div></CardContent>
        </Card>
      ))}
    </div>
    <div className='mt-8 grid gap-4 md:grid-cols-2'>
      <Card className="neu-card">
        <CardHeader><CardTitle className="text-neutral-900 dark:text-white">GitHub Activity</CardTitle></CardHeader>
        <CardContent><img alt='GitHub stats' className='w-full rounded' src='https://github-readme-stats.vercel.app/api?username=nate-chambers&show_icons=true' /></CardContent>
      </Card>
      <Card className="neu-card">
        <CardHeader><CardTitle className="text-neutral-900 dark:text-white">Top Languages</CardTitle></CardHeader>
        <CardContent><img alt='Top Languages' className='w-full rounded' src='https://github-readme-stats.vercel.app/api/top-langs/?username=nate-chambers&layout=compact' /></CardContent>
      </Card>
    </div>
  </section>
)

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null)

  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
  }

  const handleCardClick = (post) => {
    setSelectedPost(post)
  }

  return (
    <section id='blog' className='mx-auto max-w-6xl px-4 py-12'>
      <SectionTitle icon={FileText} title='Blog / Insights' sub='Short write ups with code snippets and diagrams' />
      <div className='grid gap-6 md:grid-cols-2'>
        {blogPosts.map((post) => (
          <Card key={post.id} className='neu-card hover:neu-glow transition-all duration-300 cursor-pointer' onClick={() => handleCardClick(post)}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{post.readTime}</div>
              </div>
              <CardTitle className="text-lg text-neutral-900 dark:text-white">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-neutral-600 dark:text-neutral-300 mb-4'>{post.blurb}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant='secondary' className="neu-badge text-xs">{tag}</Badge>
                ))}
              </div>
              <Button 
                variant='outline' 
                size='sm' 
                className="w-full neu-button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardClick(post)
                }}
              >
                Read more
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

const LiveWidget = () => {
  const [input, setInput] = useState('hello world')
  const reversed = useMemo(() => input.split('').reverse().join(''), [input])
  return (
    <div className='flex flex-col gap-3 md:flex-row md:items-center'>
      <Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Type something' className="neu-input" />
      <div className='text-sm text-neutral-600 dark:text-neutral-300'>Output</div>
      <div className='neu-card-inset px-3 py-2 font-mono text-sm text-neutral-900 dark:text-white'>{reversed}</div>
    </div>
  )
}

const LiveCode = () => (
  <section id='live' className='mx-auto max-w-6xl px-4 py-12'>
    <SectionTitle icon={Cpu} title='Try a live snippet' sub='A tiny Python example that reverses text' />
    <Card className="neu-card">
      <CardHeader><CardTitle className="text-neutral-900 dark:text-white">Reverse text</CardTitle></CardHeader>
      <CardContent><LiveWidget /></CardContent>
    </Card>
  </section>
)

const Contact = () => (
  <section id='contact' className='mx-auto max-w-6xl px-4 py-12'>
    <SectionTitle icon={PhoneCall} title='Contact' sub='Reach out for roles, collabs, or freelance work' />
    <div className='grid gap-6 md:grid-cols-2'>
      <Card className="neu-card">
        <CardHeader><CardTitle className="text-neutral-900 dark:text-white">Message me</CardTitle></CardHeader>
        <CardContent>
          <form method='POST' action='https://formspree.io/f/your-id'>
            <div className='grid gap-3'>
              <Input name='name' placeholder='Your name' required className="neu-input" />
              <Input type='email' name='email' placeholder='Your email' required className="neu-input" />
              <Textarea name='message' placeholder='Tell me about the project' rows={5} required className="neu-input" />
              <Button type='submit' className="neu-button-primary">Send</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="neu-card">
        <CardHeader><CardTitle className="text-neutral-900 dark:text-white">Other links</CardTitle></CardHeader>
        <CardContent className='space-y-3'>
          <Button asChild variant='secondary' className='w-full neu-button-secondary'><a href='mailto:nate.chambers4@gmail.com'><Mail className='mr-2 h-4 w-4' /> nate.chambers4@gmail.com</a></Button>
          <Button asChild variant='outline' className='w-full neu-button'><a href='https://linkedin.com/in/nate-chambers' target='_blank' rel='noreferrer'><Linkedin className='mr-2 h-4 w-4' /> LinkedIn</a></Button>
          <Button asChild variant='outline' className='w-full neu-button'><a href='https://github.com/nate-chambers' target='_blank' rel='noreferrer'><Github className='mr-2 h-4 w-4' /> GitHub</a></Button>
        </CardContent>
      </Card>
    </div>
  </section>
)

const Footer = () => (
  <footer className='mx-auto max-w-6xl px-4 py-10'>
    <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-200 dark:border-neutral-700 pt-6 md:flex-row'>
      <div className='text-sm text-neutral-600 dark:text-neutral-300'>© {new Date().getFullYear()} Nate Chambers. All rights reserved.</div>
      <div className='flex items-center gap-3'>
        <a className='neu-button px-3 py-2' href='#'>Privacy</a>
        <a className='neu-button px-3 py-2' href='#'>Terms</a>
      </div>
    </div>
  </footer>
)

export default function App(){
  const { isDark, setIsDark } = useDarkMode()
  const onResume = () => window.open('https://drive.google.com/file/d/1rTwEf7pNRxTr26aRYZSMbZ3GoxV8eNue/view', '_blank')
  return (
    <div className='min-h-screen neu-background'>
      <header className='sticky top-0 z-50 neu-header'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
          <a href='#' className='flex items-center gap-2 font-semibold tracking-tight neu-button px-4 py-2'><Globe className='h-5 w-5' /> NC</a>
          <nav className='hidden items-center gap-6 md:flex'>
            <a className='text-sm neu-button px-3 py-2' href='#projects'>Projects</a>
            <a className='text-sm neu-button px-3 py-2' href='#toolbox'>Toolbox</a>
            <a className='text-sm neu-button px-3 py-2' href='#blog'>Blog</a>
            <a className='text-sm neu-button px-3 py-2' href='#live'>Live</a>
            <a className='text-sm neu-button px-3 py-2' href='#contact'>Contact</a>
          </nav>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='icon' aria-label='Toggle theme' onClick={()=>setIsDark(!isDark)} className="neu-button">
              {isDark ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
            </Button>
            <Button asChild className="neu-button-primary"><a href='mailto:nate.chambers4@gmail.com'><Mail className='mr-2 h-4 w-4' /> Hire me</a></Button>
          </div>
        </div>
      </header>
      <main>
        <Hero onResume={onResume} />
        <Projects />
        <Toolbox />
        <Stats />
        <Blog />
        <LiveCode />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
