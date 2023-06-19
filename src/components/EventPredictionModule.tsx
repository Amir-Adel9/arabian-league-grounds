'use client';

import { Suspense, use, useState } from 'react';

import Image from 'next/image';

import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import durationPlugin from 'dayjs/plugin/duration';
import { handleLockIn } from '@/utils/actions/handleLockIn';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

dayjs.extend(utcPlugin);
dayjs.extend(durationPlugin);

const EventPredictionModule = ({
  eventData,
  predictionStatus,
}: {
  eventData: any;
  predictionStatus: any;
}) => {
  const router = useRouter();

  const { user, isSignedIn } = useUser();

  const { status, prediction } = predictionStatus;

  console.log('predictionStatus', predictionStatus);

  const [selectedTeam, setSelectedTeam] = useState<{
    name: string;
    code: string;
    image: string;
    record: { wins: number; losses: number };
    result: { outcome: string; gameWins: number };
  } | null>();

  const targetDate = dayjs.utc(eventData.event.startTime);
  const startingHour = dayjs(targetDate).format('HH:mm');
  const matchDate = new Date(eventData.event.startTime).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',

      month: 'long',
      day: 'numeric',
    }
  );

  const LockInButton = () => {
    return (
      <>
        <SignedIn>
          <button
            onClick={async () => {
              if (!isSignedIn) {
                router.push('/sign-in');
                return;
              }

              if (!selectedTeam || status === 'lockedIn') return;
              handleLockIn({
                matchId: eventData.event.match.id,
                winningTeam: selectedTeam.code,
                userId: user?.id,
              });
            }}
            className={`absolute bottom-0 sm: h-full lg:h-auto text-base font-mono shadow-lg font-bold p-1 px-8 duration-500 rounded cursor-pointer ${
              selectedTeam === eventData.event.match.teams[0] ||
              prediction[0].winningTeamId ===
                eventData.event.match.teams[0].code
                ? 'bg-accent-blue text-accent-gold border border-accent-gold hover:bg-secondary hover:text-primary hover:opacity-90'
                : selectedTeam === eventData.event.match.teams[1] ||
                  prediction[0].winningTeamId ===
                    eventData.event.match.teams[1].code
                ? 'bg-accent-gold text-accent-blue border border-accent-blue hover:bg-secondary hover:text-primary hover:opacity-90'
                : 'text-primary'
            } `}
            style={{
              background: `${
                !selectedTeam && status !== 'lockedIn'
                  ? 'linear-gradient(-45deg, #bea85d 50%, #19485a 50%)'
                  : ''
              } `,
              transition: 'background-color 0.5s ease-in-out',
            }}
          >
            <h1>
              {!selectedTeam && status !== 'lockedIn'
                ? '(Select a Team)'
                : `#${
                    prediction[0].winningTeamId
                      ? prediction[0].winningTeamId
                      : selectedTeam?.code
                  }_WIN${status !== 'lockedIn' ? '?' : ''}`}
            </h1>

            <span className='hidden lg:inline'>
              {status == 'lockedIn'
                ? '(Locked In)'
                : selectedTeam
                ? '(Click to Lock In)'
                : ''}
            </span>
          </button>
        </SignedIn>
        <SignedOut>
          <button
            className={`absolute bottom-0 sm: h-full lg:h-auto text-base font-mono shadow-lg font-bold p-1 px-8 duration-500 rounded cursor-pointer ${
              selectedTeam === eventData.event.match.teams[0] ||
              prediction[0].winningTeamId ===
                eventData.event.match.teams[0].code
                ? 'bg-accent-blue text-accent-gold border border-accent-gold hover:bg-secondary hover:text-primary hover:opacity-90'
                : selectedTeam === eventData.event.match.teams[1] ||
                  prediction[0].winningTeamId ===
                    eventData.event.match.teams[1].code
                ? 'bg-accent-gold text-accent-blue border border-accent-blue hover:bg-secondary hover:text-primary hover:opacity-90'
                : 'text-primary'
            } `}
            style={{
              background: `${
                !selectedTeam && status !== 'lockedIn'
                  ? 'linear-gradient(-45deg, #bea85d 50%, #19485a 50%)'
                  : ''
              } `,
              transition: 'background-color 0.5s ease-in-out',
            }}
          >
            <SignInButton
              redirectUrl={`/predict?matchId=${eventData.event.match.id}`}
            >
              <div>
                <h1>
                  {!selectedTeam && status !== 'lockedIn'
                    ? '(Select a Team)'
                    : `#${
                        prediction[0].winningTeamId
                          ? prediction[0].winningTeamId
                          : selectedTeam?.code
                      }_WIN${status !== 'lockedIn' ? '?' : ''}`}
                </h1>

                <span className='hidden lg:inline'>
                  {status == 'lockedIn'
                    ? '(Locked In)'
                    : selectedTeam
                    ? '(Click to Lock In)'
                    : ''}
                </span>
              </div>
            </SignInButton>
          </button>
        </SignedOut>
      </>
    );
  };

  return (
    <div className='absolute w-[70%] h-[70%]  border-2 border-primary flex flex-col justify-between rounded-lg shadow-xl'>
      <div className='absolute w-full h-full bg-secondary opacity-80 z-[10] top-0 left-0 rounded-lg'></div>
      <Image
        src='/background.jpg'
        alt='Background Image'
        className='w-full h-full z-[5] rounded-lg'
        layout='fill'
        objectFit='cover'
        objectPosition='center'
      />
      <div className='w-full h-full relative flex flex-col lg:flex-row text-primary z-50'>
        <div
          onClick={() => {
            if (status === 'lockedIn') return;
            setSelectedTeam(eventData.event.match.teams[0]);
          }}
          className={`w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center items-center ${
            selectedTeam === eventData.event.match.teams[0] ||
            prediction[0].winningTeamId === eventData.event.match.teams[0].code
              ? 'bg-accent-blue opacity-80'
              : ''
          } hover:bg-accent-blue hover:opacity-80 duration-500 cursor-pointer`}
        >
          <div className='relative w-20 h-20 md:w-40 md:h-40 '>
            <Image
              src={eventData.event.match.teams[0].image}
              alt={eventData.event.match.teams[0].name}
              fill
              draggable={false}
            />
          </div>
          <h1 className='text-2xl mt-4 text-center'>
            {eventData.event.match.teams[0].name}
          </h1>
        </div>
        <div
          onClick={() => {
            if (status === 'lockedIn') return;
            setSelectedTeam(eventData.event.match.teams[1]);
          }}
          className={`w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center items-center ${
            selectedTeam === eventData.event.match.teams[1] ||
            prediction[0].winningTeamId === eventData.event.match.teams[1].code
              ? 'bg-accent-gold opacity-80'
              : ''
          } hover:bg-accent-gold hover:opacity-80 duration-500 cursor-pointer`}
        >
          <div className='relative w-20 h-20 md:w-40 md:h-40 '>
            <Image
              src={eventData.event.match.teams[1].image}
              alt={eventData.event.match.teams[1].name}
              fill
              draggable={false}
            />
          </div>
          <h1 className='text-2xl mt-4 text-center'>
            {eventData.event.match.teams[1].name}
          </h1>
        </div>
        <div className='absolute flex-col h-1/2 w-96 left-[calc(50%-12rem)] top-[calc(50%-17.5%)] items-center hidden lg:flex z-50'>
          <div className='absolute top-0 text-xl font-bold w-full text-center'>
            {matchDate}
            <h1>{startingHour}</h1>
          </div>
          <span className='absolute bottom-1/2 text-3xl font-bold '>VS.</span>
          <LockInButton />
        </div>
        <div className='absolute flex-col  h-8 top-[calc(50%-0.75rem)] md:h-10 md:top-[calc(50%-1.25rem)] w-full items-center justify-center flex lg:hidden z-50'>
          <LockInButton />
        </div>
      </div>
    </div>
  );
};

export default EventPredictionModule;
