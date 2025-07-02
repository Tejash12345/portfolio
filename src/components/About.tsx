import React, { useState, useEffect } from 'react';
import { User, Heart, Target, Zap, Upload, Camera, Cloud, HardDrive } from 'lucide-react';
import { MongoStorage } from '../utils/mongoStorage';

const About = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUsingMongo, setIsUsingMongo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    setIsLoading(true);
    try {
      // Try MongoDB first
      const mongoAvailable = await MongoStorage.isAvailable();
      if (mongoAvailable) {
        const mongoImageUrl = await MongoStorage.getImage('profileImage');
        if (mongoImageUrl) {
          setProfileImage(mongoImageUrl);
          setIsUsingMongo(true);
          setIsLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      const localImage = localStorage.getItem('profileImage');
      if (localImage) {
        setProfileImage(localImage);
        setIsUsingMongo(false);
      }
    } catch (error) {
      console.error('Failed to load profile image:', error);
    }
    setIsLoading(false);
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setProfileImage(result);

        // Try to save to MongoDB first
        try {
          const mongoAvailable = await MongoStorage.isAvailable();
          if (mongoAvailable) {
            const success = await MongoStorage.saveImage('profileImage', result, file.name);
            if (success) {
              setIsUsingMongo(true);
              return;
            }
          }
        } catch (error) {
          console.error('MongoDB save failed, using localStorage:', error);
        }

        // Fallback to localStorage
        localStorage.setItem('profileImage', result);
        setIsUsingMongo(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file only.');
    }
  };

  const imageUrl = "https://res.cloudinary.com/diqqtjz0i/image/upload/v1751467897/WhatsApp_Image_2025-07-02_at_18.03.26_c682df27_siuwht.jpg";

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About Me</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A passionate BTech student ready to make an impact in the world of technology.
          </p>
          
          {/* Storage Status Indicator */}
          <div className="mt-4 flex justify-center">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              isUsingMongo 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {isUsingMongo ? <Cloud size={14} /> : <HardDrive size={14} />}
              <span>{isUsingMongo ? 'Cloud Storage Active' : 'Local Storage'}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 mb-8 relative group">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                ) : profileImage ? (
                  <img
                    src={imageUrl}
                    alt="Arava Tejesh Kumar"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <User size={120} className="text-slate-400" />
                )}
                
                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-3">
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center text-white">
                        <Camera size={32} className="mb-2" />
                        <span className="text-sm font-medium">Upload Photo</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            {/* Upload button for mobile/accessibility */}
            <div className="text-center lg:hidden space-y-3">
              <label htmlFor="profile-upload-mobile" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <Upload size={16} className="mr-2" />
                Upload Profile Photo
              </label>
              <input
                type="file"
                id="profile-upload-mobile"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">ARAVA TEJESH KUMAR</h3>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Hi, I'm Arava Tejesh Kumar, a passionate and driven BTech student specializing in Electronics and Communication Engineering at Narasaraopet Institute of Technology. I have hands-on experience in full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). My development journey includes building and deploying real-world projects, where I've worked on both frontend and backend technologies to create responsive and dynamic web applications.
            </p>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Passionate Developer</h3>
                  <p className="text-slate-600">
                    I love crafting code that not only works but is also clean, efficient, and maintainable.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Goal-Oriented</h3>
                  <p className="text-slate-600">
                    I focus on delivering results that exceed expectations and drive business value.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Learner</h3>
                  <p className="text-slate-600">
                    I stay current with the latest technologies and best practices in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;