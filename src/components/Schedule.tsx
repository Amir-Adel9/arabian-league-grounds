'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const CompletedMatch = React.forwardRef(
  ({ event, windowWidth }: { event: any; windowWidth: any }, ref: any) => {
    return (
      <div
        className='flex items-center font-inter justify-center space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4'
        key={event.match.id}
        ref={ref}
      >
        <div className='flex w-full justify-center'>
          <div className='flex w-1/3 items-center justify-end space-x-4'>
            <h3
              className={`text-lg font-bold ${
                event.match.teams[0].result.outcome === 'win'
                  ? 'text-accent-gold'
                  : ''
              } `}
            >
              {windowWidth < 768
                ? event.match.teams[0].code
                : event.match.teams[0].name}
            </h3>
            <Image
              src={event.match.teams[0].image}
              alt={event.match.teams[0].name}
              className={`${
                event.match.teams[0].result.outcome === 'loss'
                  ? 'opacity-30 '
                  : ''
              }`}
              draggable={false}
              width={80}
              height={80}
            />
          </div>
          <div className='flex flex-col w-1/8 items-center justify-center'>
            <span className='text-xl font-bold px-10'>
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
          <div className='flex items-center w-1/3 justify-start space-x-4'>
            <Image
              src={event.match.teams[1].image}
              alt={event.match.teams[1].name}
              className={`${
                event.match.teams[1].result.outcome === 'loss'
                  ? 'opacity-30 '
                  : ''
              }`}
              draggable={false}
              width={80}
              height={80}
            />
            <h3
              className={`text-lg font-bold ${
                event.match.teams[1].result.outcome === 'win'
                  ? 'text-accent-gold'
                  : ''
              } `}
            >
              {windowWidth < 768
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
    <div
      className='flex items-center justify-center space-x-4 w-full border-y-4 border-accent-gold bg-accent-blue text-primary p-4'
      key={event.match.id}
    >
      <div className='flex w-full justify-center'>
        <div className='flex w-1/3 items-center justify-end space-x-4'>
          <h3 className='text-xl font-bold'>
            {windowWidth < 768
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
            {windowWidth < 768
              ? event.match.teams[1].code
              : event.match.teams[1].name}
          </h3>
        </div>
      </div>
    </div>
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
    <div
      className='flex items-center justify-center space-x-4 w-full border-y-4 border-red-700 animate-scale bg-secondary text-primary p-4'
      key={event.match.id}
    >
      <div className='flex w-full justify-center'>
        <div className='flex w-1/3 items-center justify-end space-x-4'>
          <h3 className='text-xl font-bold'>
            {windowWidth < 768
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
            {windowWidth < 768
              ? event.match.teams[1].code
              : event.match.teams[1].name}
          </h3>
        </div>
      </div>
    </div>
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
                return (
                  <UnstartedMatch
                    event={match}
                    key={match.id}
                    windowWidth={windowWidth}
                  />
                );
              } else if (match.state === 'inProgress') {
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
