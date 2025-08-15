export const blogPosts = [
  {
    id: 'tiktok-automation',
    title: 'How I automated TikTok shorts from Reddit stories',
    blurb: 'Scraping, caption timing, TTS, and assembly with FFmpeg.',
    content: `
# How I automated TikTok shorts from Reddit stories

Building an automated content pipeline that transforms Reddit stories into engaging TikTok videos.

## The Problem
Creating viral TikTok content manually is time-consuming and inconsistent. I wanted to automate the entire process from story discovery to video upload.

## The Solution
I built a Python-based pipeline that:
- Scrapes trending Reddit stories using PRAW
- Generates engaging captions with GPT-3
- Converts text to speech using Google TTS
- Assembles videos with FFmpeg
- Schedules uploads across platforms

## Key Technologies
- **Python** for the main automation logic
- **PRAW** for Reddit API access
- **OpenAI GPT-3** for caption generation
- **Google TTS** for natural voice synthesis
- **FFmpeg** for video editing and assembly
- **Docker** for consistent deployment

## Results
- 50+ videos generated automatically
- 10x faster content creation
- Consistent quality and timing
- Multi-platform distribution

The system now runs autonomously, creating engaging content while I focus on other projects.
    `,
    date: '2024-01-15',
    tags: ['AI', 'Automation', 'Python', 'FFmpeg'],
    readTime: '5 min read'
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
