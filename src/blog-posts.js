export const blogPosts = [
  {
    id: 'language-ai',
    title: 'LanguageAI - Generate Podcasts From Any Vocabulary List',
    blurb: 'Turn a set of words into a polished, multi-language mini podcast with AI-written scripts, Google TTS audio, caching, and real-time progress.',
    content: `
  # LanguageAI - Generate Podcasts From Any Vocabulary List
  
  I built a web app that turns any vocabulary list into a short, high quality language-learning podcast, complete with AI-written scripts and pro TTS audio.
  
  Live demo: <a href="https://languageai-592821856944.us-central1.run.app/" target="_blank" rel="noopener noreferrer">Cloud Run demo</a>

  ## The Problem
  Vocabulary drills are boring and easy to drop. I wanted a tool that creates engaging, bite-sized audio lessons on demand, while keeping latency low and the UX clean for repeated practice.
  
  ## The Solution
  A Flask app that:
  - Generates a personalized podcast script with ChatGPT
  - Uses Google Cloud Text-to-Speech to synthesize natural audio
  - Streams progress updates and stitches segments into a single MP3
  - Caches audio for repeat vocab so common requests are nearly instant
  - Exposes simple endpoints for automation and debugging
  
  ## Key Technologies
  - **Python 3.8+** for backend logic
  - **Flask** for the web app and endpoints
  - **OpenAI** for script generation
  - **Google Cloud Text-to-Speech** for neural quality audio
  - **pydub** and **FFmpeg** for audio assembly
  - **Simple file cache** for replays and dedupe
  
  ## The Technical Architecture
  1. **Request in**: Client posts vocabulary and target language
  2. **Script generation**: ChatGPT creates a structured lesson with greetings, vocab in context, quick practice, and a wrap up
  3. **Audio synthesis**: Google TTS renders segments, measuring durations to keep pacing tight
  4. **Assembly**: Segments are concatenated to a single MP3 and stored
  5. **Delivery**: The file is served for inline playback or download, with progress updates visible during generation
  
  ## Advanced Features
  - **Multi-voice and language configs** via config.py for fast swaps
  - **Audio caching** to avoid recompute on repeats
  - **Request deduplication** to prevent duplicate work
  - **Progress and debug views** for prompt logs, cache stats, and recent files
  - **Quality control** with adjustable bitrate and speaking rate
  
  ## API Endpoints
  - POST /generate_podcast - main entry point, returns a URL to the generated MP3
  - GET / - UI
  - GET /output_files - lists generated audio
  - GET /cache_stats - cache hit rate and counters
  - POST /cleanup - clears output directory
  - GET /debug_files - shows generation logs and prompts
  
  ## Results
  - End to end generation typically completes in about 10 to 30 seconds for short lessons, depending on model and TTS length
  - High cache hit rate on repeated vocab sets
  - Smooth UX on mobile and desktop with accessible controls
  
  ## The Impact
  Teachers and learners can spin up custom practice in seconds, reuse sets for spaced repetition, and keep everything in one place. The app feels fast, the audio is clear, and the structure keeps attention without feeling robotic.
  
  ## Live Demo
  Deployed to Cloud Run, public UI + endpoints are available.
  
      `,
    date: '2025-08-29',
    tags: ['AI', 'Python', 'Flask', 'OpenAI', 'Google TTS', 'Audio', 'Caching'],
    readTime: '7 min read'
  },  
  {
    id: 'tiktok-automation',
    title: 'How I Automated TikTok Shorts from Reddit Stories',
    blurb: 'Building an automated content pipeline that transforms Reddit stories into engaging TikTok videos with narration and smart captioning.',
    content: `
# How I Automated TikTok Shorts from Reddit Stories

Building an automated content pipeline that transforms Reddit stories into engaging TikTok videos with narration and smart captioning.

## The Problem
Creating viral TikTok content manually is time-consuming and inconsistent. I wanted to automate the entire process from story discovery to video upload, while maintaining the engaging quality that makes content go viral. The manual approach was taking 2-3 hours per video, and I needed a scalable solution.

## The Solution
I built a Python-based pipeline that:
- Scrapes trending Reddit stories using PRAW (Python Reddit API Wrapper)
- Intelligently processes content with smart sentence splitting for optimal caption display
- Generates engaging captions with customizable styling and positioning
- Converts text to speech using Google Cloud Text-to-Speech with neural voices
- Assembles videos with FFmpeg using GPU acceleration (NVENC) with automatic fallback
- Automatically cleans up temporary files to prevent disk clutter
- Creates multi-part videos for longer stories, maintaining viewer engagement

## Key Technologies
- **Python 3.7+** for the main automation logic and content processing
- **PRAW** for Reddit API access and story discovery
- **Google Cloud Text-to-Speech** for natural, human-like voice synthesis
- **FFmpeg** for video editing, caption burning, and assembly
- **libass** for advanced subtitle rendering with precise positioning
- **NVENC** for hardware-accelerated video encoding (with CPU fallback)

## The Technical Architecture
The system works in several stages:
1. **Content Discovery**: Scans target subreddits (like r/stories, r/writingprompts) for posts within specified word count ranges
2. **Smart Text Processing**: Breaks down long sentences into screen-friendly segments (max 15 words) for optimal caption display
3. **TTS Generation**: Creates individual audio files for each text segment, measuring exact durations for perfect synchronization
4. **Video Assembly**: Combines background video, audio, and captions using FFmpeg with customizable styling
5. **Quality Control**: Automatically splits long content into manageable parts (~2 minutes each) for better viewer retention

## Advanced Features
- **Dual Encoding Support**: GPU acceleration with NVENC, automatic fallback to software encoding for maximum compatibility
- **Intelligent Caption Styling**: Customizable fonts, sizes, positions, outlines, and colors through environment variables
- **Automatic Cleanup**: Removes temporary files after each render to prevent disk space issues
- **Multi-part Generation**: Automatically creates series for longer stories, maintaining narrative flow
- **Cross-platform Compatibility**: Works on Windows, macOS, and Linux with minimal configuration

## Results
- 50+ videos generated automatically with consistent quality
- 10x faster content creation (from 2-3 hours to 15-20 minutes per video)
- Consistent quality and timing across all generated content
- Multi-platform distribution ready for TikTok, YouTube Shorts, and Instagram Reels
- Scalable architecture that can handle multiple subreddits and content types

## The Impact
The system now runs autonomously, creating engaging content while I focus on other projects. Each video maintains professional quality with:
- Perfectly synchronized audio and captions
- Engaging visual styling that matches platform requirements
- Consistent branding and formatting
- Optimized length for maximum viewer retention

## See It In Action
Check out the automated content on TikTok: <a href="https://www.tiktok.com/@teddyreddit.stories" target="_blank" rel="noopener noreferrer">@teddyreddit.stories</a>

    `,
    date: '2024-01-15',
    tags: ['Automation', 'Python', 'FFmpeg', 'Content Creation'],
    readTime: '8 min read'
  },
  {
    id: 'mkdocs-oauth2',
    title: 'Securing MkDocs with OAuth2 Proxy and NGINX',
    blurb: 'End to end setup with Docker and Cloudflare.',
    content: `
# Securing MkDocs with OAuth2 Proxy and NGINX

A complete guide to deploying secure documentation behind enterprise-grade authentication.

## The Challenge
Our internal documentation needed to be:
- Accessible to the team
- Secure from external access
- Easy to maintain and update
- Integrated with existing SSO

## The Architecture
I implemented a multi-layered security approach:
1. **MkDocs** for beautiful documentation
2. **OAuth2 Proxy** for Google OAuth integration
3. **NGINX** as a reverse proxy and load balancer
4. **Docker** for containerized deployment
5. **Cloudflare** for additional security and CDN

## Implementation Details
- OAuth2 Proxy configured with Google Workspace
- NGINX handles SSL termination and routing
- Docker Compose for easy deployment
- Automated SSL certificate renewal
- Rate limiting and DDoS protection

## Benefits
- Single sign-on with Google accounts
- Enterprise-grade security
- Easy maintenance and updates
- Scalable architecture
- Cost-effective hosting

This setup has been running in production for 6+ months with zero security incidents.
    `,
    date: '2024-01-10',
    tags: ['DevOps', 'Security', 'Docker', 'NGINX'],
    readTime: '8 min read'
  },
  {
    id: 'environmental-sensors',
    title: 'Building environmental sensor networks at scale',
    blurb: 'Collecting, processing, and visualizing air quality data from embedded sensors.',
    content: `
# Building environmental sensor networks at scale

Deploying IoT sensors across refineries and communities to monitor air quality in real-time.

## The Mission
Monitor air quality across multiple locations to:
- Protect worker safety in industrial settings
- Track environmental impact on communities
- Provide real-time alerts for hazardous conditions
- Generate compliance reports for regulators

## Technical Implementation
The system consists of:
- **UV-based air monitors** with custom firmware
- **LoRaWAN** for long-range wireless communication
- **Python data pipeline** for processing and validation
- **MySQL database** for time-series data storage
- **Grafana dashboards** for real-time visualization
- **REST API** for external integrations

## Key Features
- Real-time data collection every 30 seconds
- Automatic anomaly detection and flagging
- Mobile-responsive dashboards
- Automated alerting system
- Historical data analysis tools

## Impact
- 15+ sensor deployments across 3 states
- 99.9% uptime over 18 months
- Real-time monitoring of 50+ air quality parameters
- Improved safety response times by 80%

This project demonstrates the power of IoT, data engineering, and real-time visualization working together.
    `,
    date: '2024-01-05',
    tags: ['IoT', 'Data', 'Python', 'Grafana'],
    readTime: '6 min read'
  }
]
