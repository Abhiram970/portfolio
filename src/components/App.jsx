import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowUpRight, Menu, X, BookOpen, Download, FileText, MonitorPlay } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    const appRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle Navbar Morphing Logic
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(
                '.hero-reveal',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );

            // Projects Sub-elements hover (Magnetic effect CSS class covers hover, we trigger fade up here)
            gsap.utils.toArray('.project-card').forEach((card) => {
                gsap.fromTo(card,
                    { y: 40, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                    }
                );
            });

            // Timeline Nodes Fade-up
            gsap.utils.toArray('.timeline-node').forEach((node) => {
                gsap.fromTo(node,
                    { x: -20, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: node,
                            start: 'top 85%',
                        },
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                    }
                );
            });

            // Skills Fade-up
            gsap.fromTo('.skills-container',
                { opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.skills-container',
                        start: 'top 85%',
                    },
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                }
            );
        }, appRef);

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    // Navigation Links
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Projects', href: '#projects' },
        { name: 'Timeline', href: '#timeline' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    const projects = [
        {
            title: "RickBot",
            description: "Engineered an AI-powered Discord chatbot using Microsoft DialoGPT, fine-tuned on dialogues from 3 seasons of Rick and Morty (approximately 5000+ lines). Achieved high character resemblance with 90% of responses matching Rick's signature style and wit.",
            tech: ["Microsoft DialoGPT", "Python", "Discord.py"],
            links: { github: "https://github.com/Abhiram970/RickBot", pdf: null, demo: null }
        },
        {
            title: "Stock Predictor Application",
            description: "Developed a feature-rich Django-based Tesla stock prediction app utilizing polynomial regression, achieving 95% accuracy in forecasts. Implemented multiple analytical tools and visualizations to enhance user experience and decision-making capabilities.",
            tech: ["Django", "Python", "Scikit-learn", "Polynomial Regression"],
            links: { github: "https://github.com/Abhiram970/Stock-Predicton-Website", pdf: null, demo: null }
        },
        {
            title: "Bixby Language Translation Capsule",
            description: "Designed API systems for a Bixby capsule capable of auto-detecting and translating over 200 languages with 98% accuracy. Handled the integration of the NLLB API, hosted using Docker and Hugging Face. Published a research paper on the findings in Cornell University's arXiV database.",
            tech: ["Bixby", "NLLB API", "Docker", "Hugging Face"],
            links: { github: null, pdf: "https://arxiv.org/abs/2403.05982", demo: null }
        },
        {
            title: "Elevator Conditioning Monitoring",
            description: "Addressed the challenge of proactive elevator maintenance by developing a condition monitoring system. This system utilizes various sensors to provide real-time insights into elevator health, mitigating unexpected failures, enhancing safety, and optimizing maintenance operations.",
            tech: ["Sensor Integration", "Real-time Data Processing", "IoT"],
            links: { github: "https://github.com/Abhiram970/Elevator-Condition-Monitoring", pdf: null, demo: null }
        },
        {
            title: "KYC Detection Mechanism",
            description: "Developed a comprehensive automated Know Your Customer (KYC) verification system specifically designed for the Indian market, leveraging advanced computer vision and data matching technologies to streamline customer onboarding processes while ensuring regulatory compliance.",
            tech: ["Deep Learning", "Computer Vision"],
            links: { github: null, pdf: null, demo: null }
        },
        {
            title: "Tracking Field Employee Movement - TFEM",
            description: "This solution is a employee tracker that currently suggests optimum distance and time required for the employee to travel from source to the destinations. It is developed using Django Framework.",
            tech: ["Google Map API", "Django Framework"],
            links: { github: "https://github.com/Abhiram970/Ecell_Hackathon", pdf: null, demo: null }
        }
    ];

    const timeline = [
        {
            year: "July 2024 - Ongoing",
            title: "Associate Data Analyst",
            institution: "Novartis Healthcare",
            description: "Streamlining digital Veeva vault administration for Novartis France and working on CRM activities and Generative AI projects for Novartis USA."
        },
        {
            year: "Jan 2024 - July 2024",
            title: "Data Science Intern",
            institution: "Vivriti Capital Pvt. Ltd.",
            description: "Worked on cool projects based on Generative AI , Data Mining , NLP and Computer Vision. Lots of financial knowledge and lessons gained on Project Management."
        },
        {
            year: "Dec 2022 - July 2023",
            title: "R&D Intern",
            institution: "Samsung R&D Institute India",
            description: "Designed API systems for Bixby capsule for language auto-detection and translation, and handled the integration of NLLB API. Published a research paper in Cornell University's database - arXiV."
        },
        {
            year: "2020 - 2024",
            title: "BTech CSE with AI and ML",
            institution: "Vellore Institute of Technology, Chennai",
            description: "Did my undergraduate at VIT Chennai in the field of AI and worked on innovative projects and won 2 hackathons, graduated with a 8.8 GPA"
        },
        {
            year: "2018 - 2020",
            title: "12th Grade",
            institution: "FIITJEE Junior College",
            description: "Nothing much to say , just studied Math,Physics and Chemistry."
        }
    ];

    return (
        <div
            ref={appRef}
            className="bg-[#0A0A0C] text-[#F4F4F6] min-h-screen font-sans selection:bg-[#7B8C7A]/30 selection:text-[#F4F4F6]"
        >
            {/* Global CSS Noise Overlay */}
            <svg
                className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-30 mix-blend-overlay"
                xmlns="http://www.w3.org/2000/svg"
            >
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.03" />
            </svg>

            {/* A. NAVBAR — "The Minimalist Anchor" */}
            <nav
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
                    ? 'bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/5 py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    <a href="#home" className="font-serif text-2xl tracking-wide text-[#F4F4F6]">
                        PV ABHIRAM
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[15px] font-medium text-[#8A8A93] hover:text-[#7B8C7A] transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#resume"
                            className="px-5 py-2 text-[15px] font-medium text-[#7B8C7A] border border-[#7B8C7A]/50 rounded-full hover:bg-[#7B8C7A]/10 transition-colors duration-300 flex items-center gap-2"
                        >
                            Resume <Download size={16} />
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-[#F4F4F6]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#141418] border-b border-white/5 py-6 px-6 flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-[#8A8A93] hover:text-[#7B8C7A] transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            <main>
                {/* B. HERO SECTION — "The Opening Statement" */}
                <section
                    id="home"
                    className="relative min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12"
                >
                    <div className="max-w-4xl pt-16">
                        <h1 className="hero-reveal font-serif text-6xl md:text-8xl lg:text-9xl leading-[1.05] tracking-tight text-[#F4F4F6] mb-6">
                            PV <br className="hidden md:block" /> Abhiram
                        </h1>
                        <p className="hero-reveal font-sans text-sm md:text-base uppercase tracking-[0.2em] text-[#8A8A93] mb-8 font-semibold">
                            Data Analyst & Machine Learning Enthusiast
                        </p>
                        <p className="hero-reveal font-sans text-lg md:text-xl text-[#F4F4F6] leading-[1.6] max-w-2xl mb-12">
                            Passionate about transforming complex data into actionable insights.
                            Leveraging AI to solve real-world problems and drive growth through intelligent automation.
                        </p>
                        <div className="hero-reveal">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-3 bg-[#141418] border border-white/10 hover:border-[#7B8C7A]/50 hover:bg-[#141418]/80 text-[#F4F4F6] px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] origin-left magnetic-ease group"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                            >
                                View Research & Projects
                                <ArrowUpRight size={20} className="text-[#8A8A93] group-hover:text-[#7B8C7A] transition-colors" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* C. PROJECTS & PUBLICATIONS — "The Archive" */}
                <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-16">
                        <h2 className="font-serif text-4xl md:text-6xl text-[#F4F4F6] mb-4">The Archive</h2>
                        <div className="w-16 h-[1px] bg-[#7B8C7A]/50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, idx) => (
                            <div
                                key={idx}
                                className="project-card bg-[#141418] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col h-full transition-all duration-500 hover:border-white/10 hover:-translate-y-1 group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="font-serif text-2xl md:text-3xl text-[#F4F4F6] leading-tight pr-6">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-3 text-[#8A8A93]">
                                        {project.links.github && (
                                            <a href={project.links.github} className="hover:text-[#7B8C7A] transition-colors" aria-label="Github Repo">
                                                <Github size={20} strokeWidth={1.5} />
                                            </a>
                                        )}
                                        {project.links.pdf && (
                                            <a href={project.links.pdf} className="hover:text-[#7B8C7A] transition-colors" aria-label="Read Paper">
                                                <FileText size={20} strokeWidth={1.5} />
                                            </a>
                                        )}
                                        {project.links.demo && (
                                            <a href={project.links.demo} className="hover:text-[#7B8C7A] transition-colors" aria-label="Live Demo">
                                                <MonitorPlay size={20} strokeWidth={1.5} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="font-sans text-[16px] leading-[1.6] text-[#8A8A93] mb-10 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="font-mono text-[12px] bg-white/5 text-[#F4F4F6] px-3 py-1 rounded-md"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* D. TIMELINE — "The Academic Journey" */}
                <section id="timeline" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-20">
                        <h2 className="font-serif text-4xl md:text-6xl text-[#F4F4F6] mb-4">Academic Journey</h2>
                        <div className="w-16 h-[1px] bg-[#7B8C7A]/50"></div>
                    </div>

                    <div className="relative border-l border-white/10 ml-3 md:ml-4 py-4 space-y-16">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="timeline-node relative pl-10 md:pl-16">
                                {/* Timeline Dot */}
                                <div className="absolute left-[-5.5px] top-1.5 w-3 h-3 bg-[#0A0A0C] border border-[#7B8C7A] rounded-full"></div>

                                <div className="font-mono text-sm tracking-wider text-[#7B8C7A] mb-2">{item.year}</div>
                                <h3 className="font-serif text-2xl md:text-3xl text-[#F4F4F6] mb-2">{item.title}</h3>
                                <h4 className="font-sans text-base text-[#F4F4F6] font-medium mb-4">{item.institution}</h4>
                                <p className="font-sans text-base leading-[1.6] text-[#8A8A93] max-w-3xl">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* E. SKILLS — "The Technical Index" */}
                <section id="skills" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10 bg-[#141418]/50 border-y border-white/5 my-12">
                    <div className="skills-container">
                        <div className="mb-16">
                            <h2 className="font-serif text-4xl md:text-5xl text-[#F4F4F6] mb-4">The Technical Index</h2>
                            <p className="font-sans text-[#8A8A93] text-lg">Core competencies and specializations.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                            {/* Category 1 */}
                            <div>
                                <h3 className="font-sans font-semibold text-sm uppercase tracking-widest text-[#F4F4F6] mb-6 pb-4 border-b border-white/10">Languages</h3>
                                <ul className="space-y-4 font-mono text-[14px] text-[#8A8A93]">
                                    <li>Python</li>
                                    <li>C++</li>
                                    <li>JavaScript</li>
                                    <li>HTML5</li>
                                    <li>CSS</li>
                                </ul>
                            </div>

                            {/* Category 2 */}
                            <div>
                                <h3 className="font-sans font-semibold text-sm uppercase tracking-widest text-[#F4F4F6] mb-6 pb-4 border-b border-white/10">Frameworks & Technologies</h3>
                                <ul className="space-y-4 font-mono text-[14px] text-[#8A8A93]">
                                    <li>Node.js / Django</li>
                                    <li>Bootstrap / Flask</li>
                                    <li>Tensorflow / Scikit-learn</li>
                                    <li>PowerBI / Tableau</li>
                                    <li>Salesforce / Snowflake</li>
                                    <li>Alteryx</li>
                                </ul>
                            </div>

                            {/* Category 3 */}
                            <div>
                                <h3 className="font-sans font-semibold text-sm uppercase tracking-widest text-[#F4F4F6] mb-6 pb-4 border-b border-white/10">Databases</h3>
                                <ul className="space-y-4 font-mono text-[14px] text-[#8A8A93]">
                                    <li>MySQL</li>
                                    <li>PostgreSQL</li>
                                    <li>DataIKU DSS</li>
                                </ul>
                            </div>

                            {/* Category 4 */}
                            <div>
                                <h3 className="font-sans font-semibold text-sm uppercase tracking-widest text-[#F4F4F6] mb-6 pb-4 border-b border-white/10">Technical Skills</h3>
                                <ul className="space-y-4 font-mono text-[14px] text-[#8A8A93]">
                                    <li>Machine Learning</li>
                                    <li>Deep Learning</li>
                                    <li>Data Structures & Algos</li>
                                    <li>Computer Architecture</li>
                                    <li>Operating Systems</li>
                                    <li>Networking / OOPS</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* F. CONTACT & FOOTER — "The Sign-Off" */}
                <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 bg-[#141418] p-10 md:p-16 rounded-3xl border border-white/5">
                        <div className="max-w-xl">
                            <h2 className="font-serif text-5xl md:text-6xl text-[#F4F4F6] mb-6">Let's Collaborate.</h2>
                            <p className="font-sans text-lg text-[#8A8A93] leading-[1.6] mb-12">
                                Currently open for research collaborations and engineering roles. If you're building
                                robust perception systems or exploring new frontiers in deep learning, drop me a line.
                            </p>

                            <div className="flex flex-col gap-6 font-mono text-[14px]">
                                <a href="mailto:hello@example.com" className="flex items-center gap-4 text-[#F4F4F6] hover:text-[#7B8C7A] transition-colors group w-max">
                                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#7B8C7A]/10 transition-colors">
                                        <Mail size={16} />
                                    </span>
                                    abhiramp428@gmail.com
                                </a>
                                <div className="flex items-center gap-4 text-[#F4F4F6] group w-max">
                                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#7B8C7A]/10 transition-colors">
                                        <BookOpen size={16} />
                                    </span>
                                    Hyderabad, IN
                                </div>
                            </div>
                        </div>

                        <form className="w-full md:w-[400px] flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-transparent border-b border-white/10 py-3 px-2 text-[#F4F4F6] font-sans placeholder-[#8A8A93]/50 focus:outline-none focus:border-[#7B8C7A] transition-colors"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-b border-white/10 py-3 px-2 text-[#F4F4F6] font-sans placeholder-[#8A8A93]/50 focus:outline-none focus:border-[#7B8C7A] transition-colors"
                                required
                            />
                            <textarea
                                placeholder="Message"
                                rows="3"
                                className="bg-transparent border-b border-white/10 py-3 px-2 text-[#F4F4F6] font-sans placeholder-[#8A8A93]/50 focus:outline-none focus:border-[#7B8C7A] transition-colors resize-none"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="mt-6 bg-[#F4F4F6] text-[#0A0A0C] font-semibold py-4 rounded-xl hover:bg-[#7B8C7A] hover:text-white transition-all duration-300 font-sans tracking-wide"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </div>

                    <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="font-mono text-[12px] text-[#8A8A93]">
                            Designed with precision. © 2026 PV Abhiram.
                        </p>
                        <div className="flex gap-6">
                            <a href="https://github.com/Abhiram970" className="text-[#8A8A93] hover:text-[#7B8C7A] transition-colors" aria-label="Github">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/pvabhiram/" className="text-[#8A8A93] hover:text-[#7B8C7A] transition-colors" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </footer>
                </section>
            </main>
        </div>
    );
}
