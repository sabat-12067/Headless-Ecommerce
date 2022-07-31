const Total = ({ total }) => {
  return (
    <div className='flex w-full justify-between font-semibold py-2 border-white border-t-[1px] text-secondary-8'>
      <p className=''>Total</p>
      <p className='text-lg'>${total}</p>
    </div>
  );
};

export default Total;