import Image from 'next/image';
// old 109545777182748074
// new 110422923164198764
async function Standings() {
  const standings = await fetch(
    'https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=110422923164198764',
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
    <main className='relative flex min-h-screen flex-col items-center bg-primary'>
      <section className=' w-full min-h-screen relative flex flex-col justify-center items-center mt-28 '>
        <div className='w-[80%]  p-12'>
          <h1 className='text-5xl font-bold text-center'>Standings</h1>
          {standings.data.standings[0].stages[0].sections[0].rankings.map(
            (ranking: any) => {
              return (
                <div
                  className='flex flex-col items-center'
                  key={ranking.ordinal}
                >
                  {ranking.teams.map((team: any, i: number) => {
                    return (
                      <div
                        className='flex items-center font-inter justify-start space-x-4 w-full border-y border-accent-gold bg-accent-blue text-primary p-6'
                        key={team.id}
                      >
                        <div className='flex flex-row items-center'>
                          <span className='text-3xl font-bold text-center mr-2'>
                            {i === 0 ? ranking.ordinal : ''}
                          </span>
                          <div className='flex flex-row items-center '>
                            <div className='w-20 h-20'>
                              <Image
                                src={team.image}
                                alt={team.name}
                                width={80}
                                height={80}
                                objectFit='contain'
                              />
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col items-start '>
                          <h1 className='text-xl font-bold'>{team.name}</h1>
                          <div className='flex'>
                            <h1 className='text-xl font-bold'>
                              {team.record.wins}
                            </h1>
                            -
                            <h1 className='text-xl font-bold'>
                              {team.record.losses}
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
          )}
        </div>
      </section>
    </main>
  );
}

export default Standings;
