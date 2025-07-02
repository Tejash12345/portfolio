import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'BTech in Electronics and Communication Engineering',
      company: 'Narasaraopet Institute of Technology',
      location: 'Narasaraopet, Andhra Pradesh',
      period: '2021 - 2025',
      description: [
        'Specialized in Electronics and Communication Engineering with focus on modern technologies',
        'Gained hands-on experience in full-stack web development using MERN stack',
        'Built and deployed multiple real-world projects showcasing technical skills',
        'Developed strong problem-solving abilities and analytical thinking'
      ],
      technologies: ['MERN Stack', 'Web Development', 'Database Management', 'Cloud Computing'],
      icon: GraduationCap
    },
    {
      title: 'Full-Stack Development Projects',
      company: 'Personal Learning & Development',
      location: 'Self-Directed Learning',
      period: '2023 - Present',
      description: [
        'Mastered MERN stack development through hands-on project building',
        'Implemented responsive web applications with modern UI/UX principles',
        'Integrated third-party APIs and cloud services for enhanced functionality',
        'Practiced version control, deployment, and project management skills'
      ],
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'AWS', 'Git'],
      icon: BookOpen
    },
    {
      title: 'Technical Skills Development',
      company: 'Continuous Learning',
      location: 'Online Platforms & Courses',
      period: '2022 - Present',
      description: [
        'Completed various online courses and certifications in web development',
        'Practiced coding challenges and algorithmic problem solving',
        'Participated in coding communities and open-source contributions',
        'Stayed updated with latest industry trends and best practices'
      ],
      technologies: ['Python', 'JavaScript', 'MySQL', 'Linux', 'VS Code', 'Eclipse'],
      icon: Award
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Education & Learning Journey</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            My academic background and self-directed learning path in technology and software development.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start space-x-8">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <exp.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">{exp.title}</h3>
                      <p className="text-lg font-semibold text-blue-600 mb-2">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:items-end text-slate-600">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;