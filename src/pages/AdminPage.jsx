import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Save, Edit, X, LayoutDashboard, Search, AlertTriangle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Data States
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Delete Modal State
  const [itemToDelete, setItemToDelete] = useState(null); // Stores ID of item to delete

  // Form State
  const [formData, setFormData] = useState({
    id: '', name: '', category: 'Faculty', parent: '', description: '', lat: '', lng: '', image: 'https://placehold.co/600x400'
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // --- SECURITY CHECK ---
  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== 'admin') {
        toast.error("Access Denied: Admins Only", { id: 'admin-denied' });
        navigate('/map');
    }
  }, [user, authLoading, navigate]);

  // --- FETCH DATA ---
  const fetchLocations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/locations`);
      const data = await res.json();
      setLocations(data);
      setFilteredLocations(data); // Init filter
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') fetchLocations();
  }, [user]);

  // --- SEARCH LOGIC ---
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const results = locations.filter(loc => 
        loc.name.toLowerCase().includes(lowerTerm) || 
        loc.category.toLowerCase().includes(lowerTerm) ||
        loc.id.toLowerCase().includes(lowerTerm)
    );
    setFilteredLocations(results);
  }, [searchTerm, locations]);

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.lat || !formData.lng) {
        toast.error("Please fill required fields");
        return;
    }

    const toastId = toast.loading(isEditing ? "Updating..." : "Saving...");
    const payload = { ...formData, coordinates: [parseFloat(formData.lat), parseFloat(formData.lng)] };

    try {
      const url = isEditing ? `${API_URL}/api/locations/${formData.id}` : `${API_URL}/api/locations`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(isEditing ? 'Updated!' : 'Created!', { id: toastId });
        fetchLocations();
        resetForm();
      } else {
        toast.error("Error saving. ID might exist.", { id: toastId });
      }
    } catch (err) {
      toast.error("Network error", { id: toastId });
    }
  };

  // --- DELETE HANDLER (CONFIRMED) ---
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    const toastId = toast.loading("Deleting...");
    try {
      await fetch(`${API_URL}/api/locations/${itemToDelete}`, { method: 'DELETE' });
      toast.success("Location deleted", { id: toastId });
      fetchLocations();
      setItemToDelete(null); // Close modal
    } catch (err) {
      toast.error("Failed to delete", { id: toastId });
    }
  };

  const handleEditClick = (loc) => {
    setIsEditing(true);
    setFormData({
        id: loc.id,
        name: loc.name,
        category: loc.category,
        parent: loc.parent || '',
        description: loc.description || '',
        lat: loc.coordinates[0],
        lng: loc.coordinates[1],
        image: loc.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast("Editing mode enabled", { icon: '✏️' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({ id: '', name: '', category: 'Faculty', parent: '', description: '', lat: '', lng: '', image: 'https://placehold.co/600x400' });
  };

  if (authLoading || !user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans relative">
      
      {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-100 transform scale-100 transition-all">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Location?</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        This will permanently remove <strong>{locations.find(l => l.id === itemToDelete)?.name}</strong> from the database.
                    </p>
                    
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setItemToDelete(null)}
                            className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmDelete}
                            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/30 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
                <Link to="/map" className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <LayoutDashboard size={20} className="text-blue-600"/> 
                        Admin Dashboard
                    </h1>
                    <p className="text-xs text-slate-500">Welcome, {user.username}</p>
                </div>
            </div>
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm border border-blue-100">
                {locations.length} Locations
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* --- LEFT: EDITOR FORM --- */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 sticky top-6 z-10">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                        {isEditing ? <Edit size={18} className="text-orange-500"/> : <Plus size={18} className="text-green-500"/>} 
                        {isEditing ? 'Edit Location' : 'Add New Location'}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        {/* ID Input */}
                        <div className="relative">
                            <input 
                                required disabled={isEditing} 
                                placeholder="Unique ID (e.g. fac-art)" 
                                className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-100 outline-none ${isEditing ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border-slate-200'}`}
                                value={formData.id} onChange={e=>setFormData({...formData, id: e.target.value})} 
                            />
                        </div>

                        <input required placeholder="Name (e.g. Faculty of Arts)" className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                        
                        <div className="grid grid-cols-2 gap-2">
                             <select className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})}>
                                {['Faculty','Department','Hostel','Health','Library','Admin','Food','School','Event','Finance','Commercial','Service','Transport','Hospitality','Religious','Recreation'].map(c => <option key={c}>{c}</option>)}
                            </select>
                            <input placeholder="Parent (Optional)" className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none" value={formData.parent} onChange={e=>setFormData({...formData, parent: e.target.value})} />
                        </div>

                        <textarea placeholder="Description..." className="p-2.5 border border-slate-200 rounded-lg h-24 text-sm resize-none focus:ring-2 focus:ring-blue-100 outline-none" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} />
                        
                        <div className="grid grid-cols-2 gap-2">
                            <input required type="number" step="any" placeholder="Lat (7.xxx)" className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none" value={formData.lat} onChange={e=>setFormData({...formData, lat: e.target.value})} />
                            <input required type="number" step="any" placeholder="Lng (3.xxx)" className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none" value={formData.lng} onChange={e=>setFormData({...formData, lng: e.target.value})} />
                        </div>
                        
                        <input placeholder="Image URL" className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none" value={formData.image} onChange={e=>setFormData({...formData, image: e.target.value})} />
                        
                        <div className="flex gap-2 mt-2">
                            <button type="submit" className={`flex-1 text-white py-2.5 rounded-lg font-bold flex justify-center items-center gap-2 transition shadow-md ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                <Save size={18} /> {isEditing ? 'Update' : 'Save'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={resetForm} className="bg-gray-100 text-gray-600 px-3 rounded-lg hover:bg-gray-200 transition">
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* --- RIGHT: LIST & SEARCH --- */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                
                {/* Search Bar */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-center">
                    <div className="p-2 text-slate-400">
                        <Search size={20} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search locations by name, ID, or category..." 
                        className="w-full p-2 outline-none text-sm text-slate-700 bg-transparent placeholder-slate-400"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="p-2 text-slate-400 hover:text-slate-600">
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex-1">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 border-b">Name</th>
                                    <th className="p-4 border-b">Category</th>
                                    <th className="p-4 border-b text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="3" className="p-8 text-center text-slate-400">Loading database...</td></tr>
                                ) : filteredLocations.length === 0 ? (
                                    <tr><td colSpan="3" className="p-8 text-center text-slate-400">No locations match your search.</td></tr>
                                ) : (
                                    filteredLocations.map(loc => (
                                        <tr key={loc.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="font-semibold text-slate-800">{loc.name}</div>
                                                <div className="text-xs text-slate-400 font-mono mt-0.5">{loc.id}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600`}>
                                                    {loc.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleEditClick(loc)}
                                                        className="bg-orange-50 text-orange-600 p-2 rounded-lg hover:bg-orange-100 transition"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => setItemToDelete(loc.id)} // Trigger Modal
                                                        className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;