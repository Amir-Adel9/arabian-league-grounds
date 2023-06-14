// 'use client';
import ScheduleTable from '@/components/Schedule';

async function Schedule() {
  const schedule = await fetch(
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
      next: { revalidate: 10 },
    }
  ).then((res) => res.json());
  return (
    <main className='relative flex min-h-screen flex-col items-center '>
      <section className='w-[80%] min-h-screen relative flex flex-col justify-center items-center mt-28 '>
        <div className='w-full '>
          <ScheduleTable schedule={schedule} />
        </div>
      </section>
    </main>
  );
}

export default Schedule;
