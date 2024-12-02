import React, { useState } from 'react';
import { AuthService } from '../../services/auth';
import { Lock, Save, Loader2 } from 'lucide-react';

interface PasswordFormProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.passwordConfirmation) {
      onError("New passwords don't match");
      return;
    }

    setLoading(true);

    try {
      await AuthService.changePassword(formData);
      onSuccess('Password changed successfully');
      setFormData({
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
      });
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="currentPassword"
              autoComplete="current-password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-md"
              required
              minLength={6}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="passwordConfirmation"
              autoComplete="new-password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              className="pl-10 w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;