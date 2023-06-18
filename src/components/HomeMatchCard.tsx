'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

const HomeMatchCard = ({ event }: { event: any }) => {
  const now = dayjs.utc();
  const targetDate = dayjs.utc(event.startTime);
  const duration = dayjs.duration(targetDate.diff(now));
  const daysUntilMatch = duration.asDays();
  const formattedDate = dayjs(targetDate).format('DD/MM/YYYY HH:mm');

  const [matchId, setMatchId] = useState(event.match.id);

  useEffect(() => {
    setMatchId(event.match.id);
  }, [matchId]);

  console.log(event);
  const predictionHandler = (event: any) => {
    event.preventDefault();
    window.location.href = `/predict?matchId=${matchId}`;
  };

  return (
    <div
      className='relative border border-accent-gold flex  flex-col justify-between rounded-lg shadow-lg p-4 cursor-pointer duration-200  hover:scale-105'
      onClick={predictionHandler}
      key={event.id}
    >
      <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg '></div>
      <Image
        src='/background.jpg'
        alt='Background Image'
        className='w-full h-full z-[5] rounded-lg'
        layout='fill'
        objectFit='cover'
        objectPosition='center'
      />
      <div className='flex flex-row items-center justify-center mb-4 z-20'>
        <div className='flex flex-col items-center'>
          <Image
            src={event.match.teams[0].image}
            alt={event.match.teams[0].name}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className='text-xl font-bold mt-2 text-center'>
            {event.match.teams[0].name}
          </h3>
        </div>
        <h3 className='text-xl font-bold text-center'>VS</h3>
        <div className='flex flex-col items-center'>
          <Image
            src={event.match.teams[1].image}
            alt={event.match.teams[1].name}
            width={100}
            height={100}
            draggable={false}
          />
          <h3 className='text-xl font-bold mt-2 text-center'>
            {event.match.teams[1].name}
          </h3>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center mb-2 z-20'>
        <h3 className='text-lg font-bold'>
          {daysUntilMatch.toFixed(0) === '1'
            ? 'Match in 1 day'
            : daysUntilMatch < 1
            ? 'Match starting soon'
            : `Match in ${daysUntilMatch.toFixed(0)} days`}
        </h3>
      </div>
      <div className='flex flex-row items-center justify-center z-20'>
        <p className='text-accent-gold text-center'>Date: {formattedDate}</p>
      </div>
      <div className='flex justify-center mt-4 z-20'>
        <button className='bg-accent-gold text-white py-2 px-4 rounded'>
          Predict Now
        </button>
      </div>
    </div>
  );
};

export default HomeMatchCard;
