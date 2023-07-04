import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/schedule',
    '/standings',
    '/match/:matchId',
    '/about',
    '/leaderboard',
    '/teams/:slug',
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
