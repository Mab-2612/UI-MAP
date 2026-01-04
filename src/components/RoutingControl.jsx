import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import toast from 'react-hot-toast';

const RoutingControl = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const directLineRef = useRef(null); // Ref for the fallback "straight line"

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    if (hours > 0) return `${hours} hr ${minutes} min`;
    return `${minutes} min`;
  };

  // Function to draw a direct line (Crow Flies) if routing fails
  const drawDirectLine = () => {
    if (directLineRef.current) map.removeLayer(directLineRef.current);
    
    // Create a dashed red line to show "Direct Direction"
    const directLine = L.polyline([start, end], {
      color: '#ef4444', // Red for "Off-road"
      weight: 4,
      opacity: 0.7,
      dashArray: '10, 10', // Dashed line
      lineCap: 'round'
    }).addTo(map);
    
    directLineRef.current = directLine;
    
    // Fit bounds to show the line
    map.fitBounds(directLine.getBounds(), { padding: [50, 50] });

    // Calculate distance manually
    const distMeters = map.distance(start, end);
    const walkTimeMin = Math.round(distMeters / 80); // Avg walking speed ~80m/min

    toast(
      <div className="text-center">
        <p className="font-bold text-red-600">Off-Road Mode</p>
        <p className="text-xs">No official path found. Walk straight!</p>
        <p className="text-xs font-bold mt-1">~{walkTimeMin} min ({ (distMeters/1000).toFixed(2) } km)</p>
      </div>,
      { icon: '🧭', duration: 6000 }
    );
  };

  useEffect(() => {
    if (!map || !start || !end) return;

    // Clean up previous lines
    if (directLineRef.current) {
        map.removeLayer(directLineRef.current);
        directLineRef.current = null;
    }

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      
      // SWITCH TO BETTER WALKING SERVER
      router: L.Routing.osrmv1({
        serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1', // <--- BETTER FOR FOOTPATHS
        profile: 'foot'
      }),
      
      lineOptions: {
        styles: [
            { color: 'white', opacity: 0.8, weight: 8 }, // White Outline
            { color: '#2563eb', opacity: 1, weight: 5 }  // Blue Inner
        ]
      },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      containerClassName: 'hidden', // Hide default box
    })
    .on('routesfound', function(e) {
      const summary = e.routes[0].summary;
      const distKm = (summary.totalDistance / 1000).toFixed(2);
      
      // SANITY CHECK: If route is absurd (> 20km for campus), assume error & use direct line
      if (summary.totalDistance > 20000) {
          toast.error("Route too complex. Switching to direct mode.");
          routingControl.setWaypoints([]); // Clear weird route
          drawDirectLine();
          return;
      }

      toast.success(
        <div className="text-center">
          <p className="font-bold text-lg">{formatTime(summary.totalTime)} <span className="text-sm font-normal text-gray-500">({distKm} km)</span></p>
          <p className="text-xs text-gray-400">Follow the blue path</p>
        </div>,
        { duration: 5000, icon: '🚶' }
      );
    })
    .on('routingerror', function() {
      // IF ROUTING FAILS COMPLETELY -> FALLBACK TO DIRECT LINE
      console.warn("OSRM Failed. Using fallback.");
      drawDirectLine();
    });

    routingControl.addTo(map);
    routingControlRef.current = routingControl;

    return () => {
      try {
        if (map && routingControlRef.current) {
            map.removeControl(routingControlRef.current);
            routingControlRef.current = null;
        }
        if (map && directLineRef.current) {
            map.removeLayer(directLineRef.current);
            directLineRef.current = null;
        }
      } catch (e) { console.warn("Cleanup warning", e); }
    };
  }, [map, start, end]);

  return null;
};

export default RoutingControl;