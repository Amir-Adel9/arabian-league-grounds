import { NextResponse } from 'next/server';
import { prisma } from '@/db/prisma';
import { currentUser } from '@clerk/nextjs';

export async function POST() {
  // assuming your body has json data

  const user = await currentUser();
  console.log(user);

  if (user) {
    const { id, username } = user;
    console.log(id, username);

    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });

    console.log(existingUser);
    if (!existingUser) {
      const res = await prisma.user.create({
        data: { id: id, username: username },
      });
      console.log(res);
    }
  }

  return NextResponse.json({ user: user });
}
