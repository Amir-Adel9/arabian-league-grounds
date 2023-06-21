'use client';
import Image from 'next/image';

function error() {
  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      <section className='w-full min-h-screen relative flex flex-col justify-center items-center'>
        <div className='relative z-10 flex flex-col items-center justify-center'>
          <Image
            src='/dinger.gif'
            alt='dinger Image'
            width={260}
            height={260}
            draggable={false}
          />
          <h1 className='text-5xl font-bold text-accent-gold text-center'>
            This page has encountered an error
          </h1>
          <p className='text-2xl text-accent-gold text-center'>
            Please check back later
          </p>
          <p className='text-accent-gold text-center'></p>
        </div>
      </section>
    </main>
  );
}

export default error;
