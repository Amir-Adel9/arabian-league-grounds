import { NextRequest, NextResponse } from 'next/server';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

export async function GET(_req: NextRequest) {
  const liveShows = await fetch(
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
    .then((res) => {
      const unStartedMatchesWithin7Days = res.data.schedule.events.filter(
        (event: any) => {
          const now = dayjs.utc();
          const targetDate = dayjs.utc(event.startTime);
          const duration = dayjs.duration(targetDate.diff(now));

          return event.state === 'unstarted' && duration.asDays() < 10;
        }
      );

      console.log('a', unStartedMatchesWithin7Days);

      return unStartedMatchesWithin7Days;
    });

  return NextResponse.json({ liveShows });
}

// function filterMatchesWithin7Days(match: any) {
//   match.array.forEach((match: any, index: number) => {});
//   const now = dayjs.utc();
//   const targetDate = dayjs.utc(res.data.schedule.events[0].startTime);
//   const duration = dayjs.duration(targetDate.diff(now));

//   const unStartedMatchesWithin7Days = res.data.schedule.events.filter(
//     (event: any) => event.state === 'unstarted' && duration.asDays() < 7
//   );

//   console.log('a', duration.asDays());

//   return unStartedMatchesWithin7Days;
// }
