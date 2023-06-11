import './globals.css';
import { ClerkProvider, SignInButton, UserButton } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Kanit } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Arabian League Grounds',
  description: 'Arabian League Grounds',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return (
    <ClerkProvider>
      <html
        lang='en'
        className={`${inter.variable} ${kanit.variable} font-kanit`}
      >
        <body className={kanit.variable}>
          <header
            className='h-24 fixed w-screen bg-secondary text-primary font-inter flex items-center justify-between px-10 z-50 border-b-[6px] border-b-accent-gold'
            id='header'
          >
            <div className='flex justify-center items-center'>
              <Image
                src='/al_logo.png'
                alt=''
                width={52}
                height={52}
                draggable={false}
              />
              <h1 className='font-bold duration-300 cursor-pointer  hover:text-accent-gold'>
                <Link href='/'>Arabian League Grounds</Link>
              </h1>
            </div>
            <nav className='flex justify-center items-center pr-[5%]'>
              <ul className='flex items-center gap-10'>
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
          </header>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
