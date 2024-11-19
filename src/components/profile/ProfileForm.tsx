import React, { useState } from 'react';
import { User } from '../../types/auth';
import { AuthService } from '../../services/auth';
import { User as UserIcon, Mail, Save, X, Loader2 } from 'lucide-react';

interface ProfileFormProps {
  user: User | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onUpdateUser: (user: User) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSuccess, onError, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await AuthService.updateProfile(formData);
      onUpdateUser(updatedUser);
      onSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-600"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={`pl-10 w-full p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`pl-10 w-full p-2 border rounded-md ${!isEditing ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;