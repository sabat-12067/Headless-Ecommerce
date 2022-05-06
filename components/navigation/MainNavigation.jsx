import { useEffect, useState } from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

export default function MainNavigation() {
  const [deviceWidth, setDeviceWidth] = useState('');
  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  // console.log(deviceWidth);

  return (
    <nav className='relative z-30'>
      {deviceWidth >= 800 ? <DesktopNavigation /> : <MobileNavigation />}
    </nav>
  );
}
