import { useEffect, useState } from 'react';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { useSelector } from 'react-redux';

export default function MainNavigation() {
  
  const [deviceWidth, setDeviceWidth] = useState('');
  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  // console.log(deviceWidth);

  const quantity = useSelector((state) => state.quantityValue.quantity);

  return (
    <nav className='relative z-30'>
      {deviceWidth >= 800 ? (
        <DesktopNavigation quantity={quantity} />
      ) : (
        <MobileNavigation quantity={quantity} />
      )}
    </nav>
  );
}
