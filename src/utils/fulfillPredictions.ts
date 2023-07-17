import { db } from '@/db';
import { prediction, user } from '@/db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { requestParams } from './requestParams';

export async function fulfillPredictions() {
  const completedMatches = await fetch(
    `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${process.env.NEXT_PUBLIC_LEAGUE_ID}`,
    requestParams
  )
    .then((res) => res.json())
    .then((data) => {
      return data.data.schedule.events.filter((event: any) => {
        if (event.type !== 'match') return;
        return event.state === 'completed' && event.type === 'match';
      });
    });

  if (completedMatches.length === 0) return;

  const usersWithCorrectPredictions = await db
    .select({ userId: prediction.userId, username: prediction.username })
    .from(prediction)
    .where(eq(prediction.state, 'correct'));

  const uniqueUsersWithCorrectPredictions = usersWithCorrectPredictions.filter(
    (id: any, index: number) => {
      return (
        usersWithCorrectPredictions.findIndex(
          (id2: any) => id2.userId === id.userId
        ) === index
      );
    }
  );

  uniqueUsersWithCorrectPredictions.forEach(async (correctUser: any) => {
    const correctPredictions = await db
      .select()
      .from(prediction)
      .where(
        and(
          eq(prediction.state, 'correct'),
          eq(prediction.userId, correctUser.userId)
        )
      );

    correctPredictions.forEach(async (prediction: any) => {
      await db
        .update(user)
        .set({ points: sql`${correctPredictions.length * 100}` })
        .where(eq(user.clerkId, prediction.userId as string));
    });
  });
  const pendingPredictions = await db
    .select()
    .from(prediction)
    .where(eq(prediction.state, 'unfulfilled'));

  if (pendingPredictions.length === 0) return;

  pendingPredictions.forEach(async (currentPrediction) => {
    completedMatches.forEach(async (event: any) => {
      if (event.match.id !== currentPrediction.matchId) return;
      console.log(event.match.id, currentPrediction.matchId);
      const winningTeamId = currentPrediction.winningTeamId;

      if (event.match.teams[0].code === winningTeamId) {
        if (event.match.teams[0].result.outcome === 'win') {
          await db
            .update(prediction)
            .set({ state: 'correct' })
            .where(eq(prediction.id, currentPrediction.id));
        } else {
          await db
            .update(prediction)
            .set({ state: 'incorrect' })
            .where(eq(prediction.id, currentPrediction.id));
        }
      } else if (event.match.teams[1].code === winningTeamId) {
        if (event.match.teams[1].result.outcome === 'win') {
          await db
            .update(prediction)
            .set({ state: 'correct' })
            .where(eq(prediction.id, currentPrediction.id));
        } else {
          await db
            .update(prediction)
            .set({ state: 'incorrect' })
            .where(eq(prediction.id, currentPrediction.id));
        }
      }
    });
  });
}
