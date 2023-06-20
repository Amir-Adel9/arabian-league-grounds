'use client';
import Image from 'next/image';
import Link from 'next/link';

const HomeLiveMatchCard = ({ event }: { event: any }) => {
  if (event.type === 'show') {
    return (
      <Link
        href='https://lolesports.com/live/arabian_league/lolesports_ar'
        className='h-full'
        target={'_blank'}
      >
        <div
          className='relative border h-full border-red-700 flex animate-scale flex-col justify-between rounded-lg shadow-lg p-4 cursor-pointer duration-200  hover:scale-105'
          key={event.id}
        >
          <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg '></div>
          <Image
            src='/background.jpg'
            alt='Background Image'
            className='w-full h-full z-[5] rounded-lg'
            draggable={false}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
          <div className='flex flex-row items-center justify-center mb-4 z-20'>
            <div className='flex flex-col items-center'>
              <div className='absolute w-12 h-12 z-[200] top-6 left-5'>
                <Image
                  src='/al_logo.png'
                  alt=''
                  fill={true}
                  draggable={false}
                />
                <h3 className='text-xl font-bold mt-2 text-center'>
                  Arabian League Broadcast
                </h3>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center mb-2 z-20'></div>
          <div className='flex flex-row items-center justify-center z-20'>
            <p className=' flex items-center justify-center gap-x-1'>
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 15 15'
                version='1.1'
                id='circle'
                xmlns='http://www.w3.org/2000/svg'
                className='fill-red-700'
              >
                <path d='M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z' />
              </svg>
              <span className='font-bold text-2xl'>Live</span>
            </p>
          </div>
          <div className='flex justify-center mt-4 z-20'>
            <button className='bg-accent-gold text-white py-2 px-4 rounded flex items-center justify-center gap-x-2'>
              <span> Watch Now</span>

              <svg
                width=''
                height=''
                viewBox='0 0 24 20'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-[12px] h-[12px] md:w-[16px] md:h-[16px]'
              >
                <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                <polyline points='15 3 21 3 21 9' />
                <line x1={10} y1={14} x2={21} y2={3} />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href='https://lolesports.com/live/arabian_league/lolesports_ar'
      className='h-full'
      target={'_blank'}
    >
      <div
        className='relative border h-full border-red-700 flex animate-scale flex-col justify-between rounded-lg shadow-lg p-4 cursor-pointer duration-200  hover:scale-105'
        key={event.id}
      >
        <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg '></div>
        <Image
          src='/background.jpg'
          alt='Background Image'
          className='w-full h-full z-[5] rounded-lg'
          draggable={false}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
        <div className='flex flex-row items-center justify-center mb-4 z-20'>
          <div className='flex flex-col items-center'>
            <Image
              src={event.match.teams[0].image}
              alt={event.match.teams[0].name}
              width={100}
              height={100}
              draggable={false}
            />
            <h3 className='text-xl font-bold mt-2 text-center'>
              {event.match.teams[0].name}
            </h3>
          </div>
          <h3 className='text-xl font-bold text-center'>VS</h3>
          <div className='flex flex-col items-center'>
            <Image
              src={event.match.teams[1].image}
              alt={event.match.teams[1].name}
              width={100}
              height={100}
              draggable={false}
            />
            <h3 className='text-xl font-bold mt-2 text-center'>
              {event.match.teams[1].name}
            </h3>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center mb-2 z-20'></div>
        <div className='flex flex-row items-center justify-center z-20'>
          <p className=' flex items-center justify-center gap-x-1'>
            <svg
              width='20px'
              height='20px'
              viewBox='0 0 15 15'
              version='1.1'
              id='circle'
              xmlns='http://www.w3.org/2000/svg'
              className='fill-red-700'
            >
              <path d='M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z' />
            </svg>
            <span className='font-bold text-2xl'>Live</span>
          </p>
        </div>
        <div className='flex justify-center mt-4 z-20'>
          <button className='bg-accent-gold text-white py-2 px-4 rounded flex items-center justify-center gap-x-2'>
            <span> Watch Now</span>

            <svg
              width=''
              height=''
              viewBox='0 0 24 20'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-[12px] h-[12px] md:w-[16px] md:h-[16px]'
            >
              <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
              <polyline points='15 3 21 3 21 9' />
              <line x1={10} y1={14} x2={21} y2={3} />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HomeLiveMatchCard;
