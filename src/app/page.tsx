'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Menu, X } from 'lucide-react';
import Typewriter from 'typewriter-effect';

import ImmersiveHomepage from '../components/ImmersiveHomepage'; // Adjust the import path as needed

// =========== UTILITY HOOKS ===========

// Fixed hook with proper ref handling
const useInView = <T extends HTMLElement>(ref: React.RefObject<T | null>) => {
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

        // Copy ref.current to avoid stale closure
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, controls]);

    return [isInView, controls] as const;
};

// =========== STYLED COMPONENTS & ANIMATIONS ===========

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const Section = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const ref = useRef<HTMLDivElement | null>(null);
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

// =========== PAGE SECTIONS ===========

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

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
                <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="font-bold text-lg tracking-wider hover:text-white transition-colors">PV ABHIRAM</a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="hover:text-white transition-colors">Projects</a>
                    <a href="#timeline" onClick={(e) => handleScroll(e, 'timeline')} className="hover:text-white transition-colors">Timeline</a>
                    <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-white transition-colors">About</a>
                    <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
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
                            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="hover:text-white transition-colors">Projects</a>
                            <a href="#timeline" onClick={(e) => handleScroll(e, 'timeline')} className="hover:text-white transition-colors">Timeline</a>
                            <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-white transition-colors">About</a>
                            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 md:py-0 overflow-hidden">

    {/* --- Video Background --- */}
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/bg3_3.mp4" // You might want to update this video to better match your brand
        className="w-full h-full object-cover brightness-125"
      />
      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* --- Hero Content --- */}
    <div className="relative z-10 container mx-auto px-6 text-center">

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typewriter
            options={{
              strings: [
                "Transforming Data into Intelligence",
                "Building ML Solutions That Drive Results",
                "Data Science for Real-World Impact"
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }}
          />
        </motion.div>
        <motion.p
          className="text-gray-400 text-lg md:text-xl mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          I'm PV Abhiram, a Data Analyst and Machine Learning enthusiast passionate about transforming complex data into actionable insights. I help businesses leverage AI to solve real-world problems and drive growth through intelligent automation.
          <br></br> <br></br>
          I specialize in end-to-end ML solutions - from data preprocessing and model development to deployment and optimization. Whether you need predictive analytics, computer vision solutions, or data-driven strategies, I deliver scalable results tailored to your business needs.
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
            Let&apos;s Discuss Your Project
          </a>
        </motion.div>
      </div>

    </div>
  </section>
);

const Projects = () => {
    const projects = [
        { title: "RickBot", description: "Engineered an AI-powered Discord chatbot using Microsoft DialoGPT, fine-tuned on dialogues from 3 seasons of Rick and Morty (approximately 5000+ lines). Achieved high character resemblance with 90% of responses matching Rick's signature style and wit.", tech: ["Microsoft DialoGPT", "Python", "Discord.py"] },
        { title: "Stock Predictor Application", description: "Developed a feature-rich Django-based Tesla stock prediction app utilizing polynomial regression, achieving 95% accuracy in forecasts. Implemented multiple analytical tools and visualizations to enhance user experience and decision-making capabilities.", tech: ["Django", "Python", "Scikit-learn", "Polynomial Regression"] },
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
        { year: "July 2024 - Ongoing", role: "Associate Data Analyst", company: "Novartis Healthcare", description: "Streamlining digital Veeva vault administration for the French medical market and working on CRM activities for the Novartis USA Business using SQL and Excel." },
        { year: "Jan 2024 - July 2024", role: "Data Science Intern", company: "Vivriti Capital Pvt. Ltd.", description: "Automated analysis of PDF stock statements using Computer Vision, developed an ML-powered KYC solution, and created a Power BI application for data visualization and credit rating." },
        { year: "Dec 2022 - July 2023", role: "R&D Intern", company: "Samsung R&D Institute India", description: "Designed API systems for Bixby capsule for language auto-detection and translation, and handled the integration of NLLB API. Published a research paper in Cornell University's database - arXiV." },
        { year: "2020 - 2024", role: "BTech CSE with AI and ML", company: "Vellore Institute of Technology, Chennai", description: "CGPA: 8.78" },
        { year: "2018 - 2020", role: "12th Grade", company: "FIITJEE Junior College", description: "Percentage: 94.6" },
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
                I'm a passionate and driven individual with a strong foundation in AI and Machine Learning. My experience spans across data analysis, computer vision, and natural language processing. I enjoy building intelligent applications that are not only functional but also intuitive and engaging. I have a strong background in deep learning, and I love bridging the gap between complex algorithms and real-world applications. I'm always eager to explore new technologies and push the boundaries of what's possible in the digital realm.
            </p>
        </div>
    </Section>
);

const Contact = () => (
    <Section id="contact">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-6">Let&apos;s Connect</h2>
            <p className="text-gray-400 text-lg mb-8">Ready to build something amazing together?</p>
            <a
              href="mailto:abhiramp428@gmail.com"
              className="inline-block text-2xl md:text-3xl font-semibold text-gray-300 hover:text-white transition-colors duration-300 border-b border-gray-600 hover:border-white pb-2"
            >
              abhiramp428@gmail.com
            </a>
            <div className="flex justify-center space-x-6 mt-12">
                {[
                    { Icon: Github, href: "#" }, // Add your GitHub link here
                    { Icon: Linkedin, href: "#" }, // Add your LinkedIn link here
                    { Icon: Mail, href: "mailto:abhiramp428@gmail.com" }
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
        <p>&copy; 2025 PV Abhiram.</p>
    </footer>
);

// =========== MAIN PAGE COMPONENT ===========
function PortfolioContent() {
  return (
    <div className="bg-black text-gray-300 min-h-screen">
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