import ScheduleTable from '@/components/Schedule';
import { db } from '@/db';
import { prediction } from '@/db/schema';
import { requestParams } from '@/utils/requestParams';
import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';

async function Schedule() {
  const loggedInUser = await currentUser();

  const userPredictions = await db
    .select()
    .from(prediction)
    .where(eq(prediction.userId, loggedInUser?.id ? loggedInUser.id : ''));

  const schedule = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  ).then((res) => res.json());

  return (
    <main className='relative flex min-h-screen flex-col items-center '>
      <section className='w-full min-h-screen relative flex flex-col justify-center items-center mt-28 '>
        <div className=' w-[80%] '>
          <ScheduleTable
            schedule={schedule}
            userPredictions={userPredictions}
          />
        </div>
      </section>
    </main>
  );
}

export default Schedule;
