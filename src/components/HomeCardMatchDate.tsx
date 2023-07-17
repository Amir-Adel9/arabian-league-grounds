'use client';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);
dayjs.extend(timezone);

const HomeCardMatchDate = ({ matchDate }: { matchDate: any }) => {
  const targetDate = dayjs.utc(matchDate);
  const userDate = targetDate.tz(dayjs.tz.guess());
  const formattedDate = userDate.format('DD/MM/YYYY HH:mm');
  return <p className='text-accent-gold text-center'>Date: {formattedDate}</p>;
};

export default HomeCardMatchDate;
