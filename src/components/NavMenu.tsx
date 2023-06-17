'use client';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const NavMenu = () => {
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='flex lg:hidden '>
      <div
        className={`fixed w-full h-full bg-secondary z-[50] top-0 left-0 rounded-lg ${
          !menuOpen ? 'opacity-0' : 'opacity-80'
        } duration-500 `}
      ></div>
      <div
        className={` bg-secondary top-0 z-[80] fixed h-screen w-full md:w-1/2 right-0 duration-500 ${
          !menuOpen ? 'translate-x-[96rem]' : 'translate-x-0'
        } flex flex-col justify-center items-start gap-6 text-primary font-bold text-2xl px-6 py-10 overflow-hidden`}
      >
        <div className='absolute w-12 h-12 z-[150] top-6 left-5'>
          <Image src='/al_logo.png' alt='' fill={true} draggable={false} />
        </div>
        <ul className='flex flex-col items-start justify-between h-1/2 gap-6 w-full'>
          <li className='relative mr-5 duration-300 cursor-pointer hover:bg-[#222] w-full rounded p-5 after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-4 hover:after:w-full'>
            <Link href='/schedule'>Schedule</Link>
          </li>
          <li className='relative mr-5 duration-300 cursor-pointer hover:bg-[#222] w-full rounded p-5 after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-4 hover:after:w-full'>
            <Link href='/standings'>Standings</Link>
          </li>
          <li className='relative mr-5 duration-300 cursor-pointer hover:bg-[#222] w-full rounded p-5 after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-4 hover:after:w-full'>
            Rewards
          </li>
          <li className='relative mr-5 duration-300 cursor-pointer hover:bg-[#222] w-full rounded p-5 after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-4 hover:after:w-full'>
            About
          </li>
          <li>
            {!user ? (
              <div className='bg-accent-gold p-2 px-6 border border-accent-gold cursor-pointer rounded font-bold font-kanit duration-200 hover:bg-secondary'>
                <SignInButton />
              </div>
            ) : (
              <UserButton />
            )}
          </li>
        </ul>
      </div>

      {!menuOpen ? (
        <svg
          width='42px'
          height='42px'
          viewBox='0 0 1024 1024'
          className='fill-primary z-[90] cursor-pointer hover:bg-[#222] rounded p-2'
          xmlns='http://www.w3.org/2000/svg'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <path d='M27 193.6c-8.2-8.2-12.2-18.6-12.2-31.2s4-23 12.2-31.2S45.6 119 58.2 119h912.4c12.6 0 23 4 31.2 12.2s12.2 18.6 12.2 31.2-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2zm974.8 285.2c8.2 8.2 12.2 18.6 12.2 31.2s-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2S14.8 522.6 14.8 510s4-23 12.2-31.2 18.6-12.2 31.2-12.2h912.4c12.6 0 23 4 31.2 12.2zm0 347.4c8.2 8.2 12.2 18.6 12.2 31.2s-4 23-12.2 31.2-18.6 12.2-31.2 12.2H58.2c-12.6 0-23-4-31.2-12.2S14.8 870 14.8 857.4s4-23 12.2-31.2S45.6 814 58.2 814h912.4c12.6 0 23 4.2 31.2 12.2z' />
        </svg>
      ) : (
        <svg
          width='42px'
          height='42px'
          viewBox='0 0 24 24'
          className='fill-primary z-[90] cursor-pointer hover:bg-[#222] rounded p-2'
          xmlns='http://www.w3.org/2000/svg'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <g id='Complete'>
            <g id='x'>
              <g>
                <line
                  x1='5'
                  y1='4.8'
                  x2='19'
                  y2='19.2'
                  className='stroke-primary z-[90]'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                />
                <line
                  x1='19'
                  y1='4.8'
                  x2='5'
                  y2='19.2'
                  className='stroke-primary z-[90]'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </nav>
  );
};

export default NavMenu;
