'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CompletedMatch = React.forwardRef(
  ({ event, windowWidth }: { event: any; windowWidth: any }, ref: any) => {
    console.log('event', event);

    return (
      <div
        className='flex items-center  font-inter justify-center space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4 duration-200 hover:bg-[#0b2c38]'
        key={event.match.id}
        ref={ref}
      >
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
            <div className='relative w-10 h-10 md:w-20 md:h-20'>
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
            <span className='text-xl font-bold px-14'>
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
          <div className='flex items-center w-24 md:w-1/3 justify-start  space-x-0'>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
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
      </div>
    );
  }
);

CompletedMatch.displayName = 'CompletedMatch';

const UnstartedMatch = ({
  event,
  windowWidth,
}: {
  event: any;
  windowWidth: any;
}) => {
  return (
    <Link href={`/predict?matchId=${event.match.id}`} className='w-full'>
      <div
        className='flex items-center  font-inter justify-center space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4 duration-200 hover:bg-[#0b2c38]'
        key={event.match.id}
      >
        <div className='flex w-full justify-center items-center flex-col md:flex-row'>
          <div className='flex flex-row-reverse md:flex-row w-24 md:w-1/3 items-center justify-end md:justify-end space-x-0 md:space-x-4'>
            <h3 className='text-xl font-bold'>
              {windowWidth < 1024
                ? event.match.teams[0].code
                : event.match.teams[0].name}
            </h3>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={event.match.teams[0].image}
                alt={event.match.teams[0].name}
                fill={true}
              />
            </div>
          </div>
          <div className='flex flex-col w-1/8 items-center justify-center px-10'>
            <h3 className='text-xl font-bold px-10'>VS</h3>
            <button className='bg-accent-gold text-white py-1 px-2 rounded duration-200 hover:bg-[#a08b47]'>
              Predict Now
            </button>
          </div>
          <div className='flex items-center w-24 md:w-1/3 justify-start  space-x-0'>
            <div className='relative w-10 h-10 md:w-20 md:h-20 '>
              <Image
                src={event.match.teams[1].image}
                alt={event.match.teams[1].name}
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
        className='flex relative items-center justify-center space-x-4 w-full border-y-4 border-red-700 animate-scale bg-secondary text-primary p-4'
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
        <div className='flex w-full justify-center'>
          <div className='flex w-1/3 items-center justify-end space-x-4'>
            <h3 className='text-xl font-bold'>
              {windowWidth < 1024
                ? event.match.teams[0].code
                : event.match.teams[0].name}
            </h3>
            <Image
              src={event.match.teams[0].image}
              alt={event.match.teams[0].name}
              width={80}
              height={80}
            />
          </div>
          <div className='flex flex-col w-1/8 items-center justify-center'>
            <h3 className='text-xl font-bold px-10'>VS</h3>
          </div>
          <div className='flex items-center w-1/3 justify-start space-x-4'>
            <Image
              src={event.match.teams[1].image}
              alt={event.match.teams[1].name}
              width={80}
              height={80}
            />
            <h3 className='text-xl font-bold'>
              {windowWidth < 1024
                ? event.match.teams[1].code
                : event.match.teams[1].name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ScheduleTable = ({ schedule }: { schedule: any }) => {
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
      const startingDay = new Date(match.startTime).toLocaleDateString(
        'en-US',
        {
          weekday: 'long',

          month: 'long',
          day: 'numeric',
        }
      );
      if (!acc[startingDay]) {
        acc[startingDay] = {
          startingDay,
          matches: [],
        };
      }
      acc[startingDay].matches.push(match);
      return acc;
    }, {})
  );

  const eventsWithCompletedMatches = eventsByDate.filter((event: any) => {
    return event.matches.some((match: any) => match.state === 'completed');
  });

  return (
    <div>
      {eventsByDate.map((event: any, index: any) => {
        const { startingDay, matches } = event;

        return (
          <div
            className='relative mb-7 flex flex-col items-center justify-center space-y-4 w-full bg-primary text-secondary p-4'
            key={startingDay}
            ref={
              index === eventsWithCompletedMatches.length - 1
                ? lastCompletedMatchRef
                : null
            }
          >
            <h1 className='absolute -top-2 left-5 text-2xl font-bold text-center  '>
              {startingDay}
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
                console.log('match', match);
                return (
                  <UnstartedMatch
                    event={match}
                    key={match.id}
                    windowWidth={windowWidth}
                  />
                );
              } else if (match.state === 'inProgress') {
                console.log('match', match);
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
