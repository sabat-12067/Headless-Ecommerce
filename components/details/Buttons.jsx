import { useState } from 'react';
import Alert from '../Auth/Alert';
import CTAButtons from './CTAButtons';
import QuantityButtons from './QuantityButtons';
import FavoritesButton from './FavoritesButton';

export default function Buttons({ singleProduct, productId }) {
  const [alert, setAlert] = useState({
    type: '',
    show: false,
    msg: '',
  });

  console.log('Buttons component rendered');

  // console.log('is Add To Cart Button Clicked:', isAddToCartClicked);

  return (
    <section className='px-4'>
      <div className='w-full left-0 fixed top-0 z-50'>
        {alert.show && <Alert alert={alert} setAlert={setAlert} />}
      </div>
      <div className='flex items-center justify-between'>
        <QuantityButtons />
        <FavoritesButton
          singleProduct={singleProduct}
          productId={productId}
          setAlert={setAlert}
        />
      </div>
      <CTAButtons
        singleProduct={singleProduct}
        productId={productId}
        setAlert={setAlert}
      />
    </section>
  );
}
