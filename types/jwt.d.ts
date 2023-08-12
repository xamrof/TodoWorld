import type { JwtPayload } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
	export interface JwtPayload {
		id?: number | string;
		email?: string;
	}
}

export {};