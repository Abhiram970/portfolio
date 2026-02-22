import React, { useState } from 'react';
import { Calendar, Book, Code, Dumbbell, Coffee, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react';

const MasterSchedule = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [expandedDay, setExpandedDay] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');

  const phases = {
    phase1: {
      name: "Phase 1: Jan-March 2025",
      subtitle: "GRE Blitz + ML Foundations",
      goals: [
        "GRE Score: 325-330+ by March 31",
        "Complete CS231n (CV) + CS224n (NLP) or equivalent",
        "3-5 ML projects implemented from scratch",
        "50-75 LeetCode problems solved",
        "Read 30+ foundational ML papers"
      ],
      weeklyHours: {
        gre: "22-25h",
        ml: "25-28h",
        dsa: "12-15h",
        gym: "14h",
        reading: "7-10h",
        sleep: "43-45h (6.1-6.4h avg)"
      }
    },
    phase2: {
      name: "Phase 2: April-August 2025",
      subtitle: "ML Mastery + DSA Interview Prep + Job Hunt",
      goals: [
        "300+ LeetCode problems solved",
        "3-5 portfolio-ready ML projects on GitHub",
        "System design mastery",
        "Mock interviews weekly (from July)",
        "Land ML job by August/September"
      ],
      weeklyHours: {
        dsa: "25-28h",
        ml: "25-30h",
        jobApps: "4-8h (from June)",
        gym: "14h",
        reading: "7-10h",
        sleep: "40-42h (5.7-6h avg)"
      }
    },
    phase3: {
      name: "Phase 3: Sept-Dec 2025",
      subtitle: "New ML Job + Research Preparation",
      goals: [
        "Excel at new ML job",
        "Read 100+ papers in target research area",
        "Identify research problems for 2026 submissions",
        "Start preliminary experiments",
        "Build professor/advisor relationships"
      ],
      weeklyHours: {
        newJob: "45h",
        research: "20-25h",
        gym: "14h",
        reading: "7-10h",
        sleep: "45-48h (6.5-7h avg)"
      }
    }
  };

  const schedules = {
    phase1_wfh: [
      { time: "5:30-7:30 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "7:30-8:00 AM", activity: "Breakfast & Shower", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:00-11:00 AM", activity: "GRE Prep (Quant/Verbal/Essays)", icon: Book, color: "bg-blue-100", hours: 3 },
      { time: "11:00 AM-2:00 PM", activity: "ML Learning (Courses/Papers/Implementation)", icon: Code, color: "bg-green-100", hours: 3 },
      { time: "2:00-2:30 PM", activity: "Lunch", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "2:30-8:00 PM", activity: "Day Job (Fixed)", icon: Code, color: "bg-purple-100", hours: 5.5 },
      { time: "8:00-8:30 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30-10:00 PM", activity: "DSA Practice (LeetCode)", icon: Code, color: "bg-orange-100", hours: 1.5 },
      { time: "10:00-11:00 PM", activity: "Reading (ML Papers/Books)", icon: Book, color: "bg-indigo-100", hours: 1 },
      { time: "11:30 PM-5:30 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 6 }
    ],
    phase1_office: [
      { time: "6:00-8:00 AM", activity: "GRE Prep", icon: Book, color: "bg-blue-100", hours: 2 },
      { time: "8:00-8:30 AM", activity: "Breakfast & Prep", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30-10:00 AM", activity: "ML Learning", icon: Code, color: "bg-green-100", hours: 1.5 },
      { time: "10:00-11:00 AM", activity: "Commute (GRE Podcasts)", icon: Book, color: "bg-blue-50", hours: 1 },
      { time: "11:00 AM-2:00 PM", activity: "Office Work", icon: Code, color: "bg-purple-100", hours: 3 },
      { time: "2:00-4:00 PM", activity: "Office Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "4:00-8:00 PM", activity: "Office Work", icon: Code, color: "bg-purple-100", hours: 4 },
      { time: "8:00-9:30 PM", activity: "Commute Home (Read Papers)", icon: Book, color: "bg-green-50", hours: 1.5 },
      { time: "9:30-10:00 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "10:00-11:30 PM", activity: "DSA Practice", icon: Code, color: "bg-orange-100", hours: 1.5 },
      { time: "11:30 PM-12:30 AM", activity: "ML Learning (Coding)", icon: Code, color: "bg-green-100", hours: 1 },
      { time: "12:30-6:00 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 5.5 }
    ],
    phase1_saturday: [
      { time: "6:00-8:00 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "8:00-8:30 AM", activity: "Breakfast", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30 AM-12:30 PM", activity: "GRE Mock Test + Review", icon: Book, color: "bg-blue-100", hours: 4 },
      { time: "12:30-1:00 PM", activity: "Lunch", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "1:00-5:00 PM", activity: "ML Deep Dive (Implement Papers)", icon: Code, color: "bg-green-100", hours: 4 },
      { time: "5:00-8:00 PM", activity: "DSA Practice (LeetCode Patterns)", icon: Code, color: "bg-orange-100", hours: 3 },
      { time: "8:00-8:30 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30-10:30 PM", activity: "Reading (ML/Books)", icon: Book, color: "bg-indigo-100", hours: 2 },
      { time: "11:00 PM-6:00 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 7 }
    ],
    phase1_sunday: [
      { time: "7:00-9:00 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "9:00-9:30 AM", activity: "Breakfast", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "9:30 AM-12:30 PM", activity: "GRE Practice (Weak Areas)", icon: Book, color: "bg-blue-100", hours: 3 },
      { time: "12:30-1:00 PM", activity: "Lunch", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "1:00-5:00 PM", activity: "ML Deep Dive (Continue Projects)", icon: Code, color: "bg-green-100", hours: 4 },
      { time: "5:00-7:30 PM", activity: "DSA Practice", icon: Code, color: "bg-orange-100", hours: 2.5 },
      { time: "7:30-8:00 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:00-10:00 PM", activity: "Reading & Weekly Planning", icon: Book, color: "bg-indigo-100", hours: 2 },
      { time: "10:30 PM-5:30 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 7 }
    ],
    phase2_wfh: [
      { time: "5:30-7:30 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "7:30-8:00 AM", activity: "Breakfast & Shower", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:00-11:30 AM", activity: "DSA Intensive (LeetCode/System Design)", icon: Code, color: "bg-orange-100", hours: 3.5 },
      { time: "11:30 AM-2:00 PM", activity: "ML Projects (Advanced Topics)", icon: Code, color: "bg-green-100", hours: 2.5 },
      { time: "2:00-2:30 PM", activity: "Lunch", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "2:30-8:00 PM", activity: "Day Job (Push for ML Projects!)", icon: Code, color: "bg-purple-100", hours: 5.5 },
      { time: "8:00-8:30 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30-11:30 PM", activity: "ML Projects (Portfolio Building)", icon: Code, color: "bg-green-100", hours: 3 },
      { time: "11:30 PM-12:30 AM", activity: "Reading (Papers/Books)", icon: Book, color: "bg-indigo-100", hours: 1 },
      { time: "12:30-5:30 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 5 }
    ],
    phase2_office: [
      { time: "6:00-9:00 AM", activity: "DSA Practice", icon: Code, color: "bg-orange-100", hours: 3 },
      { time: "9:00-9:30 AM", activity: "Breakfast & Prep", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "9:30-11:00 AM", activity: "ML Work (Code/Experiments)", icon: Code, color: "bg-green-100", hours: 1.5 },
      { time: "11:00 AM-12:00 PM", activity: "Commute (ML Podcasts)", icon: Book, color: "bg-green-50", hours: 1 },
      { time: "12:00-2:00 PM", activity: "Office Work", icon: Code, color: "bg-purple-100", hours: 2 },
      { time: "2:00-4:00 PM", activity: "Office Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "4:00-8:00 PM", activity: "Office Work", icon: Code, color: "bg-purple-100", hours: 4 },
      { time: "8:00-9:30 PM", activity: "Commute Home (Read Papers)", icon: Book, color: "bg-green-50", hours: 1.5 },
      { time: "9:30-10:00 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "10:00 PM-12:30 AM", activity: "ML Projects (Deep Work)", icon: Code, color: "bg-green-100", hours: 2.5 },
      { time: "12:30-1:00 AM", activity: "DSA Review", icon: Code, color: "bg-orange-100", hours: 0.5 },
      { time: "1:00-6:00 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 5 }
    ],
    phase2_saturday: [
      { time: "6:00-8:00 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "8:00-8:30 AM", activity: "Breakfast", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30 AM-12:30 PM", activity: "ML Project Intensive", icon: Code, color: "bg-green-100", hours: 4 },
      { time: "12:30-1:00 PM", activity: "Lunch", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "1:00-5:00 PM", activity: "DSA Practice (Mock Interviews)", icon: Code, color: "bg-orange-100", hours: 4 },
      { time: "5:00-8:00 PM", activity: "ML Work (Continue Project)", icon: Code, color: "bg-green-100", hours: 3 },
      { time: "8:00-8:30 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30-10:30 PM", activity: "Reading/Learning", icon: Book, color: "bg-indigo-100", hours: 2 },
      { time: "11:00 PM-6:00 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 7 }
    ],
    phase2_sunday: [
      { time: "7:00-9:00 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "9:00-9:30 AM", activity: "Breakfast", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "9:30 AM-1:30 PM", activity: "DSA (System Design/Review)", icon: Code, color: "bg-orange-100", hours: 4 },
      { time: "1:30-2:00 PM", activity: "Lunch", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "2:00-6:00 PM", activity: "ML Projects", icon: Code, color: "bg-green-100", hours: 4 },
      { time: "6:00-8:00 PM", activity: "Resume/LinkedIn/Job Apps (from June)", icon: Book, color: "bg-blue-100", hours: 2 },
      { time: "8:00-8:30 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30-10:00 PM", activity: "Reading/Recovery", icon: Book, color: "bg-indigo-100", hours: 1.5 },
      { time: "10:30 PM-5:30 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 7 }
    ],
    phase3_weekday: [
      { time: "5:30-7:30 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "7:30-8:00 AM", activity: "Breakfast & Shower", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:00-10:00 AM", activity: "Research Learning (Papers/Experiments)", icon: Book, color: "bg-green-100", hours: 2 },
      { time: "10:00 AM-7:00 PM", activity: "New ML Job (Ramp Up Period)", icon: Code, color: "bg-purple-100", hours: 9 },
      { time: "7:00-7:30 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "7:30-9:30 PM", activity: "Research Work (Experiments/Collaboration)", icon: Code, color: "bg-green-100", hours: 2 },
      { time: "9:30-10:30 PM", activity: "Reading", icon: Book, color: "bg-indigo-100", hours: 1 },
      { time: "11:00 PM-5:30 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 6.5 }
    ],
    phase3_weekend: [
      { time: "7:00-9:00 AM", activity: "Gym", icon: Dumbbell, color: "bg-red-100", hours: 2 },
      { time: "9:00-9:30 AM", activity: "Breakfast", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "9:30 AM-1:30 PM", activity: "Research Intensive (Paper Reading)", icon: Book, color: "bg-green-100", hours: 4 },
      { time: "1:30-2:00 PM", activity: "Lunch", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "2:00-6:00 PM", activity: "Research Work (Experiments)", icon: Code, color: "bg-green-100", hours: 4 },
      { time: "6:00-8:00 PM", activity: "Professor Collaboration/Meetings", icon: Book, color: "bg-blue-100", hours: 2 },
      { time: "8:00-8:30 PM", activity: "Dinner", icon: Coffee, color: "bg-yellow-100", hours: 0.5 },
      { time: "8:30-10:30 PM", activity: "Reading/Recovery", icon: Book, color: "bg-indigo-100", hours: 2 },
      { time: "11:00 PM-7:00 AM", activity: "Sleep", icon: Moon, color: "bg-gray-200", hours: 8 }
    ]
  };

  const researchPlan = {
    timeline: [
      {
        period: "Jan-March 2025",
        focus: "Foundations",
        tasks: [
          "Complete CS231n (Stanford Computer Vision)",
          "Complete CS224n (Stanford NLP) or Hugging Face NLP Course",
          "Read foundational papers: ResNet, Attention is All You Need, BERT, GPT-2/3",
          "Implement basic models from scratch: CNN, Transformer, BERT fine-tuning",
          "Start following key researchers on Twitter/arXiv"
        ]
      },
      {
        period: "April-August 2025",
        focus: "Specialization & Depth",
        tasks: [
          "Choose specific area: Vision Transformers, Diffusion Models, LLMs, Multimodal, etc.",
          "Read 50+ papers in chosen area (survey papers first)",
          "Implement 3-5 important papers from scratch",
          "Start experimenting with novel ideas",
          "Attend virtual conferences/workshops (CVPR, ACL, etc.)"
        ]
      },
      {
        period: "Sept-Dec 2025",
        focus: "Research Preparation",
        tasks: [
          "Read 100+ papers in target domain",
          "Identify open problems and gaps in literature",
          "Start preliminary experiments for potential projects",
          "Connect with professors (cold emails + show your work)",
          "Attend reading groups, join ML Discord communities"
        ]
      },
      {
        period: "Jan-May 2026",
        focus: "First Submission Prep",
        tasks: [
          "Formulate research question with professor guidance",
          "Run extensive experiments",
          "Write first paper draft",
          "Submit to NeurIPS 2027 (deadline: ~May 2026)",
          "Continue work for ICML 2027 (deadline: ~Jan 2027)"
        ]
      }
    ],
    keyConferences: [
      {
        name: "NeurIPS 2027",
        deadline: "May 2026",
        conference: "December 2027",
        focus: "Machine Learning (Broad)"
      },
      {
        name: "ICML 2027",
        deadline: "January 2027",
        conference: "July 2027",
        focus: "Machine Learning (Theory + Applications)"
      },
      {
        name: "CVPR 2027",
        deadline: "November 2026",
        conference: "June 2027",
        focus: "Computer Vision"
      },
      {
        name: "ACL/EMNLP 2027",
        deadline: "Feb-May 2027",
        conference: "July-Dec 2027",
        focus: "Natural Language Processing"
      }
    ],
    readingList: {
      foundations: [
        {
          category: "Computer Vision Classics",
          papers: [
            "AlexNet (2012) - ImageNet Classification with Deep CNNs",
            "VGG (2014) - Very Deep Convolutional Networks",
            "ResNet (2015) - Deep Residual Learning",
            "DenseNet (2017) - Densely Connected Networks",
            "EfficientNet (2019) - Rethinking Model Scaling"
          ]
        },
        {
          category: "Vision Transformers",
          papers: [
            "ViT (2020) - An Image is Worth 16x16 Words",
            "Swin Transformer (2021) - Hierarchical Vision Transformer",
            "DeiT (2021) - Data-efficient Image Transformers",
            "BEiT (2021) - BERT Pre-Training of Image Transformers",
            "MAE (2021) - Masked Autoencoders Are Scalable Vision Learners"
          ]
        },
        {
          category: "NLP Foundations",
          papers: [
            "Attention Is All You Need (2017) - Transformer",
            "BERT (2018) - Pre-training of Deep Bidirectional Transformers",
            "GPT-2 (2019) - Language Models are Unsupervised Multitask Learners",
            "T5 (2019) - Exploring Transfer Learning Limits",
            "GPT-3 (2020) - Language Models are Few-Shot Learners"
          ]
        },
        {
          category: "Modern LLMs",
          papers: [
            "InstructGPT (2022) - Training Language Models to Follow Instructions",
            "LLaMA (2023) - Open and Efficient Foundation Language Models",
            "GPT-4 Technical Report (2023)",
            "Constitutional AI (2022) - Anthropic's Alignment Work",
            "Chain-of-Thought Prompting (2022)"
          ]
        },
        {
          category: "Multimodal",
          papers: [
            "CLIP (2021) - Learning Transferable Visual Models",
            "DALL-E (2021) - Zero-Shot Text-to-Image Generation",
            "Flamingo (2022) - Visual Language Model",
            "LLaVA (2023) - Visual Instruction Tuning",
            "GPT-4V Technical Report (2023)"
          ]
        },
        {
          category: "Generative Models",
          papers: [
            "VAE (2013) - Auto-Encoding Variational Bayes",
            "GAN (2014) - Generative Adversarial Networks",
            "DDPM (2020) - Denoising Diffusion Probabilistic Models",
            "Stable Diffusion (2022) - High-Resolution Image Synthesis",
            "Consistency Models (2023) - Fast Sampling"
          ]
        }
      ],
      advanced: [
        "Survey papers in your specific area (read these FIRST)",
        "Recent NeurIPS/ICML/CVPR papers (2023-2024) in your domain",
        "Papers from labs you want to work with",
        "Papers that cite each other (build knowledge graphs)",
        "Controversial/rebuttal papers (understand debates)"
      ]
    },
    impressProfessors: [
      "Implement their recent papers and share results",
      "Ask thoughtful questions about their work (not generic)",
      "Share your own experiments/findings (GitHub repos)",
      "Contribute to their open-source projects",
      "Show consistent progress (regular updates)",
      "Demonstrate deep understanding, not just surface knowledge",
      "Be respectful of their time (concise, well-prepared emails)",
      "Attend their talks/seminars and ask good questions"
    ],
    resources: {
      courses: [
        "CS231n - Stanford Computer Vision (Free on YouTube)",
        "CS224n - Stanford NLP (Free on YouTube)",
        "Fast.ai - Practical Deep Learning",
        "Hugging Face NLP Course (Free)",
        "Deep Learning Specialization - Andrew Ng (Coursera)",
        "Full Stack Deep Learning (Free)"
      ],
      books: [
        "Deep Learning - Goodfellow, Bengio, Courville",
        "Pattern Recognition and Machine Learning - Bishop",
        "Dive into Deep Learning (d2l.ai) - Free online",
        "Speech and Language Processing - Jurafsky & Martin"
      ],
      communities: [
        "Papers with Code - Track SOTA and implementations",
        "Hugging Face Forums",
        "r/MachineLearning subreddit",
        "ML Discord servers (EleutherAI, Yannic Kilcher, etc.)",
        "Twitter/X - Follow researchers in your area",
        "Local ML meetups and reading groups"
      ],
      tools: [
        "PyTorch - Primary framework",
        "Hugging Face Transformers",
        "Weights & Biases - Experiment tracking",
        "Google Colab / Kaggle - Free GPUs",
        "arXiv - Paper preprints",
        "Connected Papers - Explore paper relationships",
        "Semantic Scholar - Research paper search"
      ]
    }
  };

  const milestones = {
    phase1: [
      { month: "January", tasks: ["GRE: Complete Quant basics", "ML: Finish first 5 lectures CS231n", "DSA: 20 LeetCode easy problems", "Read: 10 foundational papers"] },
      { month: "February", tasks: ["GRE: Complete Verbal + practice tests", "ML: Finish CS231n + start CS224n", "DSA: 30 more problems (some medium)", "Implement: ResNet from scratch"] },
      { month: "March", tasks: ["GRE: Final mock tests + TAKE EXAM", "ML: Complete CS224n", "DSA: 25 more problems", "Implement: Transformer from scratch", "Read: 10 more papers"] }
    ],
    phase2: [
      { month: "April", tasks: ["DSA: 50 problems (focus medium)", "ML: 1 CV project + 1 NLP project", "Read: 15 papers in chosen area", "Start: Open-source contributions"] },
      { month: "May", tasks: ["DSA: 75 more problems", "ML: Implement 2 important papers", "System Design: Learn basics", "GitHub: Polish 3 portfolio projects"] },
      { month: "June", tasks: ["DSA: 50 more problems + mock interviews", "ML: Start advanced project", "Resume: Polish and optimize LinkedIn", "Jobs: Start applications (10-15/week)"] },
      { month: "July", tasks: ["DSA: Mock interviews weekly", "ML: Continue project", "Jobs: 15-20 applications/week", "Interview: Practice ML system design"] },
      { month: "August", tasks: ["Interviews: Multiple rounds", "DSA: Company-specific prep", "ML: Finish showcase project", "Goal: Land offer by end of month"] }
    ],
    phase3: [
      { month: "September", tasks: ["New job: Onboarding", "Research: Read 20 papers", "Connect: Reach out to 5 professors", "Identify: Potential research areas"] },
      { month: "October", tasks: ["Job: Ramp up performance", "Research: Read 25 papers", "Experiments: Start playing with ideas", "Join: Reading groups"] },
      { month: "November", tasks: ["Research: Read 30 papers", "Narrow: Focus on 2-3 research directions", "Professor: Follow up with interested ones", "CVPR 2027: Consider workshop paper"] },
      { month: "December", tasks: ["Research: 25 papers + holiday review", "Formulate: Initial research questions", "Plan: 2026 research roadmap", "Goal: Ready for serious research in Jan 2026"] }
    ]
  };

  const DaySchedule = ({ schedule, title }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h4 className="font-semibold text-lg mb-4 text-gray-800">{title}</h4>
      <div className="space-y-2">
        {schedule.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`${item.color} rounded p-3 flex items-center gap-3`}>
              <Icon size={18} className="flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-sm">{item.time}</div>
                <div className="text-xs text-gray-700">{item.activity}</div>
              </div>
              <div className="text-xs font-semibold text-gray-600">{item.hours}h</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">2025 Master Plan</h1>
        <p className="text-gray-600">Your roadmap to ML mastery, job transition, and research excellence</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-white p-1 rounded-lg shadow-sm">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2 px-4 rounded-md transition ${
            activeTab === 'schedule' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          📅 Daily Schedules
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`flex-1 py-2 px-4 rounded-md transition ${
            activeTab === 'research' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          📚 Research Plan
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex-1 py-2 px-4 rounded-md transition ${
            activeTab === 'milestones' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          🎯 Milestones
        </button>
      </div>

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <>
          {/* Phase Selector */}
          <div className="flex gap-2 mb-6">
            {Object.entries(phases).map(([key, phase]) => (
              <button
                key={key}
                onClick={() => setActivePhase(key)}
                className={`flex-1 p-4 rounded-lg transition ${
                  activePhase === key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-bold">{phase.name.split(':')[0]}</div>
                <div className="text-sm opacity-90">{phase.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Phase Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{phases[activePhase].name}</h2>
            <p className="text-gray-600 mb-4">{phases[activePhase].subtitle}</p>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Goals:</h3>
              <ul className="space-y-1">
                {phases[activePhase].goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Weekly Time Allocation:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(phases[activePhase].weeklyHours).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-600 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="text-lg font-bold text-gray-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Schedules */}
          <div className="grid md:grid-cols-2 gap-4">
            {activePhase === 'phase1' && (
              <>
                <DaySchedule schedule={schedules.phase1_wfh} title="Weekday (Work From Home)" />
                <DaySchedule schedule={schedules.phase1_office} title="Weekday (Office Day)" />
                <DaySchedule schedule={schedules.phase1_saturday} title="Saturday" />
                <DaySchedule schedule={schedules.phase1_sunday} title="Sunday" />
              </>
            )}
            {activePhase === 'phase2' && (
              <>
                <DaySchedule schedule={schedules.phase2_wfh} title="Weekday (Work From Home)" />
                <DaySchedule schedule={schedules.phase2_office} title="Weekday (Office Day)" />
                <DaySchedule schedule={schedules.phase2_saturday} title="Saturday" />
                <DaySchedule schedule={schedules.phase2_sunday} title="Sunday" />
              </>
            )}
            {activePhase === 'phase3' && (
              <>
                <DaySchedule schedule={schedules.phase3_weekday} title="Weekday (New ML Job)" />
                <DaySchedule schedule={schedules.phase3_weekend} title="Weekend" />
              </>
            )}
          </div>
        </>
      )}

      {/* Research Tab */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Research Learning Timeline</h2>
            {researchPlan.timeline.map((period, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {period.period}
                  </div>
                  <h3 className="font-bold text-lg">{period.focus}</h3>
                </div>
                <ul className="ml-6 space-y-1">
                  {period.tasks.map((task, taskIdx) => (
                    <li key={taskIdx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-sm text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Conference Deadlines */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Target Conferences (2027)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {researchPlan.keyConferences.map((conf, idx) => (
                <div key={idx} className="border-2 border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">{conf.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-semibold">Submission:</span> {conf.deadline}</div>
                    <div><span className="font-semibold">Conference:</span> {conf.conference}</div>
                    <div><span className="font-semibold">Focus:</span> {conf.focus}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Essential Reading List</h2>
            {researchPlan.readingList.foundations.map((category, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-bold text-lg mb-2 text-blue-600">{category.category}</h3>
                <ul className="space-y-1">
                  {category.papers.map((paper, paperIdx) => (
                    <li key={paperIdx} className="flex items-start gap-2 ml-4">
                      <span className="text-gray-400">□</span>
                      <span className="text-sm">{paper}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">Advanced Reading Strategy:</h3>
              <ul className="space-y-1">
                {researchPlan.readingList.advanced.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-600">★</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to Impress Professors */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">🎓 How to Impress Professors</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {researchPlan.impressProfessors.map((tip, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 flex items-start gap-2">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Resources & Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-600">📺 Courses</h3>
                <ul className="space-y-1">
                  {researchPlan.resources.courses.map((course, idx) => (
                    <li key={idx} className="text-sm ml-4">• {course}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-600">📖 Books</h3>
                <ul className="space-y-1">
                  {researchPlan.resources.books.map((book, idx) => (
                    <li key={idx} className="text-sm ml-4">• {book}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-600">👥 Communities</h3>
                <ul className="space-y-1">
                  {researchPlan.resources.communities.map((comm, idx) => (
                    <li key={idx} className="text-sm ml-4">• {comm}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-600">🛠️ Tools</h3>
                <ul className="space-y-1">
                  {researchPlan.resources.tools.map((tool, idx) => (
                    <li key={idx} className="text-sm ml-4">• {tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          {Object.entries(milestones).map(([phase, months]) => (
            <div key={phase} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">
                {phases[phase].name}
              </h2>
              <div className="space-y-4">
                {months.map((month, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-lg mb-2">{month.month}</h3>
                    <ul className="space-y-1">
                      {month.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1" />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-6">
        <h3 className="font-bold text-xl mb-2">💪 Remember</h3>
        <ul className="space-y-1 text-sm">
          <li>• This is a marathon, not a sprint - pace yourself</li>
          <li>• Sleep is non-negotiable - protect your recovery time</li>
          <li>• Quality is better than Quantity - focus beats hours</li>
          <li>• Track progress weekly - adjust as needed</li>
          <li>• Celebrate small wins - motivation matters</li>
          <li>• You've got this! 🚀</li>
        </ul>
      </div>
    </div>
  );
};

export default MasterSchedule;