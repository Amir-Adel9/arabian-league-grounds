import { requestParams } from '@/utils/requestParams';
import Image from 'next/image';
import Link from 'next/link';
// old 109545777182748074
// new 110422923164198764
async function Standings() {
  const standings = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${process.env.NEXT_PUBLIC_TOURNAMENT_ID}`,
    requestParams
  ).then((res) => res.json());

  return (
    <main className='relative flex min-h-screen flex-col items-center bg-primary'>
      <section className=' w-full min-h-screen relative flex flex-col justify-center items-center mt-28 '>
        <div className='w-full lg:w-[80%] h-[90%] p-6 lg:p12 '>
          {standings.data.standings[0].stages[0].sections[0].rankings.map(
            (ranking: any) => {
              return (
                <div
                  className='flex flex-col items-center'
                  key={ranking.ordinal}
                >
                  {ranking.teams.map((team: any, i: number) => {
                    return (
                      <Link
                        href={`/teams/${team.slug}`}
                        key={team.id}
                        className='w-full'
                      >
                        <div className='flex items-center font-inter justify-start group hover:bg-[#0b2c38] duration-200 mt-2 space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4'>
                          <div className='flex flex-row items-center'>
                            <span
                              className={`text-3xl font-bold text-center mr-2 ${
                                i !== 0
                                  ? 'group-hover:opacity-100 duration-200 opacity-0'
                                  : 'opacity-100'
                              }`}
                            >
                              {ranking.ordinal}
                            </span>
                            <div className='flex flex-row items-center '>
                              <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20'>
                                <Image
                                  src={team.image}
                                  alt={team.name}
                                  fill={true}
                                  draggable={false}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col items-start '>
                            <h1 className='text-xl font-bold'>{team.name}</h1>
                            <div className='flex text-sm font-bold text-accent-gold'>
                              <span>{team.record.wins}W</span>-
                              <span>{team.record.losses}L</span>
                            </div>
                          </div>
                        </div>
                      </Link>
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
