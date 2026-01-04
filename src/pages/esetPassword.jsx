import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lock, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams(); // Capture token from URL
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }
    
    setLoading(true);
    toast.dismiss();

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password Reset Successfully!");
        navigate('/login');
      } else {
        toast.error(data.message || "Invalid or expired token");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white rounded-3xl shadow-xl border border-white/50 p-8 md:p-10">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
            <p className="text-sm text-gray-500 mt-2">Enter your new credentials below</p>
          </div>

          <form onSubmit={handleReset} className="flex flex-col gap-5">
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input type="password" required placeholder="New Password" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="relative group">
              <CheckCircle className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input type="password" required placeholder="Confirm New Password" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <button disabled={loading} className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;