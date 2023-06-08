import './globals.css';
import { Inter, Kanit } from 'next/font/google';
import Image from 'next/image';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.variable} ${kanit.variable}`}>
      <body className={kanit.variable}>
        <header className='h-24 fixed w-screen bg-secondary text-primary font-inter flex items-center justify-between px-10 z-50 border-b-[6px] border-b-accent-gold'>
          <div className='flex justify-center items-center'>
            <Image
              src='/al_logo.png'
              alt=''
              width={52}
              height={52}
              draggable={false}
            />
            <h1 className='font-bold duration-300 cursor-pointer  hover:text-accent-gold'>
              Arabian League Grounds
            </h1>
          </div>
          <nav className='flex justify-center items-center pr-[5%]'>
            <ul className='flex gap-10'>
              <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
                Schedule
              </li>
              <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
                Teams
              </li>
              <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
                Standings
              </li>
              <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
                Stats
              </li>
              <li className='relative mr-5 duration-300 cursor-pointer hover:text-accent-gold after:content-[""] after:bg-accent-gold after:rounded-sm after:duration-300 after:md:h-1 after:h-1 after:w-[0%] after:left-0 after:absolute after:-bottom-1 after:md:-bottom-2 hover:after:w-full'>
                About
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
