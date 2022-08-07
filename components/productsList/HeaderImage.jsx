import Image from "next/image";

const HeaderImage = ({ productsData }) => {
  const categoryName = productsData.attributes.name;
  const imageUrl = productsData.attributes.image.data[0].attributes.url;
  return (
    <div className='md:mt-8 flex justify-center relative bg-white max-w-[1120px] mx-auto'>
      <div>
        <Image
          src={imageUrl}
          alt={`Image of ${categoryName}`}
          width={400}
          height={400}
        />
      </div>
      <h1 className='absolute text-6xl md:text-7xl left-5 top-16'>
        {categoryName}
      </h1>
    </div>
  );
};

export default HeaderImage;
