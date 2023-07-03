'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

const CompletedMatch = React.forwardRef(
  ({ event, windowWidth }: { event: any; windowWidth: any }, ref: any) => {
    const targetDate = dayjs.utc(event.startTime);
    const userDate = targetDate.tz(dayjs.tz.guess());
    const startingHour = dayjs(userDate).format('HH');
    const startingMinute = dayjs(targetDate).format('mm');

    return (
      <div
        className='flex items-center  font-inter justify-center space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4 duration-200 hover:bg-[#0b2c38]'
        key={event.match.id}
        ref={ref}
      >
        <div className=' relative w-36 flex-col hidden xs:flex font-kanit'>
          <span>
            <span className='text-xl sm:text-3xl'>{startingHour}</span>
            <span className='absolute text-xs sm:text-sm top-1 ml-1'>
              {startingMinute}
            </span>
          </span>
        </div>
        <div className='flex w-full justify-center items-center flex-col md:flex-row'>
          <div className='flex flex-row-reverse md:flex-row w-24 md:w-1/3 items-center justify-end md:justify-end space-x-0 md:space-x-4'>
            <h3
              className={`text-lg font-bold ${
                event.match.teams[0].result.outcome === 'win'
                  ? 'text-accent-gold'
                  : ''
              } `}
            >
              {windowWidth < 1024
                ? event.match.teams[0].code
                : event.match.teams[0].name}
            </h3>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 '>
              <Image
                src={event.match.teams[0].image}
                alt={event.match.teams[0].name}
                className={`${
                  event.match.teams[0].result.outcome === 'loss'
                    ? 'opacity-30 '
                    : ''
                }`}
                draggable={false}
                fill={true}
              />
            </div>
          </div>
          <div className='flex flex-col w-1/8 items-center justify-center'>
            <span className='text-xl font-bold px-2 lg:px-14 hidden md:inline'>
              <span
                className={`relative ${
                  event.match.teams[0].result.outcome === 'win'
                    ? 'before:content-["◀"] before: before:text-accent-gold before:text-xs'
                    : ''
                }`}
              >
                {` ${event.match.teams[0].result.gameWins} `}
              </span>
              <span>- </span>
              <span
                className={`relative ${
                  event.match.teams[1].result.outcome === 'win'
                    ? 'after:content-["▶"]  after:text-accent-gold after:text-xs'
                    : ''
                }`}
              >
                {` ${event.match.teams[1].result.gameWins} `}
              </span>
            </span>
          </div>
          <div className='flex items-center w-24 md:w-1/3 justify-start space-x-0 md:space-x-4'>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20  '>
              <Image
                src={event.match.teams[1].image}
                alt={event.match.teams[1].name}
                className={`${
                  event.match.teams[1].result.outcome === 'loss'
                    ? 'opacity-30 '
                    : ''
                }`}
                draggable={false}
                fill={true}
              />
            </div>
            <h3
              className={`text-lg font-bold ${
                event.match.teams[1].result.outcome === 'win'
                  ? 'text-accent-gold'
                  : ''
              } `}
            >
              {windowWidth < 1024
                ? event.match.teams[1].code
                : event.match.teams[1].name}
            </h3>
          </div>
        </div>
        <div className='font-bold placeholder:w-36 flex-col hidden xs:flex'>
          <span> {event.league.name} </span>
          <span className=' hidden md:inline'>{`Best of ${event.match.strategy.count}`}</span>
        </div>
      </div>
    );
  }
);

CompletedMatch.displayName = 'CompletedMatch';

const UnstartedMatch = ({
  event,
  userPredictions,
  windowWidth,
}: {
  event: any;
  userPredictions: any;
  windowWidth: any;
}) => {
  const targetDate = dayjs.utc(event.startTime);
  const userDate = targetDate.tz(dayjs.tz.guess());
  const startingHour = dayjs(userDate).format('HH');
  const startingMinute = dayjs(targetDate).format('mm');

  const userPredictionsForMatch = userPredictions.filter(
    (prediction: any) => prediction.matchId === event.match.id
  );

  return (
    <Link href={`/match/${event.match.id}`} className='w-full'>
      <div
        className='flex items-center font-inter justify-center space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4 duration-200 hover:bg-[#0b2c38]'
        key={event.match.id}
      >
        <div className=' relative w-36 flex-col hidden xs:flex font-kanit'>
          <span>
            <span className='text-xl sm:text-3xl'>{startingHour}</span>
            <span className='absolute text-xs sm:text-sm top-1 ml-1'>
              {startingMinute}
            </span>
          </span>
          <span className='font-mono text-accent-gold font-bold'>APPROX</span>
        </div>
        <div className='flex w-full justify-center items-center flex-col md:flex-row'>
          <div className='flex flex-row-reverse md:flex-row w-24 md:w-1/3 items-center justify-end md:justify-end space-x-0 md:space-x-4'>
            <h3 className='text-xl font-bold'>
              {windowWidth < 1024
                ? event.match.teams[0].code
                : event.match.teams[0].name}
            </h3>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 '>
              <Image
                src={event.match.teams[0].image}
                alt={event.match.teams[0].name}
                draggable={false}
                fill={true}
              />
            </div>
          </div>
          <div className=' flex-col w-1/8 items-center justify-center px-10 hidden md:flex'>
            <h3 className='text-xl font-bold px-10'>VS</h3>
            <button className='bg-accent-gold text-white py-1 px-2 rounded duration-200 hover:bg-[#a08b47]'>
              <span>
                {userPredictionsForMatch.length > 0
                  ? `#${userPredictionsForMatch[0].winningTeamId}_WIN`
                  : 'Predict Now'}
              </span>
            </button>
          </div>
          <div className='flex items-center w-24 md:w-1/3 justify-start  space-x-0'>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20  '>
              <Image
                src={event.match.teams[1].image}
                alt={event.match.teams[1].name}
                draggable={false}
                fill={true}
              />
            </div>
            <h3 className='text-xl font-bold'>
              {windowWidth < 1024
                ? event.match.teams[1].code
                : event.match.teams[1].name}
            </h3>
          </div>
        </div>
        <div className='font-bold w-36 flex-col hidden xs:flex'>
          <span> {event.league.name} </span>
          <span className=' hidden md:inline'>{`Best of ${event.match.strategy.count}`}</span>
        </div>
      </div>
    </Link>
  );
};

const LiveMatch = ({
  event,
  windowWidth,
}: {
  event: any;
  windowWidth: any;
}) => {
  return (
    <Link
      href='https://lolesports.com/live/arabian_league/lolesports_ar'
      className='w-full'
      target={'_blank'}
    >
      <div
        className='flex relative items-center justify-center space-x-4 w-full border-y-4 border-red-700 duration-200 hover:bg-[#0b2c38] animate-scale bg-secondary text-primary p-4'
        key={event.match.id}
      >
        <div className='absolute top-1 left-0 ml-2 flex items-center justify-center gap-x-1'>
          <svg
            width='16px'
            height='16px'
            viewBox='0 0 15 15'
            version='1.1'
            id='circle'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-red-700'
          >
            <path d='M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z' />
          </svg>
          <span className='font-bold text-xl'>Live</span>
        </div>
        <div className='flex w-full justify-center items-center flex-col md:flex-row'>
          <div className='flex w-24 md:w-1/3 items-center justify-end space-x-0 md:space-x-4 flex-row-reverse md:flex-row'>
            <h3 className='text-xl font-bold'>
              {windowWidth < 1024
                ? event.match.teams[0].code
                : event.match.teams[0].name}
            </h3>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 '>
              <Image
                src={event.match.teams[0].image}
                alt={event.match.teams[0].name}
                fill={true}
                draggable={false}
              />
            </div>
          </div>
          <div className='flex flex-col w-1/8 items-center justify-center'>
            <h3 className='text-xl font-bold px-10 hidden md:inline'>VS</h3>
          </div>
          <div className='flex items-center w-24 md:w-1/3 justify-start space-x-0 md:space-x-4'>
            <div className='relative w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 '>
              <Image
                src={event.match.teams[1].image}
                alt={event.match.teams[1].name}
                fill={true}
                draggable={false}
              />
            </div>
            <h3 className='text-xl font-bold'>
              {windowWidth < 1024
                ? event.match.teams[1].code
                : event.match.teams[1].name}
            </h3>
          </div>
        </div>
        <div className=' font-bold flex-col hidden xs:flex'>
          <span> {event.league.name} </span>
          <span className=' hidden md:inline'>{`Best of ${event.match.strategy.count}`}</span>
        </div>
      </div>
    </Link>
  );
};

const ScheduleTable = ({
  schedule,
  userPredictions,
}: {
  schedule: any;
  userPredictions: any;
}) => {
  const lastCompletedMatchRef = useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const scrollToLastCompletedMatch = () => {
      if (lastCompletedMatchRef.current) {
        const topOffset = lastCompletedMatchRef.current.offsetTop;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    };

    scrollToLastCompletedMatch();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWindowWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener('resize', function () {
        setWindowWidth(window.innerWidth);
      });
  }, [windowWidth]);

  const eventsByDate = Object.values(
    schedule.data.schedule.events.reduce((acc: any, match: any) => {
      const targetDate = dayjs.utc(match.startTime);
      const userDate = targetDate.tz(dayjs.tz.guess());

      const today = dayjs().startOf('day');
      const tomorrow = dayjs().add(1, 'day').startOf('day');
      const nextWeek = dayjs().add(1, 'week').startOf('day');

      let formattedDate;

      if (userDate.isSame(today, 'day')) {
        formattedDate = `Today, ${userDate.format('MMMM DD')}`;
      } else if (userDate.isSame(tomorrow, 'day')) {
        formattedDate = `Tomorrow, ${userDate.format('MMMM DD')}`;
      } else if (userDate.isAfter(today) && userDate.isBefore(nextWeek)) {
        formattedDate = userDate.format('dddd,  MMMM DD');
      } else {
        formattedDate = userDate.format('dddd, MMMM DD');
      }

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          formattedDate,
          matches: [],
        };
      }
      acc[formattedDate].matches.push(match);
      return acc;
    }, {})
  );

  const eventsWithCompletedMatches = eventsByDate.filter((event: any) => {
    return event.matches.some((match: any) => match.state === 'completed');
  });

  return (
    <div>
      {eventsByDate.map((event: any, index: any) => {
        const { formattedDate, matches } = event;

        return (
          <div
            className='relative mb-7 flex flex-col items-center justify-center space-y-4 w-full bg-primary text-secondary p-4'
            key={formattedDate}
            ref={
              index === eventsWithCompletedMatches.length - 1
                ? lastCompletedMatchRef
                : null
            }
          >
            <h1 className='absolute -top-2 left-5 text-xl sm:text-2xl font-bold text-center  '>
              {formattedDate}
            </h1>
            {matches.map((match: any) => {
              if (match.state === 'completed') {
                return (
                  <CompletedMatch
                    event={match}
                    key={match.id}
                    windowWidth={windowWidth}
                  />
                );
              } else if (match.state === 'unstarted') {
                return (
                  <UnstartedMatch
                    event={match}
                    key={match.id}
                    windowWidth={windowWidth}
                    userPredictions={userPredictions}
                  />
                );
              } else if (
                match.state === 'inProgress' &&
                match.type === 'match'
              ) {
                return (
                  <LiveMatch
                    event={match}
                    key={match.id}
                    windowWidth={windowWidth}
                  />
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleTable;
