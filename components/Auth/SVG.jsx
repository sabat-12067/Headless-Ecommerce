import React from 'react'

const SVG = () => {
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 300 200'
        className='absolute top-0 sm:hidden'>
        <path
          fill='#f0f9ff'
          fillOpacity='1'
          d='M0,320L80,282.7C160,245,320,171,480,160C640,149,800,203,960,229.3C1120,256,1280,256,1360,256L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'></path>
      </svg>
      {/*SVG for small screens */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 450 240'
        className='absolute top-0 hidden sm:block md:hidden'>
        <path
          fill='#f0f9ff'
          fillOpacity='1'
          d='M0,320L80,282.7C160,245,320,171,480,160C640,149,800,203,960,229.3C1120,256,1280,256,1360,256L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'></path>
      </svg>
      {/*SVG for medium screens */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 900 330'
        className='absolute top-0 hidden md:block'>
        <path
          fill='#f0f9ff'
          fillOpacity='1'
          d='M0,256L80,213.3C160,171,320,85,480,90.7C640,96,800,192,960,224C1120,256,1280,224,1360,208L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'></path>
      </svg>
    </div>
  );
}

export default SVG