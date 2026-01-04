import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Menu, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

function MapPage() {
  const { user, logout } = useAuth(); // user is null if guest
  const navigate = useNavigate();

  // --- UI STATES ---
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- DATA STATES ---
  const [locations, setLocations] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- USER DATA ---
  const [savedLocations, setSavedLocations] = useState([]);
  const [recentLocations, setRecentLocations] = useState([]);

  // 1. Fetch Locations (Public)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/locations`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setLocations(data); 
        setLoading(false); 
      } catch (err) {
        setError("Could not load campus map.");
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // 2. Filter Logic
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(locations.map(loc => loc.category))];

  const filteredLocations = locations.filter(loc => {
    const query = searchTerm.toLowerCase();
    return (
        (loc.name.toLowerCase().includes(query) || loc.category.toLowerCase().includes(query)) &&
        (selectedCategory === 'All' || loc.category === selectedCategory)
    );
  });

  // --- AUTH GUARDED ACTIONS ---

  const checkAuth = () => {
    if (!user) {
        toast.error("Please log in to use this feature", { icon: '🔒' });
        navigate('/login');
        return false;
    }
    return true;
  };

  const handleToggleSave = (location) => {
    if (!checkAuth()) return; // BLOCK GUESTS

    setSavedLocations(prev => {
        const exists = prev.find(l => l.id === location.id);
        if (exists) return prev.filter(l => l.id !== location.id);
        toast.success("Location saved!");
        return [...prev, location];
    });
  };

  const handleRateLocation = (rating) => {
    if (!checkAuth()) return; // BLOCK GUESTS
    toast.success(`Rated ${rating} stars!`);
    // API call to save rating would go here
  };

  const handleAddToRecent = (location) => {
    // We allow guests to have a "session-based" recent history (optional)
    // If you want to block this for guests too, add checkAuth() here.
    setRecentLocations(prev => {
        const filtered = prev.filter(l => l.id !== location.id);
        return [location, ...filtered].slice(0, 5);
    });
  };

  const confirmLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-blue-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="flex h-screen w-screen overflow-hidden relative font-sans">
      
      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100 transform scale-100 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Out?</h3>
                <p className="text-sm text-gray-500 mb-6">Are you sure you want to log out?</p>
                <div className="flex gap-3">
                    <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">Cancel</button>
                    <button onClick={confirmLogout} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/30 transition flex items-center justify-center gap-2"><LogOut size={18} /> Sign Out</button>
                </div>
            </div>
        </div>
      )}

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div className="absolute inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden animate-in fade-in" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* --- SIDEBAR --- */}
      <div className={`absolute top-0 bottom-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out border-r border-gray-200 md:relative md:translate-x-0 md:w-80 md:block md:shadow-xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
            locations={filteredLocations} 
            totalCount={locations.length}
            onLocationSelect={(loc) => { setSelectedLocation(loc); handleAddToRecent(loc); }}
            onClose={() => setIsMobileMenuOpen(false)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            savedLocations={savedLocations}
            recentLocations={recentLocations}
            isAuthenticated={!!user} // Pass auth state to sidebar
        />
      </div>

      {/* --- MAP AREA --- */}
      <div className="flex-1 h-full relative z-10">
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden absolute top-4 left-4 z-[1000] bg-white p-3 rounded-xl shadow-lg text-gray-700 border border-gray-100"><Menu size={24} /></button>

        {/* --- DYNAMIC HEADER (Login vs Profile) --- */}
        <div className="absolute top-4 right-4 z-[1000]">
            {user ? (
                // LOGGED IN VIEW
                <div className="bg-white/95 backdrop-blur-md p-1.5 pl-2 pr-2 rounded-full shadow-xl border border-white/50 flex items-center gap-3 transition-all cursor-pointer hover:shadow-2xl" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <div className="flex items-center gap-2 pl-1">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner ring-2 ring-white">
                            {user.username?.charAt(0).toUpperCase() || <UserIcon size={16}/>}
                        </div>
                        <div className="flex flex-col pr-2">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Hello,</span>
                            <span className="text-sm font-bold text-gray-800 leading-none max-w-[100px] truncate">{user.username}</span>
                        </div>
                    </div>
                    <div className="w-px h-6 bg-gray-200"></div>
                    <button onClick={(e) => { e.stopPropagation(); setShowLogoutConfirm(true); }} className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"><LogOut size={16} /></button>
                </div>
            ) : (
                // GUEST VIEW
                <button 
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl hover:bg-black transition-all active:scale-95 font-bold text-sm"
                >
                    <LogIn size={16} /> Log In
                </button>
            )}
        </div>

        {/* --- MAP COMPONENT --- */}
        <Map 
            selectedLocation={selectedLocation} 
            filteredLocations={filteredLocations}
            savedLocations={savedLocations}
            onToggleSave={handleToggleSave}
            onAddToRecent={handleAddToRecent}
            onRate={handleRateLocation}
        />
      </div>
    </div>
  );
}

export default MapPage;