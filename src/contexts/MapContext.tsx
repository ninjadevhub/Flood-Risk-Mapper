import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ZoneType = '100-year' | '500-year'
interface MapContextType {
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
  selectedZone: GeoJSON.Feature | null;
  setSelectedZone: (zone: GeoJSON.Feature | null) => void;
  selectedZoneType: ZoneType | null;
  setSelectedZoneType: (zoneType: ZoneType | null) => void;
}

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });

  const [selectedZone, setSelectedZone] = useState<GeoJSON.Feature | null>(null);
  const [selectedZoneType, setSelectedZoneType] = useState<ZoneType | null>(null);

  return (
    <MapContext.Provider
      value={{
        viewport,
        setViewport,
        selectedZone,
        setSelectedZone,
        selectedZoneType,
        setSelectedZoneType,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};