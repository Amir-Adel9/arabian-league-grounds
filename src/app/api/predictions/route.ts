import { NextRequest, NextResponse } from 'next/server';
import { handleLockIn } from '@/utils/functions/handleLockIn';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { matchId, winningTeam, losingTeam, userId, username } = body;

  await handleLockIn({ matchId, winningTeam, losingTeam, userId, username });

  return NextResponse.json({ state: 'success' });
}
