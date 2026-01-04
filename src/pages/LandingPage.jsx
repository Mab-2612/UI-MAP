import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Compass, ArrowRight, Loader2 } from 'lucide-react';

const LandingPage = () => {
  // State for the dynamic location text
  const [userAddress, setUserAddress] = useState("Locating you...");
  const [isLocating, setIsLocating] = useState(true);

  // --- GET REAL USER LOCATION ON MOUNT ---
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserAddress("University of Ibadan");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Reverse Geocode (Coords -> Address Name) using OpenStreetMap
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          
          // Try to get a recognizable name (Suburb > City > Road)
          const name = data.address.suburb || data.address.residential || data.address.road || data.address.city || "Current Location";
          setUserAddress(name);
        } catch (error) {
          setUserAddress("University of Ibadan");
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        // Fallback if permission denied
        console.warn("Location permission denied");
        setUserAddress("University of Ibadan");
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true, // Force GPS Chip (Better Accuracy)
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden relative">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
            UI
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Navigator</span>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-blue-600 transition bg-white rounded-xl border border-gray-200 hover:border-blue-200 shadow-sm">
            Log In
          </Link>
          <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 hidden sm:block">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 pt-36 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-20">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wide uppercase mb-8 border border-blue-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Official 2025 Release
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 text-slate-900 tracking-tight">
            Navigate the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">First & Best.</span>
          </h1>

          <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed font-medium">
            The ultimate digital guide for University of Ibadan. 
            Find hostels, faculties, lecture theatres, and banks instantly with real-time routing.
          </p>

          <div className="flex flex-col w-full md:w-auto gap-4 sm:flex-row">
            <Link 
              to="/map" 
              className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-200"
            >
              Launch Map
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/signup" 
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-bold bg-white text-slate-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all sm:hidden shadow-sm"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Visual / Mockup */}
        <div className="flex-1 w-full max-w-md md:max-w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white bg-gray-100 aspect-[4/5] md:aspect-square">
            <img 
              src="https://admissions.ui.edu.ng/images/carousel/ui-gate.jpg" 
              alt="University of Ibadan Gate" 
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* DYNAMIC FLOATING CARD */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    {isLocating ? <Loader2 size={24} className="animate-spin"/> : <Navigation size={24} />}
                 </div>
                 <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Navigating to</p>
                    <p className="text-base font-bold text-gray-900 truncate">
                        {userAddress}
                    </p>
                 </div>
                 <div className="ml-auto text-xs font-bold bg-green-100 text-green-700 px-3 py-1.5 rounded-lg whitespace-nowrap">
                   Start
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- FEATURES GRID --- */}
      <section className="relative z-10 px-6 py-24 bg-white/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Everything you need</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">Don't get lost on campus again. UI Navigator puts the entire university in your pocket.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin size={28} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900">Precise Locations</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Stop guessing. Every hostel, faculty, department, and walkway is pinned with high-accuracy GPS coordinates.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Navigation size={28} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900">Smart Routing</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Get step-by-step walking directions. Integrated with Google Maps API to find the fastest path to your lecture.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Compass size={28} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900">Comprehensive Directory</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Access detailed info on 150+ locations. Search for specific departments, banks, cafeterias, and health centers in seconds.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center bg-white border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                UI
            </div>
            <span className="font-bold text-slate-900">Navigator</span>
        </div>
        <p className="text-slate-400 text-sm">&copy; 2025 Assessment Project. Built with MERN Stack.</p>
      </footer>
    </div>
  );
};

export default LandingPage;