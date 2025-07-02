import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

export class MongoStorage {
  // Save image to MongoDB
  static async saveImage(key: string, imageData: string, filename: string = 'image.jpg'): Promise<boolean> {
    try {
      // Extract file info from data URL
      const [header, data] = imageData.split(',');
      const mimeMatch = header.match(/data:([^;]+)/);
      const mimetype = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      
      // Calculate approximate size
      const size = Math.round((data.length * 3) / 4);

      const response = await axios.post(`${API_BASE_URL}/api/images/upload`, {
        key,
        data: imageData,
        filename,
        mimetype,
        size
      });

      return response.data.success;
    } catch {
      console.error('Failed to save image to MongoDB');
      // Fallback to localStorage
      try {
        localStorage.setItem(`mongo_fallback_${key}`, imageData);
        return true;
      } catch (fallbackError) {
        console.error('Fallback storage also failed:', fallbackError);
        return false;
      }
    }
  }

  // Get image from MongoDB
  static async getImage(key: string): Promise<string | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/images/${key}`);
      return response.data.success ? response.data.url : null;
    } catch {
      console.error('Failed to get image from MongoDB');
      // Fallback to localStorage
      try {
        return localStorage.getItem(`mongo_fallback_${key}`);
      } catch (fallbackError) {
        console.error('Fallback retrieval failed:', fallbackError);
        return null;
      }
    }
  }

  // Get all images from MongoDB
  static async getAllImages(): Promise<Record<string, string>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/images`);
      if (response.data.success && response.data.images) {
        // Map keys to Cloudinary URLs
        const imageMap: Record<string, string> = {};
        for (const key in response.data.images) {
          imageMap[key] = response.data.images[key].url;
        }
        return imageMap;
      }
      return {};
    } catch {
      console.error('Failed to get all images from MongoDB');
      return {};
    }
  }

  // Save resume to MongoDB
  static async saveResume(resumeData: string, filename: string = 'resume.pdf'): Promise<boolean> {
    try {
      // Extract file info from data URL
      const [header, data] = resumeData.split(',');
      const mimeMatch = header.match(/data:([^;]+)/);
      const mimetype = mimeMatch ? mimeMatch[1] : 'application/pdf';
      
      // Calculate approximate size
      const size = Math.round((data.length * 3) / 4);

      const response = await axios.post(`${API_BASE_URL}/api/resume/upload`, {
        data: resumeData,
        filename,
        mimetype,
        size
      });

      return response.data.success;
    } catch {
      console.error('Failed to save resume to MongoDB');
      // Fallback to localStorage
      try {
        localStorage.setItem('mongo_fallback_userResume', resumeData);
        return true;
      } catch (fallbackError) {
        console.error('Fallback storage also failed:', fallbackError);
        return false;
      }
    }
  }

  // Get resume from MongoDB
  static async getResume(): Promise<string | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/resume`);
      return response.data.success ? response.data.url : null;
    } catch {
      console.error('Failed to get resume from MongoDB');
      // Fallback to localStorage
      try {
        return localStorage.getItem('mongo_fallback_userResume');
      } catch (fallbackError) {
        console.error('Fallback retrieval failed:', fallbackError);
        return null;
      }
    }
  }

  // Delete image from MongoDB
  static async deleteImage(key: string): Promise<boolean> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/images/${key}`);
      return response.data.success;
    } catch {
      console.error('Failed to delete image from MongoDB');
      return false;
    }
  }

  // Delete resume from MongoDB
  static async deleteResume(): Promise<boolean> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/resume`);
      return response.data.success;
    } catch {
      console.error('Failed to delete resume from MongoDB');
      return false;
    }
  }

  // Check if MongoDB is available
  static async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/images`, { timeout: 5000 });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}