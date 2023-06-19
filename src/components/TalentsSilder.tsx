import Link from 'next/link';
import Image from 'next/image';

const Slider = ({ talentsArray }: { talentsArray: any }) => {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-center gap-5'>
      {talentsArray.map((talent: any, index: any) => (
        <Link
          key={index}
          href={talent.twitterUrl}
          target='_blank'
          className=' relative border-2 w-[90%] bg-primary border-accent-gold flex  flex-col justify-between rounded-lg shadow-lg p-4 cursor-pointer duration-200  hover:scale-105'
        >
          <Image
            src={talent.imageUrl}
            alt={talent.name}
            width={160}
            height={160}
            draggable={false}
            className='w-40 h-40 mx-auto rounded-full object-cover mb-4 border-2 border-accent-gold'
          />
          <h2 className='text-secondary text-lg font-medium text-center'>
            {talent.name}
          </h2>
          <p className='text-sm text-accent-gold text-center'>{talent.role}</p>
          <div className='text-accent-blue p-4 rounded-md text-sm hover:underline transition-colors duration-200 text-center'>
            Twitter
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Slider;
