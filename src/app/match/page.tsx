import Image from 'next/image';

import { currentUser } from '@clerk/nextjs';
import { requestParams } from '@/utils/requestParams';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import EventPredictionModule from '@/components/EventPredictionModule';
import { db } from '@/db';
import { prediction } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

async function Predict(props: any) {
  const { searchParams } = props;

  if (!searchParams.Id || searchParams.Id.length !== 18) redirect('/');
  const matchId = searchParams.Id;

  async function checkPredictionStatus() {
    const loggedInUser = await currentUser();

    if (loggedInUser) {
      const existingPrediction = await db
        .select()
        .from(prediction)
        .where(
          and(
            eq(prediction.matchId, matchId),
            eq(prediction.userId, loggedInUser.id)
          )
        );

      console.log(
        matchId,
        existingPrediction.map((prediction) => prediction.matchId)
      );

      if (existingPrediction.length > 0) {
        return {
          status: 'lockedIn',
          prediction: existingPrediction,
        };
      }
      if (existingPrediction.length === 0) {
        return {
          status: 'notLockedIn',
          prediction: [
            {
              matchId: matchId,
              userId: loggedInUser.id,
              winningTeamId: '',
            },
          ],
        };
      }
    } else {
      return {
        status: 'notLoggedIn',
        prediction: [
          {
            matchId: matchId,
            winningTeamId: '',
          },
        ],
      };
    }
  }
  const predictionStatus = await checkPredictionStatus();

  const eventData = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())

    .then((data) => {
      return {
        event: data.data.schedule.events.filter(
          (event: any) => event.match.id === matchId
        )[0],
      };
    });

  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      <section className='w-full h-[calc(100vh-5.625rem)] mt-[calc(5.625rem)] border-t-[6px] z-[120] relative flex justify-center items-center flex-col lg:flex-row'>
        <div className='w-full relative lg:w-1/2 h-full bg-transparent duration-500 group cursor-pointer flex flex-col items-center p-16 lg:p-32 text-accent-gold'>
          <div className='absolute w-full h-full bg-accent-blue opacity-90 group-hover:bg-accent-blue group-hover:opacity-90 duration-500 z-[-5] top-0'></div>
          <div className='absolute w-full h-full z-[-10] top-0'>
            <Image src='/rivenbg.jpg' alt='' fill={true} draggable={false} />
          </div>
        </div>
        <div className='w-full relative lg:w-1/2 h-full bg-transparent duration-500 group cursor-pointer flex flex-col items-center p-16 lg:p-32 text-accent-blue'>
          <div className='absolute w-full h-full bg-accent-gold opacity-90 group-hover:bg-accent-gold group-hover:opacity-90 duration-500 z-[-5] top-0'></div>
          <div className='absolute w-full h-full z-[-10] top-0'>
            <Image src='/yasuobg.jpg' alt='' fill={true} draggable={false} />
          </div>
        </div>
        <EventPredictionModule
          eventData={eventData}
          predictionStatus={predictionStatus}
        />
      </section>
    </main>
  );
}

export default Predict;
