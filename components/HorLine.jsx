
const HorLine = () => {
  return (
    <div className='md:absolute top-2 flex items-center justify-center left-0 w-full'>
      <hr className='w-28 md:w-44 m-8' />
    </div>
  );
}

export const formatprice = (price) => {
  return ((price * 100) / 100).toFixed(2);
}

export default HorLine