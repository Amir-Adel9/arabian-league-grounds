'use client';
import { useState } from 'react';
import Image from 'next/image';

const Slider = ({ talentsArray }: { talentsArray: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? talentsArray.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === talentsArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='flex overflow-x-auto space-x-4'>
        {talentsArray.map((talent: any, index: any) => (
          <div key={index} className='bg-white rounded-lg shadow p-4'>
            <Image
              src={talent.imageUrl}
              alt={talent.name}
              width={160}
              height={160}
              className='w-40 h-40 mx-auto rounded-full object-cover mb-4'
            />
            <h2 className='text-secondary text-lg font-medium text-center'>
              {talent.name}
            </h2>
            <p className='text-sm text-accent-gold text-center'>
              {talent.role}
            </p>
            <div className='flex justify-center mt-4'>
              <a
                href={talent.twitterUrl}
                target='_blank'
                rel='noopener noreferrer'
                className=' text-accent-blue px-4 py-2 rounded-md text-sm hover:underline transition-colors duration-200'
              >
                Twitter
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
