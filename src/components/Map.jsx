import React, { useState, useEffect, useRef, useMemo } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation2, MapPin, Circle, Locate, Compass, Layers, Bookmark, Share2, Star, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import * as turf from '@turf/turf';

const UI_CENTER = { longitude: 3.9007, latitude: 7.4443 };
const MAP_STYLES = [
    { name: 'Streets', icon: '🛣️', url: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json" },
    { name: 'Satellite', icon: '🛰️', url: { version: 8, sources: { "satellite-tiles": { type: "raster", tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"], tileSize: 256 } }, layers: [{ id: "satellite-layer", type: "raster", source: "satellite-tiles", minzoom: 0, maxzoom: 22 }] } },
    { name: 'Dark', icon: '🌙', url: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" },
    { name: 'Light', icon: '☀️', url: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" }
];
const routeLayerStyle = { id: 'route', type: 'line', layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': '#2563eb', 'line-width': 8, 'line-opacity': 0.8 } };

// --- POPUP CARD ---
const LocationPopupContent = ({ loc, onNavigate, isSaved, onToggleSave, onRate }) => {
    const handleShare = () => {
        navigator.clipboard.writeText(`Check out ${loc.name} on UI Navigator!`);
        toast.success("Link copied!");
    };

    return (
        <div className="w-[260px] p-0 font-sans overflow-hidden rounded-xl">
            <div className="relative h-32 bg-gray-100 group">
                <img src={loc.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop"} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-2 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">{loc.category}</span>
            </div>
            <div className="p-3 bg-white">
                <h3 className="text-base font-bold text-gray-900 leading-tight mb-2">{loc.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => onRate(star)} className="focus:outline-none transition hover:scale-110">
                            <Star size={14} className="text-gray-300 fill-gray-100 hover:text-yellow-400 hover:fill-yellow-400" />
                        </button>
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">(Rate)</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onNavigate(loc)} className="flex-1 bg-slate-900 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-black active:scale-95 transition shadow-lg shadow-slate-900/20"><Navigation2 size={14} /> Navigate</button>
                    <button onClick={() => onToggleSave(loc)} className={`p-2 rounded-lg border transition active:scale-95 ${isSaved ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'}`}><Bookmark size={16} fill={isSaved ? "currentColor" : "none"} /></button>
                    <button onClick={handleShare} className="p-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-600 hover:bg-gray-100 transition active:scale-95"><Share2 size={16} /></button>
                </div>
            </div>
        </div>
    );
};

// --- MAP COMPONENT ---
const MapComponent = ({ selectedLocation, filteredLocations, savedLocations = [], onToggleSave, onAddToRecent, onRate }) => {
    const mapRef = useRef(null);
    const watchId = useRef(null);
    const [viewState, setViewState] = useState({ ...UI_CENTER, zoom: 15, pitch: 45 });
    const [currentStyle, setCurrentStyle] = useState(MAP_STYLES[0]);
    const [isStyleMenuOpen, setIsStyleMenuOpen] = useState(false);
    const [popupInfo, setPopupInfo] = useState(null);
    const [tempLocation, setTempLocation] = useState(null);
    const [routeGeoJSON, setRouteGeoJSON] = useState(null);
    const [routeStats, setRouteStats] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [isTracking, setIsTracking] = useState(false); 
    const [startQuery, setStartQuery] = useState("");
    const [endQuery, setEndQuery] = useState("");
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleLocationSelect = (loc) => {
        setPopupInfo(loc);
        setIsTracking(false);
        if (onAddToRecent) onAddToRecent(loc);
    };

    useEffect(() => {
        if (selectedLocation) {
            mapRef.current?.flyTo({ center: [selectedLocation.coordinates[1], selectedLocation.coordinates[0]], zoom: 18, pitch: 60, duration: 2000 });
            handleLocationSelect(selectedLocation);
        }
    }, [selectedLocation]);

    useEffect(() => {
        if (!navigator.geolocation) return;
        watchId.current = navigator.geolocation.watchPosition((pos) => {
            const newCoords = { longitude: pos.coords.longitude, latitude: pos.coords.latitude };
            setUserLocation(newCoords);
            if (isTracking) mapRef.current?.flyTo({ center: [newCoords.longitude, newCoords.latitude], zoom: 18, pitch: 60, bearing: pos.coords.heading || 0, duration: 1000 });
            if (endLocation && isTracking) setStartLocation(newCoords);
        }, (err) => console.error(err), { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
        return () => navigator.geolocation.clearWatch(watchId.current);
    }, [isTracking, endLocation]);

    useEffect(() => {
        const fetchOSRMRoute = async () => {
            if (!startLocation || !endLocation) return;
            const url = `https://router.project-osrm.org/route/v1/foot/${startLocation.longitude},${startLocation.latitude};${endLocation.longitude},${endLocation.latitude}?overview=full&geometries=geojson`;
            try {
                const res = await fetch(url);
                const data = await res.json();
                if (data.code !== "Ok" || !data.routes.length) return;
                const route = data.routes[0];
                setRouteGeoJSON({ type: 'Feature', properties: {}, geometry: route.geometry });
                const minutes = Math.round(route.duration / 60);
                const km = (route.distance / 1000).toFixed(2);
                setRouteStats({ time: `${minutes} min`, dist: `${km} km` });
                if (!isTracking) {
                    const bbox = turf.bbox(route.geometry);
                    mapRef.current?.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], { padding: 100 });
                }
            } catch (err) {}
        };
        fetchOSRMRoute();
    }, [startLocation, endLocation, isTracking]);

    const handleMapClick = (evt) => { const { lng, lat } = evt.lngLat; setTempLocation({ longitude: lng, latitude: lat }); setPopupInfo(null); setIsTracking(false); };
    const confirmTempLocation = async (type) => {
        if (!tempLocation) return;
        let address = "Custom Location";
        try { const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${tempLocation.latitude}&lon=${tempLocation.longitude}`); const data = await res.json(); address = data.address.road || data.address.suburb || "Custom Location"; } catch (e) {}
        if (type === 'start') { setStartLocation(tempLocation); setStartQuery(address); } else { setEndLocation(tempLocation); setEndQuery(address); setIsNavExpanded(true); }
        setTempLocation(null); 
    };
    const handlePopupNavigate = (loc) => { setEndLocation({ longitude: loc.coordinates[1], latitude: loc.coordinates[0] }); setEndQuery(loc.name); setPopupInfo(null); setIsNavExpanded(true); if (userLocation) { setStartLocation(userLocation); setStartQuery("My Location"); setIsTracking(true); } };
    const getSuggestions = (query) => { if (!query) return []; return filteredLocations.filter(loc => loc.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4); };
    const handleManualSelect = (loc, type) => { if(type === 'start') { setStartLocation({longitude: loc.coordinates[1], latitude: loc.coordinates[0]}); setStartQuery(loc.name); } else { setEndLocation({longitude: loc.coordinates[1], latitude: loc.coordinates[0]}); setEndQuery(loc.name); } setActiveDropdown(null); }
    const toggleTracking = () => { const newState = !isTracking; setIsTracking(newState); if (newState && userLocation) { toast.success("Locating you..."); mapRef.current?.flyTo({ center: [userLocation.longitude, userLocation.latitude], zoom: 18 }); if (endLocation) { setStartLocation(userLocation); setStartQuery("My Location"); } } else if (!userLocation) { toast.error("Waiting for GPS..."); } };

    const pins = useMemo(() => filteredLocations.map((loc) => (
        <Marker key={loc.id} longitude={loc.coordinates[1]} latitude={loc.coordinates[0]} anchor="bottom" onClick={e => { e.originalEvent.stopPropagation(); handleLocationSelect(loc); }}>
            <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:scale-125 transition ${loc.category === 'Health' ? 'bg-red-500' : 'bg-blue-600'}`}>{loc.category.charAt(0)}</div>
        </Marker>
    )), [filteredLocations]);

    return (
        <div className="h-full w-full relative">
            <Map ref={mapRef} {...viewState} onMove={evt => { setViewState(evt.viewState); if (evt.originalEvent && isTracking) {} }} onClick={handleMapClick} style={{ width: '100%', height: '100%' }} mapStyle={currentStyle.url} minZoom={3} maxZoom={20} pitchWithRotate={true} dragRotate={true} attributionControl={false}>
                {pins}
                {userLocation && <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}><div className="relative"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-xl z-10 relative"></div><div className="w-12 h-12 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-30"></div></div></Marker>}
                {tempLocation && <Marker longitude={tempLocation.longitude} latitude={tempLocation.latitude} anchor="bottom"><div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center animate-bounce"><div className="w-2 h-2 bg-white rounded-full"></div></div></Marker>}
                {tempLocation && <Popup longitude={tempLocation.longitude} latitude={tempLocation.latitude} anchor="top" onClose={() => setTempLocation(null)} closeButton={false} className="z-50"><div className="flex flex-col gap-1 p-1 min-w-[120px]"><button onClick={() => confirmTempLocation('start')} className="px-3 py-2 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-600 rounded flex items-center gap-2 transition"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Set Start</button><div className="h-[1px] bg-gray-100 w-full"></div><button onClick={() => confirmTempLocation('end')} className="px-3 py-2 text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 rounded flex items-center gap-2 transition"><MapPin size={12} className="text-red-500"/> Set End</button></div></Popup>}
                {startLocation && (!userLocation || startLocation !== userLocation) && !isTracking && <Marker longitude={startLocation.longitude} latitude={startLocation.latitude} draggable={true} onDragEnd={(e) => setStartLocation({longitude: e.lngLat.lng, latitude: e.lngLat.lat})}><div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-xl"></div></Marker>}
                {endLocation && <Marker longitude={endLocation.longitude} latitude={endLocation.latitude} anchor="bottom"><MapPin size={32} className="text-red-600 fill-red-100 drop-shadow-lg animate-bounce" /></Marker>}
                {routeGeoJSON && <Source id="route-source" type="geojson" data={routeGeoJSON}><Layer {...routeLayerStyle} /></Source>}
                {popupInfo && <Popup anchor="top" longitude={popupInfo.coordinates[1]} latitude={popupInfo.coordinates[0]} onClose={() => setPopupInfo(null)} maxWidth="260px" closeButton={false} className="rounded-xl z-50 p-0 shadow-none border-none">
                    <LocationPopupContent loc={popupInfo} onNavigate={handlePopupNavigate} isSaved={savedLocations.some(l => l.id === popupInfo.id)} onToggleSave={onToggleSave} onRate={onRate} />
                </Popup>}
            </Map>
            <div className="absolute top-24 left-4 z-50 transition-all duration-300 ease-in-out">
                {!isNavExpanded ? <button onClick={() => setIsNavExpanded(true)} className="flex items-center gap-2 bg-white pl-2 pr-4 py-2 rounded-full shadow-xl border border-gray-100 hover:scale-105 active:scale-95 transition-all group"><div className="bg-green-600 text-white p-1.5 rounded-full shadow-sm group-hover:bg-green-700 transition"><Navigation2 size={16} fill="currentColor" /></div><span className="text-sm font-bold text-gray-800 whitespace-nowrap">{routeStats ? routeStats.time : "Navigate"}</span></button> : <div className="w-[85vw] max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-visible animate-in fade-in zoom-in-95 duration-200"><div className="flex items-center justify-between px-4 pt-3 pb-1"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Route Planner</span><button onClick={() => setIsNavExpanded(false)} className="bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition"><X size={14} /></button></div><div className="p-4 flex gap-3 items-stretch relative"><div className="flex flex-col items-center py-2 gap-1 pt-3"><Circle size={10} className="text-green-500 fill-green-500" /><div className="w-0.5 flex-1 bg-gray-200 rounded-full my-1"></div><MapPin size={14} className="text-red-500 fill-red-500" /></div><div className="flex-1 flex flex-col gap-4"><div className="relative"><input type="text" placeholder="Start..." className="w-full bg-gray-50 text-sm font-semibold p-3 rounded-xl outline-none" value={startQuery} onChange={(e) => { setStartQuery(e.target.value); setActiveDropdown('start'); }} onFocus={() => setActiveDropdown('start')} />{activeDropdown === 'start' && getSuggestions(startQuery).length > 0 && <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl border mt-2 z-[60]">{getSuggestions(startQuery).map(loc => <button key={loc.id} onClick={() => handleManualSelect(loc, 'start')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">{loc.name}</button>)}</div>}</div><div className="relative"><input type="text" placeholder="Destination..." className="w-full bg-gray-50 text-sm font-semibold p-3 rounded-xl outline-none" value={endQuery} onChange={(e) => { setEndQuery(e.target.value); setActiveDropdown('end'); }} onFocus={() => setActiveDropdown('end')} />{activeDropdown === 'end' && getSuggestions(endQuery).length > 0 && <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl border mt-2 z-[60]">{getSuggestions(endQuery).map(loc => <button key={loc.id} onClick={() => handleManualSelect(loc, 'end')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">{loc.name}</button>)}</div>}</div></div></div></div>}</div>
            <div className="absolute bottom-8 left-4 z-50 flex flex-col items-start gap-2">{isStyleMenuOpen && <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-1 flex flex-col gap-1 w-40 animate-in slide-in-from-bottom-5">{MAP_STYLES.map((style) => <button key={style.name} onClick={() => { setCurrentStyle(style); setIsStyleMenuOpen(false); }} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition ${currentStyle.name === style.name ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}`}><span>{style.icon}</span> {style.name}</button>)}</div>}<button onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)} className="bg-white p-3 rounded-full shadow-xl text-gray-700 border border-gray-100 flex items-center gap-2 font-bold pr-4 hover:bg-gray-50 active:scale-95 transition"><Layers size={20} /> <span className="text-sm hidden sm:inline">{currentStyle.name}</span></button></div>
            <div className="absolute bottom-32 right-4 z-40"><button onClick={toggleTracking} className={`p-3 rounded-xl shadow-xl border border-gray-100 transition active:scale-95 flex items-center justify-center ${isTracking ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:text-blue-600'}`}>{isTracking ? <Compass size={24} className="animate-pulse" /> : <Locate size={24} />}</button></div>
            <div className="absolute bottom-8 right-4 flex flex-col bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 z-40"><button onClick={() => mapRef.current?.zoomIn()} className="p-3 hover:bg-gray-50 text-gray-700 border-b border-gray-100"><Plus size={24} /></button><button onClick={() => mapRef.current?.zoomOut()} className="p-3 hover:bg-gray-50 text-gray-700"><Minus size={24} /></button></div>
        </div>
    );
};
export default MapComponent;