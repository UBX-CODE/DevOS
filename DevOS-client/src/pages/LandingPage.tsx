import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden text-[#222]">
      
      {/* Hero Container */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 min-h-screen flex flex-col pt-6">
        
        {/* Navbar */}
        <header className="flex items-center justify-start gap-16 py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1f1e1e] rounded-full flex items-center justify-center text-white font-serif italic font-medium text-lg">
              D
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1f1e1e] ml-2">
              <path d="M4 12v.01M8 12v.01M12 12v.01M16 12v.01M20 12v.01M12 4v.01M12 20v.01M8 8v.01M16 16v.01M8 16v.01M16 8v.01"/>
            </svg>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-[14px] text-gray-500 font-medium">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="text-black border-b border-gray-400 pb-1 hover:text-black transition">Home</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-black transition pb-1">Features</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-black transition pb-1">Contact</button>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-between pb-12 mt-12 lg:mt-0">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="lg:w-[45%] z-20"
          >
            <motion.h1 
              variants={fadeUp} 
              className="text-[3rem] lg:text-[4.2rem] leading-[1.1] tracking-tight mb-6 font-serif text-[#111]"
            >
              Developer<br />
              Operations<br />
              System
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-[16px] text-gray-600 mb-10 max-w-md leading-relaxed font-light">
              DevOS is an aggregate platform designed to orchestrate your project management, GitHub repositories, and algorithm practice.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <Link 
                to="/register" 
                className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-widest font-semibold border border-[#222] text-[#222] rounded hover:bg-black/5 transition text-center"
              >
                REGISTER
              </Link>
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-widest font-semibold bg-[#1f1e1e] border border-[#1f1e1e] text-white rounded hover:bg-black transition text-center"
              >
                LETS GO
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div variants={fadeUp}>
              <div 
                onClick={() => scrollToSection('features')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 transition cursor-pointer hover:bg-black/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side Illustration (Cropped to Circle) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:w-[55%] flex justify-end items-center mt-16 lg:mt-0"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[550px] aspect-square rounded-full overflow-hidden">
              <img 
                src="/devos-illustration.png" 
                alt="DevOS Platform Illustration" 
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          </motion.div>
        </main>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-t border-[#f0eadd]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-serif tracking-tight mb-4 text-[#111]">Platform Features</h2>
            <p className="text-gray-500 max-w-2xl font-light">Everything you need to orchestrate your workflow, track your growth, and stay productive in one beautiful workspace.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Project Management",
                desc: "Organize tasks, track time efficiently, and monitor your overall completion rates. Stay focused on shipping, not sorting.",
                icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              },
              {
                title: "GitHub Integration",
                desc: "Bring your repositories into one place. See your commits, follower network, and repo languages automatically synced.",
                icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              },
              {
                title: "LeetCode Tracking",
                desc: "Visualize your interview prep. Track your Easy, Medium, and Hard problem completion rates right alongside your code.",
                icon: <><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></>
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-[#FAF6F0] border border-[#f0eadd]"
              >
                <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mb-6">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5"><>{feature.icon}</></svg>
                </div>
                <h3 className="text-xl font-serif mb-3 text-[#111]">{feature.title}</h3>
                <p className="text-gray-600 font-light text-[15px] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#FAF6F0] border-t border-[#f0eadd]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-serif tracking-tight mb-4 text-[#111]">Get in Touch</h2>
            <p className="text-gray-500 max-w-md font-light mb-8">Have questions about DevOS? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600 font-light">
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span>hello@devos.com</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full bg-white p-8 rounded-2xl border border-[#f0eadd]">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="border border-gray-200 rounded p-3 focus:outline-none focus:border-gray-500 bg-[#FAF6F0]" placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="border border-gray-200 rounded p-3 focus:outline-none focus:border-gray-500 bg-[#FAF6F0]" placeholder="your@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea className="border border-gray-200 rounded p-3 focus:outline-none focus:border-gray-500 bg-[#FAF6F0] min-h-[120px]" placeholder="How can we help?"></textarea>
              </div>
              <button className="bg-[#1f1e1e] text-white py-3.5 rounded text-sm font-semibold tracking-widest hover:bg-black transition mt-2">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white text-gray-400 text-center text-sm border-t border-[#f0eadd]">
        <p>&copy; {new Date().getFullYear()} DevOS. Move Ideas Into Motion.</p>
      </footer>
    </div>
  );
}

export default LandingPage;