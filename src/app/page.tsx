'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Menu, X } from 'lucide-react';
import Typewriter from 'typewriter-effect';

import ImmersiveHomepage from '../components/ImmersiveHomepage'; // Adjust the import path as needed
import { title } from 'process';

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
                    <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="hover:text-white transition-colors">Skills</a>
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
                            <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="hover:text-white transition-colors">Skills</a>
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
          I&apos;m PV Abhiram, a Data Analyst and Machine Learning enthusiast passionate about transforming complex data into actionable insights. I leverage AI to solve real-world problems and drive growth through intelligent automation.
          <br></br> <br></br>
          I specialize in end-to-end ML solutions - from data preprocessing and model development to deployment and optimization. Whether you need predictive analytics, computer vision solutions, or data-driven strategies, I deliver scalable results tailored to your needs.
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
        {
            title: "RickBot",
            description: "Engineered an AI-powered Discord chatbot using Microsoft DialoGPT, fine-tuned on dialogues from 3 seasons of Rick and Morty (approximately 5000+ lines). Achieved high character resemblance with 90% of responses matching Rick's signature style and wit.",
            tech: ["Microsoft DialoGPT", "Python", "Discord.py"],
            link: "https://github.com/Abhiram970/RickBot"
        },
        {
            title: "Stock Predictor Application",
            description: "Developed a feature-rich Django-based Tesla stock prediction app utilizing polynomial regression, achieving 95% accuracy in forecasts. Implemented multiple analytical tools and visualizations to enhance user experience and decision-making capabilities.",
            tech: ["Django", "Python", "Scikit-learn", "Polynomial Regression"],
            link: "https://github.com/Abhiram970/Stock-Predicton-Website"
        },
        {
            title: "Bixby Language Translation Capsule",
            description: "Designed API systems for a Bixby capsule capable of auto-detecting and translating over 200 languages with 98% accuracy. Handled the integration of the NLLB API, hosted using Docker and Hugging Face. Published a research paper on the findings in Cornell University's arXiV database.",
            tech: ["Bixby", "NLLB API", "Docker", "Hugging Face"],
            link: "https://arxiv.org/abs/2403.05982"
        },
        {
            title: "Elevator Conditioning Monitoring",
            description: "Addressed the challenge of proactive elevator maintenance by developing a condition monitoring system. This system utilizes various sensors to provide real-time insights into elevator health, mitigating unexpected failures, enhancing safety, and optimizing maintenance operations.",
            tech: ["Sensor Integration", "Real-time Data Processing", "IoT"],
            link: "https://github.com/Abhiram970/Elevator-Condition-Monitoring"
        },
        {
            title: "KYC Detection Mechanism",
            description: "Developed a comprehensive automated Know Your Customer (KYC) verification system specifically designed for the Indian market, leveraging advanced computer vision and data matching technologies to streamline customer onboarding processes while ensuring regulatory compliance.",
            tech: ["Deep Learning","Computer Vision"],
            link: "#"
        },
        {
            title: "Tracking Field Employee Movement - TFEM",
            description: "This solution is a employee tracker that currently suggests optimum distance and time required for the employee to travel from source to the destinations. It is developed using Django Framework.",
            tech: ["Google Map API","Django Framework"],
            link: "https://github.com/Abhiram970/Ecell_Hackathon"
        }
    ];

    const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
        const hasLink = project.link && project.link !== "#";
        const Wrapper = hasLink ? 'a' : 'div';

        return (
            <motion.div
                className="group flex flex-col"
                variants={sectionVariants}
            >
                <Wrapper
                    href={hasLink ? project.link : undefined}
                    target={hasLink ? "_blank" : undefined}
                    rel={hasLink ? "noopener noreferrer" : undefined}
                    className={`block border border-gray-800 rounded-lg p-6 md:p-8 transition-all duration-300 flex flex-col flex-grow bg-gray-900/30 ${
                        hasLink
                            ? 'hover:border-gray-600 hover:bg-gray-900/50 cursor-pointer'
                            : 'cursor-default'
                    }`}
                >
                    <div className="flex justify-between items-start">
                        <h3 className={`text-xl md:text-2xl font-bold text-gray-300 transition-colors duration-300 ${hasLink ? 'group-hover:text-white' : ''}`}>
                            {project.title}
                        </h3>
                        {hasLink ? (
                            <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 mt-1 flex-shrink-0" size={28}/>
                        ) : (
                            <span className="text-base font-bold text-white-400 text-right mt-1 flex-shrink-0">Link coming soon</span>
                        )}
                    </div>
                    <p className="text-gray-400 text-base my-4 leading-relaxed flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                        {project.tech.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs font-medium">{tech}</span>
                        ))}
                    </div>
                </Wrapper>
            </motion.div>
        );
    };

    return (
        <Section id="projects">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-200">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </Section>
    );
};


const Timeline = () => {
    const timelineEvents = [
        { year: "July 2024 - Ongoing", role: "Associate Data Analyst", company: "Novartis Healthcare", description: "Streamlining digital Veeva vault administration for Novartis France and working on CRM activities and Generative AI projects for Novartis USA." },
        { year: "Jan 2024 - July 2024", role: "Data Science Intern", company: "Vivriti Capital Pvt. Ltd.", description: "Worked on cool projects based on Generative AI , Data Mining , NLP and Computer Vision. Lots of financial knowledge and lessons gained on Project Management." },
        { year: "Dec 2022 - July 2023", role: "R&D Intern", company: "Samsung R&D Institute India", description: "Designed API systems for Bixby capsule for language auto-detection and translation, and handled the integration of NLLB API. Published a research paper in Cornell University's database - arXiV." },
        { year: "2020 - 2024", role: "BTech CSE with AI and ML", company: "Vellore Institute of Technology, Chennai", description: "Did my undergraduate at VIT Chennai in the field of AI and worked on innovative projects and won 2 hackathons, graduated with a 8.8 GPA" },
        { year: "2018 - 2020", role: "12th Grade", company: "FIITJEE Junior College", description: "Nothing much to say , just studied Math,Physics and Chemistry." },
    ];

    return (
        <Section id="timeline">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-gray-200">Timeline</h2>
                {/* Added padding-bottom to ensure space for the final dot */}
                <div className="relative border-l-2 border-gray-700 pb-3">
                    {timelineEvents.map((event, index) => (
                        <div key={index} className="mb-12 ml-6">
                            {/* This is the original circle style and position */}
                            <span className="absolute flex items-center justify-center w-3 h-3 bg-gray-500 rounded-full -left-1.5 ring-4 ring-gray-800"></span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold text-white">
                                {event.role} <span className="text-gray-500 font-normal ml-2">@ {event.company}</span>
                            </h3>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-500">{event.year}</time>
                            <p className="text-base font-normal text-gray-400">{event.description}</p>
                        </div>
                    ))}
                    {/* Final circle to terminate the timeline */}
                    <div className="absolute w-3 h-3 bg-gray-500 rounded-full -left-1.5 bottom-0 ring-4 ring-gray-800"></div>
                </div>
            </div>
        </Section>
    );
};

const Skills = () => {
    const skillCategories = [
        {
            title: "Languages",
            skills: ["C++", "Python", "JavaScript", "HTML5", "CSS"]
        },
        {
            title: "Frameworks & Technologies",
            skills: ["Node.js", "Django", "Bootstrap", "Tensorflow", "Flask", "PowerBI", "Scikit-learn", "Tableau", "Salesforce", "Snowflake", "Alteryx"]
        },
        {
            title: "Databases",
            skills: ["MySQL", "PostgreSQL", "DataIKU DSS"]
        },
        {
            title: "Technical Skills",
            skills: ["DSA", "OOPS", "Networking", "Computer Architecture", "Operating System", "Machine Learning", "Deep Learning"]
        },
        {
            title: "Soft Skills",
            skills: ["Problem-Solving", "Communication", "Teamwork", "Leadership", "Planning"]
        }
    ];

    return (
        <Section id="skills">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-200">Skills & Technologies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skillCategories.map((category) => (
                        <div key={category.title}>
                            <h3 className="text-xl font-bold text-gray-300 mb-4 border-b-2 border-gray-700 pb-2">{category.title}</h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-base">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

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
                    { Icon: Github, href: "https://github.com/Abhiram970" }, // Add your GitHub link here
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/pvabhiram/" }, // Add your LinkedIn link here
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
                <Skills />
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