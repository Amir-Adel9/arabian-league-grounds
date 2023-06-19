import Image from 'next/image';

async function About() {
  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      <section className='w-full min-h-screen relative flex flex-col justify-center items-center'>
        <div className='absolute w-full h-full bg-accent-blue opacity-80 z-[-10]'></div>
        <Image
          src='/background.jpg'
          alt='Background Image'
          className='w-full h-full z-[-20]'
          layout='fill'
          objectFit='cover'
          draggable={false}
          objectPosition='center'
        />
        <div className='relative z-10 flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-bold text-white text-center'>
            About the Arabian League
          </h1>
          <p className='text-xl text-white text-center'>
            The Arabian League is a community of players from the Middle East
            and North Africa who play League of Legends.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
