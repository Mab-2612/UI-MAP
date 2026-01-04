import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, KeyRound, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        toast.success("Reset link sent to your email!");
      } else {
        toast.error(data.message || "User not found");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white rounded-3xl shadow-xl border border-white/50 p-8 md:p-10">
          
          <div className="text-center mb-8">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-sm mx-auto mb-4 transition-colors ${sent ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
              {sent ? <CheckCircle size={24} /> : <KeyRound size={24} />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{sent ? "Check your mail" : "Forgot Password?"}</h2>
            <p className="text-sm text-gray-500 mt-2">
              {sent ? "We have sent a password recover instructions to your email." : "Enter your email to receive a reset link"}
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleRequest} className="flex flex-col gap-5">
                <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                    type="email" required placeholder="Enter your email" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                    onChange={e => setEmail(e.target.value)}
                />
                </div>

                <button disabled={loading} className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Link"}
                </button>
            </form>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-300">
                <div className="bg-gray-50 text-gray-600 p-4 rounded-xl border border-gray-100 mb-6 text-sm">
                    <p>Did not receive the email? Check your spam filter, or</p>
                    <button 
                        onClick={() => setSent(false)} 
                        className="text-blue-600 font-bold hover:underline mt-1"
                    >
                        try another email address
                    </button>
                </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-gray-500 text-sm hover:text-gray-800 font-medium flex items-center justify-center gap-2">
              <ArrowRight size={14} className="rotate-180" /> Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;