import {
  mysqlTable,
  serial,
  text,
  varchar,
  int,
  boolean,
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  clerkId: text('clerkId'),
  username: varchar('username', '255'),
  points: int('points').default(0),
});

export const prediction = mysqlTable('prediction', {
  id: serial('id').primaryKey(),
  userId: text('userId'),
  username: varchar('username', '255'),
  matchId: text('matchId'),
  winningTeamId: text('winningTeamId'),
  fulfilled: boolean('fulfilled').default(false),
});
