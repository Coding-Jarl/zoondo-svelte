import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prismaClient } from '$lib/server/prisma';

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (userData) => {
		console.log('Getting user attributes...');
		return {
			username: userData.username,
			email: userData.email,
			bio: userData.bio
		};
	},
	sessionCookie: {
		expires: false
	}
});

export type Auth = typeof auth;