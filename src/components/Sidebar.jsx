import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Clock, Star, Bookmark, History, Share2 } from 'lucide-react';

const Sidebar = ({ 
  locations, 
  totalCount,
  onLocationSelect, 
  onClose, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}) => {
  const [activeTab, setActiveTab] = useState('explore'); // explore | saved | recent
  const [savedItems, setSavedItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);

  // Load from Local Storage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ui_saved_places') || '[]');
    const recent = JSON.parse(localStorage.getItem('ui_recent_places') || '[]');
    setSavedItems(saved);
    setRecentItems(recent);
  }, [activeTab]); // Refresh when tab changes

  // Helper to get list based on tab
  const getDisplayList = () => {
    if (activeTab === 'saved') return savedItems;
    if (activeTab === 'recent') return recentItems;
    return locations;
  };

  const displayList = getDisplayList();

  return (
    <div className="flex flex-col h-full w-full font-sans bg-white relative shadow-2xl">
      
      {/* --- HEADER --- */}
      <div className="px-6 py-5 bg-white border-b border-gray-100 z-10 shrink-0">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    UI
                </div>
                <div>
                    <h1 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">Navigator</h1>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Campus Map</p>
                </div>
            </div>
            <button onClick={onClose} className="md:hidden bg-slate-50 text-slate-500 p-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors">
                <X size={20} />
            </button>
        </div>
        
        {/* Search Input (Only show in Explore mode) */}
        {activeTab === 'explore' && (
            <div className="relative mb-4 group">
                <Search className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                type="text" 
                placeholder={`Search ${totalCount || '...'} places...`} 
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm bg-slate-50 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-500 transition-all placeholder-slate-400 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        )}

        {/* TABS */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-2">
            {['explore', 'saved', 'recent'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${
                        activeTab === tab 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {tab === 'explore' ? 'Explore' : tab === 'saved' ? 'Saved' : 'Recent'}
                </button>
            ))}
        </div>

        {/* Category Chips (Only in Explore) */}
        {activeTab === 'explore' && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide mask-fade-right">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`
                            text-[11px] font-bold px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 border
                            ${selectedCategory === cat 
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        )}
      </div>

      {/* --- LIST SECTION --- */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-2 space-y-2">
        {displayList.map((loc) => (
          <div 
            key={loc.id} 
            className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 cursor-pointer transition-all duration-200 relative overflow-hidden"
            onClick={() => {
                onLocationSelect(loc);
                onClose(); 
            }}
          >
            <div className="flex justify-between items-start gap-3">
                <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors leading-tight">
                        {loc.name}
                    </h3>
                    {loc.parent && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            {loc.parent}
                        </div>
                    )}
                </div>
                <span className="text-[9px] uppercase font-extrabold px-2 py-1 rounded-lg tracking-wide shrink-0 bg-slate-100 text-slate-500">
                  {loc.category}
                </span>
            </div>
          </div>
        ))}

        {displayList.length === 0 && (
             <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-center px-6">
                <div className="bg-slate-100 p-4 rounded-full mb-3">
                    {activeTab === 'saved' ? <Bookmark size={24} /> : activeTab === 'recent' ? <History size={24}/> : <MapPin size={24} />}
                </div>
                <p className="text-sm font-semibold text-slate-600">No places found</p>
                <p className="text-xs mt-1">
                    {activeTab === 'saved' ? "Start bookmarking locations!" : "Your browsing history will appear here."}
                </p>
            </div>
        )}
      </div>
      
      <div className="p-4 bg-white text-[10px] text-center font-medium text-slate-400 border-t border-slate-100 shrink-0">
        University of Ibadan Map &bull; 2025
      </div>
    </div>
  );
};

export default Sidebar;