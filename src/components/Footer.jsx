import { Github, Linkedin, Mail, Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 -z-10"></div>
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center">
            <Sparkles size={20} className="mr-2" />
            Durga Gairhe
          </div>
          <p className="text-gray-400 mb-4">
            Senior Frontend Developer passionate about creating exceptional digital experiences.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/dpgaire" target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/durga-gairhe/" 
                target="_blank" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:gairhedurga13@email.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
            <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
            <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Latest Blog Post</h3>
          <div className="text-gray-400">
            <h4 className="text-white mb-2">Building a React App without Create React App</h4>
            <p className="text-sm mb-2">Learn how to set up a modern React development environment from scratch...</p>
            <span className="text-xs">March 15, 2024</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 Durga Gairhe. All rights reserved. Built with React & Tailwind CSS.</p>
      </div>
    </div>
  </footer>
);

export default Footer;