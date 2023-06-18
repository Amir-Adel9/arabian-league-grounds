import '../globals.css';
import { SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs';
import NavMenu from '@/components/NavMenu';

export const metadata = {
  title: 'Arabian League Grounds',
  description:
    'Your all-in-one Arabian League companion. Teams, Schedule, Standings, Rewards, and more!',
};

export default async function PredictLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <>
      <header
        className='h-24 fixed w-full bg-secondary text-primary font-inter flex items-center justify-between px-2 xs:px-6 lg:px-10 z-[500] border-b-[6px border-b-primary'
        id='header'
      >
        <Link href='/'>
          <div className='flex justify-center items-center mr-2'>
            <div className='relative w-8 h-8 sm:w-12 sm:h-12 mr-1'>
              <Image src='/al_logo.png' alt='' fill={true} draggable={false} />
            </div>

            <h1 className='font-bold duration-300 cursor-pointer hover:text-accent-gold text-xs xs:text-base md:text-base'>
              Arabian League Grounds
            </h1>
          </div>
        </Link>
        <nav className='hidden lg:flex justify-center items-center pr-[5%]'>
          <ul className='flex items-center gap-6'>
            <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
              <Link href='/schedule'>Schedule</Link>
            </li>
            <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
              <Link href='/standings'>Standings</Link>
            </li>
            <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
              Rewards
            </li>
            <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
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
        </nav>
        <NavMenu />
      </header>
      {children}
    </>
  );
}
