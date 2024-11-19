import React, { useState, useEffect } from 'react';
import { User, UpdateProfileData, ChangePasswordData } from '../../types/auth';
import { Loader2 } from 'lucide-react';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import AlertMessage from '../../common/AlertMessage';
import { AuthService } from '../../services/auth';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setError('Failed to load user data');
      if (!AuthService.isAuthenticated()) {
        window.location.href = '/signin';
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      {error && <AlertMessage type="error" message={error} />}
      {success && <AlertMessage type="success" message={success} />}

      <div className="grid gap-6">
        <ProfileForm 
          user={user}
          onSuccess={(message) => setSuccess(message)}
          onError={(message) => setError(message)}
          onUpdateUser={setUser}
        />

        <PasswordForm
          onSuccess={(message) => setSuccess(message)}
          onError={(message) => setError(message)}
        />
      </div>
    </div>
  );
};

export default Profile;