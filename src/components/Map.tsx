/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import axios from 'axios';
import { useMapContext, ZoneType } from '@/contexts/MapContext';

const Map: React.FC = () => {
  const { selectedZoneType } = useMapContext();
  const [floodData, setFloodData] = useState<any[]>([]);
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const apiCallScheduledId = useRef<NodeJS.Timeout>()


  const fetchFloodData = async (bbox: number[]) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAP_API_BASE_URL}arcgis/rest/services/public/NFHL/MapServer/28/query`,
        {
          params: {
            f: 'geojson',
            where: '1=1',
            outFields: '*',
            returnGeometry: true,
            geometryType: 'esriGeometryPolygon',
            resultRecordCount: 100,
            bbox: bbox.join(','),
          },
        }
      );

      const geojsonFeatures = response.data.features.map((feature: any) => {
        // Assign zone randomly to '100-year' or '500-year'
        const randomZone: ZoneType = Math.random() < 0.5 ? '100-year' : '500-year';
        const zone = feature.attributes?.ZONE || selectedZoneType ? randomZone : 'Unknow Zone';
        let coordinates = [];
        if (feature.geometry.type === 'Polygon') {
          coordinates = feature.geometry.coordinates;
        } else if (feature.geometry.type === 'MultiPolygon') {
          coordinates = feature.geometry.coordinates.flat();
        }

        return {
          type: 'Feature',
          zone,
          properties: {
            ...feature.properties,
            ZONE: zone,
          },
          geometry: {
            ...feature.geometry,
            type: feature.geometry.type,
            coordinates: coordinates,
          },
        };
      });

      setFloodData(geojsonFeatures.filter(gf => gf.zone === selectedZoneType));
    } catch (error) {
      console.error('Error fetching flood data:', error);
    }
  };

  useEffect(() => {
    if (apiCallScheduledId.current) clearTimeout(apiCallScheduledId.current)
    apiCallScheduledId.current = setTimeout(() => {
      const { longitude, latitude } = viewport;
      const bbox = [
        longitude - 0.1,
        latitude - 0.1,
        longitude + 0.1,
        latitude + 0.1,
      ];
      fetchFloodData(bbox);
    }, 1 * 1000)

  }, [selectedZoneType]);


  const handleMapClick = (event: any) => {
    const features = event.features;
    if (features && features.length > 0) {
      const clickedFeature = features.find((f) => f.layer.id === 'flood-zone-layer');
      if (clickedFeature) {
        setSelectedZone({ ...clickedFeature, x: event.point.x, y: event.point.y });
        return
      }
    }
    setSelectedZone(null)
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/light-v10"
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onClick={handleMapClick}
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      interactiveLayerIds={['flood-zone-layer']}
    >
      {floodData.length > 0 && (
        <Source id="flood-zones" type="geojson" data={{ type: 'FeatureCollection', features: floodData }}>
          <Layer
            id="flood-zone-layer"
            type="fill"
            paint={{
              'fill-color': [
                'case',
                ['==', ['get', 'ZONE'], '100-year'], '#FF0000', // Red for 100-year flood zone
                ['==', ['get', 'ZONE'], '500-year'], '#0000FF', // Blue for 500-year flood zone
                '#00FF00', // Green for other zones (or Unknown)
              ],
              'fill-opacity': 0.5,
              'fill-outline-color': '#000000', // Black outline for visibility
            }}
            interactive={true}
          />
        </Source>
      )}

      {selectedZone && (
        <div className="tooltip rounded-md p-5 bg-black opacity-75 text-white" style={{ left: selectedZone.x, top: selectedZone.y, position: 'absolute', zIndex: 100 }}>
          <p className='text-xl font-semibold'>Flood Zone: {selectedZone.properties.ZONE}</p>
          {
            Object.keys(selectedZone.properties).map((k) => 
              <p key={k} className='text-xs font-semibold'>{k}:{selectedZone.properties[k]}</p>
            )
          }
        </div>
      )}

    </ReactMapGL>
  );
};

export default Map;