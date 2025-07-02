import React from 'react';
import { Code, Database, Globe, Wrench, Cloud, Terminal } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Programming Languages',
      skills: ['Python', 'JavaScript', 'HTML/CSS', 'MySQL'],
      color: 'blue'
    },
    {
      icon: Wrench,
      title: 'Developer Tools',
      skills: ['VS Code', 'Eclipse', 'Git'],
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Frontend Technologies',
      skills: ['React.js', 'HTML5', 'CSS3', 'JavaScript ES6+'],
      color: 'purple'
    },
    {
      icon: Database,
      title: 'Backend & Databases',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
      color: 'orange'
    },
    {
      icon: Cloud,
      title: 'Cloud & Deployment',
      skills: ['AWS', 'Cloud Services', 'Web Hosting'],
      color: 'pink'
    },
    {
      icon: Terminal,
      title: 'Operating Systems',
      skills: ['Kali Linux', 'Windows', 'Linux Commands'],
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      pink: 'bg-pink-100 text-pink-600 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and user-friendly applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${getColorClasses(category.color)} flex items-center justify-center mb-6`}>
                <category.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.title}</h3>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg"
                  >
                    <span className="text-slate-700 font-medium">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < (skillIndex < 2 ? 4 : 3) ? 'bg-blue-500' : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;