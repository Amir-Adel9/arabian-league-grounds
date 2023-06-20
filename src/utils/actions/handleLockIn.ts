'use server';

import { db } from '@/db';
import { and, eq } from 'drizzle-orm';
import { prediction } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function handleLockIn({
  matchId,
  winningTeam,
  losingTeam,
  userId,
  username,
}: {
  matchId: string;
  winningTeam: string;
  losingTeam: string;
  userId: string | undefined;
  username: string | undefined;
}) {
  if (!matchId || !winningTeam || !userId) {
    throw new Error('Missing parameters');
  }

  const existingPrediction = await db
    .select()
    .from(prediction)
    .where(and(eq(prediction.matchId, matchId), eq(prediction.userId, userId)));

  if (existingPrediction.length > 0) {
    throw new Error('Prediction already exists');
  }

  const newPrediction = await db.insert(prediction).values({
    matchId: matchId,
    winningTeamId: winningTeam,
    losingTeamId: losingTeam,
    userId: userId,
    username: username,
  });
  console.log(newPrediction);
  revalidatePath(`/match?Id=${matchId}`);
  revalidatePath(`/leaderboard`);
}
