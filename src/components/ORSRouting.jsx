import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import toast from 'react-hot-toast';

const ORSRouting = ({ start, end }) => {
  const map = useMap();
  const routeLayerRef = useRef(null);

  // --- 1. TIME FORMATTER (e.g. 70 mins -> 1 hr 10 min) ---
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  // --- 2. DIRECT LINE FALLBACK (Red Dotted Line) ---
  const drawDirectLine = (startLatLng, endLatLng, reason = "Shortcut") => {
    if (routeLayerRef.current) map.removeLayer(routeLayerRef.current);

    // Draw Red Dashed Line
    const directLine = L.polyline([startLatLng, endLatLng], {
      color: '#ef4444', 
      weight: 5,
      opacity: 0.8,
      dashArray: '10, 10', 
      lineCap: 'round'
    }).addTo(map);
    
    routeLayerRef.current = directLine;
    map.fitBounds(directLine.getBounds(), { padding: [50, 50] });

    // Calculate Manual Time (Avg Walking Speed: 80 meters/min)
    const distMeters = map.distance(startLatLng, endLatLng);
    const walkTimeSeconds = Math.round(distMeters / 1.3); // 1.3 m/s
    const distKm = (distMeters / 1000).toFixed(2);

    toast.success(
      <div className="text-center">
        <p className="font-bold text-lg">{formatTime(walkTimeSeconds)} <span className="text-sm font-normal text-gray-500">({distKm} km)</span></p>
        <p className="text-xs text-red-500 font-bold">Direct Path (Smart Mode)</p>
        <p className="text-[10px] text-gray-400 mt-1">Map data incomplete here, walk straight.</p>
      </div>,
      { duration: 6000, icon: '🧭' }
    );
  };

  useEffect(() => {
    if (!map || !start || !end) return;

    const fetchRoute = async () => {
      const toastId = toast.loading("Analyzing paths...");
      
      try {
        const startLatLng = L.latLng(start[0], start[1]);
        const endLatLng = L.latLng(end[0], end[1]);

        // Calculate Straight Line Distance (Crow Flies)
        const straightDist = map.distance(startLatLng, endLatLng);

        const startCoords = `${start[1]},${start[0]}`;
        const endCoords = `${end[1]},${end[0]}`;
        const apiKey = import.meta.env.VITE_ORS_API_KEY;

        const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${startCoords}&end=${endCoords}`;

        const response = await fetch(url);
        const data = await response.json();

        // VALIDATION: If API fails or returns weird data
        if (!data.features || data.features.length === 0) {
            throw new Error("No route found");
        }

        const summary = data.features[0].properties.summary;
        const routeDist = summary.distance; // meters

        // --- 3. DETOUR CHECK ---
        // If the route is > 2x longer than straight line, the map is likely missing a gate/path.
        // Force "Direct Mode" instead of sending student around the whole city.
        if (routeDist > straightDist * 2 && straightDist < 1000) { 
            toast.dismiss(toastId);
            console.warn("Route detour detected. Switching to direct.");
            drawDirectLine(startLatLng, endLatLng);
            return;
        }

        // --- 4. DRAW NORMAL BLUE ROUTE ---
        const coords = data.features[0].geometry.coordinates;
        const latLngs = coords.map(c => [c[1], c[0]]);
        const durationMin = formatTime(summary.duration);
        const distKm = (summary.distance / 1000).toFixed(2);

        if (routeLayerRef.current) map.removeLayer(routeLayerRef.current);

        // "Glow" Effect
        const outerLine = L.polyline(latLngs, { color: 'white', weight: 8, opacity: 0.8 });
        const innerLine = L.polyline(latLngs, { color: '#2563eb', weight: 5, opacity: 1 });
        
        routeLayerRef.current = L.layerGroup([outerLine, innerLine]).addTo(map);
        map.fitBounds(innerLine.getBounds(), { padding: [50, 50] });

        toast.dismiss(toastId);
        toast.success(
            <div className="text-center">
                <p className="font-bold text-lg">{durationMin} <span className="text-sm font-normal text-gray-500">({distKm} km)</span></p>
                <p className="text-xs text-blue-500 font-bold">Official Path</p>
            </div>, 
            { icon: '🚶' }
        );

      } catch (error) {
        // Fallback if API fails (Network error, quota exceeded, etc.)
        toast.dismiss(toastId);
        const startLatLng = L.latLng(start[0], start[1]);
        const endLatLng = L.latLng(end[0], end[1]);
        drawDirectLine(startLatLng, endLatLng);
      }
    };

    fetchRoute();

    return () => {
      if (map && routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
      }
    };
  }, [map, start, end]);

  return null;
};

export default ORSRouting;