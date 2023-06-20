import Image from 'next/image';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import HeroNavArrow from '@/components/HeroNavArrow';
import ViewSchedule from '@/components/ViewSchedule';
import TalentsSlider from '@/components/TalentsSilder';
import { talentsArray } from '@/utils/talents';

import { currentUser } from '@clerk/nextjs';
import { db } from '@/db';

import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import HomeMatchCard from '@/components/HomeMatchCard';
import HomeLiveMatchCard from '@/components/HomeLiveMatchCard';
import { requestParams } from '@/utils/requestParams';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

export default async function Home() {
  const loggedInUser = await currentUser();

  if (loggedInUser) {
    const { id, username } = loggedInUser;
    console.log(id, username);

    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.clerkId, id));
    console.log('existingUser', existingUser);

    if (existingUser.length === 0) {
      const newUser = await db
        .insert(user)
        .values({ clerkId: id, username: username });
      console.log('newUser', newUser);
    }
  }

  const upcomingMatches = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())
    .then((upcomingMatches) => {
      const unStartedMatchesWithin7Days = upcomingMatches.data.schedule.events
        .filter((event: any) => {
          const matchState = event.state;

          return matchState === 'unstarted' || matchState === 'inProgress';
        })
        .slice(0, 8);
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
          draggable={false}
          objectPosition='center'
        />
        <Image
          src='/al_logo_black.png'
          alt='Arabian League Logo'
          width={160}
          height={160}
          draggable={false}
          className='z-[10] duration-200 animate-bounce-y mt-24 sm:mt-20'
        />
        <div className='flex flex-col gap-5 items-center justify-center bg-transparent rounded-[20px] mt-20 animate-opacity'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight'>
            Welcome to the
            <span className='text-accent-blue'> Arabian League</span> Grounds!
          </h1>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center'>
            Your all-in-one
            <span className='text-accent-gold'> Arabian League </span>
            companion.
          </h2>
        </div>
        <div className='mt-10 sm:mt-28'>
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
          <div className='relative w-[85%] bg-secondary text-primary p-4 xs:p-8 rounded-lg shadow-lg'>
            <ViewSchedule />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {upcomingMatches.map((event: any) => {
                const matchState = event.state;
                if (matchState === 'unstarted') {
                  return <HomeMatchCard event={event} key={event.match.id} />;
                } else if (matchState === 'inProgress') {
                  return (
                    <HomeLiveMatchCard event={event} key={event.match.id} />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>
      <section
        className='w-full min-h-[70vh] relative flex flex-col justify-start items-center bg-gradient-to-b from-accent-gold to-primary mb-10 lg:mb-0'
        id='talents'
      >
        <h2 className='text-primary font-bold text-3xl mb-4 mt-20 lg:mt-0 '>
          Talents
        </h2>
        <div className='relative w-[85%] bg-secondary text-primary p-8 rounded-lg shadow-lg '>
          <TalentsSlider talentsArray={talentsArray} />
        </div>
      </section>
      hi
    </main>
  );
}
