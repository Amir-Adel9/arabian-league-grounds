import Image from 'next/image';

import { currentUser } from '@clerk/nextjs';

async function Predict(props: any) {
  const { searchParams } = props;
  const matchId = searchParams.matchId;

  const user = await currentUser();

  if (user) {
    const { id, username } = user;
    console.log(id, username);
  }

  const match = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${matchId}`,
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
      next: { revalidate: 10 },
    }
  ).then((res) => res.json());

  return (
    <main className='relative flex min-h-screen flex-col items-center'>
      <section className='w-full min-h-screen relative flex flex-col justify-start items-center'>
        {/* {user ? (
          <h1>
            {user.username}

            {user.id}
          </h1>
        ) : (
          <h1>Not logged in</h1>
        )} */}
        <div className='flex w-full justify-between items-center px-[25%] bg-accent-blue mt-24 h-96'>
          <div
            className='flex flex-col items-center justify-center'
            key={match.data.event.match.id}
          >
            <Image
              src={match.data.event.match.teams[0].image}
              alt={match.data.event.match.teams[0].name}
              width={140}
              height={140}
              draggable={false}
            />
            <h1 className='text-2xl mt-4 text-accent-gold'>
              {match.data.event.match.teams[0].name}
            </h1>
          </div>
          <div className='text-2xl text-primary flex flex-col'>
            {match.data.event.match.teams[0].result.gameWins} -{' '}
            {match.data.event.match.teams[1].result.gameWins}
          </div>
          <div
            className='flex flex-col items-center justify-center'
            key={match.data.event.match.id}
          >
            <Image
              src={match.data.event.match.teams[1].image}
              alt={match.data.event.match.teams[1].name}
              width={140}
              height={140}
              draggable={false}
            />
            <h1 className='text-2xl mt-4 text-accent-gold'>
              {match.data.event.match.teams[1].name}
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Predict;
