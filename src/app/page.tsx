import STLViewer from '@/components/HeaderLogo';
import Image from 'next/image';

// import React, { useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import HeroNavArrow from '@/components/HeroNavArrow';
import ViewSchedule from '@/components/ViewSchedule';
import TalentsSlider from '@/components/TalentsSilder';
import { talentsArray } from '@/utils/talents';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

export default async function Home() {
  try {
    // Code that triggers the error in the Server Components render
  } catch (error: any) {
    console.error('Error:', error.message);
    console.log('Digest:', error.digest);
    // Handle the error or display an error message to the user
  }
  const upcomingMatches = await fetch(
    'https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=109545772895506419',
    {
      headers: {
        'x-api-key': `${process.env.API_KEY}`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
      },
      referrer: 'https://lolesports.com/',
      method: 'GET',
      mode: 'cors',
    }
  )
    .then((res) => res.json())
    .then((upcomingMatches) => {
      const unStartedMatchesWithin7Days =
        upcomingMatches.data.schedule.events.filter((event: any) => {
          const now = dayjs.utc();
          const targetDate = dayjs.utc(event.startTime);
          const duration = dayjs.duration(targetDate.diff(now));

          return event.state === 'unstarted' && duration.asDays() < 8;
        });
      return unStartedMatchesWithin7Days;
    });

  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      <section className='w-full min-h-screen relative flex flex-col justify-center items-center'>
        <div className='absolute w-full h-full bg-primary opacity-80 z-[-10]'></div>
        <Image
          src='/background.jpg'
          alt='Background Image'
          className='w-full h-full z-[-20]'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
        <STLViewer />
        <div className='flex flex-col gap-5 items-center justify-center bg-transparent rounded-[20px]  '>
          <h1 className='text-5xl font-bold text-center leading-tight'>
            Welcome to the
            <span className='text-accent-blue'> Arabian League</span> Grounds!
          </h1>
          <h2 className='text-3xl font-bold text-center'>
            Your all-in-one
            <span className='text-accent-gold'> Arabian League </span>
            companion.
          </h2>
        </div>
        <div className='mt-28'>
          <HeroNavArrow />
        </div>
      </section>
      <section
        className='w-full min-h-screen relative flex flex-col justify-center items-center bg-gradient-to-b from-primary to-accent-gold'
        id='upcoming-matches'
      >
        <div className='w-full flex flex-col items-center justify-center'>
          <h2 className='text-accent-gold font-bold text-3xl mb-4'>
            Upcoming Matches
          </h2>
          <div className='relative w-[85%] bg-secondary text-primary p-8 rounded-lg shadow-lg'>
            <ViewSchedule />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {upcomingMatches.map((event: any) => {
                const now = dayjs.utc();
                const targetDate = dayjs.utc(event.startTime);
                const duration = dayjs.duration(targetDate.diff(now));
                const daysUntilMatch = duration.asDays();

                const formattedDate = dayjs(targetDate).format(
                  'DD/MM/YYYY HH:mm:ss'
                );
                return (
                  <div
                    className='relative border  border-accent-gold flex  flex-col justify-between rounded-lg shadow-lg p-4 cursor-pointer duration-200  hover:scale-105'
                    key={event.id}
                  >
                    <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg '></div>
                    <Image
                      src='/background.jpg'
                      alt='Background Image'
                      className='w-full h-full z-[5] rounded-lg'
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
                    <div className='flex flex-row items-center justify-center mb-2 z-20'>
                      <h3 className='text-lg font-bold'>
                        {daysUntilMatch > 0
                          ? `Match in ${daysUntilMatch.toFixed(0)} days`
                          : 'Match happening soon'}
                      </h3>
                    </div>
                    <div className='flex flex-row items-center justify-center z-20'>
                      <p className='text-accent-gold'>Date: {formattedDate}</p>
                    </div>
                    <div className='flex justify-center mt-4 z-20'>
                      <button className='bg-accent-gold text-white py-2 px-4 rounded'>
                        Predict Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section
        className='w-full min-h-screen relative flex flex-col justify-center items-center bg-gradient-to-b from-accent-gold to-primary'
        id='talents'
      >
        <div className='relative w-[85%] bg-secondary text-primary p-8 rounded-lg shadow-lg'>
          <TalentsSlider talentsArray={talentsArray} />
        </div>
      </section>
    </main>
  );
}
