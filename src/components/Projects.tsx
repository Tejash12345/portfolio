import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Camera, Upload, AlertCircle, Cloud, HardDrive } from 'lucide-react';
import { MongoStorage } from '../utils/mongoStorage';

const Projects = () => {
  const [projectImages, setProjectImages] = useState<{[key: string]: string}>({});
  const [showBackupOptions, setShowBackupOptions] = useState(false);
  const [isUsingMongo, setIsUsingMongo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      // Try MongoDB first
      const mongoAvailable = await MongoStorage.isAvailable();
      if (mongoAvailable) {
        const mongoImages = await MongoStorage.getAllImages();
        if (Object.keys(mongoImages).length > 0) {
          setProjectImages(mongoImages);
          setIsUsingMongo(true);
          setIsLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      setProjectImages({});
      setIsUsingMongo(false);
    } catch (error) {
      console.error('Failed to load images:', error);
    }
    setIsLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectIndex: number, isFeatured: boolean) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        const imageKey = `${isFeatured ? 'featured' : 'other'}-${projectIndex}`;
        
        // Update local state immediately
        setProjectImages(prev => ({
          ...prev,
          [imageKey]: result
        }));

        // Try to save to MongoDB first
        try {
          const mongoAvailable = await MongoStorage.isAvailable();
          if (mongoAvailable) {
            const success = await MongoStorage.saveImage(imageKey, result, file.name);
            if (success) {
              setIsUsingMongo(true);
              return;
            }
          }
        } catch (error) {
          console.error('MongoDB save failed, using localStorage:', error);
        }

        // Fallback to localStorage
        // ImageStorage.saveImage(imageKey, result);
        // ImageStorage.importImages(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file only.');
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ImageStorage.importImages(file)
      //   .then(() => {
      //     loadImages(); // Reload images after import
      //     alert('Images imported successfully!');
      //     setShowBackupOptions(false);
      //   })
      //   .catch(() => {
      //     alert('Failed to import images. Please check the file format.');
      //   });
    };
  };

  const projects = [
    {
      title: 'Streamify - Real-Time Chat & Video App',
      description: 'A real-time chat and video calling app built with the MERN stack. Features include JWT auth, friend system, protected routes, 32+ UI themes, and advanced state management with TanStack Query.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'WebRTC', 'TanStack Query', 'Tailwind CSS'],
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Tejash12345/Stremefiy.git',
      demo: 'https://stremefiy.onrender.com',
      featured: true
    },
    {
      title: 'Transfit.ai – AI-Powered Fitness Assistant',
      description: 'AI fitness app offering real-time workouts, personalized diet plans, and voice coaching using Gemini AI & Vapi. Built with Next.js, Clerk, Convex, and TailwindCSS for a seamless experience.',
      technologies: ['Next.js', 'Clerk', 'Convex', 'Tailwind CSS', 'Gemini AI', 'Vapi'],
      image: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Tejash12345/Titanfit_ai.git',
      demo: 'https://titanfit-ai-yp6t-26zm9nzl2-tejesh-kumars-projects.vercel.app/',
      featured: true
    },
    {
      title: 'Chatter.app – Real-Time Chat App',
      description: 'Full-stack real-time chat app built with MERN, featuring JWT auth, live messaging via Socket.io, Zustand state management, and a responsive UI with TailwindCSS and Daisy UI.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Zustand', 'Tailwind CSS', 'Daisy UI'],
      image: 'https://images.pexels.com/photos/6078120/pexels-photo-6078120.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Tejash12345/chatterTime_app-.git',
      demo: 'https://chattertime-app.onrender.com/',
      featured: true
    },
    {
      title: 'TuneTime.app – Music Streaming Platform',
      description: 'A Spotify-style full-stack music app with real-time chat, playback control, admin dashboard for albums, and user activity feeds. Built with MERN stack, Socket.io, and Cloudinary for uploads.',
      technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Cloudinary', 'Tailwind CSS', 'Shadcn UI', 'Zustand', 'Redux', 'Chart.js'],
      image: 'https://images.pexels.com/photos/164931/pexels-photo-164931.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Tejash12345/tunetimepro.git',
      demo: 'https://tunetimepro-1.onrender.com/',
      featured: true
    },
    {
      title: 'Pure Pattry – Food Ordering App',
      description: 'A full-stack MERN food ordering platform featuring user auth, menu browsing, cart management, and admin control for restaurant orders and menus.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Tejash12345/project_purepattry.git',
      demo: 'https://frontendp-xi.vercel.app/',
      featured: false
    },
    {
      title: '3D Portfolio Website',
      description: 'A dynamic and interactive portfolio built with React and Tailwind CSS, featuring 3D elements, Email.js integration, and smooth animations for showcasing projects and skills.',
      technologies: ['React.js', 'Tailwind CSS', 'Email.js', 'JavaScript', 'HTML5'],
      image: 'https://images.pexels.com/photos/3806751/pexels-photo-3806751.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/Tejash12345/protfolio3-D.git',
      demo: 'https://portjhbfdjk.netlify.app/',
      featured: false
    }
  ];

  const ProjectImageUpload = ({ project, projectIndex, isFeatured }: { 
    project: typeof projects[0], 
    projectIndex: number, 
    isFeatured: boolean 
  }) => {
    const imageKey = `${isFeatured ? 'featured' : 'other'}-${projectIndex}`;
    const uploadedImage = projectImages[imageKey];
    
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-lg">
        {isLoading ? (
          <div className="w-full h-64 lg:h-80 bg-slate-200 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <img
            src={uploadedImage || project.image}
            alt={project.title}
            className="w-full h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        {/* Upload overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4">
            <label htmlFor={`project-upload-${imageKey}`} className="cursor-pointer">
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Camera size={16} />
                <span className="text-sm">Upload Image</span>
              </div>
            </label>
            <input
              type="file"
              id={`project-upload-${imageKey}`}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, projectIndex, isFeatured)}
              className="hidden"
            />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex space-x-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Eye size={16} />
              <span>View Demo</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200"
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const ProjectImageUploadSmall = ({ project, projectIndex, isFeatured }: { 
    project: typeof projects[0], 
    projectIndex: number, 
    isFeatured: boolean 
  }) => {
    const imageKey = `${isFeatured ? 'featured' : 'other'}-${projectIndex}`;
    const uploadedImage = projectImages[imageKey];
    
    return (
      <div className="relative group">
        {isLoading ? (
          <div className="w-full h-48 bg-slate-200 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <img
            src={uploadedImage || project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        {/* Upload overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-2 right-2">
            <label htmlFor={`project-upload-small-${imageKey}`} className="cursor-pointer">
              <div className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Camera size={14} />
                <span className="text-xs">Upload</span>
              </div>
            </label>
            <input
              type="file"
              id={`project-upload-small-${imageKey}`}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, projectIndex, isFeatured)}
              className="hidden"
            />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex space-x-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
            >
              <Eye size={14} />
              <span>Demo</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 text-sm"
            >
              <Github size={14} />
              <span>Code</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Backup Options Modal */}
        {showBackupOptions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-slate-900">Backup Your Images</h3>
              </div>
              <p className="text-slate-600 mb-6">
                To ensure your uploaded images persist across devices and deployments, 
                consider backing them up.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setShowBackupOptions(false)}
                  className="w-full px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A collection of projects that showcase my skills in full-stack development 
            using the MERN stack and modern web technologies.
          </p>
          
          {/* Storage Status and Backup Controls */}
          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              isUsingMongo 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {isUsingMongo ? <Cloud size={14} /> : <HardDrive size={14} />}
              <span>{isUsingMongo ? 'Cloud Storage Active' : 'Local Storage'}</span>
            </div>
            
            <div className="flex justify-center space-x-4">
              <label className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer text-sm">
                <Upload size={14} />
                <span>Import Images</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Featured Projects */}
          {projects.filter(project => project.featured).map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <ProjectImageUpload 
                  project={project}
                  projectIndex={index} 
                  isFeatured={true} 
                />
              </div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  {project.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Other Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(project => !project.featured).map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <ProjectImageUploadSmall 
                  project={project}
                  projectIndex={index} 
                  isFeatured={false} 
                />
                
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">{project.title}</h4>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    >
                      <ExternalLink size={14} />
                      <span>Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
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

export default Projects;