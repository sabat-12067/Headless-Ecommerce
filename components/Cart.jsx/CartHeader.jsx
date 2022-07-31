import Alert from '../Auth/Alert';

const CartHeader = ({
  alert,
  setAlert,
  numberOfCartItems,
  formattedTotalPriceOfAllItems,
}) => {
  return (
    <div className='w-full'>
      <h3 className='self-start pb-3'>cart summary</h3>
      <div className='w-full left-0 absolute top-0 z-50'>
        {alert.show && <Alert alert={alert} setAlert={setAlert} />}
      </div>
      <div className='flex w-full justify-between font-bold border-b-[1px]'>
        <p>
          {numberOfCartItems} Item{numberOfCartItems > 1 ? 's' : null} added
        </p>
        <p className='text-secondary-7'>USD {formattedTotalPriceOfAllItems}</p>
      </div>
    </div>
  );
};

export default CartHeader;
