import { db } from '@/db';
import { prediction, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requestParams } from '@/utils/requestParams';
import { currentUser } from '@clerk/nextjs';
import { isNotNull } from 'drizzle-orm';
import Link from 'next/link';

import Image from 'next/image';

const PredictionCard = ({
  prediction,
  eventData,
}: {
  prediction: any;
  eventData: any;
}) => {
  const { state } = prediction;

  if (state === 'unfulfilled') {
    return (
      <Link href={`/match?Id=${eventData.event.match.id}`} className='w-full'>
        <div className='flex  w-full items-center justify-center bg-accent-blue border-accent-gold border-y cursor-pointer p-4 duration-200 hover:bg-[#0b2c38] '>
          <div className='flex w-full flex-row items-center justify-center '>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={eventData.event.match.teams[0].image}
                alt={eventData.event.match.teams[0].code}
                fill={true}
              />
            </div>
          </div>
          <div>
            <h1 className='text-center font-bold text-xl p-5'>
              {prediction.winningTeamId === eventData.event.match.teams[0].code
                ? `#${eventData.event.match.teams[0].code}_WIN?`
                : prediction.winningTeamId ===
                  eventData.event.match.teams[1].code
                ? `#${eventData.event.match.teams[1].code}_WIN?`
                : 'No winner yet'}
            </h1>
          </div>
          <div className='flex w-full flex-row items-center justify-center '>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={eventData.event.match.teams[1].image}
                alt={eventData.event.match.teams[1].code}
                fill={true}
              />
            </div>
          </div>
        </div>
      </Link>
    );
  } else if (state === 'correct') {
    return (
      <Link href={`/match?Id=${eventData.event.match.id}`} className='w-full'>
        <div className='flex  w-full items-center justify-center bg-green-900 border-accent-gold border-y cursor-pointer p-4 duration-200 hover:bg-green-950 '>
          <div className='flex w-full flex-row items-center justify-center '>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={eventData.event.match.teams[0].image}
                alt={eventData.event.match.teams[0].code}
                fill={true}
              />
            </div>
          </div>
          <div className='relative'>
            <h3 className='text-center font-bold text-xl flex-grow'>
              {`${prediction.winningTeamId} Won `}
            </h3>
            <h3 className='absolute w-36 left-[calc(50%-4.5rem)] text-center font-bold text-sm flex-grow'>
              {`(You picked ${prediction.winningTeamId})`}
            </h3>
          </div>
          <div className='flex w-full flex-row items-center justify-center '>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={eventData.event.match.teams[1].image}
                alt={eventData.event.match.teams[1].code}
                fill={true}
              />
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/match?Id=${eventData.event.match.id}`} className='w-full'>
        <div className='flex  w-full items-center justify-center bg-red-900 border-accent-gold border-y cursor-pointer p-4 duration-200 hover:bg-red-950'>
          <div className='flex w-full flex-row items-center justify-center '>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={eventData.event.match.teams[0].image}
                alt={eventData.event.match.teams[0].code}
                fill={true}
              />
            </div>
          </div>
          <div>
            <div className='relative'>
              <h3 className='text-center font-bold text-xl flex-grow'>
                {`${prediction.winningTeamId} Won `}
              </h3>
              <h3 className='absolute w-36 left-[calc(50%-4.5rem)] text-center font-bold text-sm flex-grow'>
                {`(You picked ${prediction.losingTeamId})`}
              </h3>
            </div>
          </div>
          <div className='flex w-full flex-row items-center justify-center '>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={eventData.event.match.teams[1].image}
                alt={eventData.event.match.teams[1].code}
                fill={true}
              />
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

const LeaderBoardCard = ({
  user,
  userIndex,
}: {
  user: any;
  userIndex: number;
}) => {
  return (
    <>
      <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap '>
        {userIndex}
      </th>
      <td className='px-6 py-4 capitalize'>{user.username}</td>

      <td className='px-6 py-4'>{user.points}</td>
    </>
  );
};

async function LeaderBoard() {
  const loggedInUser = await currentUser();
  const allPredictions = await db.select().from(prediction);
  console.log('allpore', allPredictions);
  const IdsForUsersWithPredictions = await db
    .select({ userId: prediction.userId })
    .from(prediction)
    .where(isNotNull(prediction.userId));

  const uniqueIds = IdsForUsersWithPredictions.filter(
    (id: any, index: number) => {
      return (
        IdsForUsersWithPredictions.findIndex(
          (id2: any) => id2.userId === id.userId
        ) === index
      );
    }
  );

  async function getUniqueUsers() {
    const uniqueUsers = [];

    for await (const u of uniqueIds.map(async (id: any) => {
      const uniqueUser = await db
        .select()
        .from(user)
        .where(eq(user.clerkId, id.userId));

      return uniqueUser[0];
    })) {
      uniqueUsers.push(u);
    }

    return uniqueUsers;
  }

  const uniqueUsers = await getUniqueUsers();

  const uniqueUsersWithDescendingPoints = uniqueUsers.sort((a: any, b: any) => {
    return b.points - a.points;
  });

  const currentUserPredictions = allPredictions.filter(
    (prediction) => prediction.userId === loggedInUser?.id
  );

  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      <section className='w-full h-screen relative flex flex-col-reverse lg:flex-row  mt-24 items-center'>
        <div className='h-full w-full lg:w-[70%] relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left'>
            <thead className='text-xs  uppercase bg-gray-50 '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Rank
                </th>
                <th scope='col' className='px-6 py-3'>
                  Username
                </th>
                <th scope='col' className='px-6 py-3'>
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {uniqueUsersWithDescendingPoints.map(
                (uniqueUser: any, index: number) => {
                  return (
                    <tr
                      className={`border-b  ${
                        (index + 1) % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                      key={index}
                    >
                      <LeaderBoardCard
                        user={uniqueUser}
                        userIndex={index + 1}
                        key={index}
                      />
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <div className='w-full lg:w-[30%] h-screen bg-secondary text-primary shadow-2xl overflow-y-auto no-scrollbar'>
          <h1 className='text-center font-bold text-2xl p-5'>
            Your Predictions
          </h1>
          {currentUserPredictions.length > 0 ? (
            <div>
              {currentUserPredictions
                .sort((a: any, b: any) => {
                  return a.createdAt - b.createdAt;
                })
                .map(async (prediction: any) => {
                  const eventData = await fetch(
                    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
                    requestParams
                  )
                    .then((res) => res.json())

                    .then((data) => {
                      return {
                        event: data.data.schedule.events.filter(
                          (event: any) => event.match.id === prediction.matchId
                        )[0],
                      };
                    });
                  return (
                    <PredictionCard
                      key={prediction.id}
                      prediction={prediction}
                      eventData={eventData}
                    />
                  );
                })}
            </div>
          ) : (
            <div className='flex h-full w-full justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <Image
                  src='/dinger.gif'
                  alt='dinger Image'
                  width={260}
                  height={260}
                  draggable={false}
                />
                <h1 className='text-center font-bold text-2xl p-5'>
                  {loggedInUser
                    ? 'You have not made any predictions yet'
                    : 'Please login to view your predictions'}
                </h1>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default LeaderBoard;

/* 
  <div className='relative z-10 flex flex-col items-center justify-center'>
          <Image
            src='/dinger.gif'
            alt='dinger Image'
            width={260}
            height={260}
            draggable={false}
          />
          <h1 className='text-5xl font-bold text-accent-gold text-center'>
            This page is under construction
          </h1>
          <p className='text-2xl text-accent-gold text-center'>
            Please check back after week 2 of the Arabian League
          </p>
          <p className='text-accent-gold text-center'>
            (Here your predictions will be displayed along side a leaderboard
            for whom those have the most points)
          </p>
  </div>
*/
