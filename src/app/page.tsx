'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Menu, X } from 'lucide-react';
import myBrainImage from '@/images/image1.jpg';

import ImmersiveHomepage from '../components/ImmersiveHomepage'; // Adjust the import path as needed



// =========== UTILITY HOOKS ===========

const useInView = (ref: React.RefObject<HTMLElement>) => {
    const [isInView, setIsInView] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    controls.start("visible");
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, controls]);

    return [isInView, controls];
};

// =========== STYLED COMPONENTS & ANIMATIONS ===========

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const Section = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, controls] = useInView(ref);
    return (
        <motion.section 
            id={id}
            ref={ref}
            className="py-24"
            initial="hidden"
            animate={controls}
            variants={sectionVariants}
        >
            {children}
        </motion.section>
    );
};

// =========== UI COMPONENTS ===========

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: { x: number, y: number, vx: number, vy: number }[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      for(let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
        });
      }
    };
    resizeCanvas();

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

// =========== PAGE SECTIONS ===========

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <motion.header 
            className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center text-gray-300">
                <a href="#" className="font-bold text-lg tracking-wider hover:text-white transition-colors">PV ABHIRAM</a>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                    <a href="#timeline" className="hover:text-white transition-colors">Timeline</a>
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav 
                        className="md:hidden bg-black/70 backdrop-blur-md"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={mobileMenuVariants}
                    >
                        <div className="flex flex-col items-center space-y-4 py-4">
                            <a href="#projects" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Projects</a>
                            <a href="#timeline" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Timeline</a>
                            <a href="#about" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>About</a>
                            <a href="#contact" className="hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Contact</a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

const Hero = () => (
  // The section remains the container. It centers its children vertically and horizontally.
  <section className="relative min-h-screen flex items-center justify-center py-20 md:py-0 overflow-hidden">
    
    {/* --- Video Background --- */}
    {/* This container holds the video and the dark overlay. */}
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/bg3_3.mp4" 
        // CRITICAL FIX: These classes ensure the video covers the entire area responsively.
        className="w-full h-full object-cover"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
    
    {/* --- Hero Content --- */}
    {/* This single container holds all the text content. It sits on top of the video background. */}
    <div className="relative z-10 container mx-auto px-6 text-center">
      
      {/* The image composite has been completely removed for a cleaner layout. */}
      {/* The text content is now centered and constrained in width for readability. */}
      <div className="max-w-2xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Hello World
        </motion.h1>
        <motion.p
          className="text-gray-400 text-lg md:text-xl mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          I'm a freelance ML Engineer & Consultant Analyst, .
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8"
        >
          <a
            href="#contact"
            className="inline-block bg-gray-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Contact Me For A Chat
          </a>
        </motion.div>
      </div>

    </div>
  </section>
);


const Projects = () => {
    const projects = [
        { title: "Neural Style Transfer", description: "AI-powered artistic style transformation using deep learning.", tech: ["TensorFlow", "Python", "React"] },
        { title: "Sentiment Analysis API", description: "Real-time emotion detection from text using NLP and BERT.", tech: ["BERT", "FastAPI", "Docker"] },
        { title: "Real-time Object Detection", description: "A computer vision app for object detection and classification.", tech: ["YOLO", "OpenCV", "JavaScript"] },
        { title: "Generative Art System", description: "Creating unique visual art using Generative Adversarial Networks (GANs).", tech: ["PyTorch", "GANs", "Next.js"] }
    ];

    return (
        <Section id="projects">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-gray-200">Projects</h2>
                <div className="space-y-16">
                    {projects.map((project, index) => (
                        <motion.div 
                          key={project.title} 
                          className="group"
                        >
                            <a href="#" className="block">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                                    <div>
                                        <span className="text-gray-500 text-sm">0{index + 1}</span>
                                        <h3 className="text-2xl md:text-4xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300 mt-2">{project.title}</h3>
                                    </div>
                                    <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors duration-300 transform -rotate-45 group-hover:rotate-0" size={32}/>
                                </div>
                                <p className="text-gray-400 mt-4 max-w-lg">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tech.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">{tech}</span>
                                    ))}
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const Timeline = () => {
    const timelineEvents = [
        { year: "2023 - Present", role: "Senior ML Engineer", company: "Innovate AI", description: "Leading the development of a next-generation recommendation engine and mentoring junior engineers." },
        { year: "2020 - 2023", role: "Machine Learning Engineer", company: "Data Driven Inc.", description: "Designed and deployed several computer vision models for automated quality inspection in manufacturing." },
        { year: "2018 - 2020", role: "Software Developer", company: "Tech Solutions Co.", description: "Developed full-stack web applications and APIs, gaining a strong foundation in software engineering principles." },
        { year: "2018", role: "M.S. in Computer Science", company: "University of Technology", description: "Specialized in Artificial Intelligence and Machine Learning, graduating with honors." },
    ];

    return (
        <Section id="timeline">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-gray-200">Timeline</h2>
                <div className="relative border-l-2 border-gray-700">
                    {timelineEvents.map((event, index) => (
                        <div key={index} className="mb-12 ml-6">
                            <span className="absolute flex items-center justify-center w-3 h-3 bg-gray-500 rounded-full -left-1.5 ring-4 ring-gray-800"></span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold text-white">
                                {event.role} <span className="text-gray-500 font-normal ml-2">@ {event.company}</span>
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-500">{event.year}</time>
                            <p className="text-base font-normal text-gray-400">{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const About = () => (
    <Section id="about">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-200">About Me</h2>
            <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                I'm a Machine Learning Engineer with a passion for creative development. My expertise lies in building intelligent applications that are not only functional but also intuitive and engaging. I have a strong background in deep learning, natural language processing, and computer vision, and I love bridging the gap between complex algorithms and beautiful user interfaces. I'm always eager to explore new technologies and push the boundaries of what's possible in the digital realm.
            </p>
        </div>
    </Section>
);

const Contact = () => (
    <Section id="contact">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-6">Let's Connect</h2>
            <p className="text-gray-400 text-lg mb-8">Ready to build something amazing together?</p>
            <a 
              href="mailto:alex.johnson@example.com"
              className="inline-block text-2xl md:text-3xl font-semibold text-gray-300 hover:text-white transition-colors duration-300 border-b border-gray-600 hover:border-white pb-2"
            >
              alex.johnson@example.com
            </a>
            <div className="flex justify-center space-x-6 mt-12">
                {[
                    { Icon: Github, href: "#" },
                    { Icon: Linkedin, href: "#" },
                    { Icon: Mail, href: "mailto:alex.johnson@example.com" }
                ].map(({ Icon, href }, index) => (
                    <a key={index} href={href} className="text-gray-500 hover:text-white transition-colors duration-300">
                        <Icon size={24} />
                    </a>
                ))}
            </div>
        </div>
    </Section>
);

const Footer = () => (
    <footer className="text-center py-8 text-gray-600 text-sm">
        <p>&copy; 2025 Alex Johnson. Inspired by Julien Heuer.</p>
    </footer>
);


// =========== MAIN PAGE COMPONENT (MODIFIED) ===========
function PortfolioContent() {
  return (
    <div className="bg-black text-gray-300 min-h-screen">
        {/* Replace BackgroundAnimation with BackgroundVideo */}        
        <div className="relative z-10">
            <Navbar />
            <main>
                <Hero />
                <Projects />
                <Timeline />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    </div>
  );
}
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="loader">
          <ImmersiveHomepage onLoadingComplete={() => setIsLoading(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <PortfolioContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}