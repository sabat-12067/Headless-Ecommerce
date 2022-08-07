import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

const Sort = ({
  setSortHighToLow,
  setSortLowToHigh,
  sortLowToHigh,
  sortHighToLow,
}) => {
  const handleSortingLowToHigh = () => {
    setSortHighToLow(false);
    setSortLowToHigh(!sortLowToHigh);
  };

  const handleSortingHighToLow = () => {
    setSortLowToHigh(false);
    setSortHighToLow(!sortHighToLow);
  };

  return (
    <section>
      <div className='mt-5'>
        <h3 className='pb-3 text-left md:text-xl'>Sort products by price</h3>
        <div className='flex justify-center'>
          <div
            className='flex mr-12 cursor-pointer items-center'
            onClick={handleSortingLowToHigh}>
            <div className='mr-2'>
              {sortLowToHigh ? (
                <MdCheckBox className='w-5 h-5' />
              ) : (
                <MdCheckBoxOutlineBlank className='w-5 h-5' />
              )}
            </div>
            <h4>low to high</h4>
          </div>
          <div
            className='flex cursor-pointer items-center'
            onClick={handleSortingHighToLow}>
            <div className='mr-2'>
              {sortHighToLow ? (
                <MdCheckBox className='w-5 h-5' />
              ) : (
                <MdCheckBoxOutlineBlank className='w-5 h-5' />
              )}
            </div>
            <h4>high to low</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sort;
