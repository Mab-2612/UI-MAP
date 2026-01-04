import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data); 
        toast.success(`Welcome back, ${data.username}!`);
        navigate('/map');
      } else {
        toast.error(data.message || 'Invalid email or password');
      }
    } catch (err) {
      toast.error('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white rounded-3xl shadow-xl border border-white/50 p-8 md:p-10">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-4">
              UI
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2">Enter your details to access the map</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="email" required placeholder="Student Email" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 placeholder-gray-400"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="password" required placeholder="Password" 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium text-gray-700 placeholder-gray-400"
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>

            {/* FORGOT PASSWORD LINK */}
            <div className="flex justify-end">
                <Link to="/forgot-password" classname="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              New to campus?{' '}
              <Link to="/signup" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;