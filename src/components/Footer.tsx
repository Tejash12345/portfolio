import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Arava Tejesh Kumar</h3>
            <p className="text-slate-300 mb-4">
              Full Stack Developer passionate about creating exceptional digital experiences using the MERN stack.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
              >
                <Github size={20} />
              </a>
              <a
                href="http://linkedin.com/in/tejesh-kumar-a9348a302"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:tejraj0078@gmail.com"
                className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-slate-400 text-sm mb-2">
              © {currentYear} Arava Tejesh Kumar. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm flex items-center justify-end space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>and lots of dedication</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;