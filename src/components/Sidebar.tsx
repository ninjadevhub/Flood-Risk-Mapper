import { useMapContext } from '@/contexts/MapContext';
import { Switch } from './ui/switch';


const Sidebar: React.FC = ({ }) => {
  const { selectedZoneType, setSelectedZoneType } = useMapContext();
  return (
    <div className="flex flex-col p-4 bg-gray-800 text-white w-full h-full">
      <h2 className="text-xl font-bold mb-4">Flood Zones</h2>

      <div className="flex items-center mb-4">
        <Switch
          checked={selectedZoneType === '100-year'}
          onCheckedChange={(checked) => {
            setSelectedZoneType(checked ? '100-year' : null);
          }}
          className="data-[state=checked]:bg-[#FF0000] data-[state=unchecked]:bg-gray-400" 
        />
        <label className="ml-2">100-Year</label>
      </div>

      <div className="flex items-center">
        <Switch
          checked={selectedZoneType === '500-year'}
          onCheckedChange={(checked) => {
            setSelectedZoneType(checked ? '500-year' : null);
          }}
          className="data-[state=checked]:bg-[#0000FF] data-[state=unchecked]:bg-gray-400" 
        />
        <label className="ml-2">500-Year</label>
      </div>
    </div>
  );
};

export default Sidebar;