import React, { useState } from 'react';
import { Search, MapPin, X, ChevronRight, Bookmark, History, Home, Coffee, School, Landmark } from 'lucide-react';

const Sidebar = ({ 
  locations, 
  onLocationSelect, 
  onClose, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  categories,
  savedLocations = [],
  recentLocations = [],
  isAuthenticated
}) => {
  const [activeTab, setActiveTab] = useState('explore'); // explore, saved, recent

  // Dynamic Icon Helper
  const getIcon = (cat) => {
    switch(cat) {
        case 'Food': return <Coffee size={16} />;
        case 'Faculty': return <School size={16} />;
        case 'Bank': return <Landmark size={16} />;
        default: return <MapPin size={16} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">UI Navigator</h1>
            <button onClick={onClose} className="md:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><X size={20}/></button>
        </div>

        {/* Search Input */}
        <div className="relative mb-4 group">
            <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-600 transition" size={20} />
            <input 
                type="text" 
                placeholder="Search places..." 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-semibold text-gray-700 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-100 pb-1">
            <button onClick={() => setActiveTab('explore')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'explore' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>Explore</button>
            <button onClick={() => setActiveTab('recent')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'recent' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>Recent</button>
            
            {/* HIDE SAVED TAB IF GUEST */}
            {isAuthenticated && (
              <button onClick={() => setActiveTab('saved')} className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'saved' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>Saved</button>
            )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        
        {/* EXPLORE TAB */}
        {activeTab === 'explore' && (
            <>
                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 pt-1 scrollbar-hide">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="flex flex-col gap-3">
                    {locations.map(loc => (
                        <div key={loc.id} onClick={() => onLocationSelect(loc)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 cursor-pointer group transition-colors border border-transparent hover:border-blue-100">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm font-bold text-sm ${loc.category === 'Health' ? 'bg-red-500' : 'bg-slate-900'}`}>
                                {loc.category.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 text-sm truncate">{loc.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{loc.category}</p>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                        </div>
                    ))}
                    {locations.length === 0 && <div className="text-center py-10 text-gray-400 text-sm">No places found.</div>}
                </div>
            </>
        )}

        {/* RECENT TAB */}
        {activeTab === 'recent' && (
            <div className="flex flex-col gap-3">
                {recentLocations.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 flex flex-col items-center">
                        <History size={32} className="mb-2 opacity-50"/>
                        <p className="text-sm">No recent locations.</p>
                    </div>
                ) : (
                    recentLocations.map(loc => (
                        <div key={loc.id} onClick={() => onLocationSelect(loc)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-gray-100">
                             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"><History size={14}/></div>
                             <div>
                                <h3 className="font-bold text-gray-800 text-sm">{loc.name}</h3>
                             </div>
                        </div>
                    ))
                )}
            </div>
        )}

        {/* SAVED TAB (Auth Only) */}
        {activeTab === 'saved' && isAuthenticated && (
            <div className="flex flex-col gap-3">
                 {savedLocations.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 flex flex-col items-center">
                        <Bookmark size={32} className="mb-2 opacity-50"/>
                        <p className="text-sm">No saved places yet.</p>
                    </div>
                ) : (
                    savedLocations.map(loc => (
                        <div key={loc.id} onClick={() => onLocationSelect(loc)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 cursor-pointer border border-blue-100 bg-blue-50/30">
                             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Bookmark size={14} fill="currentColor"/></div>
                             <div>
                                <h3 className="font-bold text-gray-800 text-sm">{loc.name}</h3>
                             </div>
                        </div>
                    ))
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;