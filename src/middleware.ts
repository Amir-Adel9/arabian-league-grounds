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
console.log('authMiddleware', authMiddleware);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
