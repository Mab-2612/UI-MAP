import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // NEW STATE
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // --- NEW VALIDATION ---
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
    }

    setLoading(true);
    toast.dismiss();

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await res.json();

      if (res.ok) {
        toast.success("Account created! Please log in.");
        navigate('/login');
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      
      <div className="absolute top-[10%] right-[10%] w-[60vw] h-[60vw] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white rounded-3xl shadow-xl border border-white/50 p-8 md:p-10">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-500 mt-2">Join the UI Campus community</p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input type="text" required placeholder="Username" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 placeholder-gray-400" onChange={e=>setUsername(e.target.value)} />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 placeholder-gray-400" onChange={e=>setEmail(e.target.value)} />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input type="password" required placeholder="Create Password" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 placeholder-gray-400" onChange={e=>setPassword(e.target.value)} />
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="relative group">
              <CheckCircle className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input type="password" required placeholder="Confirm Password" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 placeholder-gray-400" onChange={e=>setConfirmPassword(e.target.value)} />
            </div>

            <button disabled={loading} className="mt-2 w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;