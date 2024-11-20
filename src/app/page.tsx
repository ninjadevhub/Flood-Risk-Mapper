"use client"
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Map from '@/components/Map';
import { MapProvider } from '@/contexts/MapContext';

const Home: React.FC = () => {

  return (
    <MapProvider>
      <div className="grid grid-cols-10 h-full">
        <div className='col-span-2'>
          <Sidebar />
        </div>
        <div className='col-span-8 relative'>
          <Map />
        </div>
      </div>
    </MapProvider>
  );
};

export default Home;